<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class AddressResolver implements ResolverInterface, AliasedInterface {

    private $em;

    private $authenticatorService;

    private $token;
    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        AuthenticatorService $authenticatorService
    ) {
        $this->em = $em;
        $this->authenticatorService = $authenticatorService;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        return $this->authenticatorService->authByToken($args['token']);
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Address'
        ];
    }
}