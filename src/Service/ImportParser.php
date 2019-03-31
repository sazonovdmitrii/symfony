<?php

namespace App\Service;

class ImportParser
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
        var_dump($xls);
    }
}