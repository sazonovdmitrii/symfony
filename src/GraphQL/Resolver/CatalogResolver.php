<?php
namespace App\GraphQL\Resolver;
use Doctrine\ORM\EntityManager;
use App\Entity\Catalog;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Overblog\GraphQLBundle\Relay\Connection\Output\Connection;
use Overblog\GraphQLBundle\Relay\Connection\Paginator;

class CatalogResolver implements ResolverInterface {

    private $em;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
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