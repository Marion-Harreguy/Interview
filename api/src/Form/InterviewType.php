<?php

namespace App\Form;

use App\Entity\User;
use App\Entity\Interview;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class InterviewType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            //->add('id')
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
        //     ->add('date')
        //     ->add('tags')
        //     ->add('author', EntityType::class, [
        //    'class' => User::class,
        //    'label' => 'author',
        //    'mapped' => false,
        //     ] ) 
        //     ->add('interviewed')
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
