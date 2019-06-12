<?php

namespace App\Controller\Admin;

use App\Entity\ImportQueueRelation;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use EasyCorp\Bundle\EasyAdminBundle\Event\EasyAdminEvents;
use App\Entity\ImportQueue;

class ImportProductController extends BaseAdminController
{
    const PAGE_LISTING = 20;

    public function listImportProductAction()
    {
        $this->dispatch(EasyAdminEvents::PRE_LIST);

        $fields = $this->entity['list']['fields'];

        $paginator = $this->findAll($this->entity['class'], $this->request->query->get('page', 1), $this->entity['list']['max_results'], $this->request->query->get('sortField'), $this->request->query->get('sortDirection'), $this->entity['list']['dql_filter']);

        $this->dispatch(EasyAdminEvents::POST_LIST, array('paginator' => $paginator));
        $data = $this->getDoctrine()->getRepository(ImportQueue::class)->findAll();
        $queue = $this->getDoctrine()
            ->getRepository(ImportQueueRelation::class)
            ->findLimit(self::PAGE_LISTING);

        $parameters = array(
            'paginator' => $paginator,
            'fields' => $fields,
            'delete_form_template' => $this->createDeleteForm($this->entity['name'], '__id__')->createView(),
            'data' => $data,
            'queue' => $queue,
            'types' => ImportQueue::getAllTypes()
        );
        $template = 'admin/ImportProduct/page.html.twig';
        return $this->executeDynamicMethod('render<EntityName>Template', array('list', $template, $parameters));
    }

    public function importproductImportProductAction()
    {
        $priceType = $this->request->get('type');

        $this->getDoctrine()
            ->getRepository(ImportQueue::class)
            ->flushAll($priceType);

        $manager = $this->getDoctrine()->getManager();
        $uploads = $this->getParameter('kernel.project_dir') .
            $this->getParameter('app.path.import_product');

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
