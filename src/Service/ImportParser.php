<?php

namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ImportParser extends AbstractController
{
    protected $path;

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
     * @return mixed
     */
    public function getPath()
    {
        return $this->path;
    }

    public function process()
    {
        if(!($xls = $this->getPath())) {
            throw new Exception('Path is required option');
        }
        var_dump(get_class($this->container->get('arodiss.xls.reader')));
        die();
        var_dump(file_get_contents($xls));
    }
}