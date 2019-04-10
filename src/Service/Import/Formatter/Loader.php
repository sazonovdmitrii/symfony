<?php
namespace App\Service\Import\Formatter;

class Loader
{
    public function instance($className)
    {
        $className = 'App\Service\Import\Formatter' . '\\' . $className;
        return new $className();
    }
}