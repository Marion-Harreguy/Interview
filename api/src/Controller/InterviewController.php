<?php

namespace App\Controller;

use App\Entity\Interview;
use App\Repository\InterviewRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

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
    public function edit()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/InterviewController.php',
        ]);
    }
    /**
     * Créer une nouvelle interview
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add()
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/InterviewController.php',
        ]);
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
