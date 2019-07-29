<?php
namespace App\GraphQL\Mutation;

use App\GraphQL\Input\RegisterInput;
use App\Service\AuthenticatorService;
use App\Service\UserService;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Overblog\GraphQLBundle\Definition\Argument;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;

class UserMutation extends AuthMutation
{
    private $jwtManager;

    private $authenticator;

    private $authenticatorService;

    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService,
        JWTTokenManagerInterface $JWTManager,
        AuthenticatorService $authenticator,
        UserService $userService
    ) {
        $this->redis = $redis;
        $this->authenticatorService = $authenticatorService;
        $this->jwtManager = $JWTManager;
        $this->authenticator = $authenticator;
        $this->userService = $userService;
        parent::__construct($redis, $container, $authenticatorService);
    }

    public function auth(Argument $args)
    {
        $input = new UserInput($args);

        if($user = $this->authenticator->auth($input->email, $input->password)) {
            $user->setHash($this->jwtManager->create($user));
            return $user;
        }
    }

    public function register(Argument $args)
    {
        $input = new RegisterInput($args);

        return $this->userService->create($input);
    }
}