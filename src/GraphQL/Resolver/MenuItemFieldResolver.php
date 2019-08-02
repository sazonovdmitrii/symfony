<?php

namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use App\Entity\Product;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use App\Service\TagService;

class MenuItemFieldResolver implements ResolverInterface
{

    private $em;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        TagService $tagService
    ) {
        $this->em = $em;
        $this->tagService = $tagService;
    }

    public function __invoke(ResolveInfo $info, $value, Argument $args)
    {
        $method = $info->fieldName;
        return $this->$method($value, $args);
    }

    public function text($entity)
    {
        return $entity['text'];
    }

    public function url($entity)
    {
        $data = isset($entity['data']) ? $entity['data'] : [];
        if(count($data)) {
            return $data[0];
        }
        return '';
    }

    public function children($entity)
    {
        return $entity['children'];
    }
}