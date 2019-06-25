<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CatalogTagRepository")
 */
class CatalogTag
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
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Catalog", inversedBy="catalogTags")
     */
    private $entity;

    /**
     * @ORM\Column(type="string", length=10, nullable=true)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=3, nullable=true)
     */
    private $visible;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\CatalogTagItem", mappedBy="entity")
     */
    private $catalogTagItems;

    public function __construct()
    {
        $this->entity = new ArrayCollection();
        $this->catalogTagItems = new ArrayCollection();
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

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    /**
     * @return Collection|Catalog[]
     */
    public function getEntity(): Collection
    {
        return $this->entity;
    }

    public function addEntity(Catalog $entity): self
    {
        if (!$this->entity->contains($entity)) {
            $this->entity[] = $entity;
        }

        return $this;
    }

    public function removeEntity(Catalog $entity): self
    {
        if ($this->entity->contains($entity)) {
            $this->entity->removeElement($entity);
        }

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(?string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getVisible(): ?string
    {
        return $this->visible;
    }

    public function setVisible(?string $visible): self
    {
        $this->visible = $visible;

        return $this;
    }

    /**
     * @return Collection|CatalogTagItem[]
     */
    public function getCatalogTagItems(): Collection
    {
        return $this->catalogTagItems;
    }

    public function addCatalogTagItem(CatalogTagItem $catalogTagItem): self
    {
        if (!$this->catalogTagItems->contains($catalogTagItem)) {
            $this->catalogTagItems[] = $catalogTagItem;
            $catalogTagItem->setEntity($this);
        }

        return $this;
    }

    public function removeCatalogTagItem(CatalogTagItem $catalogTagItem): self
    {
        if ($this->catalogTagItems->contains($catalogTagItem)) {
            $this->catalogTagItems->removeElement($catalogTagItem);
            // set the owning side to null (unless already changed)
            if ($catalogTagItem->getEntity() === $this) {
                $catalogTagItem->setEntity(null);
            }
        }

        return $this;
    }
}
