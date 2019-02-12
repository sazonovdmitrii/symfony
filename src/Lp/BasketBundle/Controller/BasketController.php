<?php

namespace App\Lp\BasketBundle\Controller;

use App\Lp\Framework\LpController;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\ProductItem;
use App\Entity\Basket;
use Symfony\Component\HttpFoundation\JsonResponse;

class BasketController extends LpController
{
    public function index()
    {
        return $this->render('basket/index.html.twig', [
            'controller_name' => 'BasketController',
        ]);
    }

    public function add(Request $request)
    {
        if ($productItemId = (int)$request->query->get('productItemId')) {

            $productItem = $this
                ->getModel(ProductItem::class)
                ->find($productItemId);

            if(!$productItemId) {
                $this->error('Product Item Not exists');
            }

            $basket = $this->getModel(Basket::class)->add($productItem);
            if($basket) {
                return new JsonResponse($basket);
            }
        }
        $this->error('Product Not exists');
    }
}
