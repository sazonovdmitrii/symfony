<?php

namespace App\Repository;

use App\Entity\ProductTagValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductTagValue|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductTagValue|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductTagValue[]    findAll()
 * @method ProductTagValue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductTagValueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductTagValue::class);
    }

    // /**
    //  * @return ProductTagValue[] Returns an array of ProductTagValue objects
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
    public function findOneBySomeField($value): ?ProductTagValue
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
