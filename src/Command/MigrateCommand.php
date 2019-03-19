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
        $this->catalogs();
        $this->catalog_urls();
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

    protected function catalog_urls()
    {
        $this->output->writeln(['Migrating Catalog Urls...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $urls = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM virtual_urls WHERE type IN ('catalog', 'catalog_archive') AND eid IN (SELECT id FROM catalog)"
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
                    INSERT INTO catalogurl (
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

        $this->output->writeln(['Catalog Url migration have done!']);
    }

    protected function catalogs()
    {
        $this->output->writeln(['Migrating Catalogs...']);

        $doctrine = $this->_defaultDoctrine->getConnection();
        $catalogs = $this->_lpDoctrine->getConnection()->prepare("SELECT * FROM catalog");
        $catalogs->execute();

        $doctrine->query('DELETE FROM catalogurl');
        $doctrine->query('DELETE FROM catalog');
        $allCatalogs = $catalogs->fetchAll();

        $counter = 0;
        foreach($allCatalogs as $catalog) {
            $counter++;
            $name = $this->_getCatalogName($catalog['id']);
            $visible = ($catalog['visible']) ? 't' : 'f';
            $brand = ($catalog['brand']) ? 't' : 'f';
            if($catalog['created'] == '0000-00-00 00:00:00') {
                $catalog['created'] = '2019-01-01 00:00:00';
            }
            if($catalog['updated'] == '0000-00-00 00:00:00') {
                $catalog['updated'] = '2019-01-01 00:00:00';
            }
            $doctrine->exec(
                "
                    INSERT INTO catalog (
                        id, 
                        pid,
                        visible, 
                        name,                          
                        created,
                        updated,
                        brand
                    ) VALUES(
                        " . $catalog['id'] . ",
                         " . $catalog['pid'] . ", 
                        '" . $visible . "', 
                        '" . $name . "',                         
                        '" . $catalog['created'] . "',
                        '" . $catalog['updated'] . "',
                        '" . $brand . "'
                    )
                "
            );
            $this->output->writeln([$counter . '/' . count($allCatalogs)]);
        }
        $this->output->writeln(['Catalogs migration have done!']);
    }

    private function _getProductName(int $productId)
    {
        $products = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM translations WHERE eid=".$productId." AND type=9"
        );
        $products->execute();
        $productTranslation = $products->fetch();
        if(isset($productTranslation['value'])) {
            return str_replace("'", "''", $productTranslation['value']);
        }
        return '';
    }

    private function _getCatalogName(int $catalogId)
    {
        $products = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM translations WHERE eid=".$catalogId." AND type=1"
        );
        $products->execute();
        $productTranslation = $products->fetch();
        if(isset($productTranslation['value'])) {
            return str_replace("'", "''", $productTranslation['value']);
        }
        return '';
    }
}