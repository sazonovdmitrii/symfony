<?php
namespace App\Lp\CatalogBundle\Controller;

use App\Entity\ProductItem;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Lp\Framework\LpController;
use App\Entity\Product;
use Symfony\Component\HttpKernel\Exception;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductController extends LpController
{
    const PAGE_LISTING = 20;
    /**
     * @Route("/{slug}", name="catalog")
     */
    public function match($request)
    {
        $productId = $this->getContextParameter($request, 'entity_id');

        if(!$productId) {
            throw $this->createNotFoundException('Product not found');
        }

        $product = $this->getDoctrine()
            ->getRepository(Product::class)
            ->find($productId);

        return $this->render('@LpCatalog/product/index.html.twig', [
            'product' => $product
        ]);
    }

    /**
     * @Route("/products/jsonFormat", name="products_json")
     */
    public function jsonFormat()
    {
        $productsItems = $this->getDoctrine()
            ->getRepository(ProductItem::class)
            ->findLimit(self::PAGE_LISTING);
        $result = [];
        foreach($productsItems as $productItem) {
            $result[] = [
                'id' => $productItem->getId(),
                'name' => $productItem->getName()
            ];
        }
        return new JsonResponse($result);
    }
}
