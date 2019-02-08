<?php
namespace App\Lp\CatalogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Lp\Framework\LpController;
use App\Entity\Product;
use Symfony\Component\HttpKernel\Exception;
use Psr\Log\LoggerInterface;
class ProductController extends LpController
{
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
}
