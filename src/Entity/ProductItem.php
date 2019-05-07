<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\ExpressionLanguage\Tests\Node\Obj;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Entity\File as EmbeddedFile;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Doctrine\ORM\EntityManagerInterface;


/**
 * @ORM\Entity(repositoryClass="App\Repository\ProductItemRepository")
 * @Vich\Uploadable
 */
class ProductItem
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Product", inversedBy="productItems")
     */
    private $product_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\BasketItem", mappedBy="product_item_id")
     */
    private $basketItems;

    /**
     * @Vich\UploadableField(mapping="product_images", fileNameProperty="productItemImages")
     * @var File
     */
    private $imageFile;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ProductItemImage", mappedBy="product_item_id", cascade={"persist", "remove" })
     */
    private $productItemImages;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Product", inversedBy="productItems")
     */
    private $entity;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $status;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $avarda_id;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ImportRelation", mappedBy="entity")
     */
    private $importRelations;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $price;

    public function __construct()
    {
        $this->product_id = new ArrayCollection();
        $this->images = new ArrayCollection();
        $this->basketItems = new ArrayCollection();
        $this->productItemImages = new ArrayCollection();
        $this->importRelations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
    public function getProductId(): Collection
    {
        return $this->product_id;
    }

    public function addProductId(Product $productId): self
    {
        if (!$this->product_id->contains($productId)) {
            $this->product_id[] = $productId;
        }

        return $this;
    }

    public function removeProductId(Product $productId): self
    {
        if ($this->product_id->contains($productId)) {
            $this->product_id->removeElement($productId);
        }

        return $this;
    }

    public function __toString()
    {
        return $this->name;
    }

    /**
     * @return Collection|BasketItem[]
     */
    public function getBasketItems(): Collection
    {
        return $this->basketItems;
    }

    public function addBasketItem(BasketItem $basketItem): self
    {
        if (!$this->basketItems->contains($basketItem)) {
            $this->basketItems[] = $basketItem;
            $basketItem->setProductItemId($this);
        }

        return $this;
    }

    public function removeBasketItem(BasketItem $basketItem): self
    {
        if ($this->basketItems->contains($basketItem)) {
            $this->basketItems->removeElement($basketItem);
            // set the owning side to null (unless already changed)
            if ($basketItem->getProductItemId() === $this) {
                $basketItem->setProductItemId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|ProductItemImage[]
     */
    public function getProductItemImages(): Collection
    {
        return $this->productItemImages;
    }

    public function addProductItemImage(ProductItemImage $productItemImage): self
    {
        if (!$this->productItemImages->contains($productItemImage)) {
            $this->productItemImages[] = $productItemImage;
            $productItemImage->setProductItemId($this);
        }

        return $this;
    }

    public function removeProductItemImage(ProductItemImage $productItemImage): self
    {
        if ($this->productItemImages->contains($productItemImage)) {
            $this->productItemImages->removeElement($productItemImage);
            // set the owning side to null (unless already changed)
            if ($productItemImage->getProductItemId() === $this) {
                $productItemImage->setProductItemId(null);
            }
        }

        return $this;
    }

    public function setImageFile($image = null)
    {
        foreach($image as $uploadedFile)
        {
            $file = new ProductItemImage();
            $path = sha1(uniqid(mt_rand(), true)).'.'.$uploadedFile->guessExtension();
            $file->setPath($path);
            $file->setProductItemId($this);
            $file->setTitle($uploadedFile->getClientOriginalName());
            $uploadedFile->move(__DIR__ . '/../../public/uploads/images/products', $path);
            $this->addProductItemImage($file);
            unset($uploadedFile);
        }
    }

    public function getImageFile()
    {
        return $this->getProductItemImages()->getValues();
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(?\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }

    public function getEntity(): ?Product
    {
        return $this->entity;
    }

    public function setEntity(?Product $entity): self
    {
        $this->entity = $entity;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
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

    /**
     * @return Collection|ImportRelation[]
     */
    public function getImportRelations(): Collection
    {
        return $this->importRelations;
    }

    public function addImportRelation(ImportRelation $importRelation): self
    {
        if (!$this->importRelations->contains($importRelation)) {
            $this->importRelations[] = $importRelation;
            $importRelation->setEntity($this);
        }

        return $this;
    }

    public function removeImportRelation(ImportRelation $importRelation): self
    {
        if ($this->importRelations->contains($importRelation)) {
            $this->importRelations->removeElement($importRelation);
            // set the owning side to null (unless already changed)
            if ($importRelation->getEntity() === $this) {
                $importRelation->setEntity(null);
            }
        }

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
}
