<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CityRepository")
 */
class City
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
    private $title;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $latitude;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $short_title;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Region", inversedBy="cities")
     */
    private $region;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Pickup", mappedBy="city")
     */
    private $pickups;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\District", inversedBy="cities")
     */
    private $district;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $fias_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $kladr_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Courier", mappedBy="city")
     */
    private $couriers;

    public function __construct()
    {
        $this->pickups = new ArrayCollection();
        $this->couriers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

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

    public function getShortTitle(): ?string
    {
        return $this->short_title;
    }

    public function setShortTitle(?string $short_title): self
    {
        $this->short_title = $short_title;

        return $this;
    }

    public function getRegion(): ?Region
    {
        return $this->region;
    }

    public function setRegion(?Region $region): self
    {
        $this->region = $region;

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
            $pickup->setCity($this);
        }

        return $this;
    }

    public function removePickup(Pickup $pickup): self
    {
        if ($this->pickups->contains($pickup)) {
            $this->pickups->removeElement($pickup);
            // set the owning side to null (unless already changed)
            if ($pickup->getCity() === $this) {
                $pickup->setCity(null);
            }
        }

        return $this;
    }

    public function getDistrict(): ?District
    {
        return $this->district;
    }

    public function setDistrict(?District $district): self
    {
        $this->district = $district;

        return $this;
    }

    public function getFiasId(): ?string
    {
        return $this->fias_id;
    }

    public function setFiasId(?string $fias_id): self
    {
        $this->fias_id = $fias_id;

        return $this;
    }

    public function getKladrId(): ?string
    {
        return $this->kladr_id;
    }

    public function setKladrId(?string $kladr_id): self
    {
        $this->kladr_id = $kladr_id;

        return $this;
    }

    public function __toString()
    {
        return 'City';
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
            $courier->setCity($this);
        }

        return $this;
    }

    public function removeCourier(Courier $courier): self
    {
        if ($this->couriers->contains($courier)) {
            $this->couriers->removeElement($courier);
            // set the owning side to null (unless already changed)
            if ($courier->getCity() === $this) {
                $courier->setCity(null);
            }
        }

        return $this;
    }
}
