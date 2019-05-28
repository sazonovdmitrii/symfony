<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use App\Service\AuthenticatorService;
use GraphQL\Type\Definition\ResolveInfo;
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;
use Overblog\GraphQLBundle\Definition\Resolver\ResolverInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Psr\Log\LoggerInterface;

class AddressResolver implements ResolverInterface, AliasedInterface
{
    private $em;

    private $authenticatorService;

    private $request;

    private $logger;

    /**
     * ProductResolver constructor.
     *
     * @param EntityManager $em
     */
    public function __construct(
        EntityManager $em,
        AuthenticatorService $authenticatorService,
        ContainerInterface $container,
        LoggerInterface $logger
    ) {
        $this->em = $em;
        $this->authenticatorService = $authenticatorService;
        $this->logger = $logger;
        if ($container->has('request_stack')) {
            $this->request = $container->get('request_stack')->getCurrentRequest();
        }
    }

    /**
     * @return mixed
     */
    public function resolve()
    {
        $token = $this->request->headers->get('token');
//        $token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NTg5ODc0MzcsImV4cCI6MTU1ODk5MTAzNywicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6ImFpQHJvYm8ucnUifQ.Rc2KY8wQtmjweVmxiIiZ4AgGdl1GlFn31kGdKcJXrpg8NNwtgCah1RACRLtGm5DeHaQigXum3InXVo85yVIVmtS4t-9et7RHQwk6z03AQP4MUGODSuv1FYzs5SwkNcgKTR2XkXz2QSpBtZfSPnk0pfSX-vUhZ1SzTlJV6CMbX_o-HTWF2d1_JJunUp4Wl4x3MSL8oXSCJn0TWxn1KemU1a2ctCvZupiq4AiTjTPWMWQ_zwVqcHkNvRbq466sNibdJoiZKpd2A3xL0tdotRgQaRF2OpiFieH6cR8SQkP3f-39TOfwELrd0uG8aDS11wIX_X5usoVqPATErh2u_YKW2A6yOPABGhbeFCCPZk_2rUYvRz2CcG1uO8XS53tlr9LxATjLPYpuOmPxqKsKDbmzTtG53hZrzn90BFy0mKFJ-S8nn8en2GEFalWrHdIY03GXAiINDwHZma5HZsPY0fUm4zqH-nI2HF8BbT3c61LX4_ypMrOmSXxyK1bqTFkeT5kQi4X3urKXAqTkOCX8jQjkbOtHAAoLpUgcO2bMNX3A76Dp4UwvuOeKEGbLVWnLo6i6FCsQwXzSVtDy0-fyK9NSSfbum-HBOw6w0Er_YFBC9SxeU8eMZjxdEw2eb39sOUzk-8HEfmdLzQmv0zSnIBiR1QOKVnupTHqUEZhDm12MRhY';
        if($user = $this->authenticatorService->authByToken($token)) {
            return $user;
        }
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Address'
        ];
    }
}