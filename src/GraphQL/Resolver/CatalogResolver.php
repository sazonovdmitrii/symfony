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
use App\Entity\ProductTag;

class CatalogResolver implements ResolverInterface, AliasedInterface {

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

    public function name(Catalog $catalog) {
        return $catalog->getName();
    }

    public function id(Catalog $catalog) {
        return $catalog->getId();
    }

    public function products(Catalog $catalog, Argument $args) :Connection
    {
        $products = $catalog->getProducts()->toArray();
        $paginator = new Paginator(function () use ($products, $args) {
            return array_slice($products, $args['offset'], $args['limit'] ?? 10);
        });
        return $paginator->auto($args, count($products));
    }

    public function count(Catalog $catalog)
    {
        return $catalog->getProducts()->count();
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $catalogUrl = $this->em
            ->getRepository('App:CatalogUrl')
            ->findByUrl($args['slug']);

        if($catalogUrl) {
            $catalog = $catalogUrl->getEntity();
            return $catalog;
        }

        return [];
    }

    public function tags(Catalog $catalog)
    {
        return $this->tagService
            ->setEntityType(ProductTag::class)
            ->setEntity($catalog)
            ->getFilters();
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Catalog'
        ];
    }
}