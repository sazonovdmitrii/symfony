<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Input;

use AssoConnect\GraphQLMutationValidatorBundle\Tests\Functional\App\Input\NewUserInput;
use Overblog\GraphQLBundle\Definition\Argument;
use PHPUnit\Framework\TestCase;

Class RequestObjectTest extends TestCase
{

    /**
     * @dataProvider provider__construct
     */
    public function test__construct($input, $username)
    {
        $args = new Argument(array(
            'input' => $input
        ));

        $input = new NewUserInput($args);
        $this->assertSame($username, $input->username);
    }
    public function provider__construct()
    {
        $provider = [];

        // Know key
        $provider[] = [
            ['username' => 'john.doe'],
            'john.doe',
        ];

        // Unknown key
        $provider[] = [
            ['foo' => 'bar'],
            null,
        ];


        return $provider;
    }

}
