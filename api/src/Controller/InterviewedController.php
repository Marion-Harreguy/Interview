<?php

namespace App\Controller;

use App\Entity\Interviewed;
use App\Form\InterviewedType;
use App\Repository\InterviewedRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;


/**
* @Route("/api/interviewed", name="interviewed_")
*/
class InterviewedController extends AbstractController
{
    /**
     * Liste tous les interviewés
     * 
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(InterviewedRepository $interviewedRepository, SerializerInterface $serializer)
    {
        $interviewed = $interviewedRepository->findAll();

        $data = $serializer->normalize($interviewed, null, ['groups' => ['interviewed']]);

        return $this->json($data, $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
    }
    
    /**
     * Affiche un interviwé spécifique
     * 
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id":"\d+"})
     */
    public function read($id, InterviewedRepository $interviewedRepository, SerializerInterface $serializer)
    {
        $interviewed = $interviewedRepository->find($id);

        $data = $serializer->normalize($interviewed, null, ['groups' => 'interviewed']);

        return $this->json($data, $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
    }

    /**
     * Modifie / met à jour un interviewé
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"}, requirements={"id":"\d+"})
     */
    public function edit(Interviewed $interviewed, Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);

        $form = $this->createForm(InterviewedType::class, $interviewed);
        $form->submit($data["interviewed"]);

        if($form->isSubmitted() && $form->isValid()){
            $interviewed->setUpdatedAt(new \Datetime());

            $em->persist($interviewed);
            $em->flush($interviewed);

            return $this->json(['Interviewed updated'], $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
        }
        return $this->json(['Oh, Houston, we have a problem.'], $status = 400, $headers = ['content-type' => 'application/Json'], $context = []);
    }

    /**
     * Crée un nouvel interviewé
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);
        
        $interviewed = new Interviewed();
        $form = $this->createForm(InterviewedType::class, $interviewed);

        $form->submit($data["interviewed"]);

        if($form->isSubmitted() && $form->isValid()) {

            $em->persist($interviewed);
            $em->flush();
            
            return $this->json(['Interviewed added'], $status = 201, $headers = ['content-type' => 'application/Json'], $context = []);
        }

        $errorsEmail = $form["email"]->getErrors();

        if($errorsEmail->count() > 0){
            return $this->json(['Email already taken'], $status = 403, $headers = ['content-type' => 'application/Json'], $context = []);
        }

        // return $this->json(['Oh, Houston, we have a problem.'], $status = 500, $headers = ['content-type' => 'application/Json'], $context = []);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id":"\d+"})
     */
    public function delete()
    {
        return $this->json([
            'message' => 'Welcome on the Delete method',
            'path' => 'src/Controller/InterviewController.php',
        ]);
    }
}
