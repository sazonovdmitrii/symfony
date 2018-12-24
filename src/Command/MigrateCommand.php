<?php
// src/Command/CreateUserCommand.php
namespace App\Command;

use App\Entity\Urls;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class MigrateCommand extends ContainerAwareCommand
{
    protected static $defaultName = 'lp:migrate';
    protected $_lpDoctrine;
    protected $_defaultDoctrine;
    protected function configure()
    {
        $this
            ->setDescription('Migrates LP')
            ->setHelp('This command done migration from lp to new database');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        ini_set('memory_limit', '5G');
        $doctrine = $this->getContainer()->get('doctrine');
        $this->_lpDoctrine = $doctrine->getManager('lp_perl');
        $this->_defaultDoctrine = $doctrine->getManager();

        $this->urls($output);
    }

    protected function urls(OutputInterface $output)
    {
        $output->writeln(['Migrating Urls...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $urls = $this->_lpDoctrine->getConnection()->prepare("SELECT * FROM virtual_urls");
        $urls->execute();

        $doctrine->query('DELETE FROM urls');
        $doctrine->beginTransaction();

        foreach($urls->fetchAll() as $lpUrl) {
            $url = str_replace('/ru/', '', $lpUrl['url']);
            $doctrine->exec(
                "
                    INSERT INTO urls (
                        id, 
                        url, 
                        eid, 
                        type, 
                        created
                    ) VALUES(
                        " . $lpUrl['id'] . ", 
                        '" . $url . "', 
                        " . $lpUrl['eid'] . ",
                        '" . $lpUrl['type'] . "',
                        '" . $lpUrl['created'] . "'
                    )
                "
            );
        }
        $doctrine->commit();

        $output->writeln(['Url migration have done!']);
    }
}