<?php
namespace App\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class Basket extends AbstractController
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