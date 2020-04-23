<?php

namespace App\Controller;

use App\Entity\Tag;
use App\Entity\Answer;
use App\Entity\Question;
use App\Entity\Interview;
use App\Entity\Interviewed;
use App\Entity\Structure;
use App\Form\InterviewType;
use App\Form\InterviewedType;
use App\Form\InterviewEditType;
use App\Form\StructureType;
use App\Repository\AnswerRepository;
use App\Repository\TagRepository;
use App\Repository\InterviewRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\InterviewedRepository;
use App\Repository\QuestionRepository;
use App\Repository\StructureRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @Route("/api/interviews", name="interview_")
 */
class InterviewController extends AbstractController
{
    /**
     * Liste toutes les interviews
     * 
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(Request $request, InterviewRepository $interviewRepository, SerializerInterface $serializer)
    {
        $language = $request->query->get("language");
        $localisation = $request->query->get("localisation");
        $tags = $request->query->get("tags");
        $licence = $request->query->get("licence");



        dd($language, $localisation, $tags, $licence);

        $interviews = $interviewRepository->findAllPublished();

        $data = $serializer->normalize($interviews, null, ['groups' => ['browseInterviews']]);

        return $this->json(
            $data,
            $status = 200,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
    /**
     * Affiche une interview spécifique 
     * 
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function read(Interview $interview, InterviewRepository $interviewRepository, SerializerInterface $serializer)
    {


        //======================================//
        // Gestion de l'affichage des interview //
        //======================================//
        /* 
        verifie si 
            -> il est publié
                -> si oui on affiche
            -> si non 
                -> on verifie que l'author soit le user connected 
                    -> si oui on affiche
                    -> si non - Error
        */
        if ($interview->getIsPublished() === false) {

            if ($interview->getUser() == $this->getUser()) {

                $data = $interview;
            } else {

                return $this->json(
                    ["Not Authorized"],
                    $status = 403,
                    $headers = ['content-type' => 'application/Json'],
                    $context = []
                );
            }
        }

        $data = $serializer->normalize($interview->getInterview(), null, ['groups' => ['interview']]);

