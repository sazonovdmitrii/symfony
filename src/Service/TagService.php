<?php
namespace App\Service;
use App\Service\Manager\TagManager;

class TagService extends TagManager
{
    private $entityType;

    private $entity;

    private $tagId;

    public function getEntityType()
    {
        return $this->entityType;
    }

    public function setEntityType($entityType)
    {
        $reflection = new \ReflectionClass($entityType);
        $entityType = $reflection->getShortName();
        $this->entityType = $entityType;
        return $this;
    }

    public function getEntity()
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $this->entity = $entity;
        return $this;
    }

    public function getTagId()
    {
        return $this->tagId;
    }

    public function setTagId($tagId)
    {
        $this->tagId = $tagId;
        return $this;
    }
}