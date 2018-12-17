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

        $user = new Urls();
        $user->setType('product');
        $user->setUrl('/cosmetics-sredstva-dlja-volos-dopolnitelnyi-uhod-maski/-green-pharma-maska-dlya-dolgogo-sohraneniya-cveta-okrashennyh-volos-3568.htm');
        $user->setEid('43360');

        $manager->persist($user);
        $manager->flush();
    }
}
