<?php
// src/Command/CreateUserCommand.php
namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Doctrine\Common\Persistence\ObjectManager;
use App\Service\AlfaBankService;

class AlfaCheckTest extends Command
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:alfacheck';

    protected $alfaService;
    protected $_lpDoctrine;
    protected $_defaultDoctrine;

    protected function configure()
    {
        $this
            ->setDescription('Alfabank check')
            ->setHelp('This command checks request to register order alfabank');
    }

    public function __construct(AlfaBankService $alfaService)
    {
        $this->alfaService = $alfaService;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output )
    {
        $content = [
            'amount' => 100000,# цена в копейках
            'currency'  => 810,# код валюты
           # 'jsonParams' => ['orderNumber' => 2],
            'orderNumber' => '3_1',# внутренний id типа order_id + transaction_cnt
            'userName'  => $this->alfaService->getLogin(),
            'password' => $this->alfaService->getPassword(),
            'returnUrl' => 'https://www.laparfumerie.ru/order/success/'
        ];
        $this->alfaService
            ->setContent($content);
        ;
        $payments = $this->alfaService
            ->setMethod('register.do')
            ->getData();
        print_r($payments);
        $this->alfaService->setTransaction('Alfabank','3',$payments);#придется реально передать заказ
        die();
    }
}
