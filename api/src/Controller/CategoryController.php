<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/users/{user_id}/categories", name="category_")
 */
class CategoryController extends AbstractController
{
    /**
     * TODO : définition des routes - annotations 
     * TODO : écriture du BREAD
     * TODO : methods des routes
     * TODO : requirements des routes 
     */

    /**
     * Liste toutes les categories d'un utilisateur
     * 
     * @Route("/", name="browse", methods={"GET"})
     */
    public function browse(CategoryRepository $categoryRepository, UserRepository $userRepository, SerializerInterface $serializer)
    {      
        return $this->json([
            'message' => 'Welcome on the Browse method',
            'path' => 'src/Controller/InterviewController.php',

        ]);
        
    }

    /**
     * Modifie / met à jour une catégorie d'un utilisateur
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"}, requirements={"id":"\d+"})
     */
    public function edit(Category $category, Request $request)
    {
        $form = $this->createForm(CategoryType::class, $user);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            // $user->setUpdatedAt(new \DateTime());

            $this->getDoctrine()->getManager()->flush();

            // return $this->redirectToRoute('');
        }

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ]);
    }

    /**
     * Créer une nouvelle catégorie pour l'utilisateur
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request)
    {
        $category = new Category();
        $form = $this->createForm(CategoryType::class, $user);

        $form->handleRequest($request);

        if($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $em->persist($user);
            $em->flush();

            // return $this->redirectToRoute('');
        }

        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/UserController.php',
        ]);
    }

    /**
     * Supprime une catégorie de l'utilisateur
     * 
     * @Route("/{id}", name="delete", methods={"DELETE"}, requirements={"id":"\d+"})
     */
    public function delete(Category $category)
    {
        $em = $this->getDoctrine()->getManager();

        $em->remove($category);
        $em->flush();

        return $this->redirectToRoute('');
    }
}
