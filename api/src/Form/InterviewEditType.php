<?php

namespace App\Form;

use App\Entity\Tag;
use App\Entity\Interview;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;

class InterviewEditType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
     
            ->add('title')
            ->add('context')
            ->add('location')
            ->add('language')
            ->add('openLicence')
            ->add('isPublished')
            ->add('date')
            //->add('coordinates')
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
