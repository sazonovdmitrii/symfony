<?php
namespace App\Lp\CatalogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Lp\Framework\LpController;

class ProductController extends LpController
{
    /**
     * @Route("/{slug}", name="catalog")
     */
    public function match($request)
    {
        $productId = $this->getContextParameter($request, 'entity_id');

        return $this->render('@LpCatalog/product/index.html.twig', [
            'product_id' => $productId,
        ]);
    }
}
