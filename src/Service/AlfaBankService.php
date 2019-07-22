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
        
        $this->setContent([
            "Content-Type: application/json"
        ]);
    }

}