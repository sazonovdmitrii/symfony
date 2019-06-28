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

class CatalogResolver implements ResolverInterface, AliasedInterface {

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

    public function products(Catalog $catalog, Argument $args) :Connection
    {
        $parsed = $catalog->getParsed();
        if($parsed['path']) {
            $catalogUrl = $this->em
                ->getRepository('App:CatalogUrl')
                ->findByUrl($parsed['path']);
            if(count($parsed['filters'])) {
                $productsIds = [];
                foreach($parsed['filters'] as $filter) {
                    if(!count($productsIds)) {
                        $filter = 'producttagitem_id = ' . $filter['value']->getId();
                    } else {
                        $filter = 'producttagitem_id = ' . $filter['value']->getId() . ' AND product_id IN (' . implode(',', $productsIds) . ')';
                    }
                    $statement = $this->em->getConnection()->prepare(
                        'SELECT product_id FROM product_producttagitem WHERE ' . $filter
                    );
                    $statement->execute();
                    $productsIds = $statement->fetchAll();
                    $productsIds = array_map(function($product) { return $product['product_id']; }, $productsIds);
                }

                $products = $catalogUrl->getEntity()->getProducts();

                $products = $products->filter(
                    function($entry) use ($productsIds) {
                        return in_array($entry->getId(), $productsIds);
                    }
                );
                $products = $products->toArray();
            } else {
                $products = $catalog->getProducts()->toArray();
            }
        }

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
            ->findByUrl($args['id']);

        if($catalogUrl) {
            $catalog = $catalogUrl->getEntity();
            return $catalog;
        }

        return [];
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
            'resolve' => 'Catalog'
        ];
    }
}