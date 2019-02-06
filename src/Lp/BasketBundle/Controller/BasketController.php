<?php
namespace App\Lp\BasketBundle\Controller;

use App\Lp\Framework\LpController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class BasketController extends LpController
{
    /**
     * @Route("/{slug}", name="basket")
     */
    public function index()
    {
        return $this->render('basket/index.html.twig', [
            'controller_name' => 'BasketController',
        ]);
    }
}
