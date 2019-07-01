<?php
namespace App\Service;
use App\Entity\ProductTagItem;
use Overblog\GraphQLBundle\Definition\Argument;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use App\Entity\ProductTag;

class UrlParseService extends AbstractController
{
    private $em;

    public function __construct(
        EntityManager $em
    ) {
        $this->em = $em;
    }

    function parse(Argument $args)
    {
        $url = isset($args['slug']) ? $args['slug'] : '';
        $urlComponents = explode('/', $url);
        $tagsLib = [
            'path' => $url,
            'filters' => []
        ];
        foreach($urlComponents as $urlComponent) {
            $filterComponents = explode('_', $urlComponent);
            $tag = $value = false;

            if(count($filterComponents) > 1) {
                $tag = $this->em
                    ->getRepository(ProductTag::class)
                    ->findBySlug($filterComponents[0]);
                if($tag) {
                    $value = $this->em
                        ->getRepository(ProductTagItem::class)
                        ->findBySlug($filterComponents[1]);
                }
            } else {
                if($urlComponent) {
                    $tagsLib['path'] = $urlComponent;
                }
            }

            if($tag && $value) {
                $tagsLib['filters'][] = [
                    'tag' => $tag,
                    'value' => $value
                ];
            }
        }

        if(isset($args['tags'])) {
            foreach($args['tags'] as $filterTagId) {
                $value = $this->em
                    ->getRepository(ProductTagItem::class)
                    ->find($filterTagId);
                if($value) {
                    $tag = $value->getEntityId();
                    $tagsLib['filters'][] = [
                        'tag' => $tag,
                        'value' => $value
                    ];
                }
            }
        }
        return $tagsLib;
    }
}