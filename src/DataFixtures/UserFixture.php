<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\User;

class UserFixture extends Fixture
{
    private $passwordEncoder;

     public function __construct(UserPasswordEncoderInterface $passwordEncoder)
     {
         $this->passwordEncoder = $passwordEncoder;
     }
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setEmail('sazon@nxt.ru');
        $user->setPassword($this->passwordEncoder->encodePassword(
            $user,
            'everest1024'
            )
        );
        $user->setRoles(
            ['ROLE_ADMIN']
        );
        $manager->persist($user);
        $manager->flush();
    }
}
