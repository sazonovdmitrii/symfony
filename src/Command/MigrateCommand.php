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
    protected $output;

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
        $this->output = $output;
        $this->products();
        $this->product_urls();
    }

    protected function product_urls()
    {
        $this->output->writeln(['Migrating Product Urls...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $urls = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM virtual_urls WHERE type IN ('product', 'product_archive') AND eid IN (SELECT id FROM products)"
        );
        $urls->execute();

        $allUrls = $urls->fetchAll();
        $counter = 0;
        foreach($allUrls as $lpUrl) {
            $counter++;
            $url = str_replace('/ru/', '', $lpUrl['url']);
            if($lpUrl['created'] == '0000-00-00 00:00:00') {
                $lpUrl['created'] = '2019-01-01 00:00:00';
            }
            $doctrine->exec(
                "
                    INSERT INTO producturl (
                        id, 
                        url, 
                        entity_id,                          
                        created
                    ) VALUES(
                        " . $lpUrl['id'] . ", 
                        '" . $url . "', 
                        " . $lpUrl['eid'] . ",                        
                        '" . $lpUrl['created'] . "'
                    )
                "
            );
            $this->output->writeln([$counter . '/' . count($allUrls)]);
        }

        $this->output->writeln(['Product Url migration have done!']);
    }

    protected function products()
    {
        $this->output->writeln(['Migrating Products...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $products = $this->_lpDoctrine->getConnection()->prepare("SELECT * FROM products");
        $products->execute();

        $doctrine->query('DELETE FROM producturl');
        $doctrine->query('DELETE FROM product');
        $allProducts = $products->fetchAll();

        $counter = 0;
        foreach($allProducts as $product) {
            $counter++;
            $name = $this->_getProductName($product['id']);
            $visible = ($product['visible']) ? 't' : 'f';
            if($product['created'] == '0000-00-00 00:00:00') {
                $product['created'] = '2019-01-01 00:00:00';
            }
            if($product['updated'] == '0000-00-00 00:00:00') {
                $product['updated'] = '2019-01-01 00:00:00';
            }
            $doctrine->exec(
                "
                    INSERT INTO product (
                        id, 
                        visible, 
                        name, 
                        price, 
                        created,
                        updated
                    ) VALUES(
                        " . $product['id'] . ", 
                        '" . $visible . "', 
                        '" . $name . "', 
                        " . $product['min_price'] . ",
                        '" . $product['created'] . "',
                        '" . $product['updated'] . "'
                    )
                "
            );
            $this->output->writeln([$counter . '/' . count($allProducts)]);
        }
        $this->output->writeln(['Products migration have done!']);
    }

    private function _getProductName(int $productId)
    {
        $products = $this->_lpDoctrine->getConnection()->prepare(
            "select * from translations where eid=".$productId." and type=9"
        );
        $products->execute();
        $productTranslation = $products->fetch();
        if(isset($productTranslation['value'])) {
            return str_replace("'", "''", $productTranslation['value']);
        }
        return '';
    }
}