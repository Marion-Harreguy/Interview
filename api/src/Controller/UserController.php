<?php

namespace App\Controller;

use App\Entity\Structure;
use App\Entity\User;
use App\Form\UserEditType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
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

        $response = new Response($data);

        // On ajoute l'entête HTTP
        $response->headers->set('Content-Type', 'application/json');


        // On envoie la réponse
        return $response;
    }

    //=============================//
    // Déplacer sur le LoginControlleur
    // sous la méthode Register
    //=============================//
    // /**
    //  * Crée un nouvel utilisateur
    //  * 
    //  * @Route("/", name="add", methods={"POST"})
    //  */
    // public function add(Request $request)
    // {
    // }

    /**
     * Modifie un utilisateur
     * 
     * @Route("/{id}", name="edit", requirements={"id": "\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(User $user, Request $request, EntityManagerInterface $em)
    {
        // Todo : Check apiToken / Email

        // On vérifie si l'on a une requête XMLHttpRequest
        // if($request->isXmlHttpRequest()) {
        // On décode les données envoyées
        $data = json_decode($request->getContent(), true);

        // Tester le Token du demandeur et le Token du recut 
        if ($request->headers->get('X-AUTH-TOKEN') === $user->getApiToken()) {

            // on execute les modifs 
            $formUser = $this->createForm(UserEditType::class, $user);
            $formUser->submit($data["user"]);

            if (($formUser->isSubmitted() && $formUser->isValid())) {


                $user->setUpdatedAt(new \Datetime());

                if (!empty($data["structure"])) {

                    $structure = new Structure();
                    $formStructure = $this->createForm(StructureType::class, $structure);
                    $formStructure->submit($data["structure"]);

                    if (($formStructure->isSubmitted() && $formStructure->isValid())) {
                        $em->persist($structure);
                        $user->addStructure($structure);
                    }
                }

                $em->persist($user);
                $em->flush();
            }

            return $this->json(['C\'est bien toi'], $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
        } else {
            return $this->json(
                ['File ranger ta chambre'],
                $status = 403,
                $headers = ['content-type' => 'application/Json'],
                $context = []
            );
        }
    }
}
