<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Input\UserInput;
use App\Service\AuthenticatorService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;

class UserMutation implements MutationInterface
{
    private $jwtManager;

    private $authenticator;

    public function __construct(
        JWTTokenManagerInterface $JWTManager,
        AuthenticatorService $authenticator
    ) {
        $this->jwtManager = $JWTManager;
        $this->authenticator = $authenticator;
    }

    public function auth(Argument $args)
    {
        $input = new UserInput($args);

        if($user = $this->authenticator->auth($input->email, $input->password)) {
            $user->setHash($this->jwtManager->create($user));
            return $user;
        }
    }
}