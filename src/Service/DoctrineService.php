<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;

class DoctrineService extends AbstractController
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function flush()
    {
        $this->em->createQuery('DELETE FROM Configuration')->execute();
    }
}