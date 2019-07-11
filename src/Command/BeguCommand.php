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
        $connection->query('DELETE FROM courier_paymentmethod');
        $connection->query('DELETE FROM pickup_paymentmethod');
        $connection->query('DELETE FROM pickup');
        $connection->query('DELETE FROM courier');
        $connection->query('DELETE FROM paymentmethod');
        $connection->query('DELETE FROM city');
        $connection->query('DELETE FROM region');
        $connection->query('DELETE FROM direction');

        $payments = $this->beguService
            ->setMethod('pickup/paymethods')
            ->getData();
        $payments = json_decode($payments, true)['data'];
        foreach($payments as $beguPayment) {
            $connection->exec(
                "
                    INSERT INTO paymentmethod (
                        id,                          
                        name,
                        visible
                    ) VALUES(
                        " . $beguPayment['id'] . ", 
                        '" . $beguPayment['title'] . "',
                         '" . $beguPayment['visible'] . "'
                    )
                "
            );
        }

        $directions = $this->beguService
            ->setMethod('pickup/directions')
            ->getData();
        $directions = json_decode($directions, true)['data'];
        $directionsIds = [];
        foreach($directions as $beguDirection) {
            $directionsIds[] = $beguDirection['id'];
            $connection->exec(
                "
                    INSERT INTO direction (
                        id,                          
                        avarda_id,
                        title,
                        price,
                        delivery_days,
                        visible,
                        comment
                    ) VALUES(
                        " . $beguDirection['id'] . ", 
                        '" . $beguDirection['avarda_id'] . "',
                         '" . $beguDirection['title'] . "',                      
                        '" . $beguDirection['price'] . "',
                        '" . $beguDirection['delivery_days'] . "',
                        '" . $beguDirection['visible'] . "',
                        '" . $beguDirection['comment'] . "'
                    )
                "
            );
        }

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


        $cities = $this->beguService
            ->setMethod('pickup/cities')
            ->getData();
        $cities = json_decode($cities, true)['data'];
        $citiesIds = [];
        foreach($cities as $beguCity) {
            $citiesIds[] = $beguCity['id'];
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
                        '" . (float)$beguCity['latitude'] . "',
                        '" . (float)$beguCity['longitude'] . "',
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

        $pickups = $this->beguService
            ->setMethod('pickup/cities-pvz')
            ->getData();
        $pickups = json_decode($pickups, true)['data'];
        $connection->query('DELETE FROM pickup');
        foreach($pickups as $beguPickup) {
            if(!in_array($beguPickup['city_id'], $citiesIds)) {
                continue;
            }
            $connection->exec(
                "
                    INSERT INTO pickup (
                        id,                          
                        avarda_id,
                        direction_id,
                        direction_title,
                        city_id,
                        city_title,
                        city_short_title,
                        city_latitude,
                        city_longitude,
                        city_kladr,
                        city_fias,
                        post_code,
                        address,
                        comment,
                        price,
                        latitude,
                        longitude,
                        phones,
                        schedule,
                        delivery_days,
                        delivery_days_source,
                        min_order_sum,
                        retail,
                        pvz_id,
                        pvz_title,
                        visible                     
                    ) VALUES(
                        " . $beguPickup['id'] . ",
                         '" . $beguPickup['avarda_id'] . "',
                        '" . $beguPickup['direction_id'] . "',
                        '" . $beguPickup['direction_title'] . "',
                        '" . $beguPickup['city_id'] . "',
                        '" . $beguPickup['city_title'] . "',
                        '" . $beguPickup['city_short_title'] . "',
                        '" . (float)$beguPickup['city_latitude'] . "',
                        '" . (float)$beguPickup['city_longitude'] . "',
                        '" . $beguPickup['city_kladr'] . "',
                        '" . $beguPickup['city_fias'] . "',
                        '" . (int)$beguPickup['post_code'] . "',
                        '" . $beguPickup['address'] . "',
                        '" . str_replace("'", "", $beguPickup['comment']) . "',
                        '" . $beguPickup['price'] . "',
                        '" . (float)$beguPickup['latitude'] . "',
                        '" . (float)$beguPickup['longitude'] . "',
                        '" . $beguPickup['phones'] . "',
                        '" . $beguPickup['schedule'] . "',
                        '" . $beguPickup['delivery_days'] . "',
                        '" . $beguPickup['delivery_days_source'] . "',
                        '" . $beguPickup['min_order_sum'] . "',
                        '" . $beguPickup['retail'] . "',
                        '" . $beguPickup['pvz_id'] . "',
                        '" . $beguPickup['pvz_title'] . "',
                        '" . $beguPickup['visible'] . "'                                            
                    )
                "
            );
            foreach($beguPickup['payment_methods'] as $beguPickupPaymentMethod) {
                $connection->exec(
                    "
                    INSERT INTO pickup_paymentmethod (
                        pickup_id,                          
                        paymentmethod_id
                    ) VALUES(
                        " . $beguPickup['id'] . ", 
                        '" . $beguPickupPaymentMethod['id'] . "'
                    )
                "
                );
            }
        }

        $couriers = $this->beguService
            ->setMethod('pickup/courier-directions')
            ->getData();
        $couriers = json_decode($couriers, true)['data'];
        $connection->query('DELETE FROM courier');
        foreach($couriers as $beguCourier) {
            if(!in_array($beguCourier['city_id'], $citiesIds)) {
                continue;
            }
            if(!in_array($beguCourier['direction_id'], $directionsIds)) {
                continue;
            }
            $connection->exec(
                "
                    INSERT INTO courier (
                        id,                          
                        avarda_id,
                        direction_id,
                        direction_title,
                        city_id,
                        city_title,
                        city_short_title,
                        city_latitude,
                        city_longitude,
                        city_kladr,
                        city_fias,
                        post_code,
                        address,
                        comment,
                        price,
                        latitude,
                        longitude,
                        phones,
                        schedule,
                        delivery_days,
                        delivery_days_source,
                        min_order_sum,
                        retail,
                        pvz_id,
                        pvz_title,
                        visible                     
                    ) VALUES(
                        " . $beguCourier['id'] . ",
                         '" . $beguCourier['avarda_id'] . "',
                        '" . $beguCourier['direction_id'] . "',
                        '" . $beguCourier['direction_title'] . "',
                        '" . $beguCourier['city_id'] . "',
                        '" . $beguCourier['city_title'] . "',
                        '" . $beguCourier['city_short_title'] . "',
                        '" . (float)$beguCourier['city_latitude'] . "',
                        '" . (float)$beguCourier['city_longitude'] . "',
                        '" . $beguCourier['city_kladr'] . "',
                        '" . $beguCourier['city_fias'] . "',
                        '" . (int)$beguCourier['post_code'] . "',
                        '" . $beguCourier['address'] . "',
                        '" . str_replace("'", "", $beguCourier['comment']) . "',
                        '" . $beguCourier['price'] . "',
                        '" . (float)$beguCourier['latitude'] . "',
                        '" . (float)$beguCourier['longitude'] . "',
                        '" . $beguCourier['phones'] . "',
                        '" . $beguCourier['schedule'] . "',
                        '" . $beguCourier['delivery_days'] . "',
                        '" . $beguCourier['delivery_days_source'] . "',
                        '" . $beguCourier['min_order_sum'] . "',
                        '" . $beguCourier['retail'] . "',
                        '" . (int)$beguCourier['pvz_id'] . "',
                        '" . $beguCourier['pvz_title'] . "',
                        '" . $beguCourier['visible'] . "'                                            
                    )
                "
            );
            foreach($beguCourier['payment_methods'] as $beguCourierPaymentMethod) {
                $connection->exec(
                    "
                    INSERT INTO courier_paymentmethod (
                        courier_id,                          
                        paymentmethod_id
                    ) VALUES(
                        " . $beguCourier['id'] . ", 
                        '" . $beguCourierPaymentMethod['id'] . "'
                    )
                "
                );
            }
        }
        $this->output->writeln(['Import has done']);
    }
}