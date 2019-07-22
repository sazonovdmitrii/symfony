<?php
namespace App\Service;
use App\Service\ApiManager\ApiManager;

class AlfaBankService extends ApiManager
{
    const URL = 'https://pay.alfabank.ru/payment/rest/';
    const LOGIN = 'laparfumerie-api';
    const PASSWORD = 'Vyjujghjlf;Yflj!!1';

    public function __construct()
    {
        $this->setUrl(self::URL);

        $this->setHeaders([
            "Content-Type: application/json"
        ]);
    }

    /**
     * @return string
     */
    public function getLogin()
    {
        return self::LOGIN;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
        return self::PASSWORD;
    }
}