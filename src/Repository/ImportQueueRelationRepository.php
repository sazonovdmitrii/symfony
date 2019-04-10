<?php

namespace App\Repository;

use App\Entity\ImportQueueRelation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ImportQueueRelation|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImportQueueRelation|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImportQueueRelation[]    findAll()
 * @method ImportQueueRelation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImportQueueRelationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ImportQueueRelation::class);
    }

    // /**
    //  * @return ImportQueueRelation[] Returns an array of ImportQueueRelation objects
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
    public function findOneBySomeField($value): ?ImportQueueRelation
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
