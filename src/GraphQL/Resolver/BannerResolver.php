<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class BannerResolver implements ResolverInterface, AliasedInterface
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function resolve()
    {
        $banners = $this->em->getRepository('App:Banner')->findAll();
        return [
            'data' => $banners
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Banner'
        ];
    }
}