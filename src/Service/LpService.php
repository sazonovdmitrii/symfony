<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LpService extends AbstractController
{
    const PRODUCT_POSTFIX = '.htm';

    public static function productPostfix()
    {
        return self::PRODUCT_POSTFIX;
    }
}