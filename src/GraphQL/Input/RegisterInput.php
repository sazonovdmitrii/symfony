<?php
namespace App\GraphQL\Input;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;

class RegisterInput extends RequestObject
{
    public $firstname;

    public $lastname;

    public $email;

    public $gender;

    public $password;

    public $confirm_password;

    public $phone;
}