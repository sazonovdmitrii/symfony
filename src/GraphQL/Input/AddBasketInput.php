<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class AddBasketInput extends RequestObject
{
    public $item_id;
}