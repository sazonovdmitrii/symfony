<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Input\CreateAddressInput;
use App\Service\AddressService;
use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Argument;
use Doctrine\ORM\EntityManager;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AddressMutation extends AuthMutation
{
    private $authenticatorService;

    public function __construct(
        EntityManager $em,
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        AddressService $addressService
    ) {
        $this->redis = $redis;
        $this->em = $em;
        $this->addressService = $addressService;
        $this->authenticatorService = $authenticatorService;
        parent::__construct($redis, $container, $authenticatorService);
    }

    public function create(Argument $args)
    {
        $input = new CreateAddressInput($args);

        $address = [];

        if($userId = $this->getAuthKey()) {
            $address = $this->addressService
                ->setUserId($userId)
                ->setData($input)
                ->create();
        }

        return $address;
    }
}