<?php
namespace App\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use App\Service\ImportParser;
use App\Service\ConfigService;
use App\Entity\ImportQueue;
use App\Service\Import\Importer;

class ImportProductCommand extends ContainerAwareCommand
{
    protected static $defaultName = 'lp:productimport';
    protected $importParser;
    protected $config;
    protected $importer;

    public function __construct(
        ConfigService $configService,
        ImportParser $importParser,
        Importer $importer
    ) {
        $this->config = $configService;
        $this->importParser = $importParser;
        $this->importer = $importer;
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

            $importData = $this->importParser
                ->setPath($this->_uploadDir() . $queueItem->getPath())
                ->setService($this->getContainer()->get('phpspreadsheet'))
                ->setType($queueItem->getType())
                ->process();

            $this->importer
                ->setData($importData)
                ->setType($queueItem->getTypeId())
                ->process();
        }
        $output->writeln(['Import has done']);
    }

    protected function _uploadDir()
    {
        return $this->config->get('kernel.project_dir') . $this->config->get('app.path.import_product');
    }
}