<?php
namespace App\Service;
use App\Service\ApiManager\ApiManager;

class BeguService extends ApiManager
{
    const URL = 'https://begu.ru/api/v1/';
    const PROJECT_ID = 'lp';

    public function __construct()
    {
        $this->setUrl(self::URL);

        $this->setHeaders([
            "Content-Type: application/json",
            "Host-slug: {$this->getProjectId()}",
            "KM-Authenticate: {$this->getToken()}",
        ]);
    }

    /**
     * @return string
     */
    public function getProjectId()
    {
        return self::PROJECT_ID;
    }

    /**
     * @return string
     */
    public function getToken()
    {
        return md5("NxBhEWjIEVwfGWGiWzUbukG7cugeLWsF{$this->getProjectId()}");
    }
}