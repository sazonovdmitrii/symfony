<?php

namespace App\Lp\BasketBundle\Controller;

use App\Entity\Basket;
use App\Entity\ProductItem;
use App\Lp\Framework\LpController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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
        if (
            $productItemId = (int)$request->query->get('productItemId')
        ) {
            $qty = (int)$request->query->get('qty');
            if(!$qty) {
                $this->error('Qty not defined');
            }

            $productItem = $this
                ->getModel(ProductItem::class)
                ->find($productItemId);

            if(!$productItemId) {
                $this->error('Product Item Not exists');
            }

            $basket = $this->getModel(Basket::class);

            $result = $basket->setProductItem($productItem)
                ->setQty($qty)
                ->add();

            if($result) {
                $request->getSession()->set('basket', $result);
                return new JsonResponse($result);
            }
        }
        $this->error('Product Not exists');
    }
}
