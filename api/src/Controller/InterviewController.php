<?php

namespace App\Controller;

use App\Entity\Answer;
use App\Entity\Tag;
use App\Entity\Interview;
use App\Entity\Interviewed;
use App\Entity\Question;
use App\Form\InterviewType;
use App\Form\InterviewedType;
use App\Repository\TagRepository;
use App\Repository\InterviewRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\InterviewedRepository;
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
    public function read($id, InterviewRepository $interviewRepository, SerializerInterface $serializer)
    {

        $interview = $interviewRepository->findCompleteInterview($id);

        $data = $serializer->normalize($interview, null, ['groups' => ['interview']]);


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
    public function edit(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        dd($data);
        // mettre a jour les meta
        $form = $this->createForm(InterviewType::class, $data["interview"]);
        $form->submit($data["interview"]);

        
        // mettre a jour les questions / reponse 
        // ajouter les nouvelles questions / réponse 
    }
    /**
     * Créer une nouvelle interview
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em, TagRepository $tagRepository, InterviewedRepository $interviewedRepository)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getUser();

        // On insancie l'objet interview
        // puis on le passe a travers la validation de données 
        // On valide les premieres données de l'interview 
        $interview = new Interview();
        $form = $this->createForm(InterviewType::class, $interview);
        $form->submit($data["interview"]);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($interview);
        }

        // on récupere les tags et on les valide 
        // on verifie si le tag existe 
        // $data["tags"] étant un tableau d'objet on vas parcourir celui ci 
        foreach ($data["tags"] as $tagUnSaved) {
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

        // on recupere les interviewed et on les valide
        // on verifie si il existe deja
        //dd($data["interviewed"]);
        foreach ($data["interviewed"] as $interviewedUnSaved) {
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
        }
        $user->addInterview($interview);
        $em->persist($user);

        // Gestion du contenu de l'interview 

        //dd($data["content"]);

        // on vas parcourrir le tableau de contenu 
        for ($indexContent=0; $indexContent < count($data["content"]); $indexContent++) { 
            //dd($data["content"][$indexContent]);
            $content = $data["content"][$indexContent];
            // pour chaque tableau ainsi obtenu 
            // on vas créer une question (au besoin verifie si elle existe)
                $question = new Question();
                $answer = new Answer();
                $question->setContent($content["question"]);
                $question->addAnswer($answer);
                $question->setInterview($interview);
                // on vas enfin associé les question a l'interview
                // puis on vas créer une réponse, et y associé :
                    // l'interviewed
                    // la question 
                $answer->setContent($content["answers"]);
                $answer->setInterviewed($interviewed);

                $em->persist($question, $answer);
        }
        $em->flush();

        // dd($data, $interview, $user);


        return $this->json(
            ['message' => 'Interview Added'],
            $status = 200,
            $headers = ['content-type' => 'application/Json'],
            $context = []
        );
    }
    /**
     * Supprime une interview
     * 
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id":"\d+"})
     */
    public function delete()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/InterviewController.php',
        ]);
    }
}
