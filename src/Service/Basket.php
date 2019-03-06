<?php

namespace App\Service;

class Basket
{
    function count()
    {
        $request = $this->container
            ->get('request_stack')
            ->getCurrentRequest();

        $basket = $request
            ->getSession()
            ->get('basket');

        return count($basket['items']->getValues());
    }
}