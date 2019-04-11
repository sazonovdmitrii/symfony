<?php

namespace App\Service;
use App\Service\Import\Formatter\Loader;
use App\Service\TranslitService;
use Magento\Customer\Controller\Section\Load;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ImportParser extends AbstractController
{
    protected $path;

    protected $service;

    protected $type;

    protected $translitService;

    protected $formatterLoader;

    public function __construct(
        TranslitService $translitService,
        Loader $loader
    ) {
        $this->translitService = $translitService;
        $this->formatterLoader = $loader;
    }

    public function process()
    {
        if(!($xlsPath = $this->getPath())) {
            throw new Exception('Path is required option');
        }

        if(!($service = $this->getService())) {
            throw new Exception('No usable service');
        }

        $xls = $service->createSpreadsheet($xlsPath);

        $worksheet = $xls->getActiveSheet();

        $rows = [];
        $count = 0;
        foreach ($worksheet->getRowIterator() AS $row) {
            $count++;
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(FALSE);
            $cells = [];
            foreach ($cellIterator as $cell) {
                $cells[] = $cell->getValue();
            }
            if($this->getFormatter()->filter($cells) && $this->getFormatter()->validate($cells)) {
                $rows[] = $this->getFormatter()->fill($cells);
            }
        }
        return $rows;
    }

    /**
     * @param string $path
     * @return $this
     */
    public function setPath(string $path)
    {
        $this->path = $path;
        return $this;
    }

    /**
     * @param string $service
     * @return $this
     */
    public function setService($service)
    {
        $this->service = $service;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getService()
    {
        return $this->service;
    }

    /**
     * @return mixed
     */
    public function getPath()
    {
        return $this->path;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType(string $type)
    {
        $this->type = $type;
        return $this;
    }

    public function getFormatter()
    {
        return $this->formatterLoader->instance(
            $this->translitService->className($this->getType())
        );
    }
}