<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional\App\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;
use AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional\App\Entity\User;
use AssoConnect\GraphQLMutationValidatorBundle\Validator\Constraints as AssoConnectAssert;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @AssoConnectAssert\GraphQLRequestObject()
 */
Class NewUserInput extends RequestObject
{

    /**
     * @see User::$username
     */
    public $username;

    /**
     * @Assert\NotBlank()
     */
    public $firstname;

}