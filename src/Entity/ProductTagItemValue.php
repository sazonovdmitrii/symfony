<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductTagItemValueRepository")
 */
class ProductTagItemValue
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\ProductTagItem", cascade={"persist", "remove"})
     */
    private $tag_item_id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\ProductItem", cascade={"persist", "remove"})
     */
    private $product_item_id;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTagItemId(): ?ProductTagItem
    {
        return $this->tag_item_id;
    }

    public function setTagItemId(?ProductTagItem $tag_item_id): self
    {
        $this->tag_item_id = $tag_item_id;

        return $this;
    }

    public function getProductItemId(): ?ProductItem
    {
        return $this->product_item_id;
    }

    public function setProductItemId(?ProductItem $product_item_id): self
    {
        $this->product_item_id = $product_item_id;

        return $this;
    }
}
