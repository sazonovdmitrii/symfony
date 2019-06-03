<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Input\AddBasketInput;
use App\Service\AuthenticatorService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Doctrine\ORM\EntityManager;

class BasketMutation implements MutationInterface
{
    private $jwtManager;

    private $authenticator;

    public function __construct(
        EntityManager $em
    ) {
        $this->em = $em;
    }

    public function add(Argument $args)
    {
        $input = new AddBasketInput($args);

        if($input->item_id) {
            $productItem = $this->em
                ->getRepository('App:ProductItem')
                ->find($input->item_id);
            var_dump($productItem->getId());
            die();
        }
    }
}