<?php
namespace App\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use App\Service\BeguService;

class BeguCommand extends ContainerAwareCommand
{
    protected $beguService;

    protected static $defaultName = 'begu:pull';

    protected function configure()
    {
        $this
            ->setDescription('Begu integration')
            ->setHelp('This command pull all data from begu');
    }

    public function __construct(BeguService $beguService)
    {
        $this->beguService = $beguService;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $data = $this->beguService
            ->setMethod('pickup/cities-pvz')
            ->getData();
        print_r(json_decode($data, true)['data'][0]);
        die('-------');
    }
}