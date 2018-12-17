<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\Urls;

class UrlFixture extends Fixture
{
    private $passwordEncoder;

     public function __construct(UserPasswordEncoderInterface $passwordEncoder)
     {
         $this->passwordEncoder = $passwordEncoder;
     }
    public function load(ObjectManager $manager)
    {
        $user = new Urls();
        $user->setType('catalog');
        $user->setUrl('parfumeriya-dlja-zhenshhin');
        $user->setEid('23');

        $manager->persist($user);
        $manager->flush();
    }
}
