<?php
namespace App\GraphQL\Resolver;

use Doctrine\ORM\EntityManager;
use App\Service\AuthenticatorService;
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
        if($user = $this->authenticatorService->authByToken($token)) {
            return $this->em
                ->getRepository('App:Address')
                ->findByUser($user->getId());
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