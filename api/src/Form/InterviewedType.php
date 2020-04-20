<?php

namespace App\Form;

use App\Entity\Interviewed;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InterviewedType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('firstname')
            ->add('lastname')
            ->add('email')
            // ->add('job')
            // ->add('city')
            // ->add('createdAt')
            // ->add('updatedAt')
            // ->add('interviews')
            // ->add('structure')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Interviewed::class,
            'csrf_protection' => false,
        ]);
    }
}
