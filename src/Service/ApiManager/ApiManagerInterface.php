<?php

namespace App\Service\ApiManager;

interface ApiManagerInterface
{
    public function setUrl($method);

    public function getUrl();

    public function setMethod($method);

    public function getMethod();

    public function getData();
}