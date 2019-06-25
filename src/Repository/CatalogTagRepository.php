<?php

namespace App\Repository;

use App\Entity\CatalogTag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CatalogTag|null find($id, $lockMode = null, $lockVersion = null)
 * @method CatalogTag|null findOneBy(array $criteria, array $orderBy = null)
 * @method CatalogTag[]    findAll()
 * @method CatalogTag[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CatalogTagRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CatalogTag::class);
    }

    // /**
    //  * @return CatalogTag[] Returns an array of CatalogTag objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CatalogTag
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
