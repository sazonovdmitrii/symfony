<?php
namespace App\Service\Twig;
use App\Service\LpService;

class Basket extends LpService
{
    /**
     * @return int|void
     */
    function count()
    {
        $basket = $this->_getRequest()
            ->getSession()
            ->get('basket');

        return count($basket['items']->getValues());
    }

    /**
     * @return mixed
     */
    public function _getRequest()
    {
        return $this->container
            ->get('request_stack')
            ->getCurrentRequest();
    }
}