<?php
namespace App\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use App\Service\ImportParser;
use App\Entity\ImportQueue;

class ImportProductCommand extends ContainerAwareCommand
{
    protected static $defaultName = 'lp:productimport';
    protected $importParser;

    public function __construct(ImportParser $importParser)
    {
        $this->importParser = $importParser;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setDescription('Import Products process')
            ->setHelp('This command imports products from XLS files (Queue)');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $importQueueRepository = $this->getContainer()
            ->get('doctrine')
            ->getRepository(ImportQueue::class);

        $queue = $importQueueRepository->findAll();
        foreach($queue as $queueItem) {
            $this->importParser
                ->setPath($queueItem->getPath())
                ->process();
        }
        $output->writeln(['Import has done']);
    }
}