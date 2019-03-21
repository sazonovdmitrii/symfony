<?php

namespace App\Repository;

use App\Entity\ImportProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ImportProduct|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImportProduct|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImportProduct[]    findAll()
 * @method ImportProduct[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImportProductRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ImportProduct::class);
    }

    // /**
    //  * @return ImportProduct[] Returns an array of ImportProduct objects
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
    public function findOneBySomeField($value): ?ImportProduct
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
