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

class AddressesResolver extends AuthAlias
{
    public $em;

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
        parent::__construct($em, $container, $authenticatorService);
    }

    /**
     * @return mixed
     */
    public function resolve()
    {
        if($this->getUser()) {
            return [
                'data' => $this->getUser()->getAddresses()
            ];
        }
    }

    /**
     * @return array
     */
    public static function getAliases()
    {
        return [
            'resolve' => 'Addresses'
        ];
    }
}