<?php

namespace App\Controller\Admin;

use App\Controller\AdminController;
use App\Entity\ProductTagItem;
use App\Entity\ProductTag;
use Doctrine\ORM\EntityManager;
use Symfony\Component\HttpFoundation\JsonResponse;

class ProductTagController extends AdminController
{
    private $_template = 'admin/ProductTag/edit%s%.html.twig';

    private $entityManager;

    public function __construct(
        EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    protected function renderProductTagTemplate($actionName, $templatePath, array $parameters = array())
    {
        if($actionName == 'edit') {
            $templatePath = str_replace('%s%', '_' . $parameters['entity']->getType(), $this->_template);
        }
        return $this->render($templatePath, $parameters);

    }

    protected function addAction()
    {
        $requestData = $this->request->request;
        if($requestData->has('option') && $requestData->has('tag_id')) {

            $productTag = $this->_getProductTag($requestData->get('tag_id'));

            $tagItem = new ProductTagItem();
            $tagItem->setEntityId($productTag);
            $tagItem->setName($requestData->get('option'));

            $this->entityManager->persist($tagItem);
            $this->entityManager->flush();
        }
        return new JsonResponse(['response' => 200]);
    }

    protected function removeAction()
    {
        $requestData = $this->request->request;
        if($requestData->has('tag_id')) {
            $tagItem = $this->_getProductTagItem($requestData->get('tag_id'));
            $this->entityManager->remove($tagItem);
            $this->entityManager->flush();
        }
        return new JsonResponse(['response' => 200]);
    }

    private function _getProductTag($tagId)
    {
        return $this->repository(ProductTag::class)
            ->find($tagId);
    }

    private function _getProductTagItem($tagItemId)
    {
        return $this->repository(ProductTagItem::class)
            ->find($tagItemId);
    }
}
