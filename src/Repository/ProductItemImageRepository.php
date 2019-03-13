<?php

namespace App\Repository;

use App\Entity\ProductItemImage;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductItemImage|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductItemImage|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductItemImage[]    findAll()
 * @method ProductItemImage[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductItemImageRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductItemImage::class);
    }

    // /**
    //  * @return ProductItemImage[] Returns an array of ProductItemImage objects
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
    public function findOneBySomeField($value): ?ProductItemImage
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
