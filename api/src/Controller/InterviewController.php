<?php

namespace App\Controller;

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
        $interviews = $interviewRepository->findAll();

        $data = $serializer->normalize($interviews, null, ['groups' => ['interviews']]);

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
    public function read($id)
    {
        return $this->json([
            'message' => 'Welcome on the Read method',
            'id' => $id,
        ]);
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
