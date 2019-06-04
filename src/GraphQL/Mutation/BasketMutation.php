<?php
namespace App\GraphQL\Mutation;

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
        AuthenticatorService $authenticatorService
    ) {
        $this->redis = $redis;
        $this->em = $em;
        $this->authenticatorService = $authenticatorService;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
        }
        parent::__construct($redis, $container, $authenticatorService);
    }

    public function add(Argument $args)
    {
        $input = new AddBasketInput($args);

        if($input->item_id && $this->user) {

            $productItem = $this->em
                ->getRepository('App:ProductItem')
                ->find($input->item_id);
            $key = 'basket' . $this->user->getId();
            $this->redis->set($key, $productItem->getId());
            var_dump($this->redis->get($key));
            die();
        }
    }
}