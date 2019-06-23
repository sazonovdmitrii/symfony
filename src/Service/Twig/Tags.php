<?php
namespace App\Service\Twig;
use App\Entity\ProductTag;
use Doctrine\ORM\EntityManager;

class Tags
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function getTree()
    {
        return $this->em->getRepository(ProductTag::class)->findAll();
    }
}