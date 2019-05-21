<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Validator;

use AssoConnect\GraphQLMutationValidatorBundle\Exception\UserException;
use AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional\App\Input\NewUserInput;
use AssoConnect\GraphQLMutationValidatorBundle\Validator\MutationValidator;
use Overblog\GraphQLBundle\Definition\Argument;
use PHPUnit\Framework\TestCase;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\Validator\ValidatorInterface;

Class MutationValidatorTest extends TestCase
{

    /**
     * @dataProvider providerSetAndValidate
     */
    public function testSetAndValidate(Argument $args, array $violations)
    {
        // Expected exception
        if(empty($violations) === false){
            $this->expectException(UserException::class);
            $this->expectExceptionMessage(UserException::MESSAGE);
        }

        $symfonyValidator = $this->createMock(ValidatorInterface::class);
        $symfonyValidator->expects($this->once())
            ->method('validate')
            ->willReturn(new ConstraintViolationList($violations));

        $userInput = new NewUserInput($args);

        $validator = new MutationValidator($symfonyValidator);
        $validator->validate($userInput);
    }
    public function providerSetAndValidate()
    {
        $sets = array();

        // 1 known key + 1 unknown key
        $args = new Argument(array(
            'input' => array(
                'username'  => 'toto',
            )
        ));
        $violations = array();
        $sets[] = array($args, $violations);

        // 0 known key
        $args = new Argument(array(
            'input' => array(
                'username' => 'john',
            )
        ));
        $violations = array(
            $this->createMock(ConstraintViolation::class)
        );
        $sets[] = array($args, $violations);

        return $sets;
    }

}