<?php

namespace App\GraphQL\Mutation;

use App\Entity\OrderItem;
use App\Entity\ProductItem;
use App\Entity\Orders;
use App\Service\AuthenticatorService;
use App\Service\BasketService;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;

class OrderMutation extends AuthMutation
{
    private $authenticatorService;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService,
        ObjectManager $manager
    ) {
        $this->manager              = $manager;
        $this->redis                = $redis;
        $this->em                   = $em;
        $this->basketService        = $basketService;
        $this->authenticatorService = $authenticatorService;
        parent::__construct($redis, $container, $authenticatorService);
    }

    public function create(Argument $args)
    {
        $basket = $this->basketService
            ->setAuthKey($this->getAuthKey())
            ->getAll();

        $order = new Orders();

        $user  = $this->getUser();
        if ($user) {
            $order->setUserId($user);
        }

        if(!count($basket) || in_array('products', array_keys($basket))) {
            return [
                'id' => null
            ];
        }

        foreach ($basket as $basketItem) {
            $orderItem = new OrderItem();
            $orderItem->setQty($basketItem['qty']);

            $productItem = $this->em
                ->getRepository(ProductItem::class)
                ->find($basketItem['item_id']);
            if($productItem) {
                $orderItem->setItem($productItem);
            }

            $this->manager->persist($orderItem);
            $this->manager->flush();

            $order->addOrderItem($orderItem);
        }

        $this->manager->persist($order);
        $this->manager->flush();

        $this->basketService
            ->setAuthKey($this->getAuthKey())
            ->delete();
        return [
            'id' => $order->getId()
        ];
    }
}