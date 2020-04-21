<?php

namespace App\Form;

use App\Entity\Interview;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;

class InterviewType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('title', null, [
                'constraints' => [new NotBlank, new NotNull()]
            ])
            ->add('context', null, [
                'constraints' => [new NotBlank, new NotNull()]
            ])
            ->add('localisation')
            ->add('language', null, [
                'constraints' => [new NotBlank, new NotNull()]
            ])
            ->add('openLicence')
            ->add('isPublished')
            // ->add('tags')
            // ->add('user')
            // ->add('interviewed')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Interview::class,
            'csrf_protection' => false,
        ]);
    }
}
