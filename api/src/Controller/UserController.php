<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Structure;
use App\Form\UserEditType;
use App\Form\StructureType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
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
        $user = $userRepository->findCompleteUser($id);
        $data = $serializer->normalize($user, null, ['groups' => ['user']]);
        return $this->json($data, $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
    }

    /**
     * Modifie un utilisateur
     * 
     * @Route("/{id}", name="edit", requirements={"id": "\d+"}, methods={"PUT", "PATCH"})
     */
    public function edit(User $user, Request $request, EntityManagerInterface $em, SerializerInterface $serializer)
    {
        // On décode les données envoyées
        $data = json_decode($request->getContent(), true);

        if ($this->getUser() === $user) {

            // on execute les modifs 
            $formUser = $this->createForm(UserEditType::class, $user);
            $formUser->submit($data["user"]);

            if (($formUser->isSubmitted() && $formUser->isValid())) {

                $user->setUpdatedAt(new \Datetime());
                $em->persist($user);
            }
            
            $em->flush();

            $data = $serializer->normalize($user, null, ['groups' => ['user']]);
            return $this->json($data, $status = 200, $headers = ['content-type' => 'application/Json'], $context = []);
        } else {
            return $this->json(
                ['message'=>'Not Authorized'],
                $status = 403,
                $headers = ['content-type' => 'application/Json'],
                $context = []
            );
        }
    }
}
