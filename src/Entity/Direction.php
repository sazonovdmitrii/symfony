<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DirectionRepository")
 */
class Direction
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $avarda_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $price;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $delivery_days;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $comment;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Pickup", mappedBy="direction")
     */
    private $pickups;

    public function __construct()
    {
        $this->pickups = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAvardaId(): ?int
    {
        return $this->avarda_id;
    }

    public function setAvardaId(?int $avarda_id): self
    {
        $this->avarda_id = $avarda_id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getDeliveryDays(): ?int
    {
        return $this->delivery_days;
    }

    public function setDeliveryDays(?int $delivery_days): self
    {
        $this->delivery_days = $delivery_days;

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

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): self
    {
        $this->comment = $comment;

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
            $pickup->setDirection($this);
        }

        return $this;
    }

    public function removePickup(Pickup $pickup): self
    {
        if ($this->pickups->contains($pickup)) {
            $this->pickups->removeElement($pickup);
            // set the owning side to null (unless already changed)
            if ($pickup->getDirection() === $this) {
                $pickup->setDirection(null);
            }
        }

        return $this;
    }
}
