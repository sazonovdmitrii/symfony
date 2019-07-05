<?php
namespace App\Service;
use App\Service\ApiManager\ApiManager;

class BeguService extends ApiManager
{
    const URL = 'https://begu.ru/api/v1/';

    public function __construct()
    {
        $this->setUrl(self::URL);
    }
}