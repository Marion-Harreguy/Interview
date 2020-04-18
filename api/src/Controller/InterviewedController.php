<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;


    /**
     * @Route("/api/interviewed", name="interviewed_")
     */
class InterviewedController extends AbstractController
{
    /**
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse()
    {
        return $this->json([
            'message' => 'Welcome on the Browse method',
            'path' => 'src/Controller/InterviewController.php',
        ]);
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