        return $this->json(
            $data,
            $status = 200,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
    /**
     * Modifie / met à jour une interview
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"}, requirements={"id":"\d+"})
     */
    public function edit(Interview $interview, Request $request, EntityManagerInterface $em, TagRepository $tagRepository, QuestionRepository $questionRepository, AnswerRepository $answerRepository, InterviewedRepository $interviewedRepository, StructureRepository $structureRepository, SerializerInterface $serializer)
    {
        // on decode les données envoyées
        $data = json_decode($request->getContent(), true);


        $dataInterview = [];

        $dataInterview["title"] = $data["meta"]["title"];
        $dataInterview["context"] = $data["meta"]["context"];
        $dataInterview["location"] = $data["meta"]["localisation"];
        $dataInterview["language"] = $data["meta"]["language"];
        $dataInterview["openLicence"] = $data["meta"]["openLicence"];
        $dataInterview["isPublished"] = $data["meta"]["isPublished"];


        $tags = $data["meta"]["tags"];


        $interviewed =  $data["meta"]["interviewed"];
        // on valide les données ainsi reçut
        $form = $this->createForm(InterviewEditType::class, $interview);
        $form->submit($dataInterview);


        if ($form->isSubmitted() && $form->isValid()) {

            //=============================//
            //      Gestion des tags       //
            //=============================//
            /*
            - Boucler sur le tableau $data["interview"]["tags"]
                - Recherche par le nom si le tag existe
                    --> Si on le retrouve : on lui ajoute l'interview
                    --> Sinon on le créer et on lui ajoute l'interview
            */



            for ($i = 0; $i < count($tags); $i++) {

                $tagName = $tags[$i];
                $tag = $tagRepository->findOneBy(["name" => $tagName]);

                if ($tag) {
                    $tag->addInterview($interview);
                } else {
                    $tag = new Tag();
                    $tag->setName($tagName);
                    $tag->addInterview($interview);
                }


                $em->persist($tag);
            }


            //=============================//
            //  Gestion de l'interviewé    //
            //=============================//
            /*
            - Boucler sur le tableau $data["interview"]["interviewed"]
                - Si l'index ["id"] existe 
                    --> Récuperer l'objet Interviewed et le mettre à jour
                - Si il n'existe pas 
                    --> Créer l'objet Interviewed
            */


            foreach ($interviewed as $dataInterviewed) {

                if ($dataInterviewed["email"] === "anonyme@inter.view") {
                    $interviewed = $interviewedRepository->findOneBy(["email" => $dataInterviewed["email"]]);
                    $interviewed->addInterview($interview);
                } else {

                    if (isset($dataInterviewed["id"])) {
                        $id = $dataInterviewed["id"];
                        $interviewed = $interviewedRepository->find($id);
                        $formIntervierwed = $this->createForm(InterviewedType::class, $interviewed);
                        $formIntervierwed->submit($dataInterviewed);
                        if ($formIntervierwed->isSubmitted() && $formIntervierwed->isValid()) {
                            $interviewed->addInterview($interview);
                            $interviewed->setUpdatedAt(new \DateTime());
                        }
                    } else {
                        $interviewed = new Interviewed();
                        $formIntervierwed = $this->createForm(InterviewedType::class, $interviewed);
                        $formIntervierwed->submit($dataInterviewed);
                        if ($formIntervierwed->isSubmitted() && $formIntervierwed->isValid()) {
                            $interviewed->addInterview($interview);
                        }
                    }
                    $em->persist($interviewed);
                }

                //=============================//
                //   Gestion des structures    //
                //=============================//
                /*
                - Boucler sur le tableau $data["interview"]["interviewed"]["structure"]
                    - Si l'index ["id"] existe
                        --> Recuperer l'objet Structure et le mettre à jour
                    - Si il n'existe pas
                        --> Créer l'objet Structure et lui assigner l'interviewé
                */

                for ($i = 0; $i < count($dataInterviewed["structure"]); $i++) {


                    if (isset($dataInterviewed["structure"][$i]["id"])) {
                        $id = $dataInterviewed["structure"][$i]["id"];

                        $structure = $structureRepository->find($id);
                    } else {
                        $structure = new Structure();
                        $formStructure = $this->createForm(StructureType::class, $structure);
                        $formStructure->submit($dataInterviewed["structure"][$i]);
                        if ($formStructure->isSubmitted() && $formStructure->isValid()) {
                            $structure->addInterviewed($interviewed);
                            $interviewed->setUpdatedAt(new \DateTime());
                        }
                    }

                    $em->persist($structure);
                }
            }


            //==================================//
            // Gestion des Questions & Réponses //
            //==================================//
            /*
            - Boucler sur le tableau $data["content]
                - Vérifier l'existence l'index ["id"]
                    -> Si il existe : 
                        - Recuperer l'objet Question, le mettre à jour
                    -> Sinon :
                        - Créer l'objet Question
                  - Vérifier si il existe un index ["answers"]["id"]
                      -> Si il existe : 
                          - Recuperer l'objet Answer, le mettre à jour
                      -> Sinon :
                          - Créer l'objet Answer
                          - Lui assginer la question et l'interviewé
            */
            foreach ($data["content"] as $questionReponse) {


                if (isset($questionReponse["id"])) {
                    $questionId = $questionReponse["id"];
                } else {
                    $questionId = null;
                }

                if (!$questionId) {

                    $question = new Question();
                    $question->setContent($questionReponse["question"]);

                    for ($i = 0; $i < count($questionReponse["answer"]); $i++) {
                        if (isset($questionReponse["answer"][$i]["id"])) {
                            $answerId = $questionReponse["answer"][$i]["id"];
                        } else {
                            $answerId = null;
                        }

                        if (!$answerId) {
                            $answer = new Answer();
                            $answer->setContent($questionReponse["answer"][$i]["content"]);
                            $answer->setQuestion($question);
                            $answer->setInitials($questionReponse["answer"][$i]["interviewed"]);
                            $answer->setInterviewed($interviewed);
                        } else {
                            $answer = $answerRepository->find($questionReponse["answer"][$i]["id"]);
                            $answer->setContent($questionReponse["answer"][$i]["content"]);
                            $answer->setUpdatedAt(new \Datetime);
                        }
                    }

                    $question->setInterview($interview);
                } else {

                    $question = $questionRepository->find($questionId);
                    $question->setContent($questionReponse["question"]);

                    for ($i = 0; $i < count($questionReponse["answer"]); $i++) {
                        if (isset($questionReponse["answer"][$i]["id"])) {
                            $answerId = $questionReponse["answer"][$i]["id"];
                        } else {
                            $answerId = null;
                        }

                        if (!$answerId) {

                            $answer = new Answer();
                            $answer->setContent($questionReponse["answer"][$i]["content"]);
                            $answer->setQuestion($question);
                            $answer->setInitials($questionReponse["answer"][$i]["interviewed"]);
                            $answer->setInterviewed($interviewed);
                        } else {

                            $answer = $answerRepository->find($questionReponse["answer"][$i]["id"]);
                            $answer->setContent($questionReponse["answer"][$i]["content"]);
                            $answer->setUpdatedAt(new \Datetime);
                        }
                    }
                    $question->setInterview($interview);
                }

                $em->persist($answer);
                $em->persist($question);
            }

            $interview->setUpdatedAt(new \Datetime);

            $em->persist($interview);
        }



        $em->flush();



        $data = $serializer->normalize($interview->getInterview(), null, ['groups' => ['interview']]);
        return $this->json(
            $data,
            $status = 200,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
    /**
     * Créer une nouvelle interview
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em, TagRepository $tagRepository, InterviewedRepository $interviewedRepository, StructureRepository $structureRepository, SerializerInterface $serializer)
    {
        // on decode les données reçut
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();


        $dataInterview = [];

        $dataInterview["title"] = $data["meta"]["title"];
        $dataInterview["context"] = $data["meta"]["context"];
        $dataInterview["localisation"] = $data["meta"]["localisation"];
        $dataInterview["language"] = $data["meta"]["language"];
        $dataInterview["openLicence"] = $data["meta"]["openLicence"];
        $dataInterview["isPublished"] = $data["meta"]["isPublished"];


        $tags = $data["meta"]["tags"];


        $interviewed =  $data["meta"]["interviewed"];


        // On valide les données 
        $interview = new Interview();
        $form = $this->createForm(InterviewType::class, $interview);
        $form->submit($dataInterview);

        if ($form->isSubmitted() && $form->isValid()) {

            $em->persist($interview);
        }

        //=============================//
        //      Gestion des tags       //
        //=============================//
        foreach ($tags as $tagUnSaved) {

            $tag = $tagRepository->findOneBy(["name" => $tagUnSaved["name"]]);

            if ($tag) {

                $tag->addInterview($interview);
            } else {

                $tag = new Tag();
                $tag->setName($tagUnSaved["name"]);
                $tag->addInterview($interview);
            }

            $em->persist($tag);
        }

        //=============================//
        //  Gestion de l'interviewé    //
        //=============================//
        foreach ($interviewed as $interviewedUnSaved) {

            $interviewed = $interviewedRepository->findOneBy(["email" => $interviewedUnSaved["email"]]);

            if ($interviewed) {

                $interviewed->addInterview($interview);
            } else {

                $interviewed = new Interviewed();
                $formIntervierwed = $this->createForm(InterviewedType::class, $interviewed);
                $formIntervierwed->submit($interviewedUnSaved);

                if ($formIntervierwed->isSubmitted() && $formIntervierwed->isValid()) {

                    $interviewed->addInterview($interview);
                }
            }
            $em->persist($interviewed);

            //=============================//
            //   Gestion des structures    //
            //=============================//

            foreach ($interviewedUnSaved["structure"] as $dataStructure) {

                $structure = $structureRepository->findOneBy(["name" => $dataStructure["name"]]);

                if ($structure) {

                    $formStructure = $this->createForm(StructureType::class, $structure);
                    $formStructure->submit($dataStructure);

                    if ($formStructure->isSubmitted() && $formStructure->isValid()) {

                        $structure->addInterviewed($interviewed);
                        $interviewed->setUpdatedAt(new \DateTime());
                    }
                } else {

                    $structure = new Structure();
                    $formStructure = $this->createForm(StructureType::class, $structure);
                    $formStructure->submit($dataStructure);

                    if ($formStructure->isSubmitted() && $formStructure->isValid()) {

                        $structure->addInterviewed($interviewed);
                    }
                }

                $em->persist($structure);
            }
        }


        $user->addInterview($interview);

        $em->persist($user);

        //==================================//
        // Gestion des Questions & Réponses //
        //==================================//
        for ($indexContent = 0; $indexContent < count($data["content"]); $indexContent++) {

            $content = $data["content"][$indexContent];

            $question = new Question();
            $answer = new Answer();

            $question->setContent($content["question"]);
            $question->addAnswer($answer);
            $question->setInterview($interview);

            $answer->setContent($content["answers"]);
            $answer->setInterviewed($interviewed);

            $em->persist($question, $answer);
        }

        $em->flush();


        return $this->json(
            ['id' => $interview->getId()],
            $status = 201,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
    /**
     * Supprime une interview
     * 
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id":"\d+"})
     */
    public function delete(Interview $interview, EntityManagerInterface $em)
    {
        /*
        Si un interview a le meme token que l'user conencter (c'est donc son interview )
        */

        if ($interview->getUser() === $this->getUser()) {
            $em->remove($interview);
            $em->flush();

            return $this->json(
                ['message' => 'Interview deleted'],
                $status = 200,
                $headers = ['content-type' => 'application/Json'],
                $context = []
            );
        }

        return $this->json(
            ['message' => 'Acces denied'],
            $status = 403,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
}
