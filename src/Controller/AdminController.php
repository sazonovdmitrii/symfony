<?php

namespace App\Controller;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use EasyCorp\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use App\Entity\ImportQueue;

class AdminController extends BaseAdminController
{
    public function editItemsAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_EDIT);

        $id = $this->request->query->get('id');
        $easyadmin = $this->request->attributes->get('easyadmin');
        $entity = $easyadmin['item'];

        if ($this->request->isXmlHttpRequest() && $property = $this->request->query->get('property')) {
            $newValue = 'true' === mb_strtolower($this->request->query->get('newValue'));
            $fieldsMetadata = $this->entity['list']['fields'];

            if (!isset($fieldsMetadata[$property]) || 'toggle' !== $fieldsMetadata[$property]['dataType']) {
                throw new \RuntimeException(sprintf('The type of the "%s" property is not "toggle".', $property));
            }

            $this->updateEntityProperty($entity, $property, $newValue);

            // cast to integer instead of string to avoid sending empty responses for 'false'
            return new Response((int) $newValue);
        }

        $fields = $this->entity['edit']['fields'];

        $editForm = $this->executeDynamicMethod('create<EntityName>EditForm', array($entity, $fields));
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
            'form' => $editForm->createView(),
            'entity_fields' => $fields,
            'entity' => $entity,
            'delete_form' => $deleteForm->createView(),
        );

        return $this->executeDynamicMethod('render<EntityName>Template', array('edit', $this->entity['templates']['edit'], $parameters));
    }

    public function listImportProductAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_LIST);

        $fields = $this->entity['list']['fields'];

        $paginator = $this->findAll($this->entity['class'], $this->request->query->get('page', 1), $this->entity['list']['max_results'], $this->request->query->get('sortField'), $this->request->query->get('sortDirection'), $this->entity['list']['dql_filter']);

        $this->dispatch(EasyAdminEvents::POST_LIST, array('paginator' => $paginator));
        $data = $this->getDoctrine()->getRepository(ImportQueue::class)->findAll();

        $parameters = array(
            'paginator' => $paginator,
            'fields' => $fields,
            'delete_form_template' => $this->createDeleteForm($this->entity['name'], '__id__')->createView(),
            'data' => $data,
            'types' => ImportQueue::getAllTypes()
        );
        $template = 'admin/ImportProduct/page.html.twig';
        return $this->executeDynamicMethod('render<EntityName>Template', array('list', $template, $parameters));
    }

    public function importproductImportProductAction()
    {
        $this->getDoctrine()->getRepository(ImportQueue::class)->flushAll();

        $manager = $this->getDoctrine()->getManager();
        $uploads = $this->getParameter('kernel.project_dir') .
            $this->getParameter('app.path.import_product');

        $priceType = $this->request->get('type');

        foreach($this->request->files->get("fileUpload") as $fileUpload) {
            $filename = sha1(
                    basename($fileUpload->getClientOriginalName()) . time()
                ) . '.' . $fileUpload->getClientOriginalExtension();
            $fileUpload->move($uploads, $filename);

            $queueItem = new ImportQueue();
            $queueItem->setType($priceType);
            $queueItem->setPath($filename);
            $queueItem->setStatus([ImportQueue::STATUS_NEW]);
            $manager->persist($queueItem);
            $manager->flush();
        }

        return $this->redirectToReferrer();
    }
}
