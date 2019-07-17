<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserAddressRepository")
 */
class UserAddress
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Users", inversedBy="created")
     */
    private $entity;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $person;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $postcode;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Region", inversedBy="userAddresses")
     */
    private $region;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $street;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $kladr_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $fias_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $options;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEntity(): ?Users
    {
        return $this->entity;
    }

    public function setEntity(?Users $entity): self
    {
        $this->entity = $entity;

        return $this;
    }

    public function getPerson(): ?string
    {
        return $this->person;
    }

    public function setPerson(?string $person): self
    {
        $this->person = $person;

        return $this;
    }

    public function getPostcode(): ?string
    {
        return $this->postcode;
    }

    public function setPostcode(?string $postcode): self
    {
        $this->postcode = $postcode;

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

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(?string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getStreet(): ?string
    {
        return $this->street;
    }

    public function setStreet(?string $street): self
    {
        $this->street = $street;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(?string $address): self
    {
        $this->address = $address;

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

    public function getFiasId(): ?string
    {
        return $this->fias_id;
    }

    public function setFiasId(?string $fias_id): self
    {
        $this->fias_id = $fias_id;

        return $this;
    }

    public function getOptions(): ?string
    {
        return $this->options;
    }

    public function setOptions(?string $options): self
    {
        $this->options = $options;

        return $this;
    }
}
