<?php
namespace App\Lp\CatalogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class ProductController extends AbstractController
{
    /**
     * @Route("/{slug}", name="catalog")
     */
    public function match($slug)
    {
//        var_dump($this->getDoctrine()->getManager('lp_perl')->getRepository('Urls', 'lp_perl')->getClassName());
//        die();
        return $this->render('@LpCatalog/product/index.html.twig', [
            'controller_name' => 'ProductController',
        ]);
    }
}
