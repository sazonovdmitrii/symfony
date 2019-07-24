<?php
namespace App\Service;
use App\Entity\Address;
use App\Entity\Users;
use App\GraphQL\Input\CreateAddressInput;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManager;
use Doctrine\Common\Persistence\ObjectManager;

class AddressService extends AbstractController
{
    private $userId;

    private $addressId;

    private $data;

    public function __construct(
        EntityManager $em,
        ObjectManager $manager
    ) {
        $this->em = $em;
        $this->manager = $manager;
    }

    public function setUserId(string $userId)
    {
        $this->userId = $userId;
        return $this;
    }

    public function getUserId()
    {
        return $this->userId;
    }

    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    public function setAddressId(int $addressId)
    {
        $this->addressId = $addressId;
        return $this;
    }

    public function getAddressId()
    {
        return $this->addressId;
    }

    public function create()
    {
        $address = new Address();
        foreach(get_object_vars($this->getData()) as $attribute => $value) {
            if($value) {
                $address->setData($attribute, $value);
            }
        }
        $user = $this->em
            ->getRepository('App:Users')
            ->find($this->getUserId());

        if($user) {
            $address->setUserId($user);
        }

        $this->manager->persist($address);
        $this->manager->flush();
        return $address;
    }

    public function update()
    {
        $address = $this->em
            ->getRepository('App:Address')
            ->find($this->getAddressId());
        foreach(get_object_vars($this->getData()) as $attribute => $value) {
            if($value) {
                $address->setData($attribute, $value);
            }
        }
        $this->manager->flush();
        return $address;
    }

    public function remove()
    {
        $address = $this->em
            ->getRepository('App:Address')
            ->find($this->getAddressId());

        $this->manager->remove($address);
        $this->manager->flush();

        return $address;
    }
}