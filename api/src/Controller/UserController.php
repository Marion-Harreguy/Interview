<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Entity\User;
// use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/users", name="user_")
 */
class UserController extends AbstractController
{

    /**
     * Affiche un utilisateur
     * 
     * @Route("/{id}", name="read", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function read($id, UserRepository $userRepository, SerializerInterface $serializer)
    {
        // On récupère les informations complètes d'un utilisateur
        $user = $userRepository->findCompleteUser($id);
        // dd($user);
        // On utilise le Serializer pour normaliser notre objet User
        $data = $serializer->normalize($user, null, ['groups' => ['user']]);
        
        return $this->json(
            $data, 
            $status = 200, 
            $headers = ['content-type' => 'application/Json'], 
            $context = []
            );
       
    }

    /**
     * Crée un nouvel utilisateur
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request)
    {
        // On vérifie si l'on a une requête XMLHttpRequest
        // if($request->isXmlHttpRequest()) {
        // On décode les données envoyées
        $data = json_decode($request->getContent());
    
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
       
        // On le sauvegarde en base de données
        // $em = $this->getDoctrine()->getManager();
        // $em->persist($user);
        // $em->flush();

        //=============================//
        // Récupération des données relatives de l'utilisateur
        // Marion : 13/04/2020
        //=============================//
        $structure = new Structure();
        $structure->setName($data->structure->name);
        $structure->setCity($data->structure->city);
        $structure->setSector($data->structure->sector);

        // On le sauvegarde en base de données
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);

        
        return $this->json([
            'message' => 'Add User'
            ], 
            $status = 201, // Response::HTTP_CREATED, 
            $headers = ['content-type' => 'application/Json'], 
            $context = []);
    }

    /**
     * Modifie un nouvel utilisateur
     * 
     * @Route("/{id}", name="edit", requirements={"id": "\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(User $user, Structure $structure, Request $request)
    {
        // On vérifie si l'on a une requête XMLHttpRequest
        // if($request->isXmlHttpRequest()) {
        // On décode les données envoyées
        $data = json_decode($request->getContent());

        $code = 200;
        
        // Si l'utilisateur n'est pas trouvé
        if(!$user) {
            // On instancie le nouvel utilisateur
            $user = new User();
            
            $code = 201;
        }

        // Si la structure n'est pas trouvée
        if(!$structure) {
            // On instancie la nouvelle structure
            $structure = new Structure();
            
            $code = 201;
        }

        // On hydrate l'objet User
        $user->setFirstname($data->user->firstname);
        $user->setLastname($data->user->lastname);
        $user->setEmail($data->user->email);
        $user->setBiography($data->user->biography);

        // On hydrate l'objet Structure
        $structure->setName($data->structure->name);
        $structure->setCity($data->structure->city);
        $structure->setSector($data->structure->sector);

        /*$form = $this->createForm(UserType::class, $user);

        $form->handleRequest($user);

        if($form->isSubmitted() && $form->isValid()) 
            // $user->setUpdatedAt(new \DateTime());*/

        // On le sauvegarde en base de données
        $em = $this->getDoctrine()->getManager();
        $em->persist($user, $structure);
        // $em->flush();
        
        return new Response('ok', Response::HTTP_OK);

        // return $this->redirectToRoute('');
        // }
        
        // return new Response('Not ok', Response::HTTP_NOT_FOUND);
    }
}
