<?php

namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class CreateAddressInput extends RequestObject
{
    public $item_id;
    public $name;
    public $person;
    public $zip;
    public $region_id;
    public $city;
    public $street;
    public $house;
    public $corp;
    public $level;
    public $flat;
    public $code;
}