<?php

namespace App\Form;

use App\Entity\Interviewed;
use Symfony\Component\Form\AbstractType;

use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\NotBlank;



class InterviewedType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder

            ->add('firstname', null, ['constraints' => new NotBlank])
            ->add('lastname', null, ['constraints' => new NotBlank])
            ->add('email', EmailType::class, ['constraints' => new Email])
            ->add('job', null, ['constraints' => new NotBlank])
            ->add('city', null, ['constraints' => new NotBlank])
            //->add('createdAt')
            //->add('updatedAt')
            //->add('interviews')
            //->add('structure')

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
