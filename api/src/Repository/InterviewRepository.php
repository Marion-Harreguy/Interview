<?php

namespace App\Repository;

use App\Entity\Interview;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\Expr;
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

    public function findWithCrit($title, $city, $language, $openLicence, $yearBegin, $yearEnd)
    {
        if($title === ''){
            $titleSql = "i.title != :title";
        }else {
            $titleSql = "i.title LIKE :title";
        }
        /*if($date === ''){
            $dateSql = "i.date != :date";
        }else {
            $dateSql = "i.date LIKE :date";
        }*/
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
            ->Where('i.isPublished = :isPublished')
            ->setParameter('isPublished', true)
            
            ->andWhere( $citySql)
            ->andWhere( $languageSql)
            ->andWhere( $titleSql )
           // ->andWhere( $dateSql )
            ->andWhere( 'i.date BETWEEN :begin AND :end')
            ->andWhere( 'i.openLicence = :openLicence' )

            ->setParameter(':location', $city)
            ->setParameter(':language', $language)
            ->setParameter(':title', '%'.$title.'%')
            //->setParameter(':date', '%'.$date.'%')
            ->setParameter('begin', $yearBegin)
            ->setParameter('end', $yearEnd)
            ->setParameter('openLicence', $openLicence)


            ->orderBy('i.date', 'DESC')
            ->getQuery()
            ->getResult()
            ;
       
    }
    
}
