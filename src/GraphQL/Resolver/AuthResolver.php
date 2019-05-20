<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;
use Magento\Backend\Model\Auth;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Service\AuthenticatorService;

class AuthResolver implements ResolverInterface, AliasedInterface {

    private $em;

    private $jwtManager;

    private $authenticator;

    public function __construct(
        EntityManager $em,
        JWTTokenManagerInterface $JWTManager,
        AuthenticatorService $authenticator
    ) {
        $this->em = $em;
        $this->jwtManager = $JWTManager;
        $this->authenticator = $authenticator;
    }

    public function resolve(Argument $args)
    {
        if($user = $this->authenticator->auth($args['email'], $args['password'])) {
            $user->setHash($this->jwtManager->create($user));
            return $user;
        }
    }

    public static function getAliases()
    {
        return [
            'resolve' => 'Auth'
        ];
    }
}