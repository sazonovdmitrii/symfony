<?php
// src/Command/CreateUserCommand.php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class MigrateCommand extends ContainerAwareCommand
{
    protected static $defaultName = 'lp:migrate';

    protected function configure()
    {
        $this
            ->setDescription('Migrates LP')
            ->setHelp('This command done migration from lp to new database');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $doctrine = $this->getContainer()->get('doctrine');
        $lpDoctrine = $doctrine->getManager('lp_perl');
        $defaultDoctrine = $doctrine->getManager();


        $stmt = $lpDoctrine->getConnection()->prepare("SELECT * FROM urls LIMIT 50");
        $stmt->execute();

        echo "<pre>";
        print_r($stmt->fetchAll());
        die();





        var_dump($defaultDoctrine->getConnection()->getDatabase());
        var_dump($lpDoctrine->getConnection()->getDatabase());
//        var_dump(get_class($doctrine));
//        die();
//        $em = $this->container->get('doctrine')->getManager();
//        $this->ge
//        echo "<pre>";
//        print_r($this->getApplication());
//        print_r(get_class_methods($this));
//        die();
////        var_dump($this->getDoctrine());
    }
}