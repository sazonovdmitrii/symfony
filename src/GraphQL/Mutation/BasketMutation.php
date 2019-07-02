<?php
namespace App\GraphQL\Mutation;

use App\Service\BasketService;
use App\GraphQL\Input\AddBasketInput;
use App\GraphQL\Input\UpdateBasketInput;
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

            return $this->basketService
                ->setAuthKey($this->_authKey())
                ->add($productItem->getId());
        }
    }

    public function remove(Argument $args)
    {
        $input = new AddBasketInput($args);

        if($input->item_id) {
            return $this->basketService
                ->setAuthKey($this->_authKey())
                ->remove($input->item_id);
        }
    }

    public function update(Argument $args)
    {
        $input = new UpdateBasketInput($args);

        if($input->item_id) {
            return $this->basketService
                ->setAuthKey($this->_authKey())
                ->update($input->item_id, $input->qty);
        }
    }

    private function _authKey()
    {
        return ($this->getUser()) ? $this->getUser()->getId() : $this->getSessionKey();
    }
}