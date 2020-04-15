<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
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
            // ->add('email', EmailType::class, ['constraints' => new NotBlank])
            ->add('password', RepeatedType::class, array(
                'type' => PasswordType::class,
                'constraints' => new NotBlank(),
                'invalid_message' => 'The password fields must match.',
                'first_options'  => array('label' => 'Password field is required'),
                'second_options' => array('label' => 'Confirm Password'),
                )
            )
            ->add('biography', null, ['required' => false])
            // ->add('createdAt')
            // ->add('updatedAt')
            // ->add('favorite')
            ->add('structures', null, ['required' => false])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
