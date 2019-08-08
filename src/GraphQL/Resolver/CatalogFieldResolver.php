<?php
namespace App\GraphQL\Resolver;
use Doctrine\ORM\EntityManager;
use App\Entity\Catalog;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use App\Service\TagService;
use App\Service\UrlParseService;

class CatalogFieldResolver implements ResolverInterface, AliasedInterface {

    private $em;

    private $tagService;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        TagService $tagService,
        UrlParseService $urlParseService
    ) {
        $this->em = $em;
        $this->tagService = $tagService;
        $this->urlParseService = $urlParseService;
    }

    public function __invoke(ResolveInfo $info, $value, Argument $args)
    {
        $method = $info->fieldName;
        return $this->$method($value, $args);
    }


    public function name(Catalog $catalog)
    {
        return $catalog->getName();
    }

    public function id(Catalog $catalog)
    {
        return $catalog->getId();
    }

    public function count(Catalog $catalog)
    {
        return $catalog->getProducts()->count();
    }

    public function tags(Catalog $catalog)
    {
        return $this->tagService
            ->setEntityType(Catalog::class)
            ->setEntity($catalog)
            ->getFilters();
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'CatalogFieldResolver'
        ];
    }
}