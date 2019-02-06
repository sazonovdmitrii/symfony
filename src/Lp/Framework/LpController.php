<?php

namespace App\Lp\Framework;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class LpController extends AbstractController
{
    /**
     * @param $name
     * @param $value
     * @return $this
     */
    public function addContextParameters($parameters)
    {
        $request = $this->_getRequest();
        $request->attributes->add($parameters);
        return $request;
    }

    /**
     * @param $name
     * @return $this
     */
    public function getContextParameter($request, $name)
    {
        return $request->attributes->get($name);
    }

    /**
     * @return mixed
     */
    private function _getRequest()
    {
        return $this->container->get('request_stack')->getCurrentRequest();
    }
}
