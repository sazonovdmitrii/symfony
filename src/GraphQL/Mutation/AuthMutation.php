<?php
namespace App\GraphQL\Mutation;

use App\Service\AuthenticatorService;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;
use Redis;
use Symfony\Component\DependencyInjection\ContainerInterface;

class AuthMutation implements MutationInterface
{
    public $user;

    private $authenticatorService;

    private $request;

    public function __construct(
        Redis $redis,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService
    ) {
        $this->redis = $redis;
        $this->authenticatorService = $authenticatorService;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
        }
        $token = $this->request->headers->get('token');
        if($user = $this->authenticatorService->authByToken($token)) {
            $this->user = $user;
            return;
        }
    }

    public function getSessionKey()
    {
        if($this->request) {
            return $this->request->cookies->get('session_key');
        }
        return '';
    }

    public function getUser()
    {
        if($this->user) {
            return $this->user;
        }
        return false;
    }
}