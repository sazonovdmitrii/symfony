<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\Users;

class UserProfileFixtures extends Fixture
{
    private $passwordEncoder;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    public function load(ObjectManager $manager)
    {
        $user = new Users();
        $user->setEmail('ai@robo.ru');
        $user->setPassword($this->passwordEncoder->encodePassword(
            $user,
            '123'
        )
        );
        $user->setRoles(
            ['ROLE_USER']
        );
        $manager->persist($user);
        $manager->flush();
    }
}
