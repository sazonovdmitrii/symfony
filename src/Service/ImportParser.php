<?php

namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ImportParser extends AbstractController
{
    protected $path;

    protected $service;

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
        foreach ($worksheet->getRowIterator() AS $row) {
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(FALSE);
            $cells = [];
            foreach ($cellIterator as $cell) {
                $cells[] = $cell->getValue();
            }
            $rows[] = $cells;
        }
        print_r($rows);
    }
}