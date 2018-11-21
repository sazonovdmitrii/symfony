<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Account;

class RootController extends AbstractController
{
    /**
     * @Route("/root", name="root")
     */
    public function index()
    {
        return $this->render('root/index.html.twig', [
            'controller_name' => 'RootController',
        ]);
    }
}
