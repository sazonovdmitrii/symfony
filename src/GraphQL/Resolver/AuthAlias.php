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
            $token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTk2NzAwMTksImV4cCI6MTU1OTY3MzYxOSwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFpQHJvYm8ucnUifQ.s6hyBjZ2ZYN8Z7xr_PBXco9DrmZivrLGD6kbKohDnd1Yi4E8IWHox7yXcdieIIeAnFANXEpJr8maJHdwqnhHUQCY-CFrhBY3e29MZOFeYpkDUd28ow-M2o47MvYnRKiaagZztH6N4L--TlqDL4klTpkk2Gul5F52OOGqaYu6v-_iFbZDEaZnoaHF3PqmrUA6AMErN_y2btSXa-y_odbklvL0fJoQshVgvU5APTF9UvlyAlpVtHKbvY-t7mo8Bb24SrA1y2xZ663Lt_IhGo5WxUaT1_XrNpqtQDz-RM4vmv7y0fY1HA6o8FtlBystPdcNNvUOfZKaO5nGP2AJeWeslx_XVG78KjI19XaOekcYKynitGO6ucrY8LKFNuszvLkUf5d4PLAnykqSs29n5x-rRbM_kWN5Midr7Lh0nfoaOVqcE7z__GW63ziIWYPm88BnMo3g6Bd4vhR1zBEZTghhxaQ44ERmQ52hgnXC2mdF9RZ-9-kGTuwRb0ViiIANtDdyRBNAa20hpsv1a5g79bJYM2e36gUL7yEbINJCMeWd5oL0r7Dx1bT_xeri0LneqPuftrSdDiUwq5kJ0UaTbo5af681dG03TztPwJEA0U9IhSm1_XpOMf2UJaKlhtAeDRjoXRvUWO_W8_o9K0Z0s3IHNrj_FS0sJjKs784bPmxBdWE';
            if($user = $authenticatorService->authByToken($token)) {
                $this->user = $user;
                return;
            }
        }
    }

    public function getSessionKey()
    {
        if($this->request) {
            return $this->request->cookies->get('PHPSESSID');
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