<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductTagRepository")
 */
class ProductTag
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
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $type = [];

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $visible;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", inversedBy="productTags")
     */
    private $entity_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductTagItem", mappedBy="entity_id")
     */
    private $productTagItems;

    public function __construct()
    {
        $this->entity_id = new ArrayCollection();
        $this->productTagItems = new ArrayCollection();
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

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getType(): ?array
    {
        return $this->type;
    }

    public function setType(?array $type): self
    {
        $this->type = $type;

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
     * @return Collection|Product[]
     */
    public function getEntityId(): Collection
    {
        return $this->entity_id;
    }

    public function addEntityId(Product $entityId): self
    {
        if (!$this->entity_id->contains($entityId)) {
            $this->entity_id[] = $entityId;
        }

        return $this;
    }

    public function removeEntityId(Product $entityId): self
    {
        if ($this->entity_id->contains($entityId)) {
            $this->entity_id->removeElement($entityId);
        }

        return $this;
    }

    /**
     * @return Collection|ProductTagItem[]
     */
    public function getProductTagItems(): Collection
    {
        return $this->productTagItems;
    }

    public function addProductTagItem(ProductTagItem $productTagItem): self
    {
        if (!$this->productTagItems->contains($productTagItem)) {
            $this->productTagItems[] = $productTagItem;
            $productTagItem->setEntityId($this);
        }

        return $this;
    }

    public function removeProductTagItem(ProductTagItem $productTagItem): self
    {
        if ($this->productTagItems->contains($productTagItem)) {
            $this->productTagItems->removeElement($productTagItem);
            // set the owning side to null (unless already changed)
            if ($productTagItem->getEntityId() === $this) {
                $productTagItem->setEntityId(null);
            }
        }

        return $this;
    }
}
