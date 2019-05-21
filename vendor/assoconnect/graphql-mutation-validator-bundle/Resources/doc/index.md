# AssoConnectGraphQLMutationValidatorBundle

## Requirements

 - overblog/graphql-bundle >= 0.11

## Installation with Symfony Flex

**a)** First download the bundle

`composer require assoconnect/graphql-mutation-validator-bundle`

**b)** Accept the contrib recipes installation from Symfony Flex
````
-  WARNING  assoconnect/graphql-mutation-validator-bundle (0.1): From gitlab.com/assoconnect/graphql-mutation-validator-bundle
    The recipe for this package comes from the "contrib" repository, which is open to community contributions.
    Do you want to execute this recipe?
    [y] Yes
    [n] No
    [a] Yes for all packages, only for the current installation session
    [p] Yes permanently, never ask again for this project
    (defaults to n): 
````

## Usage
First extends the abstract `AssoConnect\GraphQLMutationValidatorBundle\RequestObject` class to implement your own business logic with some constraints.

We use request objects instead of entities as suggested by [Martin Hujer](https://blog.martinhujer.cz/symfony-forms-with-request-objects/).
````
<?php
# /src/GraphQL/Input/CustomInput.php
namespace GraphQL\Input;

use AssoConnect\GraphQLMutationValidatorBundle\RequestObject;
use Symfony\Component\Validator\Constraints as Assert;

Class CustomInput extends RequestObject
{
	/**
	 * @Assert\NotBlank()
	 */
	public $username;
}
````

Then use `CustomInput` in your mutation:

````
<?php
# /src/GraphQL/Mutation/CustomMutation.php

namespace App\GraphQL\Mutation;

use App\GraphQL\Input\CustomInput;
use AssoConnect\GraphQLMutationValidatorBundle\Validator\MutationValidator
use Overblog\GraphQLBundle\Definition\Argument;
use Overblog\GraphQLBundle\Definition\Resolver\MutationInterface;

Class CustomMutation implements MutationInterface
{
    /**
     * @var MutationValidator
     */
    private $validator;
    
	public function __construct(MutationValidator $validator)
    {
        $this->validator = $validator;
    }

	public function customAction(Argument $args)
	{
	    // Hydrate the CustomInput insteance with user provided data
		$input = new CustomInput($args);
		// Will throw an exception if user data are not valid
		$this->validator->validate($input);
		// Your business logic here
		// ...
	}
}
````

The following query with invalid data will return a response with a `state` key listing all the errors as described by [Konstantin Tarkus](https://medium.com/@tarkus/validation-and-user-errors-in-graphql-mutations-39ca79cd00bf).

````
mutation {
    customAction(input: {username: ""}){
        id
        firstname
        lastname
    }
}
````

GraphQL response:

````
{
    "errors": [
        {
            "message": "Invalid dataset",
            "path": ["customAction"],
            "state": [
                "username": ["This value should not be blank."]
            ],
            "code": [
                "username": ["e70f90dd-8d45-404f-81df-804612841e7c"]
            ]
        }
    ]
}
````

You may use the code or the state as a translation key.

## Working with entities
Now let's say you have a `App\Entity\User` where you already have set up some validations. According to the previous example, you have to duplicate these validations.

This bundle contains a custom Symfony constraint and validator to use with request object.

Update your `CustomInput` with this code:
````
<?php
# /src/GraphQL/Input/CustomInput.php
namespace GraphQL\Input;

use App\Entity\User;
use AssoConnect\GraphQLMutationValidatorBundle\RequestObject;
use AssoConnect\GraphQLMutationValidatorBundle\Validator\Constraints as AssoConnectAssert;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @AssoConnectAssert\GraphQLRequestObject()
 */
Class CustomInput extends RequestObject
{
	/**
	 * @see User::$username
	 */
	public $username;
}
````

The request object will be validated all the same without any duplicate code! You may also mix `@see` statements with regular constraints in your request object. 