<?php
namespace App\GraphQL\Resolver;

use App\Service\OrderService;
use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\AuthenticatorService;

class UsersOrdersResolver extends AuthAlias
{
    private $orderService;

    public function __construct(
        EntityManager $em,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        OrderService $orderService
    ) {
        $this->orderService = $orderService;
        parent::__construct($em, $container, $authenticatorService);
    }

    public function resolve()
    {
        $orders = [];
        if($this->getUser()) {
            $orders = $this->orderService
                ->setUserId($this->getUser()->getId())
                ->getOrders();
        }
        return [
            'orders' => $orders
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'UsersOrders'
        ];
    }
}