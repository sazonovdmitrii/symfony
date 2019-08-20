<?php

namespace App\Repository;

use App\Entity\ProductTagItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Doctrine\ORM\EntityManager;
/**
 * @method ProductTagItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductTagItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductTagItem[]    findAll()
 * @method ProductTagItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductTagItemRepository extends ServiceEntityRepository
{
    const SIMILAR_LIMIT = 10;
    private $em;

    public function __construct(
        RegistryInterface $registry,
        EntityManager $entityManager
    ) {
        $this->em = $entityManager;
        parent::__construct($registry, ProductTagItem::class);
    }

    public function findBySlug(string $slug)
    {
        $tag = $this->findBy( ['slug' => $slug] );
        if(count($tag)) {
            return $tag[0];
        }
        return false;
    }

    public function getProducts($tagsIds, $extraTagsIds)
    {
        //*TODO* first_tag and second_tag to right configuration order
        $statement = $this->_getConnection()->prepare('
            SELECT product_id FROM product_producttagitem WHERE producttagitem_id = :first_tag AND product_id IN (
                SELECT product_id FROM product_producttagitem WHERE producttagitem_id = :second_tag
            )
        ');
        $statement->bindValue('first_tag', $tagsIds[0]);
        $statement->bindValue('second_tag', $tagsIds[1]);
        $statement->execute();

        $requiredProductsIds = array_map(function($e) {
            return $e['product_id'];
        }, $statement->fetchAll());

        $previousStepProducts = [];

        foreach($extraTagsIds as $extraTagsId) {
            $extraProducts = $this->_getExtraProducts($extraTagsId, $requiredProductsIds);
            $previousStepProducts = $extraProducts;
            if(count($extraProducts) && count($extraProducts) >= self::SIMILAR_LIMIT) {
                $requiredProductsIds = array_map(function($e) {
                    return $e['product_id'];
                    }, $extraProducts);
            } else {
                break;
            }
        }
        if(!count($previousStepProducts)) {
            return [];
        }
        return array_map(function($e) {
            return $e['product_id'];
        }, $previousStepProducts);
    }

    private function _getExtraProducts($tagId, $productsIds)
    {
        $productsIds = implode(',', $productsIds);

        $statement = $this->_getConnection()->prepare(
            'SELECT product_id FROM product_producttagitem WHERE producttagitem_id = :tag_id AND product_id IN (' . $productsIds. ')'
        );
        $statement->bindValue('tag_id', $tagId);
        $statement->execute();

        return $statement->fetchAll();
    }

    private function _getConnection()
    {
        return $this->em->getConnection();
    }
    // /**
    //  * @return ProductTagItem[] Returns an array of ProductTagItem objects
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
    public function findOneBySomeField($value): ?ProductTagItem
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
