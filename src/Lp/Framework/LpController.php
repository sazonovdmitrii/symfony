<?php

namespace App\Lp\Framework;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class LpController extends AbstractController
{
    /**
     * @param $parameters
     * @return mixed
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

    /**
     * @param $className
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    public function getModel($className)
    {
        return $this
            ->getDoctrine()
            ->getRepository($className);
    }

    public function error($message)
    {
        throw new NotFoundHttpException($message);
    }
}
