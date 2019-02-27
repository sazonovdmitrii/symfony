<?php
namespace App\Lp\CmsBundle\Controller;

use App\Lp\Framework\LpController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\Cache\Adapter\MemcachedAdapter;

class CmsController extends LpController
{
    /**
     * @Route("/{slug}", name="cms")
     */
    public function match()
    {
//        $client = MemcachedAdapter::createConnection(
//            'memcached://memcached:11211'
//        );
        return $this->render('root/index.html.twig', [
            'controller_name' => 'CmsController',
        ]);
    }
}
