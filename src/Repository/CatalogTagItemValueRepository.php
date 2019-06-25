<?php

namespace App\Repository;

use App\Entity\CatalogTagItemValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CatalogTagItemValue|null find($id, $lockMode = null, $lockVersion = null)
 * @method CatalogTagItemValue|null findOneBy(array $criteria, array $orderBy = null)
 * @method CatalogTagItemValue[]    findAll()
 * @method CatalogTagItemValue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CatalogTagItemValueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CatalogTagItemValue::class);
    }

    // /**
    //  * @return CatalogTagItemValue[] Returns an array of CatalogTagItemValue objects
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
    public function findOneBySomeField($value): ?CatalogTagItemValue
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
