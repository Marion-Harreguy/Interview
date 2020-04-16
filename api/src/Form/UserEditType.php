<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

class UserEditType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname')
            ->add('lastname')
            // ->add('email')
            //->add('password', null, ['constraints' => new NotBlank])
            // ->add('roles')
            ->add('biography')
            // ->add('createdAt')
            // ->add('updatedAt')
            // ->add('apiToken')
            // ->add('favorite')
            // ->add('structures')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'csrf_protection' => false,  
        ]);
    }
}
