<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use App\Service\TagService;
use App\Service\ConfigService;

class BrandsList implements ResolverInterface, AliasedInterface
{
    private $em;
    private $tagService;
    private $configService;

    public function __construct(
        EntityManager $entityManager,
        TagService $tagService,
        ConfigService $configService
    ) {
        $this->em = $entityManager;
        $this->tagService = $tagService;
        $this->configService = $configService;
    }

    public function resolve(Argument $args)
    {
        $catalogs = $this->tagService
            ->setParentTagId($this->configService->get('brand_tag'))
            ->getCatalogs();
        return [
            'data' => $catalogs
        ];
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'BrandsList'
        ];
    }
}