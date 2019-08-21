<?php

namespace App\Service\Manager;

use App\Entity\Catalog;
use App\Entity\ProductTag;
use App\Entity\ProductTagItem;
use App\Service\DoctrineService;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\ConfigService;
use App\Entity\Product;

class TagManager extends AbstractController
{
    private $redis;

    private $doctrineService;

    /**
     * TagManager constructor.
     *
     * @param Redis $redis
     * @param EntityManager $em
     * @param DoctrineService $doctrineService
     * @param ConfigService $configService
     */
    public function __construct(
        Redis $redis,
        EntityManager $em,
        DoctrineService $doctrineService,
        ConfigService $configService
    ) {
        $this->em              = $em;
        $this->redis           = $redis;
        $this->doctrineService = $doctrineService;
        $this->configService = $configService;
    }

    /**
     * @return array|mixed|object
     */
    public function getFilters()
    {
        $method   = 'get' . $this->getEntityType() . 'Filters';
        $cacheKey = $method . $this->getEntity()->getId();

        $cacheItem = json_decode($this->redis->get($cacheKey));
        if (!$cacheItem) {
            if (method_exists($this, $method)) {
                $cacheItem = $this->$method();
                $this->redis->set($cacheKey, json_encode($cacheItem));
                return $cacheItem;
            }
        }
        return $cacheItem;
    }

    /**
     * @return array
     */
    public function getCatalogFilters()
    {
        $allTags = $this->em
            ->getRepository(ProductTag::class)
            ->findAll();

        $tags        = [];
        $productTags = [];

        foreach ($this->getEntity()->getProducts() as $product) {
            foreach ($product->getProducttagitem() as $productTag) {
                $tagId = $productTag->getId();
                if (isset($productTags[$tagId])) {
                    $productTags[$tagId] += 1;
                } else {
                    $productTags[$tagId] = 1;
                }
            }
        }
        foreach ($allTags as $allTag) {
            $tag          = [
                'name' => $allTag->getName(),
                'id'   => $allTag->getId()
            ];
            $tagChildrens = [];
            foreach ($allTag->getProductTagItems() as $productTagItem) {
                $count = 0;
                if (isset($productTags[$productTagItem->getId()])) {
                    $count = $productTags[$productTagItem->getId()];
                }
                $tagChildrens[] = [
                    'name'  => $productTagItem->getName(),
                    'id'    => $productTagItem->getId(),
                    'count' => $count
                ];
            }
            $tag['childrens'] = $tagChildrens;
            $tags[]           = $tag;
        }
        return $tags;
    }

    /**
     * @return array
     */
    public function getProductFilters()
    {
        $productTags = [];
        foreach ($this->getEntity()->getProducttagitem() as $productTag) {
            $productTags[] = $productTag->getId();
        }

        $tagsItems = $this->em->getRepository(ProductTagItem::class)
            ->findBy(['id' => $productTags], ['id' => 'DESC']);

        $tags = [];
        foreach ($tagsItems as $tag) {
            if ($tag->getName()) {
                $tags[] = [
                    'name'  => $tag->getEntityId()->getName(),
                    'value' => $tag->getName()
                ];
            }
        }

        return $tags;
    }

    /**
     * @return array
     */
    public function all()
    {
        $result = [];
        $tags   = $this->em
            ->getRepository(ProductTag::class)
            ->findAll();
        foreach ($tags as $tag) {
            $result[] = [
                'name' => $tag->getName(),
                'id'   => $tag->getId()
            ];
        }
        return $result;
    }

    /**
     * @return mixed
     */
    public function getOne()
    {
        if ($this->getEntity()) {
            $method = 'getOneFor' . $this->getEntityType();
            return $this->$method();
        }
    }

    /**
     * @return mixed
     */
    public function getOneForProduct()
    {
        return $this->getEntity()->getProducttagitem()->filter(function (ProductTagItem $productTagItem) {
            return $productTagItem->getEntityId()->getId() == $this->getTagId();
        }
        )->first();
    }

    /**
     * @return mixed
     */
    public function getOneForCatalog()
    {
        return $this->em
            ->getRepository(Catalog::class)
            ->findByTagId($this->getTagId());
    }

    /**
     * @return mixed
     */
    public function getMultiple()
    {
        if ($this->getEntity()) {
            $method = 'getMultipleFor' . $this->getEntityType();
            return $this->$method();
        }
    }

    /**
     * @return mixed
     */
    public function getMultipleForProduct()
    {
        return $this->getEntity()->getProducttagitem()->filter(function (ProductTagItem $productTagItem) {
            return in_array($productTagItem->getEntityId()->getId(), $this->getTagsIds());
        });
    }

    /**
     * @return mixed
     */
    public function similars()
    {
        $extraTagsIds = $this->_getExtraTagsIds();
        $requiredTagsIds = $this->_getRequiredTagsIds();

        $tagsIds = array_merge($extraTagsIds, $requiredTagsIds);

        $tagsItems = $this->setEntityType(Product::class)
            ->setEntity($this->getEntity())
            ->setTagsIds($tagsIds)
            ->getMultiple();

        $extraTagsItemsIds = $requiredTagsItemsIds = [];

        foreach($tagsItems as $tagsItem) {
            if(in_array($tagsItem->getEntityId()->getId(), $requiredTagsIds)) {
                $requiredTagsItemsIds[] = $tagsItem->getId();
            } else {
                $extraTagsItemsIds[] = $tagsItem->getId();
            }
        }

        return $this->setTagsIds($requiredTagsItemsIds)
            ->setExtraTagsIds($extraTagsItemsIds)
            ->getProducts();
    }

    /**
     * @return array
     */
    private function _getExtraTagsIds ()
    {
        return explode(
            ',', $this->configService->get('extra_tags_similar_products')
        );
    }

    /**
     * @return array
     */
    private function _getRequiredTagsIds ()
    {
        return explode(
            ',', $this->configService->get('required_tags_similar_products')
        );
    }

    /**
     * @return array|\object[]
     */
    public function getProducts()
    {
        $productsIds = $this->em->getRepository('App:ProductTagItem')
            ->getProducts($this->getTagsIds(), $this->getExtraTagsIds());

        return $this->em->getRepository('App:Product')
            ->findBy(['id' => $productsIds]);
    }

    /**
     * @return array|\object[]
     */
    public function getCatalogs()
    {
        return $this->em->getRepository('App:Catalog')
            ->getAllByParentTag($this->getParentTagId());
    }
}