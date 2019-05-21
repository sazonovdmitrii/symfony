<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Validator\Constraints;

use AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional\App\Input\NewUserInput;
use AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional\TestCase;
use AssoConnect\GraphQLMutationValidatorBundle\Validator\Constraints\GraphQLRequestObjectValidator;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\ConstraintViolation;

Class GraphQLRequestObjectValidatorTest extends TestCase
{

    public function createValidator()
    {
        return self::$kernel->getContainer()->get(GraphQLRequestObjectValidator::class);
    }

    /**
     * @dataProvider providerInvalidValue
     */
    public function testInvalidValue($value, $code)
    {
        self::bootKernel();

        $authorInput = new NewUserInput();
        $authorInput->username = $value;

        $validator = self::$kernel->getContainer()->get('validator');

        $violationList = $validator->validate($authorInput);

        $this->assertCount(2, $violationList);

        // First violation
        /** @var ConstraintViolation $violation */
        $violation = $violationList[0];
        $this->assertSame($code, $violation->getCode());
        $this->assertSame('username', $violation->getPropertyPath());

        // Second violation
        /** @var ConstraintViolation $violation */
        $violation = $violationList[1];
        $this->assertSame($code, $violation->getCode());
        $this->assertSame('firstname', $violation->getPropertyPath());
    }

    public function providerInvalidValue()
    {
        $provider = [];

        $provider[] = [null, NotBlank::IS_BLANK_ERROR];

        return $provider;
    }

    public function testValidValue()
    {
        self::bootKernel();

        $input = new NewUserInput();
        $input->username = 'john.doe';
        $input->firstname = 'john';

        $validator = self::$kernel->getContainer()->get('validator');

        $violationList = $validator->validate($input);

        $this->assertCount(0, $violationList);
    }



}