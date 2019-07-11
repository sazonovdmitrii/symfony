<?php

namespace App\Repository;

use App\Entity\Courier;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Courier|null find($id, $lockMode = null, $lockVersion = null)
 * @method Courier|null findOneBy(array $criteria, array $orderBy = null)
 * @method Courier[]    findAll()
 * @method Courier[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CourierRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Courier::class);
    }

    /**
     * @param int $cityId
     * @return array|mixed
     */
    public function findByCityId(int $cityId)
    {
        return $this
            ->createQueryBuilder('p')
            ->join('p.city', 'c')
            ->where('c.id = :city_id')
            ->setParameter('city_id', $cityId)
            ->getQuery()
            ->getResult();
    }
}
