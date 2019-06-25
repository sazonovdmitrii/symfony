<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CatalogTagItemValueRepository")
 */
class CatalogTagItemValue
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\CatalogTagItem", cascade={"persist", "remove"})
     */
    private $tag_item;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Catalog", cascade={"persist", "remove"})
     */
    private $catalog_item;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTagItem(): ?CatalogTagItem
    {
        return $this->tag_item;
    }

    public function setTagItem(?CatalogTagItem $tag_item): self
    {
        $this->tag_item = $tag_item;

        return $this;
    }

    public function getCatalogItem(): ?Catalog
    {
        return $this->catalog_item;
    }

    public function setCatalogItem(?Catalog $catalog_item): self
    {
        $this->catalog_item = $catalog_item;

        return $this;
    }
}
