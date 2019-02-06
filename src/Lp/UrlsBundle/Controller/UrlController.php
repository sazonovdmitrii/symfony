<?php
namespace App\Lp\UrlsBundle\Controller;

use App\Lp\Framework\LpController;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use App\Entity\Urls;

class UrlController extends LpController
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
            $request = $this
                ->addContextParameters(
                    [
                        'slug' => $slug,
                        'entity_id' => $url->getEid()
                    ]
                );

            $dispatcherEntity = ucfirst($url->getType());

            $response = $this->forward(
                'App\Lp\CatalogBundle\Controller\\' . $dispatcherEntity . 'Controller::match', [
                    'request' => $request
                ]
            );

            return $response;
        } else {
            return $this->forward(
                'App\Lp\CmsBundle\Controller\CmsController::match'
            );
        }
    }
}
