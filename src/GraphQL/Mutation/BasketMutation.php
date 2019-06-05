<?php
namespace App\GraphQL\Mutation;

use App\Service\BasketService;
use App\GraphQL\Input\AddBasketInput;
use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Argument;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;

class BasketMutation extends AuthMutation
{
    private $authenticatorService;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        BasketService $basketService
    ) {
        $this->redis = $redis;
        $this->em = $em;
        $this->basketService = $basketService;
        $this->authenticatorService = $authenticatorService;
        parent::__construct($redis, $container, $authenticatorService);
    }

    public function add(Argument $args)
    {
        $input = new AddBasketInput($args);

        if($input->item_id) {
            $productItem = $this->em
                ->getRepository('App:ProductItem')
                ->find($input->item_id);

            $authKey = ($this->getUser()) ? $this->getUser()->getId() : $this->getSessionKey();

            $this->basketService
                ->setAuthKey($authKey)
                ->add($productItem->getId());
        }
        return [
            'id' => $input->item_id
        ];
    }
}