<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Entity\Configuration;

class ConfigService extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function get($option)
    {
        $option = $this->entityManager
            ->getRepository(Configuration::class)
            ->findOneBy(['option' => $option]);
        if($option) {
            return $option->getValue();
        }
    }
}