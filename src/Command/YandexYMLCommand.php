<?php
// src/Command/CreateUserCommand.php
namespace App\Command;

use App\Entity\Product;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Bukashk0zzz\YmlGenerator\Model\Offer\OfferSimple;
use Bukashk0zzz\YmlGenerator\Model\Category;
use Bukashk0zzz\YmlGenerator\Model\Currency;
use Bukashk0zzz\YmlGenerator\Model\Delivery;
use Bukashk0zzz\YmlGenerator\Model\ShopInfo;
use Bukashk0zzz\YmlGenerator\Settings;
use Bukashk0zzz\YmlGenerator\Generator;

class YandexYMLCommand extends ContainerAwareCommand
{
    // the name of the command (the part after "bin/console")
    protected static $defaultName = 'app:yandexyml';

    protected function configure()
    {
        $this
        ->setDescription('YandexYml generator')
        ->setHelp('This command generate yandex.xml fid');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $doctrine = $this->getContainer()->get('doctrine');
//        $products = $doctrine->getRepository(Product::class)->findAll();
//        foreach($products as $product) {
//            var_dump($product->getId());
//            var_dump(get_class_methods($product));
//            die();
//        }

        $file = 'public/YMLGenerator.xml';
        $settings = (new Settings())
            ->setOutputFile($file)
            ->setEncoding('UTF-8')
        ;

// Creating ShopInfo object (https://yandex.ru/support/webmaster/goods-prices/technical-requirements.xml#shop)
        $shopInfo = (new ShopInfo())
            ->setName('BestShop')
            ->setCompany('Best online seller Inc.')
            ->setUrl('http://www.best.seller.com/')
        ;

// Creating currencies array (https://yandex.ru/support/webmaster/goods-prices/technical-requirements.xml#currencies)
        $currencies = [];
        $currencies[] = (new Currency())
            ->setId('USD')
            ->setRate(1)
        ;

// Creating categories array (https://yandex.ru/support/webmaster/goods-prices/technical-requirements.xml#categories)
        $categories = [];
        $categories[] = (new Category())
            ->setId(1)
            ->setName('Test Category Name')
        ;

// Creating offers array (https://yandex.ru/support/webmaster/goods-prices/technical-requirements.xml#offers)
        $offers = [];
        $offers[] = (new OfferSimple())
            ->setId(12346)
            ->setAvailable(true)
            ->setUrl('http://www.best.seller.com/product_page.php?pid=12348')
            ->setPrice('1231231231')
            ->setCurrencyId('USD')
            ->setCategoryId(1)
            ->setDelivery(false)
            ->setName('Best product ever')
        ;

// Optional creating deliveries array (https://yandex.ru/support/partnermarket/elements/delivery-options.xml)
        $deliveries = [];
        $deliveries[] = (new Delivery())
            ->setCost(2)
            ->setDays(1)
            ->setOrderBefore(14)
        ;

        (new Generator($settings))->generate(
            $shopInfo,
            $currencies,
            $categories,
            $offers,
            $deliveries
        );
    }
}
