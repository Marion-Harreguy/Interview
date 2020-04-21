<?php

namespace App\Repository;

use App\Entity\Interviewed;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Interviewed|null find($id, $lockMode = null, $lockVersion = null)
 * @method Interviewed|null findOneBy(array $criteria, array $orderBy = null)
 * @method Interviewed[]    findAll()
 * @method Interviewed[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class InterviewedRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Interviewed::class);
    }

    /*public function findInterviewed()
    {
        return $this->createQueryBuilder('i')
            ->select('i')
            ->getQuery()
            ->getResult()
        ;
    }*/

    // /**
    //  * @return Interviewed[] Returns an array of Interviewed objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Interviewed
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
