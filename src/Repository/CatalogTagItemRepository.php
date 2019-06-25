<?php

namespace App\Repository;

use App\Entity\CatalogTagItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CatalogTagItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method CatalogTagItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method CatalogTagItem[]    findAll()
 * @method CatalogTagItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CatalogTagItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CatalogTagItem::class);
    }

    // /**
    //  * @return CatalogTagItem[] Returns an array of CatalogTagItem objects
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
    public function findOneBySomeField($value): ?CatalogTagItem
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
