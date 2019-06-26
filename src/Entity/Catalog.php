<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CatalogRepository")
 */
class Catalog
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
    private $pid;

    /**
     * @ORM\Column(type="boolean")
     */
    private $visible;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="datetime")
     */
    private $updated;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $brand;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", mappedBy="catalogs")
     */
    private $products;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CatalogUrl", mappedBy="entity")
     */
    private $catalogUrls;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Sale", mappedBy="category")
     */
    private $sales;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\CatalogTag", mappedBy="entity")
     */
    private $catalogTags;

    public function __construct()
    {
        $this->products = new ArrayCollection();
        $this->catalogUrls = new ArrayCollection();
        $this->sales = new ArrayCollection();
        $this->catalogTags = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPid(): ?int
    {
        return $this->pid;
    }

    public function setPid(?int $pid): self
    {
        $this->pid = $pid;

        return $this;
    }

    public function getVisible(): ?bool
    {
        return $this->visible;
    }

    public function setVisible(bool $visible): self
    {
        $this->visible = $visible;

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

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    public function getBrand(): ?bool
    {
        return $this->brand;
    }

    public function setBrand(?bool $brand): self
    {
        $this->brand = $brand;

        return $this;
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

    /**
     * @return Collection|Product[]
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): self
    {
        if (!$this->products->contains($product)) {
            $this->products[] = $product;
            $product->addCatalog($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): self
    {
        if ($this->products->contains($product)) {
            $this->products->removeElement($product);
            $product->removeCatalog($this);
        }

        return $this;
    }

    public function __toString()
    {
        return $this->name;
    }

    /**
     * @return Collection|CatalogUrl[]
     */
    public function getCatalogUrls(): Collection
    {
        return $this->catalogUrls;
    }

    public function addCatalogUrl(CatalogUrl $catalogUrl): self
    {
        if (!$this->catalogUrls->contains($catalogUrl)) {
            $this->catalogUrls[] = $catalogUrl;
            $catalogUrl->setEntity($this);
        }

        return $this;
    }

    public function removeCatalogUrl(CatalogUrl $catalogUrl): self
    {
        if ($this->catalogUrls->contains($catalogUrl)) {
            $this->catalogUrls->removeElement($catalogUrl);
            // set the owning side to null (unless already changed)
            if ($catalogUrl->getEntity() === $this) {
                $catalogUrl->setEntity(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Sale[]
     */
    public function getSales(): Collection
    {
        return $this->sales;
    }

    public function addSale(Sale $sale): self
    {
        if (!$this->sales->contains($sale)) {
            $this->sales[] = $sale;
            $sale->setCategory($this);
        }

        return $this;
    }

    public function removeSale(Sale $sale): self
    {
        if ($this->sales->contains($sale)) {
            $this->sales->removeElement($sale);
            // set the owning side to null (unless already changed)
            if ($sale->getCategory() === $this) {
                $sale->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|CatalogTag[]
     */
    public function getCatalogTags(): Collection
    {
        return $this->catalogTags;
    }

    public function addCatalogTag(CatalogTag $catalogTag): self
    {
        if (!$this->catalogTags->contains($catalogTag)) {
            $this->catalogTags[] = $catalogTag;
            $catalogTag->addEntity($this);
        }

        return $this;
    }

    public function removeCatalogTag(CatalogTag $catalogTag): self
    {
        if ($this->catalogTags->contains($catalogTag)) {
            $this->catalogTags->removeElement($catalogTag);
            $catalogTag->removeEntity($this);
        }

        return $this;
    }
}
