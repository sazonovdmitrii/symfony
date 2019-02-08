<?php

namespace App\Lp\BasketBundle\Controller;

use App\Lp\Framework\LpController;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Product;
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
        if ($productId = (int)$request->query->get('productId')) {

            $product = $this
                ->getModel(Product::class)
                ->find($productId);
            if(!$product) {
                $this->error('Product Not exists');
            }

            $basket = $this->getModel(Basket::class)->add($productId);
            if($basket) {
                return new JsonResponse($basket);
            }
        }
        $this->error('Product Not exists');
    }
}
