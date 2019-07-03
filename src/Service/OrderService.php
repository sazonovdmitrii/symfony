<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Service\Order;

class OrderService extends AbstractController
{
    private $userId;

    public function __construct(
        EntityManager $em
    ) {
        $this->em = $em;
    }

    public function setUserId(string $userId)
    {
        $this->userId = $userId;
        return $this;
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function getOrders()
    {
        $user = $this->em->getRepository('App:Users')->find($this->getUserId());
        return $user->getOrders();
    }
}