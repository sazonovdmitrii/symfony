<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use App\Service\AuthenticatorService;

class AuthAlias implements ResolverInterface, AliasedInterface {

    public $user;

    public $em;

    private $request;

    public function __construct(
        EntityManager $em,
        ContainerInterface $container,
        AuthenticatorService $authenticatorService
    ) {
        $this->em = $em;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
            $token = $this->request->headers->get('token');
            if($user = $authenticatorService->authByToken($token)) {
                $this->user = $user;
                return;
            }
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

    public static function getAliases()
    {
        return [
            'resolve' => self::class
        ];
    }
}