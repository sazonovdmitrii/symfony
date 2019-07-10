<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class DirectionsResolver implements ResolverInterface, AliasedInterface
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve()
    {
        $regions = $this->em->getRepository('App:Direction')->findAll();
        return [
            'data' => $regions
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Directions'
        ];
    }
}