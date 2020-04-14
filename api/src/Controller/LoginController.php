<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Structure;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

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
    public function add(Request $request, EntityManagerInterface $em)
    {
        // On vérifie si l'on a une requête XMLHttpRequest
        // if($request->isXmlHttpRequest()) {
        // On décode les données envoyées
        $data = json_decode($request->getContent());

        //=============================//
        // Récupération des données relatives de l'utilisateur
        // Marion : 13/04/2020
        //=============================//
        $structure = new Structure();
        $structure->setName($data->structure->name);
        $structure->setCity($data->structure->city);
        $structure->setSector($data->structure->sector);
        $em->persist($structure);

            // TODO : Verifier le contenu des $data 

        // On instancie un nouvel utilisateur
        $user = new User();

        // le user suit un schema :
        // User {} => contient les datas de l'utilisateur
        // Structure [] 

        // On hydrate notre objet User
        $user->setFirstname($data->user->firstname);
        $user->setLastname($data->user->lastname);
        $user->setEmail($data->user->email);
        $user->setPassword($data->user->password);
        $user->setBiography($data->user->biography);

        //=============================//
        //Ajouter les données de base 
        //=============================//
        $user->setRoles(['ROLE_USER']);
        $user->setApiToken(uniqid());
        $user->addStructure($structure);

        $em->persist($user);

        // On le sauvegarde en base de données
        // $em = $this->getDoctrine()->getManager();
        // $em->persist($user);
        // $em->flush();





        //dd($structure);
        // On le sauvegarde en base de données


        $em->flush();


        return $this->json([], $status = 201, $headers = ['content-type' => 'application/Json'], $context = []);
    }
}
