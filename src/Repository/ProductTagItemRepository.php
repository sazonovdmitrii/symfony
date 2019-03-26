<?php

namespace App\Repository;

use App\Entity\ProductTagItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductTagItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductTagItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductTagItem[]    findAll()
 * @method ProductTagItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductTagItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductTagItem::class);
    }

    // /**
    //  * @return ProductTagItem[] Returns an array of ProductTagItem objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ProductTagItem
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
