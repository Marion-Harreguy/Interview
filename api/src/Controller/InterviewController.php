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
    public function browse(InterviewRepository $interviewRepository, SerializerInterface $serializer)
    {

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
    public function edit($id, Request $request, EntityManagerInterface $em, TagRepository $tagRepository, QuestionRepository $questionRepository, AnswerRepository $answerRepository, InterviewedRepository $interviewedRepository, StructureRepository $structureRepository, SerializerInterface $serializer, InterviewRepository $interviewRepository)
    {
        // on decode les données envoyées
        $data = json_decode($request->getContent(), true);
        $interview = $interviewRepository->find($id);
        if ($interview->getUser() != $this->getUser()) {
            return $this->json(
                ["message" => "notAuthorized"],
                $status = 403,
                $headers = ['content-type' => 'application/Json'],
                $context = []
            );
        }

        // dd($this->getUser());

        $dataInterview = [];

        $dataInterview["title"] = $data["meta"]["title"];
        $dataInterview["context"] = $data["meta"]["context"];
        $dataInterview["location"] = $data["meta"]["location"];
        $dataInterview["language"] = $data["meta"]["language"];
        $dataInterview["openLicence"] = $data["meta"]["openLicence"];
        $dataInterview["isPublished"] = $data["meta"]["isPublished"];
        $dataInterview["date"] = $data["meta"]["date"];
        //$dataInterview["coordinates"] = $data["meta"]["coordinates"];

        $tags = $data["meta"]["tags"];

        $interviewedList =  $data["meta"]["interviewed"];


        // on valide les données ainsi reçues
        $form = $this->createForm(InterviewEditType::class, $interview);
        $form->submit($dataInterview);


        if ($form->isSubmitted() && $form->isValid()) {
            //=============================//
            //   Gestion des coordinates   //
            //=============================//
            $coordinates = [];
            for ($i = 0; $i < count($data["meta"]["coordinates"]); $i++) {

                $coordinates[] = intval($data["meta"]["coordinates"][$i]);
            }

            if (count($coordinates) == 2) {
                $interview->setCoordinates($coordinates);
            } else {
                $interview->setCoordinates([0, 0]);
            }



            //=============================//
            //      Gestion des tags       //
            //=============================//
            /*
    - Boucler sur le tableau $data["interview"]["tags"]
        - Recherche par le nom si le tag existe
            --> Si on le retrouve : on lui ajoute l'interview
            --> Sinon on le créer et on lui ajoute l'interview
    */


            if (count($tags) < count($interview->getTags())) {

                $tagsSaved = $interview->getTags();
                for ($i = 0; $i < count($tagsSaved); $i++) {

                    if (isset($tags[$i])) {
                        $tagsNotSave = $tagRepository->findOneBy(["name" => $tags[$i]]);
                    }

                    if (isset($tags[$i]) && $tagsSaved[$i] = $tagsNotSave) {
                    } else {
                        $interview->removeTag($tagsSaved[$i]);
                    }
                }
            }

            for ($i = 0; $i < count($tags); $i++) {

                $tagName = $tags[$i];
                $tag = $tagRepository->findOneBy(["name" => $tagName]);

                if ($tag) {

                    $tag->addInterview($interview);
                    $interview->addTag($tag);
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
            foreach ($interviewedList as $dataInterviewed) {

                if (!empty($dataInterviewed["email"])) {
                    
                    if ($dataInterviewed["email"] == "anonyme@inter.view") {
                        $interviewed = $interviewedRepository->findOneBy(["email" => "anonyme@inter.view"]);
                        $interview->addInterviewed($interviewed);
                    }

                    $interviewed = $interviewedRepository->findOneBy(["email" => $dataInterviewed["email"]]);
                    $interview->removeInterviewed($interviewedRepository->findOneBy(["email" => "anonyme@inter.view"]));

                    if ($interviewed) {

                        $formIntervierwed = $this->createForm(InterviewedType::class, $interviewed);
                        $formIntervierwed->submit($dataInterviewed);

                        if ($formIntervierwed->isSubmitted() && $formIntervierwed->isValid()) {
                            $interviewed->setUpdatedAt(new \DateTime());
                        }
                    } else {

                        $interviewed = new Interviewed();
                        $formIntervierwed = $this->createForm(InterviewedType::class, $interviewed);
                        $formIntervierwed->submit($dataInterviewed);

                        if ($formIntervierwed->isSubmitted() && $formIntervierwed->isValid()) {
                        }
                    }

                    $em->persist($interviewed);
                    $interview->addInterviewed($interviewed);

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
                        if (isset($dataInterviewed["structure"][$i]["name"]) && !empty($dataInterviewed["structure"][$i]["name"])) {
                            $name = $dataInterviewed["structure"][$i]["name"];
                            $structure = $structureRepository->findOneBy(["name" => $name]);
                        } else {
                            $structure = new Structure();
                            $formStructure = $this->createForm(StructureType::class, $structure);
                            $formStructure->submit($dataInterviewed["structure"]);
                            if ($formStructure->isSubmitted() && $formStructure->isValid()) {
                                $structure->addInterviewed($interviewed);
                                $interviewed->setUpdatedAt(new \DateTime());
                            }
                        }
                        $em->persist($structure);
                        $interviewed->addStructure($structure);
                    }
                }
            }

            //==================================//
            // Gestion des Questions & Réponses //
            //==================================//
            /*
    - Boucler sur le tableau $data["content]
        - Vérifier l'existence l'index ["id"]
            -> S'il existe : 
                - Recuperer l'objet Question, le mettre à jour
            -> Sinon :
                - Créer l'objet Question
            - Vérifier s'il existe un index ["answers"]["id"]
                -> S'il existe : 
                    - Recuperer l'objet Answer, le mettre à jour
                -> Sinon :
                    - Créer l'objet Answer
                    - Lui assigner la question et l'interviewé
    */

            if (!empty($data["content"])) {
                foreach ($data["content"] as $questionReponse) {

                    //=====================================//
                    // Vérification du nombre de questions //
                    //=====================================//
                    // Vérifier si il y a moins de questions envoyées par rapport au nombre de questions stockées en bdd (liées a l'interview)
                    if (count($data["content"]) < count($interview->getQuestions())) {

                        // on définit deux variables 
                        // Pour les question stockées en bdd
                        // pour les question envoyées en PUT 
                        $questionsInDatabase = $interview->getQuestions();
                        $questionNotSaved = $data["content"];

                        // on boucle tant que les question en bdd ne sont pas épuisées
                        for ($i = 0; $i < count($questionsInDatabase); $i++) {

                            // si le champ id existe ET s'il est égale a celui de la question stockée en bdd
                            if (isset($questionNotSaved[$i]["id"]) && $questionsInDatabase[$i]->getId() === $questionNotSaved[$i]["id"]) {
                            } else {
                                //sinon on récupere l'objet en fonction de l'id de la question
                                $question = $questionRepository->find($questionsInDatabase[$i]->getId());
                                // on remove la question de l'interview
                                $interview->removeQuestion($question);
                                // on supprime la question de la bdd 
                                $em->remove($question);
                                $em->flush($question);
                            }
                        }
                    }

                    //=======================================//
                    // Récuperation de l'id  de la quesiton  //
                    //=======================================//
                    // On check si l'id de la question est existant.
                    if (isset($questionReponse["id"])) {
                        $questionId = $questionReponse["id"];
                    } else {
                        // sinon on lui attribue: null
                        $questionId = null;
                    }

                    //==========================================//
                    //Si la question est nouvelle donc pas d'id //
                    //==========================================//
                    if (!$questionId) {
                        // on crée un objet Question
                        $question = new Question();
                        // on set le contenu 
                        $question->setContent($questionReponse["question"]);
                        // et on l'applique a l'interview
                        $question->setInterview($interview);

                        //=================================================//
                        // Vérification des réponse                        //
                        // si elles sont déclarer / modifier / supprimer   //
                        //=================================================//
                        // si le tableau de Answer existe ET est non vide 
                        if (isset($questionReponse["answer"]) && !empty($questionReponse["answer"])) {
                            // on boucle dessus tant qu'il y a des réponses 
                            for ($i = 0; $i < count($questionReponse["answer"]); $i++) {
                                // on vérifie l'existence du champ ID ==> s'il existe la question est en Bdd
                                if (isset($questionReponse["answer"][$i]["id"])) {
                                    $answerId = $questionReponse["answer"][$i]["id"];
                                } else {
                                    // sinon on le définit a null
                                    $answerId = null;
                                }
                                // si l'id est a null 
                                // on créer un objet Anwser
                                if (!$answerId) {
                                    $answer = new Answer();
                                    // on set le contenu, les initiales, et l'interviewé
                                    $answer->setContent($questionReponse["answer"][$i]["content"]);
                                    $answer->setInitials($questionReponse["answer"][$i]["interviewed"]);
                                    $answer->setInterviewed($interviewed);
                                    // on lui assigne sa question
                                    $answer->setQuestion($question);
                                } else {
                                    // sinon on récupere la réponse en bdd et on la modifie
                                    $answer = $answerRepository->find($questionReponse["answer"][$i]["id"]);
                                    $answer->setContent($questionReponse["answer"][$i]["content"]);
                                    $answer->setUpdatedAt(new \Datetime);
                                }
                            }
                            // une fois cela fait on persiste les responses
                            $em->persist($answer);
                        }

                        //===================================================//
                        // Sinon la question a un id donc elle existe en Bdd //
                        //===================================================//
                    } else {
                        // on retrouve la question précise 
                        $question = $questionRepository->find($questionId);
                        // on lui applique son nouveau contenu
                        $question->setContent($questionReponse["question"]);
                        //===================================================//
                        // Vérification des réponses                          //
                        // si elles sont déclarées / modifiées / supprimées  //
                        //===================================================//
                        // Donc si le compte des réponses envoyées n'est pas le même que le compte des réponses stockées  
                        if (count($questionReponse["answer"]) < count($question->getAnswers())) {
                            // On définit deux variables contenant :
                            // d'une part les réponses de l'objet (stockées en bdd)
                            // d'autre part les réponses renvoyées (dans la requete PUT)
                            $AnswerInDatabase = $question->getAnswers();
                            $answerNotSaved = $questionReponse["answer"];

                            // on boucle tant que le compte des reponses stockées n'est pas atteint 
                            for ($i = 0; $i < count($AnswerInDatabase); $i++) {

                                // si l'index "id" d'une réponse existe ET qu'il est égale a celui stocké en bdd (lié à l'objet) ==> On ne fait rien de plus
                                if (isset($answerNotSaved[$i]["id"]) && $AnswerInDatabase[$i]->getId() === $answerNotSaved[$i]["id"]) {
                                } else {
                                    // Sinon on va récupérer l'objet réponse 
                                    $answer = $answerRepository->find($AnswerInDatabase[$i]->getId());
                                    // et retirer la réponse de sa question
                                    $question->removeAnswer($answer);
                                    // puis supprimer la réponse de la bdd
                                    $em->remove($answer);
                                    $em->flush($answer);
                                }
                            }
                        }

                        // si le tableau de Answer existe ET est non vide 
                        if (isset($questionReponse["answer"]) && !empty($questionReponse["answer"])) {
                            // on boucle dessus tant qu'il y a des réponses 
                            for ($i = 0; $i < count($questionReponse["answer"]); $i++) {
                                // on vérifie l'existence du champ ID ==> s'il existe la question est en Bdd
                                if (isset($questionReponse["answer"][$i]["id"])) {
                                    $answerId = $questionReponse["answer"][$i]["id"];
                                } else {
                                    // sinon on le définit a null
                                    $answerId = null;
                                }

                                // si l'id est a null 
                                // on crée un objet Anwser
                                if (!$answerId) {
                                    $answer = new Answer();
                                    // on set le contenu, les initiales, et l'interviewé
                                    $answer->setContent($questionReponse["answer"][$i]["content"]);
                                    $answer->setInitials($questionReponse["answer"][$i]["interviewed"]);
                                    $answer->setInterviewed($interviewed);
                                    // on lui assigne sa question
                                    $answer->setQuestion($question);
                                } else {
                                    // sinon on récupere la réponse en bdd et on la modifie
                                    $answer = $answerRepository->find($questionReponse["answer"][$i]["id"]);
                                    $answer->setContent($questionReponse["answer"][$i]["content"]);
                                    $answer->setUpdatedAt(new \Datetime);
                                }
                            }
                            // une fois cela fait on persiste les responses
                            $em->persist($answer);
                        }
                        // on ajoute la question a l'interview
                        $question->setInterview($interview);
                    }
                    // on persiste les questions
                    $em->persist($question);
                }
            } else {
                // sinon cela veut dire: 
                // le tableau du contenu est vide (la derniere question présente a été supprimée)
                // on va donc rechercher la derniere question de l'interview
                $question = $interview->getQuestions()[0];
                if ($question) {
                    // on la supprime de l'interview
                    $interview->removeQuestion($question);
                    // on la retire de la bdd
                    $em->remove($question);
                }
            }

            // on applique une date de mise a jour sur l'interview
            $interview->setUpdatedAt(new \Datetime);

            // on flush le tout 
            $em->flush();
        }


        // on va refresh afin de pouvoir renvoyer l'objet de la bdd  
        // $em->refresh($interview);



        $interviewResponse = $serializer->normalize($interview->getInterview(), null, ['groups' => ['interview']]);
        return $this->json(
            $interviewResponse,
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
        // on decode les données reçues
        $data = json_decode($request->getContent(), true);
        // on récupere le User connecté
        $user = $this->getUser();


        $dataInterview = [];

        $dataInterview["title"] = $data["meta"]["title"];
        // $dataInterview["context"] = $data["meta"]["context"];
        // $dataInterview["location"] = $data["meta"]["location"];
        // $dataInterview["language"] = $data["meta"]["language"];
        // $dataInterview["openLicence"] = $data["meta"]["openLicence"];
        // $dataInterview["isPublished"] = $data["meta"]["isPublished"];


        // $tags = $data["meta"]["tags"];


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
        // foreach ($tags as $tagUnSaved) {

        //     $tag = $tagRepository->findOneBy(["name" => $tagUnSaved["name"]]);

        //     if ($tag) {

        //         $tag->addInterview($interview);
        //     } else {

        //         $tag = new Tag();
        //         $tag->setName($tagUnSaved["name"]);
        //         $tag->addInterview($interview);
        //     }

        //     $em->persist($tag);
        // }

        //=============================//
        //  Gestion de l'interviewé    //
        //=============================//
        foreach ($interviewed as $interviewedUnSaved) {

            if (!empty($interviewedUnSaved["email"])) {

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

                    if (empty($dataStructure["name"])) {
                    } else {
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
            } else {
                $interview->addInterviewed($interviewedRepository->find(1));
            }
        }


        $user->addInterview($interview);
        $em->persist($user);
        $em->flush();



        //==================================//
        // Gestion des Questions & Réponses //
        //==================================//
        // for ($indexContent = 0; $indexContent < count($data["content"]); $indexContent++) {

        //     $content = $data["content"][$indexContent];

        //     $question = new Question();
        //     $answer = new Answer();

        //     $question->setContent($content["question"]);
        //     $question->addAnswer($answer);
        //     $question->setInterview($interview);

        //     $answer->setContent($content["answers"]);
        //     $answer->setInterviewed($interviewed);

        //     $em->persist($question, $answer);
        // }



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
