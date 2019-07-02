<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class UpdateBasketInput extends RequestObject
{
    public $item_id;

    public $qty;
}