<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Structure;
use App\Form\StructureType;
use App\Form\UserType;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\SerializerInterface;


class LoginController extends AbstractController
{

    /**
     * @Route("/login", name="login", methods={"POST"})
     */
    public function login(Request $request, SerializerInterface $serializer )
    {
         // On vérifie si l'on a une requête XMLHttpRequest
      
        $user = $this->getUser();

        $data = $serializer->normalize($user, null, ['groups' => ['user']]);

        return $this->json(
            $data,
            $status = 200,
            $headers = [
                'content-type' => 'application/Json',
                'Access-Control-Allow-Origin' => 'http://54.164.153.184',
                ],
            $context = []
        );
    

        // return $this->json([
        //     'token' => $user->getApiToken(),
        //     'username' => $user->getUsername(),
        //     'roles' => $user->getRoles(),
        // ]);
    }
    
    /**
     * @Route("/register", name="register", methods={"POST"})
     */
    public function register(Request $request, EntityManagerInterface $em, UserPasswordEncoderInterface $passwordEncoder)
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $formUser = $this->createForm(UserType::class, $user);
        $formUser->submit($data["user"]);

        if(($formUser->isSubmitted() && $formUser->isValid())) {
              
            $user->setPassword($passwordEncoder->encodePassword($user, $data["user"]["password"]));
            $user->setRoles(['ROLE_USER']);
            $user->setApiToken(md5(uniqid(rand(), true)));

        if(!empty($data["structure"])) {
    
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

        return $this->json(['User added'], $status = 201, $headers = ['content-type' => 'application/Json'], $context = []);

        }

        $errorsEmail = $formUser["email"]->getErrors();
        /*$errorsMessage = $errorsEmail->getMessageParameters();
        dd($errorsMessage);*/
        
        // for ($errorIndex=0; $errorIndex < $errorsEmail->count() ; $errorIndex++) { 
        //     $message = $errorsEmail->getMessage();
        // }
        // $message = $this->getMessage($errorsEmail);
        //dd($errorsEmail->count(), $message);
            
        // Todo : trouvez comment récuperer le message d'erreurs

        if($errorsEmail->count() > 0){
            return $this->json(['Email taken'], $status = 400, $headers = ['content-type' => 'application/Json'], $context = []);
        }

        return $this->json(['Not ok'], $status = 500, $headers = ['content-type' => 'application/Json'], $context = []);
    }

}