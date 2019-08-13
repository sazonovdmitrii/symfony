<?php

namespace App\Controller\Admin;

use Doctrine\ORM\EntityManager;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;
use App\Service\RequestFilterService;
use App\Service\DoctrineService;
use App\Entity\Configuration;
use App\Service\TagService;

class ConfigurationController extends BaseAdminController
{
    private $_template = 'admin/Configuration/form.html.twig';

    private $filterService;

    private $doctrineService;

    private $entityManager;

    private $tagService;

    public function __construct(
        RequestFilterService $filterService,
        DoctrineService $doctrineService,
        EntityManager $entityManager,
        TagService $tagService
    ) {
        $this->filterService = $filterService;
        $this->doctrineService = $doctrineService;
        $this->entityManager = $entityManager;
        $this->tagService = $tagService;
    }

    protected function renderTemplate($actionName, $templatePath, array $parameters = array())
    {
        $list = $this->getDoctrine()->getRepository(Configuration::class)->findAll();
        foreach($list as $item) {
            $parameters['list'][$item->getOption()] = $item->getValue();
        }
        $parameters['tags'] = $this->tagService->all();
        return $this->render($this->_template, $parameters);
    }

    public function saveAction()
    {
        $parameters = $this->filterService->filterQuery($this->request->query);
        $configurationRepository = $this->getDoctrine()->getRepository(Configuration::class);
        $configurationRepository->flush();

        foreach($parameters as $option => $value) {
            $configuration = new Configuration();
            $configuration->setOption($option);
            $configuration->setValue($value);
            $this->entityManager->persist($configuration);
        }
        $this->entityManager->flush();
        $this->entityManager->clear();
        return $this->redirectToReferrer();
    }
}
