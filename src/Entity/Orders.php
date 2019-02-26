<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\OrdersRepository")
 */
class Orders
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\PaymentMethod", inversedBy="orders")
     */
    private $payment_method_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Delivery", inversedBy="orders")
     */
    private $delivery_id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="orders")
     */
    private $user_id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Address", inversedBy="orders")
     */
    private $address_id;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaymentMethodId(): ?PaymentMethod
    {
        return $this->payment_method_id;
    }

    public function setPaymentMethodId(?PaymentMethod $payment_method_id): self
    {
        $this->payment_method_id = $payment_method_id;

        return $this;
    }

    public function getDeliveryId(): ?Delivery
    {
        return $this->delivery_id;
    }

    public function setDeliveryId(?Delivery $delivery_id): self
    {
        $this->delivery_id = $delivery_id;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getUserId(): ?Users
    {
        return $this->user_id;
    }

    public function setUserId(?Users $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getAddressId(): ?Address
    {
        return $this->address_id;
    }

    public function setAddressId(?Address $address_id): self
    {
        $this->address_id = $address_id;

        return $this;
    }
}
