<?php

namespace App\Repository;

use App\Entity\CatalogUrl;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CatalogUrl|null find($id, $lockMode = null, $lockVersion = null)
 * @method CatalogUrl|null findOneBy(array $criteria, array $orderBy = null)
 * @method CatalogUrl[]    findAll()
 * @method CatalogUrl[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CatalogUrlRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CatalogUrl::class);
    }

    public function findByUrl(string $url)
    {
        $result = $this->createQueryBuilder('u')
            ->where('u.url = :url')
            ->setParameter('url', $url)
            ->getQuery();
        $result = $result->getResult();
        return (isset($result[0])) ? $result[0] : false;
    }

    // /**
    //  * @return CatalogUrl[] Returns an array of CatalogUrl objects
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
    public function findOneBySomeField($value): ?CatalogUrl
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
