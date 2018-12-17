<?php
namespace App\Lp\UrlsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\Urls;
class UrlController extends AbstractController
{
    /**
     * @Route(":slug", name="urls")
     */
    public function match($slug)
    {
        $url = $this->getDoctrine()
            ->getRepository(Urls::class)
            ->createQueryBuilder('urls')
            ->where('urls.url = :url')
            ->setParameter('url', $slug)
            ->getQuery()
            ->getOneOrNullResult();
        if($url) {
            $dispatcherEntity = ucfirst($url->getType());
            $response = $this->forward(
                'App\Lp\CatalogBundle\Controller\\' . $dispatcherEntity . 'Controller::match', [
                    'slug'  => $slug
                ]
            );
        }

        return $response;
    }
}
