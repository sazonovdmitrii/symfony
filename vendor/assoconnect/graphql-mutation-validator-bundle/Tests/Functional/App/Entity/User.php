<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional\App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

Class User
{

    /**
     * @Assert\NotBlank()
     */
    protected $username;

}