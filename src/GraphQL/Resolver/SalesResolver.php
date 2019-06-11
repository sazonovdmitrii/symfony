<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Definition\Argument;

class SalesResolver implements ResolverInterface, AliasedInterface
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve(Argument $args)
    {
        $limit = (isset($args['limit'])) ? $args['limit'] : null;
        $banners = $this->em->getRepository('App:Sale')->findBy([], [], $limit);
        return [
            'data' => $banners
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Sales'
        ];
    }
}