<?php

namespace App\GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class RemoveAddressInput extends RequestObject
{
    public $id;
}