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
     * Liste toutes les categories d'un utilisateur
     * 
     * @Route("/", name="browse", methods={"GET"})
     */

    public function browse()
    {   
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
    public function edit(Category $category, Request $request, EntityManagerInterface $em)
    {
        // On récupére le user (via la requête)
        $userId = intval($request->attributes->get('users_id'));
        // On écupére l'id du User
        $id = $this->getUser()->getId();

        // si l'id est le même, alors on peut modifier une catégorie
        if ($id === $userId) {

            $data = json_decode($request->getContent(), true);

            $form = $this->createForm(CategoryType::class, $category);

            $form->submit($data["categories"]);

            if($form->isSubmitted() && $form->isValid()) {
        
                $em->persist($category);

                // mettre à jour l'id du User
                $category->setUser($this->getUser());

                $category->setUpdatedAt(new \Datetime());

                $em->flush($category);
            
            }
    
        return $this->json(['Category updated'], $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
        
        }
    }

    /**
     * Créer une nouvelle catégorie pour l'utilisateur
     * 
     * @Route("/", name="add", methods={"POST"})
     */
    public function add(Request $request, EntityManagerInterface $em)
    {
        $userId = intval($request->attributes->get('users_id'));
        $id = $this->getUser()->getId();

        if ($id === $userId) {

            $data = json_decode($request->getContent(), true);
          
            $category = new Category();
            $form = $this->createForm(CategoryType::class, $category);
            
            $form->submit($data["categories"]);
           
            if($form->isSubmitted() && $form->isValid()) {

                $em->persist($category);

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
