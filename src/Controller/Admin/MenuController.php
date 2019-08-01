<?php

namespace App\Controller\Admin;

use App\Entity\Menu;
use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use EasyCorp\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use Symfony\Component\HttpFoundation\Response;

class MenuController extends BaseAdminController
{
    const PAGE_LISTING = 20;

    private $entityManager;

    public function __construct(
        EntityManager $entityManager
    ) {
        $this->entityManager = $entityManager;
    }

    public function editMenuAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_EDIT);
        $id            = $this->request->query->get('id');
        $menuStringify = $this->request->request->get('menu');
        if ($menuStringify) {
            $id   = $this->request->request->get('id');
            $menu = $this->getDoctrine()->getRepository(Menu::class)->find($id);
            $menu->setMenu($menuStringify);
            $this->entityManager->persist($menu);
            $this->entityManager->flush();
            $response = new Response();
            $response->setContent(json_encode([
                'status' => 'success'
            ]
            )
            );
            $response->headers->set('Content-Type', 'application/json');
            return $response;
        }
        $easyadmin = $this->request->attributes->get('easyadmin');
        $entity    = $easyadmin['item'];

        if ($this->request->isXmlHttpRequest() && $property = $this->request->query->get('property')) {
            $newValue       = 'true' === mb_strtolower($this->request->query->get('newValue'));
            $fieldsMetadata = $this->entity['list']['fields'];

            if (!isset($fieldsMetadata[$property]) || 'toggle' !== $fieldsMetadata[$property]['dataType']) {
                throw new \RuntimeException(sprintf('The type of the "%s" property is not "toggle".', $property));
            }

            $this->updateEntityProperty($entity, $property, $newValue);

            // cast to integer instead of string to avoid sending empty responses for 'false'
            return new Response((int)$newValue);
        }

        $fields = $this->entity['edit']['fields'];

        $editForm   = $this->executeDynamicMethod('create<EntityName>EditForm', array($entity, $fields));
        $deleteForm = $this->createDeleteForm($this->entity['name'], $id);

        $editForm->handleRequest($this->request);
        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->dispatch(EasyAdminEvents::PRE_UPDATE, array('entity' => $entity));

            $this->executeDynamicMethod('preUpdate<EntityName>Entity', array($entity, true));
            $this->executeDynamicMethod('update<EntityName>Entity', array($entity, $editForm));

            $this->dispatch(EasyAdminEvents::POST_UPDATE, array('entity' => $entity));

            return $this->redirectToReferrer();
        }

        $this->dispatch(EasyAdminEvents::POST_EDIT);

        $parameters = array(
            'form'          => $editForm->createView(),
            'entity_fields' => $fields,
            'entity'        => $entity,
            'delete_form'   => $deleteForm->createView(),
        );
        $template   = 'admin/Menu/edit.html.twig';
        return $this->executeDynamicMethod('render<EntityName>Template', array('edit', $template, $parameters));
    }

    public function menuMenuAction()
    {
        $id            = $this->request->query->get('id');
        $menu          = $this->getDoctrine()->getRepository(Menu::class)->find($id);
        $menuStringify = $menu->getMenu();
        if (!$menuStringify) {
            $menuStringify = $this->_defaultMenu();
        }
        $response = new Response();
        $response->setContent($menuStringify);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    private function _defaultMenu()
    {
        return '[
              {
                "id": "root",
                "text": "Root",
                "icon": "/static/3.3.8/assets/images/tree_icon.png",
                "li_attr": {
                  "id": "demo_root_1"
                },
                "a_attr": {
                  "href": "#",
                  "id": "demo_root_1_anchor"
                },
                "state": {
                  "loaded": true,
                  "opened": true,
                  "selected": false,
                  "disabled": false,
                  "failed": false,
                  "loading": false
                },
                "data": [
                  "adsfsad123"
                ],
                "children": [
                  
                ],
                "type": "root"
              }
            ]';
    }
}
