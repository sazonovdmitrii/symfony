<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ImportRelationRepository")
 */
class ImportRelation
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $sku;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProductItem", inversedBy="importRelations")
     */
    private $entity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSku(): ?string
    {
        return $this->sku;
    }

    public function setSku(?string $sku): self
    {
        $this->sku = $sku;

        return $this;
    }

    public function getEntity(): ?ProductItem
    {
        return $this->entity;
    }

    public function setEntity(?ProductItem $entity): self
    {
        $this->entity = $entity;

        return $this;
    }
}
