<?php
namespace App\GraphQL\Resolver;
use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use App\Service\UrlParseService;

class ProductsFieldsResolver implements ResolverInterface, AliasedInterface {

    private $em;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        UrlParseService $urlParseService
    ) {
        $this->em = $em;
        $this->urlParseService = $urlParseService;
    }

    /**
     * @param Argument $args
     * @return array
     */
    public function resolve(Argument $args)
    {
//        var_dump($args);
//        die();
        $parsed = $this->urlParseService->parse($args['slug']);

        $catalogUrl = $this->em
            ->getRepository('App:CatalogUrl')
            ->findByUrl($parsed['path']);

        if($catalogUrl) {
            $catalog = $catalogUrl->getEntity();
            $catalog->setParsed($parsed);
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