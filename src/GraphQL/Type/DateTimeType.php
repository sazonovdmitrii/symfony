<?php
namespace App\GraphQL\Type;

use GraphQL\Language\AST\Node;
use GraphQL\Type\Definition\ScalarType;
use Overblog\GraphQLBundle\Definition\Resolver\AliasedInterface;

class DateTimeType extends ScalarType implements AliasedInterface
{
    public $name = 'DateTime';

    /**
     * {@inheritdoc}
     */
    public function serialize($value)
    {
        return $value->format('Y-m-d H:i:s');
    }

    /**
     * @param mixed $value
     *
     * @return mixed
     */
    public function parseValue($value)
    {
        return new \DateTime($value);
    }

    /**
     * @param Node $valueNode
     *
     * @return string
     */
    public function parseLiteral($valueNode, $variables = NULL)
    {
        return new \DateTime($valueNode->value);
    }

    /**
     * {@inheritdoc}
     */
    public static function getAliases()
    {
        return ['DateTime'];
    }
}