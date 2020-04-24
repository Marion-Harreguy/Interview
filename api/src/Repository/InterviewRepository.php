<?php

namespace App\Repository;

use App\Entity\Interview;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Interview|null find($id, $lockMode = null, $lockVersion = null)
 * @method Interview|null findOneBy(array $criteria, array $orderBy = null)
 * @method Interview[]    findAll()
 * @method Interview[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InterviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Interview::class);
    }

    /**
      * @return Interview[] Returns an array of Interview objects
    */
    public function findAllPublished()
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.isPublished = :val')
            ->setParameter('val', true)
            ->orderBy('i.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function findWithCrit($title, $date, $city, $language)
    {
        if($title === ''){
            $titleSql = "i.title != :title";
        }else {
            $titleSql = "i.title LIKE :title";
        }
        if($date === ''){
            $dateSql = "i.title != :title";
        }else {
            $dateSql = "i.title LIKE :title";
        }
        if($city === ''){
            $citySql = "i.location != :location";
        }else {
            $citySql = "i.location = :location";
        }
        if($language === ''){
            $languageSql = "i.language != :language";
        }else {
            $languageSql = "i.language = :language";
        }



        return $this->createQueryBuilder('i')
            
            ->Where('i.isPublished = :val')
            ->setParameter('val', true)
            
            ->andWhere($citySql)
            ->andWhere($languageSql)
            ->andWhere( $titleSql )
        

            ->setParameter(':location', $city)
            ->setParameter(':language', $language)
            ->setParameter(':title', $title)
         

            ->getQuery()
            ->getResult()
            ;
       
    }
    
}
