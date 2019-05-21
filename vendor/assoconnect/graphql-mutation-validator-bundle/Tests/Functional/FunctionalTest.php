<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional;

use AssoConnect\GraphQLMutationValidatorBundle\Exception\UserException;
use Symfony\Component\Validator\Constraints\NotBlank;

Class FunctionalTest extends TestCase
{

    /**
     * @dataProvider providerCreateUser
     */
    public function testCreateUser(string $username, string $firstname, $expectedData, $expectedErrors)
    {
        $query = 'mutation Mutation { createUser(input: {username: "' . $username . '", firstname: "' . $firstname . '"}){ username, firstname } }';

        $this->assertGraphQL($query, $expectedData, $expectedErrors);
    }

    public function providerCreateUser()
    {
        return array(
            array(
                'john.doe',
                'john',
                ['createUser' => [
                    'username' => 'john.doe',
                    'firstname' => 'john',
                ]],
                null
            ),
            array(
                '',
                '',
                ['createUser' => null],
                [[
                    'message' => UserException::MESSAGE,
                    'category' => UserException::CATEGORY,
                    'locations' => [['line' => 1, 'column' => 21]],
                    'path' => ['createUser'],
                    'state' => [
                        'username' => [(new NotBlank())->message],
                        'firstname' => [(new NotBlank())->message],
                    ],
                    'code' => [
                        'username' => [NotBlank::IS_BLANK_ERROR],
                        'firstname' => [NotBlank::IS_BLANK_ERROR],
                    ]
                ]]
            )
        );
    }

}