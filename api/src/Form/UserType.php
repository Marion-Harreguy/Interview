<?php

namespace App\Form;

use App\Entity\Structure;
use App\Entity\User;
use App\Form\StructureType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Email;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
        ->add('firstname', null, ['constraints' => new NotBlank])
        ->add('lastname', null, ['constraints' => new NotBlank])
        ->add('email', EmailType::class, ['constraints' => [
                new Email,
                new NotBlank,
            ],
        ])
        ->add('password', PasswordType::class, ['constraints' => new NotBlank])
            //'type' => PasswordType::class,
            // 'constraints' => new NotBlank(),
            //'invalid_message' => 'The password fields must match.',
            //'first_options'  => array('label' => 'Password field is required'),
            //'second_options' => array('label' => 'Confirm Password'),
            //'mapped'=> false,
        ->add('biography', null, ['required' => false])
        ->add('status', null, ['constraints' => new NotBlank()]);
        // ->add('createdAt')
        // ->add('updatedAt')
        // ->add('favorite')
        /*->add('structures', CollectionType::class, [
            'entry_type' => StructureType::class,
            'entry_options' => ['label' => false],
            'mapped' => false,
        ])*/
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class, 
            'csrf_protection' => false,        
        ]);
    }
}
