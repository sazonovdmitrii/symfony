<?php
namespace App\Lp\CmsBundle\Controller;

use App\Lp\Framework\LpController;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class CmsController extends LpController
{
    /**
     * @Route("/{slug}", name="cms")
     */
    public function match(Request $request)
    {
        return $this->render('root/index.html.twig', [
            'controller_name' => 'CmsController',
        ]);
    }
}
