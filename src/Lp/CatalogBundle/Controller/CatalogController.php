<?php
namespace App\Lp\CatalogBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class CatalogController extends AbstractController
{
    /**
     * @Route("/{slug}", name="catalog")
     */
    public function match($slug)
    {
        return $this->render('@LpCatalog/catalog/index.html.twig', [
            'controller_name' => 'CatalogController',
        ]);
    }
}
