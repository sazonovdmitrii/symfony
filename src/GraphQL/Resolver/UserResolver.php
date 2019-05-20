<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class UserResolver implements ResolverInterface, AliasedInterface {

    private $em;

    public function __construct(
        EntityManager $em
    ) {
        $this->em = $em;
    }

    public function resolve(Argument $args)
    {
        return $this->em->getRepository('App:Users')->find($args['id']);
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'User'
        ];
    }
}