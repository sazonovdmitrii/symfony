<?php
namespace App\Service;

use App\Entity\ProductTagItem;

class AdminTagService extends TagService
{
    private $tags = [];

    public function getTags()
    {
        return $this->tags;
    }

    public function setTags($tags)
    {
        $this->tags = $tags;
        return $this;
    }

    public function parseRequest($request)
    {
        $result = [];
        foreach($request as $key => $value) {
            if (strpos($key, 'tag_') !== false && $value) {
                $result[str_replace('tag_', '', $key)] = $value;
            }
        }
        return $result;
    }

    public function update()
    {
        $doctrine = $this->getDoctrine();

        $manager = $doctrine->getManager();

        foreach($this->getEntity()->getProductTagItems() as $productTagItem) {
            $this->getEntity()->removeProductTagItem($productTagItem);
        }

        foreach($this->getTags() as $tagId => $tagValue) {
            $productTagItem = $this->em->getRepository('App:ProductTagItem')->find($tagValue);
            $this->getEntity()->addProductTagItem($productTagItem);
            $manager->persist($this->getEntity());
            $manager->flush();
        }
    }
}