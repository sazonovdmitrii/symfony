<?php

namespace App\Repository;

use App\Entity\ImportQueue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ImportQueue|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImportQueue|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImportQueue[]    findAll()
 * @method ImportQueue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImportQueueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ImportQueue::class);
    }

    // /**
    //  * @return ImportQueue[] Returns an array of ImportQueue objects
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
    public function findOneBySomeField($value): ?ImportQueue
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */

    public function flushAll()
    {
        return $this->_em
            ->createQuery('DELETE FROM ' . $this->_entityName)
            ->execute();
    }
}
