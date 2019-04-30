<?php

namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use App\Entity\Product;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;

class ProductFieldResolver implements ResolverInterface
{

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

    public function name(Product $product)
    {
        return $product->getName();
    }

    public function url(Product $product)
    {
        return $this->em
            ->getRepository('App:ProductUrl')
            ->findByEntity($product->getId());
    }

    public function id(Product $product)
    {
        return $product->getId();
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