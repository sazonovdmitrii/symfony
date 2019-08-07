<?php
namespace App\Service;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Product;

class ProductService extends AbstractController
{
    protected $product;
    protected $tagOptionService;

    public function __construct(
        TagOptionService $tagOptionService
    ) {
        $this->tagOptionService = $tagOptionService;
    }

    public function setProduct(Product $product)
    {
        $this->product = $product;
        return $this;
    }

    public function getProduct()
    {
        return $this->product;
    }

    public function relatedBrandProducts()
    {
        $relateds = [];

        if(!($product = $this->getProduct())) {
            return $relateds;
        }

        
    }
}