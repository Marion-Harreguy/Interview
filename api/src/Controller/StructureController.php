<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Form\StructureType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


    /**
     * @Route("/api/structures", name="structure-")
     */
class StructureController extends AbstractController
{
    /**
     * Liste toutes les structure
     * 
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse()
    {
        return $this->json([
            'message' => 'Welcome on the Browse method',
            'path' => 'src/Controller/StructureController.php',
        ]);
    }
        /**
     * Affiche une structure spécifique 
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
     * Modifie / met à jour une structure
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"}, requirements={"id":"\d+"})
     */
    public function edit(Structure $structure, Request $request)
    {
        $form = $this->createForm(StructureType::class, $structure);
        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {

            $this->getDoctrine()->getManager()->flush();

        }

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/StructureController.php',
        ]);
    }
    /**
     * Créer une nouvelle structure
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request)
    {
        $structure = new Structure();
        $form = $this->createForm(StructureType::class, $structure);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $em->persist($structure);
            $em->flush();
        }

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/StructureController.php',
        ]);
    }
}
