<?php

namespace App\Repository;

use App\Entity\Basket;
use App\Entity\BasketItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Config\Definition\Exception\Exception;

/**
 * @method Basket|null find($id, $lockMode = null, $lockVersion = null)
 * @method Basket|null findOneBy(array $criteria, array $orderBy = null)
 * @method Basket[]    findAll()
 * @method Basket[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BasketRepository extends ServiceEntityRepository
{
    private $productItem;
    private $qty;

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Basket::class);
    }

    /**
     * @return array
     */
    public function add()
    {
        if($this->getProductItem() && $this->getQty()) {
            $basketItem = new BasketItem();
            $basketItem->setProductItemId($this->getProductItem());
            $basketItem->setQty($this->getQty());
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
        throw new Exception('Not available product or qty');
    }

    /**
     * @param $productItem
     * @return $this
     */
    public function setProductItem($productItem)
    {
        $this->productItem = $productItem;
        return $this;
    }

    /**
     * @param $qty
     * @return $this
     */
    public function setQty($qty)
    {
        $this->qty = $qty;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getProductItem()
    {
        return $this->productItem;
    }

    /**
     * @return mixed
     */
    public function getQty()
    {
        return $this->qty;
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
