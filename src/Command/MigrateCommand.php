<?php
// src/Command/CreateUserCommand.php
namespace App\Command;

use App\Entity\Urls;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use App\Entity\Users;

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
        $this->sales();
        $this->tags();
        $this->tags_to_products();
        $this->users();
        $this->users_addresses();
        $this->catalog_products();
        $this->product_items();
        $this->catalogs();
        $this->catalog_urls();
        $this->catalog_brands_aromas();
        $this->products();
        $this->product_urls();
    }


    protected function sales()
    {
        $this->output->writeln(['Migrating Sales...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $doctrine = $this->_defaultDoctrine->getConnection();
        $doctrine->query('DELETE FROM sale');

        $sales = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM sales"
        );
        $sales->execute();

        $allSales = $sales->fetchAll();

        $counter = 0;
        foreach($allSales as $allSale) {
            $counter++;
//            $url = str_replace('/ru/', '', $lpUrl['url']);
            if($allSale['date_start'] == '0000-00-00') {
                $allSale['date_start'] = '2017-01-01';
            }
            if($allSale['date_end'] == '0000-00-00') {
                $allSale['date_end'] = '2017-01-01';
            }
            $doctrine->exec(
                "
                    INSERT INTO sale(
                        id, 
                        start, 
                        finish,                          
                        discount,
                        enabled,
                        featured,
                        type,
                        prior,
                        created
                    ) VALUES(
                        " . $allSale['id'] . ", 
                        '" . $allSale['date_start'] . "', 
                        '" . $allSale['date_end'] . "',                        
                        '" . $allSale['discount'] . "',
                        '" . $allSale['enable'] . "',
                        '" . $allSale['show_on_main'] . "',
                        '" . $allSale['type'] . "',
                        '" . $allSale['prior'] . "',
                        '" . $allSale['created'] . "'
                    )
                "
            );
            $this->output->writeln([$counter . '/' . count($allSales)]);
        }

        $this->output->writeln(['Sales migration have done!']);
    }

    protected function catalog_brands_aromas()
    {
        $this->output->writeln(['Migrating Catalogs...']);

        $doctrine = $this->_defaultDoctrine->getConnection();
        $doctrine->query('DELETE FROM producttagitem_catalog');

        $catalogs = $this->_lpDoctrine->getConnection()->prepare("SELECT * FROM catalog WHERE is_aroma > 0");
        $catalogs->execute();
        $allCatalogs = $catalogs->fetchAll();
        $counter = 0;
        foreach($allCatalogs as $catalog) {
            $products = $this->_lpDoctrine->getConnection()->prepare("SELECT * FROM catalog_2_products WHERE cat_id = " . $catalog['id']);
            $products->execute();
            $products = $products->fetchAll();
            $aromats  = [];
            foreach ($products as $product) {
                $tags = $this->_lpDoctrine->getConnection()->prepare("select * from tags_to where eid = " . $product['prod_id'] . " AND tag_id IN (SELECT t.id FROM tags t JOIN translations tr ON tr.eid=t.id AND tr.type = 15 WHERE t.left_key > 2178 AND t.level = 2 AND t.right_key < 15879 AND t.id <> 15879 AND t.id <> 2178) LIMIT 5");
                $tags->execute();
                $tags = $tags->fetchAll();
                foreach ($tags as $tag) {
                    $aromats[] = $tag['tag_id'];
                }
            }
            $values = array_count_values($aromats);
            arsort($values);
            $aromat = array_slice(array_keys($values), 0, 1, true);
            if (count($aromat)) {
                $aromatId       = $aromat[0];
                $productTagItem = $this->_defaultDoctrine->getRepository('App:ProductTagItem')->find($aromatId);
                $catalog        = $this->_defaultDoctrine->getRepository('App:Catalog')->find($catalog['id']);
                $catalog->addProductTagItem($productTagItem);
                $this->_defaultDoctrine->persist($catalog);
                $this->_defaultDoctrine->flush();
            }
            $this->output->writeln([$counter . '/' . count($allCatalogs)]);
            $counter++;
        }

        $catalogs = $this->_lpDoctrine->getConnection()->prepare("SELECT * FROM catalog WHERE brand > 0");
        $catalogs->execute();
        $allCatalogs = $catalogs->fetchAll();
        $counter = 0;
        foreach($allCatalogs as $catalog) {

                $products = $this->_lpDoctrine->getConnection()->prepare("SELECT * FROM catalog_2_products WHERE cat_id = ". $catalog['id']);
                $products->execute();
                $products = $products->fetchAll();
                $aromats = [];
                foreach($products as $product) {
                    $tags = $this->_lpDoctrine->getConnection()->prepare("select * from tags_to where eid = ".$product['prod_id'] . " AND tag_id IN (SELECT t.id FROM tags t JOIN translations tr ON tr.eid=t.id AND tr.type = 15 WHERE t.left_key > 1 AND t.level = 2 AND t.right_key < 2177 AND t.id <> 2177 AND t.id <> 1) LIMIT 5");
                    $tags->execute();
                    $tags = $tags->fetchAll();
                    foreach($tags as $tag) {
                        $aromats[] = $tag['tag_id'];
                    }
                }
                $values = array_count_values($aromats);
                arsort($values);
                $aromat = array_slice(array_keys($values), 0, 1, true);
                if(count($aromat)) {
                    $aromatId = $aromat[0];
                    $productTagItem = $this->_defaultDoctrine->getRepository('App:ProductTagItem')->find($aromatId);
                    $catalog = $this->_defaultDoctrine->getRepository('App:Catalog')->find($catalog['id']);
                    $catalog->addProductTagItem($productTagItem);
                    $this->_defaultDoctrine->persist($catalog);
                    $this->_defaultDoctrine->flush();
                }
                $this->output->writeln([$counter . '/' . count($allCatalogs)]);

            $counter++;
        }

        $this->output->writeln(['Catalogs migration have done!']);
    }

    protected function tags_to_products()
    {
        $this->output->writeln(['Migrating Products To Tags...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $tags = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM tags_to WHERE type = 1 AND eid IN (SELECT id FROM products) AND tag_id IN (SELECT id FROM tags WHERE level = 2)"
        );
        $tags->execute();

        $doctrine->query('DELETE FROM product_producttagitem');

        $statement = $this->_defaultDoctrine->getConnection()->prepare('SELECT id FROM producttagitem');
        $statement->execute();
        $allCurrentTags = $statement->fetchAll();
        $allCurrentTagsIds = [];
        foreach($allCurrentTags as $allCurrentTag) {
            $allCurrentTagsIds[] = $allCurrentTag['id'];
        }
        $allTags = $tags->fetchAll();
        $counter = 0;
        $wrongTagsIds = [];
        foreach($allTags as $tag) {
            if(in_array($tag['tag_id'], $allCurrentTagsIds)) {
                $counter++;
                $doctrine->exec(
                    "
                    INSERT INTO product_producttagitem (
                        producttagitem_id,                          
                        product_id
                    ) VALUES(
                        " . $tag['tag_id'] . ", 
                        '" . $tag['eid'] . "'
                    )
                "
                );
                $this->output->writeln([$counter . '/' . count($allTags)]);
            } else {
                $wrongTagsIds[] = $tag['tag_id'];
            }
        }
        print_r($wrongTagsIds);
        $this->output->writeln(['Tags To Products migration have done!']);
    }

    protected function tags()
    {
        $this->output->writeln(['Migrating Tags...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $tags = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT t.id, tr.value, t.left_key, t.right_key, t.created FROM tags t JOIN translations tr ON tr.eid=t.id AND tr.type=15 WHERE t.level = 1"
        );
        $tags->execute();

        $doctrine->query('DELETE FROM producttagitem');
        $doctrine->query('DELETE FROM producttag');
        $allTags = $tags->fetchAll();

        $counter = 0;
        $allTagsItemsIds = [];
        foreach($allTags as $tag) {
            $leftKey = $tag['left_key'];
            $rightKey = $tag['right_key'];


            $tagSlug = $this->_lpDoctrine->getConnection()->prepare(
                "SELECT * FROM translations WHERE eid=" . $tag['id'] . " AND type=35"
            );
            $tagSlug->execute();
            $tagSlug = $tagSlug->fetch();

            $tagsItems = $this->_lpDoctrine->getConnection()->prepare("
                SELECT tr.value, t.id, t.created FROM tags t JOIN translations tr ON tr.eid=t.id AND tr.type = 15 WHERE t.left_key > " . $leftKey . " AND t.level = 2 AND t.right_key < " . $rightKey . " AND t.id <> " . $rightKey . " AND t.id <> " . $leftKey
            );
            $tagsItems->execute();
            $allTagsItems = $tagsItems->fetchAll();
            $counter++;
            $doctrine->exec(
                "
                    INSERT INTO producttag (
                        id,                          
                        name,
                        created,
                        type,
                        slug,
                        visible
                    ) VALUES(
                        " . $tag['id'] . ", 
                        '" . $tag['value'] . "',
                         '" . $tag['created'] . "',
                        'enum',
                        '" . $tagSlug['value'] . "',
                        'Yes'
                    )
                "
            );

            foreach($allTagsItems as $allTagsItem) {
                if(in_array($allTagsItem['id'], $allTagsItemsIds)) {
                    $allTagsItem['id'] += 10000;
                }
                $tagSlug = $this->_lpDoctrine->getConnection()->prepare(
                    "SELECT * FROM translations WHERE eid=" . $allTagsItem['id'] . " AND type=35"
                );
                $tagSlug->execute();
                $tagSlug = $tagSlug->fetch();
                $allTagsItemsIds[] = $allTagsItem['id'];
                        $doctrine->exec(
                            "
                                INSERT INTO producttagitem (
                                    id,                          
                                    entity_id_id,
                                    name,
                                    slug,
                                    created                        
                                ) VALUES(
                                    " . $allTagsItem['id'] . ", 
                                    '" . $tag['id'] . "',
                                    '" . str_replace("'", "", $allTagsItem['value']) . "',
                                    '" . $tagSlug['value'] . "',
                                     '" . $allTagsItem['created'] . "'                        
                                )
                            "
                        );
                    $result[] = $allTagsItem['id'];
            }
            print_r($tag);
            $this->output->writeln([$counter . '/' . count($allTags)]);
        }
        $this->output->writeln(['Tags migration have done!']);
    }

    protected function users()
    {
        $diff = 0;
        $this->output->writeln(['Migrating Users...']);
        $users = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM users"
        );
        $users->execute();

        $doctrine = $this->_defaultDoctrine->getConnection();
        $doctrine->query('DELETE FROM users WHERE id > ' . $diff);

        $allUsers = $users->fetchAll();
        $passwordEncoder = $this->getContainer()->get('security.password_encoder');
        $counter = 0;
        foreach($allUsers as $lpUser) {
            $counter++;
            if($counter > $diff) {
                //            if($lpUser['id'] > $diff) {
                $user = new Users();
                $user->setEmail($lpUser['email']);
                $user->setPassword($passwordEncoder->encodePassword(
                    $user,
                    $lpUser['password']
                )
                );
                $roles = ['ROLE_USER'];
                if($lpUser['is_admin']) {
                    $roles = ['ROLE_ADMIN'];
                }
                $user->setRoles($roles);
                $this->_defaultDoctrine->persist($user);
                $this->_defaultDoctrine->flush();
                $this->output->writeln([$counter . '/' . count($allUsers) . ' ----- ' . $lpUser['id']]);
//            }
            }

        }
        $this->output->writeln(['Users migration have done!']);
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
                        entity_id_id,                          
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

    protected function product_items()
    {
        $this->output->writeln(['Migrating Products Items...']);

        $doctrine = $this->_defaultDoctrine->getConnection();

        $productsItems = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM products_items WHERE prod_id IN (SELECT id FROM products)"
        );
        $doctrine->query('DELETE FROM productitem');
        $productsItems->execute();

        $allProductsItems = $productsItems->fetchAll();

        $counter = 0;
        foreach($allProductsItems as $productsItem) {
            $counter++;
            $name = $this->_getProductItemName($productsItem['id']);
            $visible = ($productsItem['available']) ? 't' : 'f';
            if($productsItem['created'] == '0000-00-00 00:00:00') {
                $productsItem['created'] = '2019-01-01 00:00:00';
            }
            if($productsItem['updated'] == '0000-00-00 00:00:00') {
                $productsItem['updated'] = '2019-01-01 00:00:00';
            }
            $doctrine->exec(
                "
                    INSERT INTO productitem (
                        id, 
                        entity_id,
                        status, 
                        name, 
                        avarda_id, 
                        created,
                        updated
                    ) VALUES(
                        " . $productsItem['id'] . ",
                         " . $productsItem['prod_id'] . ",
                        '" . $visible . "', 
                        '" . $name . "', 
                        " . $productsItem['avarda_id'] . ",
                        '" . $productsItem['created'] . "',
                        '" . $productsItem['updated'] . "'
                    )
                "
            );
            $this->output->writeln([$counter . '/' . count($allProductsItems) . '-----' . $productsItem['id']]);
        }
        $this->output->writeln(['Migrating Products Items have done!']);
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

    private function _getProductItemName(int $productItemId)
    {
        $translation = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM translations WHERE eid=".$productItemId." AND type=14"
        );
        $translation->execute();
        $productTranslation = $translation->fetch();
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

    public function catalog_products()
    {
        $this->output->writeln(['Migrating Catalog Products...']);
        $catalogProducts = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT * FROM catalog_2_products WHERE cat_id IN (
                SELECT id FROM catalog
            ) AND prod_id IN (
                SELECT id FROM products
            )"
        );
        $catalogProducts->execute();

        $doctrine = $this->_defaultDoctrine->getConnection();
        $doctrine->query('DELETE FROM product_catalog');

        $allCatalogProducts = $catalogProducts->fetchAll();
        $counter = 0;
        foreach($allCatalogProducts as $catalogProduct) {
            $counter++;
            $doctrine->exec(
                "
                    INSERT INTO product_catalog (
                        product_id, 
                        catalog_id
                    ) VALUES(
                        " .  $catalogProduct['prod_id'] . ",
                         " . $catalogProduct['cat_id'] . "
                    )
                "
            );
            $this->output->writeln([$counter . '/' . count($allCatalogProducts) . '-----' . $catalogProduct['id']]);
        }
    }

    public function users_addresses()
    {
        $this->output->writeln(['Migrating Users Addresses...']);
        $usersAddresses = $this->_lpDoctrine->getConnection()->prepare(
            "SELECT ua.*, u.email FROM users_addresses ua JOIN users u ON u.id = ua.users_id"
        );
        $usersAddresses->execute();

        $doctrine = $this->_defaultDoctrine->getConnection();
        $doctrine->query('DELETE FROM address');
        $allUsersAddresses = $usersAddresses->fetchAll();
        $counter = 0;
        $users = $this->_defaultDoctrine->getConnection()->prepare(
            "SELECT id, email FROM users"
        );
        $users->execute();
        $allUsers = $users->fetchAll();
        $usersIds = [];
        foreach($allUsers as $allUser) {
            $usersIds[$allUser['email']] = $allUser['id'];
        }
        foreach($allUsersAddresses as $usersAddress) {
            $usersAddress['options'] = json_decode($usersAddress['options']);
            if($usersAddress['options']) {
                foreach($usersAddress['options'] as $keyOption => $valueOption) {
                    $usersAddress[$keyOption] = $valueOption;
                }
            }

            $userId = 0;
            if(isset($usersIds[$usersAddress['email']])) {
                $userId = $usersIds[$usersAddress['email']];
            }
            $counter++;
            if($userId) {
                $counter++;
                $doctrine->exec(
                    "
                    INSERT INTO address (
                        id,   
                        name,                                             
                        created,
                        user_id_id, 
                        person,
                        zip,
                        region_id,
                        city,
                        street,
                        house,
                        corp,
                        level,
                        flat,
                        code,                        
                        active                      
                    ) VALUES(
                        " .  $usersAddress['id'] . ",
                        '" .  str_replace("'", "", $usersAddress['address']) . "',
                        '" .  $usersAddress['created'] . "',
                        " . $userId . ", 
                        '" .  str_replace("'", "", $usersAddress['person']) . "',
                        '" .  $usersAddress['post_code'] . "',
                        '" .  (isset($usersAddress['region_id']) ? $usersAddress['region_id'] : 0) . "',
                        '" .  str_replace("'", "", $usersAddress['city']) . "',
                        '" .  str_replace("'", "", $usersAddress['street']) . "',
                        '" .  (isset($usersAddress['corp']) ? $usersAddress['corp'] : '') . "',
                        '" .  (isset($usersAddress['corp']) ? $usersAddress['corp'] : '') . "',
                        '" .  (isset($usersAddress['level']) ? $usersAddress['level'] : '') . "',
                        '" .  (isset($usersAddress['flat']) ? str_replace("'", "", $usersAddress['flat']) : '') . "',
                        '" .  (isset($usersAddress['code']) ? $usersAddress['code'] : '') . "',
                        '1'
                    )
                "
                );
                $this->output->writeln([$counter . '/' . count($allUsersAddresses) . '-----' . $usersAddress['id']]);
            }

        }
    }
}