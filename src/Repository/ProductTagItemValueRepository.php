<?php

namespace App\Repository;

use App\Entity\ProductTagItemValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductTagItemValue|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductTagItemValue|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductTagItemValue[]    findAll()
 * @method ProductTagItemValue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductTagItemValueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductTagItemValue::class);
    }

    // /**
    //  * @return ProductTagItemValue[] Returns an array of ProductTagItemValue objects
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
    public function findOneBySomeField($value): ?ProductTagItemValue
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
