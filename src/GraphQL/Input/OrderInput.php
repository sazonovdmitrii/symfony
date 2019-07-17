<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class OrderInput extends RequestObject
{
    public $pvz_id;

    public $courier_id;

    public $address_id;
}