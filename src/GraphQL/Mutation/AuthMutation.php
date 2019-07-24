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
        $token = $this->request->headers->get('Authorization');
        //$token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NjIwNzk2MzUsImV4cCI6MTU2MjA4MzIzNSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFpQHJvYm8ucnUifQ.c9hug2Cb42D488W9b5zqReKNx7KPngc1Gbi6OpU2wUrgxbo8awhtG2OJJCJkt1mq2ISgiJQxuAyiuAjC0Pjsnz3-Op03x4qWpudehKcjt78FEz04Dc1kEgvcDSODaSenri0bbJNR6Ai3Yi13NaqekzWzEWM9DJXudsr_EYEgS_9asjjw9MR_5T2W-LmAYBi_zD-MxRoAE28ZbYHIW91y6pmGOGmGwXTOTzR-npVGoy2nwvy8zlD7DdA5o_OodXvU8BBFxo6IerY4pPt56fh3M4aHG_LjtpUk_u_qWRCEpCIWwE7P1JE2XKmakVaSXtsaWDLbKYRwey-nQjSWJsJhEBNweouu5r6yj-2cgIvT08e8xVvKZ3H8K6if8b0Y1EioA9HzLYEV_YaJpcj1M_8sujgvliUsxI6jRuKaegEZPslJzDoRa6KaxtEkGmsikeduG7Jkygv9TNC332IzmsgfgOV7_6kTgqeBGqKP2YzqX7Nw1FGYESPbtOAEyzbsBUXH3pzQYsn4dkre1SEEf6seBJTpFyrWpacPygQKhlbB0V_sCoO-2XOqS8kjf8TWIE_erPInlBc8waHgCeWs_YvTbo17EAHmDBLYFd7tdaylvpOMDbhj4lyQH4dtz6wrpx4MNaxzOmIKVnZ2NGqZLaLvH7lHl1-s_QfZgZYzCe0ZzC0';
        if($token && $user = $this->authenticatorService->authByToken($token)) {
            $this->user = $user;
            return;
        }
    }

    public function getSessionKey()
    {
        $sessionKey = '';
        if($this->request) {
            $cookies = explode('; ', $this->request->headers->get('cookie'));
            if(count($cookies)) {
                foreach($cookies as $cookie) {
                    $cookie = explode('=', $cookie);
                    if(count($cookie) == 2 && $cookie[0] == 'session_key') {
                        $sessionKey = $cookie[1];
                    }
                }
            }
        }
        return $sessionKey;
    }

    public function getUser()
    {
        if($this->user) {
            return $this->user;
        }
        return false;
    }

    public function getAuthKey()
    {
        return ($this->getUser()) ? $this->getUser()->getId() : $this->getSessionKey();
    }
}
