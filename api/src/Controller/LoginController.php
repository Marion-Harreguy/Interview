<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Structure;
use App\Form\UserType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class LoginController extends AbstractController
{

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request)
    {
        $user = $this->getUser();

        return $this->json([
            'token' => $user->getApiToken(),
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
        ]);
    }

    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
    {
        // On vérifie si l'on a une requête XMLHttpRequest
        // if($request->isXmlHttpRequest()) {
        // On décode les données envoyées
        $data = json_decode($request->getContent());

        //=============================//
        //Vérification des données
        //=============================//
        
        if($data->user->firstname === "") {
            // throw new \Exception ('Firstname required!');
        };
        

        //=============================//
        // Récupération des données relatives de l'utilisateur
        // Marion : 13/04/2020
        //=============================//
        // On instancie un nouvel utilisateur et une nouvelle structure
        $structure = new Structure();
        $user = new User();
        
        //$form = $this->createForm(UserType::class, $user);
        
        //$form->handleRequest($request);

        //if ($form->isSubmitted() && $form->isValid()) {
            // On encode le mot de passe
            
            $structure->setName($data->structure->name);
            $structure->setCity($data->structure->city);
            $structure->setSector($data->structure->sector);
            
            $em->persist($structure);
            
            // On hydrate notre objet User
            $user->setFirstname($data->user->firstname);
            $user->setLastname($data->user->lastname);
            $user->setEmail($data->user->email);
            $user->setPassword($passwordEncoder->encodePassword($user, $data->user->password));
            $user->setBiography($data->user->biography);
            
            //=============================//
            //Ajouter les données de base 
            //=============================//
            $user->setRoles(['ROLE_USER']);
            $user->setApiToken(uniqid());
            $user->addStructure($structure);

            $em->persist($user);

            $em->flush();
            
            $this->addFlash('success', 'You are registered, now you can now login !');
        //}

        return $this->json(['ok'], $status = 201, $headers = ['content-type' => 'application/Json'], $context = []);
    }
}
