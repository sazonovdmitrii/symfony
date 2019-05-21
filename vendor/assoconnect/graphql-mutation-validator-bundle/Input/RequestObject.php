<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Input;

use Overblog\GraphQLBundle\Definition\Argument;

Abstract Class RequestObject
{

    public function __construct(Argument $args = null)
    {
        if($args !== null){
            $input = $args->getRawArguments()['input'];

            foreach($input as $key => $value) {
                if(property_exists($this, $key)) {
                    $this->$key = $value;
                }
            }
        }
    }

}