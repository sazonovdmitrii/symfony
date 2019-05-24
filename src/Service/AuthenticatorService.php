<?php
namespace App\Service;
use Doctrine\ORM\EntityManager;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTFailureException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;

class AuthenticatorService
{
    private $passwordEncoder;

    private $em;

    private $jwtManager;

    /**
     * AuthenticatorService constructor.
     *
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param EntityManager $em
     */
    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManager $em,
        JWTTokenManagerInterface $JWTManager
    ) {
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
        $this->jwtManager = $JWTManager;
    }

    /**
     * @param string $email
     * @param string $password
     * @return mixed
     */
    public function auth(string $email, string $password)
    {
        $user = $this->em->getRepository('App:Users')->findByEmail($email);
        if($this->passwordEncoder->isPasswordValid($user, $password)) {
            return $user;
        }
    }

    public function authByToken(string $token)
    {
        try{
            $jwtToken = new JWTUserToken();
            $jwtToken->setRawToken($token);

            $userData = $this->jwtManager->decode($jwtToken);

            if(isset($userData['username']) && $email = $userData['username']) {
                return $this->em
                    ->getRepository('App:Users')
                    ->findByEmail($email);
            }
        } Catch(JWTFailureException $e) {

        }
        return [];
    }
}