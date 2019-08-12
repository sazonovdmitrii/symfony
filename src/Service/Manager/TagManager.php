<?php
namespace App\Service\Manager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Redis;
use Doctrine\ORM\EntityManager;
use App\Entity\ProductTag;
use App\Entity\ProductTagItem;
use App\Service\DoctrineService;

class TagManager extends AbstractController
{
    private $redis;

    private $doctrineService;

    public function __construct(
        Redis $redis,
        EntityManager $em,
        DoctrineService $doctrineService
    ) {
        $this->em = $em;
        $this->redis = $redis;
        $this->doctrineService = $doctrineService;
    }

    public function getFilters()
    {
        $method = 'get' . $this->getEntityType() . 'Filters';
        $cacheKey = $method . $this->getEntity()->getId();

        $cacheItem = json_decode($this->redis->get($cacheKey));
        if(!$cacheItem) {
            if (method_exists($this, $method)) {
                $cacheItem = $this->$method();
                $this->redis->set($cacheKey, json_encode($cacheItem));
                return $cacheItem;
            }
        }
        return $cacheItem;
    }

    public function getCatalogFilters()
    {
        $allTags = $this->em
            ->getRepository(ProductTag::class)
            ->findAll();

        $tags = [];
        $productTags = [];

        foreach($this->getEntity()->getProducts() as $product) {
            foreach($product->getProducttagitem() as $productTag) {
                $tagId = $productTag->getId();
                if(isset($productTags[$tagId])) {
                    $productTags[$tagId] += 1;
                } else {
                    $productTags[$tagId] = 1;
                }
            }
        }
        foreach($allTags as $allTag) {
            $tag = [
                'name' => $allTag->getName(),
                'id' => $allTag->getId()
            ];
            $tagChildrens = [];
            foreach($allTag->getProductTagItems() as $productTagItem) {
                $count = 0;
                if(isset($productTags[$productTagItem->getId()])) {
                    $count = $productTags[$productTagItem->getId()];
                }
                $tagChildrens[] = [
                    'name' => $productTagItem->getName(),
                    'id' => $productTagItem->getId(),
                    'count' => $count
                ];
            }
            $tag['childrens'] = $tagChildrens;
            $tags[] = $tag;
        }
        return $tags;
    }

    public function getProductFilters()
    {
        $productTags = [];
        foreach($this->getEntity()->getProducttagitem() as $productTag) {
            $productTags[] = $productTag->getId();
        }

        $tagsItems = $this->em->getRepository(ProductTagItem::class)
            ->findBy( ['id' => $productTags], ['id' => 'DESC'] );

        $tags = [];
        foreach($tagsItems as $tag) {
            if($tag->getName()) {
                $tags[] = [
                    'name' => $tag->getEntityId()->getName(),
                    'value' => $tag->getName()
                ];
            }
        }

        return $tags;
    }
}