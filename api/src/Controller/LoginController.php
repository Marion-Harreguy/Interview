<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\UserType;
use App\Entity\Structure;
use App\Form\StructureType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class LoginController extends AbstractController
{

    // /**
    //  * @Route("/login", name="login", methods={"POST"})
    //  */
    // public function login(Request $request, SerializerInterface $serializer, UserRepository $userRepository )
    // {
    //    $data = json_decode($request->getContent(), true);
       
    //     $user = $userRepository->findOneBy(["email" => $data["username"] ]);
    //     $data = $serializer->normalize($user, null, ['groups' => ['user']]);

    //     return $this->json(
    //         $data,
    //         $status = 200,
    //         $headers = ['content-type' => 'application/Json'],
    //         $context = []
    //     );
    

    //     // return $this->json([
    //     //     'token' => $user->getApiToken(),
    //     //     'username' => $user->getUsername(),
    //     //     'roles' => $user->getRoles(),
    //     // ]);
    // }
    
    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(AuthenticationUtils $authenticationUtils, Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder, SerializerInterface $serializer)
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $formUser = $this->createForm(UserType::class, $user);
        $formUser->submit($data["user"]);

        if(($formUser->isSubmitted() && $formUser->isValid())) {
              
            $user->setPassword($passwordEncoder->encodePassword($user, $data["user"]["password"]));
            $user->setRoles(['ROLE_USER']);
       

        if(!empty($data["structure"]["name"])) {
    
           
            $structure = new Structure();
            $formStructure = $this->createForm(StructureType::class, $structure);
            $formStructure->submit($data["structure"]);

           if(($formStructure->isSubmitted() && $formStructure->isValid())) {
                $em->persist($structure);
                $user->addStructure($structure);
            }
        }

        $em->persist($user);
        $em->flush();

   
        return $this->json([], $status = 201, $headers = ['content-type' => 'application/Json'], $context = []);
        }

        $errorsEmail = $formUser["email"]->getErrors();

        if($errorsEmail->count() > 0){
            return $this->json(['Email taken'], $status = 403, $headers = ['content-type' => 'application/Json'], $context = []);
        }

        return $this->json(['error message' => 'serveur down - contact Admin'], $status = 500, $headers = ['content-type' => 'application/Json'], $context = []);
    }

}