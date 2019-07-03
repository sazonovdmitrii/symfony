<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrderItemRepository")
 */
class OrderItem
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\ProductItem", inversedBy="orderItems")
     */
    private $item;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $qty;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Orders", inversedBy="orderItems")
     */
    private $entity;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getItem(): ?ProductItem
    {
        return $this->item;
    }

    public function setItem(?ProductItem $item): self
    {
        $this->item = $item;

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

    public function getEntity(): ?Orders
    {
        return $this->entity;
    }

    public function setEntity(?Orders $entity): self
    {
        $this->entity = $entity;

        return $this;
    }

    public function __toString()
    {
        return self::class;
    }
}
