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
use App\Service\ConfigService;
use App\Entity\Catalog;

class CatalogThumbItemFieldResolver implements ResolverInterface
{

    private $em;

    private $configService;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        TagService $tagService,
        ConfigService $configService
    ) {
        $this->em = $em;
        $this->tagService = $tagService;
        $this->configService = $configService;
    }

    /**
     * @param ResolveInfo $info
     * @param $value
     * @param Argument $args
     * @return mixed
     */
    public function __invoke(ResolveInfo $info, $value, Argument $args)
    {
        $method = $info->fieldName;
        return $this->$method($value, $args);
    }

    public function id(Catalog $catalog)
    {
        return $catalog->getId();
    }

    public function name(Catalog $catalog)
    {
        return $catalog->getName();
    }

    public function brand_url(Catalog $catalog)
    {
        foreach($catalog->getCatalogUrls() as $catalogUrl) {
            if(strpos($catalogUrl->getUrl(), 'brands') !== false) {
                return $catalogUrl->getUrl();
            }
        }
        return '';
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Product'
        ];
    }
}