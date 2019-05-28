<?php

namespace App\GraphQL\Resolver;

use App\Entity\Catalog;
use Doctrine\ORM\EntityManager;
use App\Entity\Users;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;

class AddressField implements ResolverInterface
{
    public function __invoke(ResolveInfo $info, $value, Argument $args)
    {
        $method = $info->fieldName;
        return $this->$method($value, $args);
    }

    public function data(Users $user, Argument $args) :Connection
    {
        $addresses = $user->getAddresses()->toArray();
        $paginator = new Paginator(function () use ($addresses, $args) {
            return array_slice($addresses, $args['offset'], $args['limit'] ?? 10);
        });
        return $paginator->auto($args, count($addresses));
    }
}