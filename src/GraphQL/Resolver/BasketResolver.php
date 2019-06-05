<?php
namespace App\GraphQL\Resolver;

use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\BasketService;
use Doctrine\ORM\EntityManager;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\AuthenticatorService;

class BasketResolver extends AuthAlias
{
    private $basketService;

    public function __construct(
        EntityManager $em,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService
    ) {
        $this->basketService = $basketService;
        parent::__construct($em, $container, $authenticatorService);
    }

    public function resolve(Argument $args)
    {
        $authKey = ($this->getUser()) ? $this->getUser()->getId() : $this->getSessionKey();
        $basket = $this->basketService
            ->setAuthKey($authKey)
            ->getAll();
        return [
            'id' => $basket
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Basket'
        ];
    }
}