<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Validator\Constraints;

use AssoConnect\GraphQLMutationValidatorBundle\Input\RequestObject;
use Doctrine\Common\Annotations\PhpParser;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Mapping\ClassMetadata;
use Symfony\Component\Validator\Validator\RecursiveValidator;

Class GraphQLRequestObjectValidator extends ConstraintValidator
{

    public function validate($requestObject, Constraint $constraint)
    {
        // Check instance type
        if($constraint instanceof GraphQLRequestObject === false) {
            throw new UnexpectedTypeException($constraint, __NAMESPACE__.'\LikeEntityField');
        }

        if($requestObject instanceof RequestObject === false) {
            throw new \LogicException('Value must be a GraphQL request object');
        }

        /** @var RecursiveValidator $validator */
        $validator = $this->context->getValidator();
        $validatorContext = $validator->inContext($this->context);

        foreach($requestObject as $field => $value){

            $reflectionProperty = new \ReflectionProperty($requestObject, $field);
            if(preg_match('#@see ([a-zA-Z0-9]+)::\$([a-zA-Z0-9]+)#', $reflectionProperty->getDocComment(), $matches)){

                $reflectionClass = new \ReflectionClass($reflectionProperty->getDeclaringClass()->getName());

                $parser = new PhpParser();
                $statements = $parser->parseClass($reflectionClass);

                $alias = strtolower($matches[1]);

                if(array_key_exists($alias, $statements)){
                    $class = $statements[$alias];
                }
                else{
                    $class = $reflectionClass->getNamespaceName() . '\\' . $matches[1];
                }

                $property = $matches[2];

                $constraints = $this->getConstraints($class, $property);

                $validatorContext->atPath($field)->validate($value, $constraints);
            }
        }
    }

    protected function getConstraints(string $class, string $property) :array
    {
        /** @var RecursiveValidator $validator */
        $validator = $this->context->getValidator();

        // Regular Symfony validation
        /** @var ClassMetadata $metadata */
        $metadata = $validator->getMetadataFor($class);
        if(array_key_exists($property, $metadata->members)){
            return $metadata->members[$property][0]->constraints;
        }

        return [];
    }

}