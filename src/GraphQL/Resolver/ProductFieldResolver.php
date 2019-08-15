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

class ProductFieldResolver implements ResolverInterface
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

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
        $productUrl = $this->em
            ->getRepository('App:ProductUrl')
            ->findByUrl($args['slug']);

        if ($productUrl) {
            return $productUrl->getEntity();
        }

        return [];
    }

    /**
     * @param Product $product
     * @return null|string
     */
    public function name(Product $product)
    {
        return $product->getName();
    }

    /**
     * @param Product $product
     * @return mixed|string
     */
    public function url(Product $product)
    {
        if($productUrl = $this->em
            ->getRepository('App:ProductUrl')
            ->findByEntity($product->getId())) {
            return str_replace('//', '/', '/' . $productUrl);
        }
        return '';
    }

    /**
     * @param Product $product
     * @return int|null
     */
    public function id(Product $product)
    {
        return $product->getId();
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function tags(Product $product)
    {
        return $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->getFilters();
    }

    /**
     * @param Product $product
     * @param Argument $args
     * @return Connection
     */
    public function items(Product $product, Argument $args) :Connection
    {
        $items = $product->getProductItems()->toArray();
        $paginator = new Paginator(function () use ($items, $args) {
            return array_slice($items, $args['offset'], $args['limit'] ?? 10);
        });
        return $paginator->auto($args, count($items));
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function other_fragrance(Product $product)
    {
        $aromat = $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->setTagId($this->configService->get('fragrance_tag'))
            ->getOne();

        $catalog = $this->tagService
            ->setEntityType(Catalog::class)
            ->setTagId($aromat->getId())
            ->getOne();

        return $catalog->getProducts()->slice(0, 10);
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function other_brand(Product $product)
    {
        $brand = $this->tagService
            ->setEntityType(Product::class)
            ->setEntity($product)
            ->setTagId($this->configService->get('brand_tag'))
            ->getOne();

        $catalog = $this->tagService
            ->setEntityType(Catalog::class)
            ->setTagId($brand->getId())
            ->getOne();

        return $catalog->getProducts()->slice(0, 10);
    }

    /**
     * @param Product $product
     * @return mixed
     */
    public function similars(Product $product)
    {
        return $this->tagService
            ->setEntity($product)
            ->setEntityType(Product::class)
            ->similars();
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