<?php
namespace App\Service;
use App\GraphQL\Input\RegisterInput;
use Doctrine\ORM\EntityManager;
use App\Entity\Users;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTFailureException;
use Symfony\Component\ExpressionLanguage\Tests\Node\Obj;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Security\Authentication\Token\JWTUserToken;
use Doctrine\Common\Persistence\ObjectManager;

class UserService
{
    private $passwordEncoder;

    private $em;

    private $manager;

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
        JWTTokenManagerInterface $JWTManager,
        ObjectManager $objectManager
    ) {
        $this->passwordEncoder = $passwordEncoder;
        $this->em = $em;
        $this->jwtManager = $JWTManager;
        $this->manager = $objectManager;
    }

    /**
     * @param RegisterInput $input
     */
    public function create(RegisterInput $input)
    {
        $user = new Users();
        $user->setEmail($input->email);
        $user->setPassword(
            $this->passwordEncoder->encodePassword($user, $input->password)
        );
        $user->setRoles([Users::ROLE_USER]);
        $user->setFirstname($input->firstname);
        $user->setLastname($input->lastname);
        $user->setGender($input->gender);
        $this->manager->persist($user);
        $this->manager->flush();
        return $user;
    }
}