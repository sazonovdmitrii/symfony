<?php

namespace App\Repository;

use App\Entity\ProductUrl;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ProductUrl|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductUrl|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductUrl[]    findAll()
 * @method ProductUrl[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductUrlRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ProductUrl::class);
    }

    // /**
    //  * @return ProductUrl[] Returns an array of ProductUrl objects
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
    public function findOneBySomeField($value): ?ProductUrl
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