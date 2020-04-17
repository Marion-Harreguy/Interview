<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Form\StructureType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


    /**
     * @Route("/api/structures", name="structure_")
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
    public function edit(Structure $structure, Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(StructureType::class, $structure);
        $form->submit($data["structure"]);

        if($form->isSubmitted() && $form->isValid()) {

            $em->persist($structure);
            $em->flush($structure);

            return $this->json(['Structure updated'], $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
        } else {

            return $this->json(['Oh, Houston, we have a problem.'], $status = 403, $headers = ['content-type' => 'application/Json'], $context = []);
        }
    }

    /**
     * Créer une nouvelle structure
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);

        $structure = new Structure();
        $form = $this->createForm(StructureType::class, $structure);

        $form->submit($data["structure"]);
        
        if($form->isSubmitted() && $form->isValid()) {

            $em->persist($structure);
            $em->flush();

            return $this->json(['Structure added'], $status = 201, $headers = ['content-type' => 'application/Json'], $context = []);
        } else {

            return $this->json(['Oh, Houston, we have a problem.'], $status = 403, $headers = ['content-type' => 'application/Json'], $context = []);
        }

    }
}
