<?php
namespace App\Service;
use App\Service\Manager\TagManager;

class TagService extends TagManager
{
    private $entity;

    public function getEntity()
    {
        return $this->entity;
    }

    public function setEntity($entity)
    {
        $reflection = new \ReflectionClass($entity);
        $entity = $reflection->getShortName();
        $this->entity = $entity;
        return $this;
    }
}