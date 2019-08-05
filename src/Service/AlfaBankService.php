<?php
namespace App\Service;
use App\Service\ApiManager\ApiManager;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\TransactionLog;

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


    public function setTransaction(String $type, Int $entityId, String $message)
    {
        $manager = $this->getDoctrine()
            ->getManager();
        $transaction = new TransactionLog();
        $transaction->setType($type);
        $transaction->setEntity($entityId);
        $transaction->setMessage($message);

        $manager->persist($transaction);
        $manager->flush();
    }
}