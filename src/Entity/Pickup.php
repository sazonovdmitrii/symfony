<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PickupRepository")
 */
class Pickup
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Direction", inversedBy="pickups")
     */
    private $direction;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $direction_title;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\City", inversedBy="pickups")
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city_title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city_short_title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city_latitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city_longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city_kladr;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $city_fias;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $post_code;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $address;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $price;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $price_source;

    /**
     * @ORM\Column(type="float")
     */
    private $latitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $phones;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $schedule;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $delivery_days;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $delivery_days_source;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $min_order_sum;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $retail;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $pvz_id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $pvz_title;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $comment;

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

    public function getDirection(): ?Direction
    {
        return $this->direction;
    }

    public function setDirection(?Direction $direction): self
    {
        $this->direction = $direction;

        return $this;
    }

    public function getDirectionTitle(): ?string
    {
        return $this->direction_title;
    }

    public function setDirectionTitle(?string $direction_title): self
    {
        $this->direction_title = $direction_title;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getCityTitle(): ?string
    {
        return $this->city_title;
    }

    public function setCityTitle(?string $city_title): self
    {
        $this->city_title = $city_title;

        return $this;
    }

    public function getCityShortTitle(): ?string
    {
        return $this->city_short_title;
    }

    public function setCityShortTitle(?string $city_short_title): self
    {
        $this->city_short_title = $city_short_title;

        return $this;
    }

    public function getCityLatitude(): ?string
    {
        return $this->city_latitude;
    }

    public function setCityLatitude(?string $city_latitude): self
    {
        $this->city_latitude = $city_latitude;

        return $this;
    }

    public function getCityLongitude(): ?string
    {
        return $this->city_longitude;
    }

    public function setCityLongitude(?string $city_longitude): self
    {
        $this->city_longitude = $city_longitude;

        return $this;
    }

    public function getCityKladr(): ?string
    {
        return $this->city_kladr;
    }

    public function setCityKladr(?string $city_kladr): self
    {
        $this->city_kladr = $city_kladr;

        return $this;
    }

    public function getCityFias(): ?string
    {
        return $this->city_fias;
    }

    public function setCityFias(?string $city_fias): self
    {
        $this->city_fias = $city_fias;

        return $this;
    }

    public function getPostCode(): ?int
    {
        return $this->post_code;
    }

    public function setPostCode(?int $post_code): self
    {
        $this->post_code = $post_code;

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
    
    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): self
    {
        $this->price = $price;

        return $this;
    }

    public function getPriceSource(): ?string
    {
        return $this->price_source;
    }

    public function setPriceSource(?string $price_source): self
    {
        $this->price_source = $price_source;

        return $this;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(float $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getPhones(): ?string
    {
        return $this->phones;
    }

    public function setPhones(?string $phones): self
    {
        $this->phones = $phones;

        return $this;
    }

    public function getSchedule(): ?string
    {
        return $this->schedule;
    }

    public function setSchedule(?string $schedule): self
    {
        $this->schedule = $schedule;

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

    public function getDeliveryDaysSource(): ?string
    {
        return $this->delivery_days_source;
    }

    public function setDeliveryDaysSource(?string $delivery_days_source): self
    {
        $this->delivery_days_source = $delivery_days_source;

        return $this;
    }

    public function getMinOrderSum(): ?float
    {
        return $this->min_order_sum;
    }

    public function setMinOrderSum(?float $min_order_sum): self
    {
        $this->min_order_sum = $min_order_sum;

        return $this;
    }

    public function getRetail(): ?bool
    {
        return $this->retail;
    }

    public function setRetail(?bool $retail): self
    {
        $this->retail = $retail;

        return $this;
    }

    public function getPvzId(): ?string
    {
        return $this->pvz_id;
    }

    public function setPvzId(string $pvz_id): self
    {
        $this->pvz_id = $pvz_id;

        return $this;
    }

    public function getPvzTitle(): ?string
    {
        return $this->pvz_title;
    }

    public function setPvzTitle(?string $pvz_title): self
    {
        $this->pvz_title = $pvz_title;

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
}
