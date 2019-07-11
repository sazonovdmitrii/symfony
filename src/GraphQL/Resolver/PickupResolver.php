<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class PickupResolver implements ResolverInterface, AliasedInterface
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve(Argument $args)
    {
        $pickupRepository = $this->em->getRepository('App:Pickup');
        if(isset($args['city_id'])) {
            $pickups = $pickupRepository->findByCityId($args['city_id']);
        } else {
            $pickups = $pickupRepository->findAll();
        }
        return [
            'data' => $pickups
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Pickups'
        ];
    }
}