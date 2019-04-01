<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ConfigService extends AbstractController
{
    public function get(string $path)
    {
        return $this->getParameter($path);
    }
}