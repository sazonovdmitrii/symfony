<?php

namespace App\Repository;

use App\Entity\Basket;
use App\Entity\BasketItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Basket|null find($id, $lockMode = null, $lockVersion = null)
 * @method Basket|null findOneBy(array $criteria, array $orderBy = null)
 * @method Basket[]    findAll()
 * @method Basket[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BasketRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Basket::class);
    }

    /**
     * @param $productItem
     * @return $this
     */
    public function add($productItem)
    {
        $basketItem = new BasketItem();
        $basketItem->setProductItemId($productItem);
        $this->_em->persist($basketItem);
        $this->_em->flush();

        $basket = new Basket();
        $basket->addBasketItem($basketItem);
        $this->_em->persist($basket);
        $this->_em->flush();

        return [
            'id' => $basket->getId(),
            'items' => $basket->getBasketItems()
        ];
    }
    // /**
    //  * @return Basket[] Returns an array of Basket objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('b.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Basket
    {
        return $this->createQueryBuilder('b')
            ->andWhere('b.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
