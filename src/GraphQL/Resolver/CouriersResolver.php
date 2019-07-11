<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class CouriersResolver implements ResolverInterface, AliasedInterface
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve(Argument $args)
    {
        $couerierRepository = $this->em->getRepository('App:Courier');
        if(isset($args['city_id'])) {
            $pickups = $couerierRepository->findByCityId($args['city_id']);
        } else {
            $pickups = $couerierRepository->findAll();
        }
        return [
            'data' => $pickups
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Couriers'
        ];
    }
}