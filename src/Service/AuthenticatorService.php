<?php
namespace App\Service;
use App\Entity\Users;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AuthenticatorService
{
    private $passwordEncoder;

    private $em;
    /**
     * AuthenticatorService constructor.
     *
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param EntityManager $em
     */
    public function __construct(
        UserPasswordEncoderInterface $passwordEncoder,
        EntityManager $em
    ) {
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
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
}