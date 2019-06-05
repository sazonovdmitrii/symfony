<?php
namespace App\Service;
use Dompdf\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Redis;

class BasketService extends AbstractController
{
    private $authKey;

    public function __construct(
        Redis $redis
    ) {
        $this->redis = $redis;
    }


    public function setAuthKey(string $authKey)
    {
        $this->authKey = $authKey;
        return $this;
    }

    public function getAuthKey()
    {
        return $this->authKey;
    }

    public function add(int $itemId)
    {
        if($authKey = $this->getAuthKey()) {
            $addingKey = 'basket::' . $this->getAuthKey();
            $this->redis->set($addingKey, $itemId);
            return $itemId;
        }
        throw new Exception('No Auth key founded');
    }

    public function getAll()
    {
        if($authKey = $this->getAuthKey()) {
            $addingKey = 'basket::' . $this->getAuthKey();
            return $this->redis->get($addingKey);
        }
        throw new Exception('No Auth key founded');
    }
}