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

    public function setData(CreateAddressInput $data)
    {
        $this->data = $data;
        return $this;
    }

    public function getData()
    {
        return $this->data;
    }

    /**
     *
     */
    public function create()
    {
        $address = new Address();
        foreach(get_object_vars($this->getData()) as $attribute => $value) {
            if($value) {
                $address->setData($attribute, $value);
            }
        }
        $user = $this->em->getRepository('App:Users')->find($this->getUserId());
        if($user) {
            $address->setUserId($user);
        }
        $this->manager->persist($address);
        $this->manager->flush();
        return $address;
    }
}