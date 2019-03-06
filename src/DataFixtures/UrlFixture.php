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

//        $this->setReference()
//        echo "<pre>";
//        print_r($this->referenceRepository->getReferenceNames());
//        print_r(get_class_methods($manager));
//        die();
        /*var_dump($this->referenceRepository->getManager('lp_perl')->getConnection()->getDatabase());
        die();
        print_r(get_class_methods($this));
        print_r(get_class_methods($manager));
        die();*/
//        $test = $this->controller->getDoctrine();
//        var_dump(get_class($this->controller));
//        die();
//        echo "<pre>";
//        var_dump($manager->getRepository('Urls', 'lp_perl'));
//        die();

//        $connection = $manager->getConnection('lp_perl');
//        echo "<pre>";
//        var_dump($connection->getDatabase());
//        var_dump(get_class($manager));
//        print_r(get_class_methods($manager));
//        print_r(get_class_methods($connection));
//        die();
//        $statement = $connection->prepare("SELECT id FROM virtual_urls LIMIT 50");
////        $statement->bindValue('id', 123);
//        $statement->execute();
//        $results = $statement->fetchAll();
//        print_r($results);
//        die();
//        $controller = new Controller();
//        var_dump(get_class($controller));
//        die();
//        var_dump($this->doctrine);
//        die();
//        $this->load('manager'); die();
//        Doctrine\
//        $this->getReference('doctrine');
//        die();
//        var_dump(get_class($manager->getDoctrine()->getManager('customer')));
//        die();
        $user = new Urls();
        $user->setType('catalog');
        $user->setUrl('parfumeriya-dlja-zhenshhin');
        $user->setEid('23');

        $manager->persist($user);
        $manager->flush();

        $user = new Urls();
        $user->setType('product');
        $user->setUrl('cosmetics-sredstva-dlja-volos-dopolnitelnyi-uhod-maski/-green-pharma-maska-dlya-dolgogo-sohraneniya-cveta-okrashennyh-volos-3568.htm');
        $user->setEid('43360');

        $manager->persist($user);
        $manager->flush();
    }
}
