<?php

namespace App\Controller;

use App\Repository\InterviewedRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;


/**
* @Route("/api/interviewed", name="interviewed_")
*/
class InterviewedController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(InterviewedRepository $interviewedRepository, SerializerInterface $serializer)
    {
        $interviewed = $interviewedRepository->findAll();

        $data = $serializer->normalize($interviewed, null, ['groups' => ['interviewed']]);

        return $this->json($data, $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
    }
    
    /**
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function read()
    {
        return $this->json([
            'message' => 'Welcome on the Browse method',
            'path' => 'src/Controller/InterviewController.php',
        ]);
    }
        /**
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"}, requirements={"id":"\d+"})
     */
    public function edit()
    {
        return $this->json([
            'message' => 'Welcome on the Browse method',
            'path' => 'src/Controller/InterviewController.php',
        ]);
    }
        /**
     * @Route("/", name="add", methods={"POST"})
     */
    public function add()
    {
        return $this->json([
            'message' => 'Welcome on the Browse method',
            'path' => 'src/Controller/InterviewController.php',
        ]);
    }
}
