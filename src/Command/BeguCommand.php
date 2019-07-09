<?php
namespace App\Command;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use App\Service\BeguService;
use App\Entity\City;
use App\Entity\Region;
use App\Entity\District;

class BeguCommand extends ContainerAwareCommand
{
    protected $beguService;
    protected $_lpDoctrine;
    protected $_defaultDoctrine;
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
        ini_set('memory_limit', '5G');
        $doctrine = $this->getContainer()->get('doctrine');

        $this->_defaultDoctrine = $doctrine->getManager();

        $manager = $doctrine->getManager();
        $this->output = $output;

        $connection = $this->_defaultDoctrine->getConnection();
        $connection->query('DELETE FROM region');
        $regions = $this->beguService
            ->setMethod('pickup/regions')
            ->getData();
        $regions = json_decode($regions, true)['data'];
        foreach($regions as $beguRegion) {
            $connection->exec(
                "
                    INSERT INTO region (
                        id,                          
                        title,
                        fias_id,
                        kladr_id
                    ) VALUES(
                        " . $beguRegion['id'] . ", 
                        '" . $beguRegion['title'] . "',
                         '" . $beguRegion['fias_id'] . "',                      
                        '" . $beguRegion['kladr_id'] . "'
                    )
                "
            );
        }

        $connection->query('DELETE FROM district');
        $districts = $this->beguService
            ->setMethod('pickup/districts')
            ->getData();
        $districts = json_decode($districts, true)['data'];
        foreach($districts as $beguDistrict) {
            $connection->exec(
                "
                    INSERT INTO district (
                        id,                          
                        title
                    ) VALUES(
                        " . $beguDistrict['id'] . ", 
                        '" . $beguDistrict['title'] . "'
                    )
                "
            );
        }

        $connection->query('DELETE FROM city');
        $cities = $this->beguService
            ->setMethod('pickup/cities')
            ->getData();
        $cities = json_decode($cities, true)['data'];
        foreach($cities as $beguCity) {
            $connection->exec(
                "
                    INSERT INTO city (
                        id,                          
                        title,
                        latitude,
                        longitude,
                        description,
                        visible,
                        short_title,
                        fias_id,
                        kladr_id,
                        region_id,
                        district_id
                    ) VALUES(
                        " . $beguCity['id'] . ", 
                        '" . $beguCity['title'] . "',
                        '" . $beguCity['latitude'] . "',
                        '" . $beguCity['longitude'] . "',
                        '" . $beguCity['description'] . "',
                        '" . $beguCity['visible'] . "',
                        '" . $beguCity['short_title'] . "',
                        '" . $beguCity['fias_id'] . "',
                        '" . $beguCity['kladr_id'] . "',
                        '" . $beguCity['region_id'] . "',
                        '" . $beguCity['district_id'] . "'
                    )
                "
            );
        }
        die('---');

        $cities = $this->beguService
            ->setMethod('pickup/cities')
            ->getData();
        $cities = json_decode($cities, true)['data'];
        foreach($cities as $beguCity) {
            $city = new City();
            $city->setTitle($beguCity['title']);
            $city->setLatitude($beguCity['latitude']);
            $city->setLongitude($beguCity['longitude']);
            $city->setDescription($beguCity['description']);
            $city->setVisible($beguCity['visible']);
            $city->setShortTitle($beguCity['short_title']);
            $city->setFiasId($beguCity['fias_id']);
            $city->setKladrId($beguCity['kladr_id']);
            $city->setRegion($beguCity['region_id']);
            $city->setDistrict($beguCity['district_id']);

            $manager->persist($city);
            $manager->flush();
            die();
        }


//        $data = $this->beguService
//            ->setMethod('pickup/cities-pvz')
//            ->getData();

//

//        $data = $this->beguService
//            ->setMethod('pickup/directions')
//            ->getData();



        print_r(json_decode($cities, true)['data'][0]);
        die('-------');
    }
}