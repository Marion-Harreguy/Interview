<?php

namespace App\Controller;

use App\Entity\Category;
use App\Entity\User;
use App\Entity\Structure;
use App\Form\CategoryType;
use App\Form\UserEditType;
use App\Form\StructureType;
use App\Repository\CategoryRepository;
use App\Repository\InterviewRepository;
use App\Repository\StructureRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


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
        $user = $userRepository->find($id);
        $data = $serializer->normalize($user, null, ['groups' => ['user']]);
        return $this->json($data, $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
    }

    /**
     * Modifie un utilisateur
     * 
     * @Route("/{id}", name="edit", requirements={"id": "\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(User $user, Request $request, EntityManagerInterface $em, SerializerInterface $serializer, StructureRepository $structureRepository, CategoryRepository $categoryRepository, InterviewRepository $interviewRepository)
    {
        // On décode les données envoyées
        $data = json_decode($request->getContent(), true);

        //dd($data);
        if ($this->getUser() === $user) {

            // on execute les modifs 
            $formUser = $this->createForm(UserEditType::class, $user);
            $formUser->submit($data["user"]);
            //dd($formUser);
            if (($formUser->isSubmitted() && $formUser->isValid())) {

                $user->setUpdatedAt(new \Datetime());
                $em->persist($user);
            }


            //=============================//
            //   Gestion de la structure   //
            //=============================//  
     

            if (!empty($data["structure"])){
              
            
            if (isset($data["structure"]["id"])) {
                $structure = $structureRepository->find($data["structure"]["id"]);

                $formStructure = $this->createForm(StructureType::class, $structure);
                $formStructure->submit($data["structure"]);

                if ($formStructure->isSubmitted() && $formStructure->isValid()) {
                    $structure->addUser($user);
                    $structure->setUpdatedAt(new \DateTime());
                }
            } else {

                $structure = new Structure();
                $formStructure = $this->createForm(StructureType::class, $structure);
                $formStructure->submit($data["structure"]);
                if ($formStructure->isSubmitted() && $formStructure->isValid()) {
                    $structure->addUser($user);
                    $user->setUpdatedAt(new \DateTime());
                    $em->persist($structure);
                }
            }
        }

            //=============================//
            //    Gestion des categories   //
            //=============================//

            $categoriesList = $data["dashboard"]["categories"];



            foreach ($categoriesList as $categoryUnsaved) {

                if ($categoryUnsaved["id"] != 0) {

                    $category = $categoryRepository->find($categoryUnsaved["id"]);

                    $formCategory = $this->createForm(CategoryType::class, $category);
                    $formCategory->submit($categoryUnsaved);

                    if ($formCategory->isSubmitted() && $formCategory->isValid()) {
                        $category->setUpdatedAt(new \DateTime());
                    }
                } else {
                    $newCategory = [];

                    $newCategory["name"] = $categoryUnsaved["name"];
                    $newCategory["color"] = $categoryUnsaved["color"];



                    $category = new Category();
                    $formCategory = $this->createForm(CategoryType::class, $category);
                    $formCategory->submit($newCategory);
                    if ($formCategory->isSubmitted() && $formCategory->isValid()) {
                        $user->addCategory($category);
                        $user->setUpdatedAt(new \DateTime());
                        $em->persist($category);
                    }
                }
            }

            // Gestion de l'attribution d'une category a un interview 

            // boucler sur "dahsboard"
            // publishedInterviews
            $published = $data["dashboard"]["publishedInterviews"];
            foreach ($published as $publishedElement) {
                //Boucler sur les interviews 
                $interviewPublished = $interviewRepository->find($publishedElement["id"]);
                if (!empty($publishedElement["categories"])) {
                    // si "categories" Boucler dessus

                    foreach ($publishedElement["categories"] as $categoryPublishedId) {
                       // pour chaque entrée relié avec la category ID

                        $categoryToPublished = $categoryRepository->find($categoryPublishedId);
                        // mise a jour 

                        if ($categoryToPublished) {
                            $categoryToPublished->addInterview($interviewPublished);
                            // valider 
                        }
                    }
                }
            }
            // writtingInterviews
            $writting = $data["dashboard"]["writtingInterviews"];
            foreach ($writting as $writtingElement) {
                //Boucler sur les interviews 
                $interviewWritting = $interviewRepository->find($writtingElement["id"]);
                if (!empty($writtingElement["categories"])) {
                    // si "categories" Boucler dessus

                    foreach ($writtingElement["categories"] as $categoryWrittingId) {
                       // pour chaque entrée relié avec la category ID

                        $categoryToWritting = $categoryRepository->find($categoryWrittingId);
                        // mise a jour 

                        if ($categoryToWritting) {
                            $categoryToWritting->addInterview($interviewWritting);
                            // valider 
                        }
                    }
                }
            }

            // savedInterviews
            $favorites = $data["dashboard"]["savedInterviews"];
            foreach ($favorites as $favoris) {
                //Boucler sur les interviews 
                $interviewFav = $interviewRepository->find($favoris["id"]);

                $user->addFavorite($interviewFav);
                
                if (!empty($favoris["categories"])) {
                    // si "categories" Boucler dessus

                    foreach ($favoris["categories"] as $categoryFavoriteId) {
                        $categoryFavoriteId;
                        // pour chaque entrée relié avec la category ID

                        $categoryToFavorites = $categoryRepository->find($categoryFavoriteId);
                        // mise a jour 

                        if ($categoryToFavorites) {
                            $categoryToFavorites->addInterview($interviewFav);
                            // valider 
                        }
                    }
                }
            }





            $em->flush();

            $data = $serializer->normalize($user, null, ['groups' => ['user']]);
            return $this->json($data, $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
        } else {
            return $this->json(
                ['message' => 'Not Authorized'],
                $status = 403,
                $headers = ['content-type' => 'application/Json'],
                $context = []
            );
        }
    }
}
