<?php
namespace App\Service\Manager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Redis;
use Doctrine\ORM\EntityManager;
use App\Entity\ProductTag;

class TagManager extends AbstractController
{
    private $redis;

    public function __construct(
        Redis $redis,
        EntityManager $em
    ) {
        $this->em = $em;
        $this->redis = $redis;
    }

    public function getFilters()
    {
        $method = 'get' . $this->getEntity() . 'Filters';
        if (method_exists($this, $method)) {
            return $this->$method();
        }
        return [];
    }

    public function getProductTagFilters()
    {
        $allTags = $this->em
            ->getRepository(ProductTag::class)
            ->findAll();

        $tags = [];

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
}