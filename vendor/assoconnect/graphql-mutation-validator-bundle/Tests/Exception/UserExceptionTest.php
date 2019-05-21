<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Exception;

use AssoConnect\GraphQLMutationValidatorBundle\Exception\UserException;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\ConstraintViolationListInterface;

Class UserExceptionTest extends TestCase
{

    public function testIsClientSafe()
    {
        $violations = $this->createMock(ConstraintViolationListInterface::class);

        $userException = new UserException($violations);
        $this->assertTrue($userException->isClientSafe());
    }

    public function testGetCategory()
    {
        $violations = $this->createMock(ConstraintViolationListInterface::class);

        $userException = new UserException($violations);
        $this->assertSame(UserException::CATEGORY, $userException->getCategory());
    }

    public function testGetViolations()
    {
        $violations = $this->createMock(ConstraintViolationListInterface::class);

        $userException = new UserException($violations);
        $this->assertSame($violations, $userException->getViolations());
    }

}