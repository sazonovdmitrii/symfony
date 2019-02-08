<?php
namespace App\Lp\CatalogBundle\Controller;

use App\Lp\Framework\LpController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\Catalog;

class CatalogController extends LpController
{
    /**
     * @Route("/{slug}", name="catalog")
     */
    public function match($request)
    {
        $catalogId = $this->getContextParameter($request, 'entity_id');

        if(!$catalogId) {
            throw $this->createNotFoundException('Catalog not found');
        }

        $product = $this->getDoctrine()
            ->getRepository(Catalog::class)
            ->find($catalogId);

        return $this->render('@LpCatalog/catalog/index.html.twig', [
            'catalog' => $product
        ]);
    }
}
