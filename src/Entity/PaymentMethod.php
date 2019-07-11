<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PaymentMethodRepository")
 */
class PaymentMethod
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
    private $name;

    /**
     * @ORM\Column(type="string", length=25, nullable=true)
     */
    private $code;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Orders", mappedBy="payment_method_id")
     */
    private $orders;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Pickup", mappedBy="payments_methods")
     */
    private $pickups;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Courier", mappedBy="payments_methods")
     */
    private $couriers;

    public function __construct()
    {
        $this->orders = new ArrayCollection();
        $this->pickups = new ArrayCollection();
        $this->couriers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(?string $code): self
    {
        $this->code = $code;

        return $this;
    }

    /**
     * @return Collection|Orders[]
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Orders $order): self
    {
        if (!$this->orders->contains($order)) {
            $this->orders[] = $order;
            $order->setPaymentMethodId($this);
        }

        return $this;
    }

    public function removeOrder(Orders $order): self
    {
        if ($this->orders->contains($order)) {
            $this->orders->removeElement($order);
            // set the owning side to null (unless already changed)
            if ($order->getPaymentMethodId() === $this) {
                $order->setPaymentMethodId(null);
            }
        }

        return $this;
    }

    public function getVisible(): ?bool
    {
        return $this->visible;
    }

    public function setVisible(?bool $visible): self
    {
        $this->visible = $visible;

        return $this;
    }

    /**
     * @return Collection|Pickup[]
     */
    public function getPickups(): Collection
    {
        return $this->pickups;
    }

    public function addPickup(Pickup $pickup): self
    {
        if (!$this->pickups->contains($pickup)) {
            $this->pickups[] = $pickup;
            $pickup->addPaymentsMethod($this);
        }

        return $this;
    }

    public function removePickup(Pickup $pickup): self
    {
        if ($this->pickups->contains($pickup)) {
            $this->pickups->removeElement($pickup);
            $pickup->removePaymentsMethod($this);
        }

        return $this;
    }

    /**
     * @return Collection|Courier[]
     */
    public function getCouriers(): Collection
    {
        return $this->couriers;
    }

    public function addCourier(Courier $courier): self
    {
        if (!$this->couriers->contains($courier)) {
            $this->couriers[] = $courier;
            $courier->addPaymentsMethod($this);
        }

        return $this;
    }

    public function removeCourier(Courier $courier): self
    {
        if ($this->couriers->contains($courier)) {
            $this->couriers->removeElement($courier);
            $courier->removePaymentsMethod($this);
        }

        return $this;
    }
}
