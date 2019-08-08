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

class CatalogProductResolver implements ResolverInterface, AliasedInterface {

    private $em;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em
    ) {
        $this->em = $em;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Catalog $catalog, Argument $args)
    {
        $parsed = $catalog->getParsed();
        $products = [];
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

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'CatalogProduct'
        ];
    }
}