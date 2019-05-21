<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Validator;

use AssoConnect\GraphQLMutationValidatorBundle\Exception\UserException;
use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;
use Symfony\Component\Validator\Validator\ValidatorInterface;

Class MutationValidator
{

    /**
     * @var ValidatorInterface
     */
    protected $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validate(RequestObject $requestObject)
    {
        $errors = $this->validator->validate($requestObject);

        if(count($errors) > 0) {
            throw new UserException($errors);
        }
    }

}