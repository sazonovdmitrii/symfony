<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\BasketItemRepository")
 */
class BasketItem
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Basket", inversedBy="basketItems")
     */
    private $basket_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProductItem", inversedBy="basketItems")
     */
    private $product_item_id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $qty;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBasketId(): ?Basket
    {
        return $this->basket_id;
    }

    public function setBasketId(?Basket $basket_id): self
    {
        $this->basket_id = $basket_id;

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

    public function getQty(): ?int
    {
        return $this->qty;
    }

    public function setQty(?int $qty): self
    {
        $this->qty = $qty;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }
}
