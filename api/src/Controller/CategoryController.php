<?php

namespace App\Controller;

use App\Entity\Category;
use App\Form\CategoryType;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/users/{users_id}/categories", name="category_")
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
    public function browse(Request $request)
    {   
        // récupérer le user
        $userId = intval($request->attributes->get('users_id'));
        // récupérer son id
        $id = $this->getUser()->getId();
        dd($request, $userId, $id);

        return $this->json([
            'message' => 'Welcome on the Browse method',
            'path' => 'src/Controller/CategoryController.php',

        ]);
    }

    /**
     * Modifie / met à jour une catégorie d'un utilisateur
     * 
     * @Route("/{id}", name="edit", methods={"PUT", "PATCH"}, requirements={"id":"\d+"})
     */
    public function edit(Category $category, Request $request)
    {
        // récupérer le user
        $userId = intval($request->attributes->get('users_id'));
        // récupérer son id
        $id = $this->getUser()->getId();

        // si l'id est le même alors, on peut ajouter une catégorie
        if ($id === $userId) {

            $form = $this->createForm(CategoryType::class, $category);

            $form->handleRequest($request);

            if($form->isSubmitted() && $form->isValid()) {
                // $user->setUpdatedAt(new \DateTime());

                $this->getDoctrine()->getManager()->flush();

                // return $this->redirectToRoute('');
            }

            return $this->json([
                'message' => 'Welcome to your new controller!',
                'path' => 'src/Controller/CategoryController.php',
            ]);
        }
    }

    /**
     * Créer une nouvelle catégorie pour l'utilisateur
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em)
    {
        // récupérer le user
        $userId = intval($request->attributes->get('users_id'));
        // récupérer son id
        $id = $this->getUser()->getId();

        // si l'id est le même alors, on peut ajouter une catégorie
        if ($id === $userId) {

            $data = json_decode($request->getContent(), true);
          
            $category = new Category();
            $form = $this->createForm(CategoryType::class, $category);
            
            $form->submit($data["categories"]);
           
            if($form->isSubmitted() && $form->isValid()) {

                $em->persist($category);

                // mettre à jour l'id du User
                $category->setUser($this->getUser());

                $category->setUpdatedAt(new \Datetime());

                $em->flush();
            }

        return $this->json(['Category added'], $status = 201, $headers = ['content-type' => 'application/Json'], $context = []);
        
        }
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
