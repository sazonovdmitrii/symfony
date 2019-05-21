<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class UserInput extends RequestObject
{
    public $email;

    public $password;
}