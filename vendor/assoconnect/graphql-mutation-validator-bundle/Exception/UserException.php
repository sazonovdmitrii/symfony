<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Exception;

use Symfony\Component\Validator\ConstraintViolationListInterface;
use GraphQL\Error\ClientAware;

Class UserException extends \Exception implements ClientAware
{

    const CATEGORY = 'userException';

    const MESSAGE = 'Invalid data set';

    /**
     * @var ConstraintViolationListInterface
     */
    private $violations;

    public function __construct(ConstraintViolationListInterface $violations, \Throwable $previous = null)
    {
        $this->violations = $violations;
        parent::__construct(self::MESSAGE, 0, $previous);
    }

    public function isClientSafe() :bool
    {
        return true;
    }

    public function getCategory() :string
    {
        return self::CATEGORY;
    }

    public function getViolations() :ConstraintViolationListInterface
    {
        return $this->violations;
    }

}