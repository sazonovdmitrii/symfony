<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Redis;
use Doctrine\ORM\EntityManager;

class BasketService extends AbstractController
{
    private $authKey;

    public function __construct(
        EntityManager $em,
        Redis $redis
    ) {
        $this->em = $em;
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
            $key = 'basket::' . $this->getAuthKey();
            $oldBasket = $this->redis->get($key);
            if($oldBasket) {
                $basket = json_decode($oldBasket, true);
                if(!isset($basket[$itemId])) {
                    $basket[$itemId] = [
                        'item_id' => $itemId,
                        'qty' => 1
                    ];
                } else {
                    $basket[$itemId]['qty'] += 1;
                }
            } else {
                $basket[$itemId] = [
                    'item_id' => $itemId,
                    'qty' => 1
                ];
            }

            if($basket) {
                $this->redis->set($key, json_encode($basket));
            }
            return $basket;
        }
        return [
            'products' => null
        ];
    }

    public function remove(int $itemId)
    {
        if($authKey = $this->getAuthKey()) {
            $key       = 'basket::' . $this->getAuthKey();
            $basket = json_decode($this->redis->get($key), true);
            if(isset($basket[$itemId])) {
                unset($basket[$itemId]);
            }
            $this->redis->set($key, json_encode($basket));
            return $basket;
        }
        return [
            'products' => null
        ];
    }

    public function update(int $itemId, int $qty)
    {
        if($authKey = $this->getAuthKey()) {
            $key       = 'basket::' . $this->getAuthKey();
            $basket = json_decode($this->redis->get($key), true);
            if(isset($basket[$itemId])) {
                $basket[$itemId]['qty'] = $qty;
            }
            $this->redis->set($key, json_encode($basket));
            return $basket;
        }
        return [
            'products' => null
        ];
    }

    public function getAll()
    {
        if($authKey = $this->getAuthKey()) {
            $key = 'basket::' . $this->getAuthKey();
            $basket = json_decode($this->redis->get($key), true);
            if($basket) {
                foreach($basket as $basketItem) {
                    $productItem = $this->em
                        ->getRepository('App:ProductItem')
                        ->find($basketItem['item_id']);
                    if($productItem) {
                        $basket[$basketItem['item_id']] = array_merge(
                            $basketItem,
                            [
                                'name' => $productItem->getName(),
                                'product_name' => $productItem->getEntity()->getName()
                            ]
                        );
                    }
                }
                return $basket;
            }
        }
        return [
            'products' => null
        ];
    }

    public function delete()
    {
        if($authKey = $this->getAuthKey()) {
            $key = 'basket::' . $this->getAuthKey();
            $this->redis->delete($key);
        }
    }
}