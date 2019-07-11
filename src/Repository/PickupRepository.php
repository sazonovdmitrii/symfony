<?php

namespace App\Repository;

use App\Entity\Pickup;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Pickup|null find($id, $lockMode = null, $lockVersion = null)
 * @method Pickup|null findOneBy(array $criteria, array $orderBy = null)
 * @method Pickup[]    findAll()
 * @method Pickup[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PickupRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Pickup::class);
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
