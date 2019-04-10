<?php

namespace App\Repository;

use App\Entity\ImportRelation;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ImportRelation|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImportRelation|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImportRelation[]    findAll()
 * @method ImportRelation[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImportRelationRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ImportRelation::class);
    }

    // /**
    //  * @return ImportRelation[] Returns an array of ImportRelation objects
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
    public function findOneBySomeField($value): ?ImportRelation
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
