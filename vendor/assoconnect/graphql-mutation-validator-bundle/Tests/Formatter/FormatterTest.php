<?php

namespace AssoConnect\GraphQLMutationValidatorBundle\Tests\Formatter;

use AssoConnect\GraphQLMutationValidatorBundle\Exception\UserException;
use AssoConnect\GraphQLMutationValidatorBundle\Formatter\Formatter;
use GraphQL\Error\Error;
use PHPUnit\Framework\TestCase;
use Overblog\GraphQLBundle\Event\ErrorFormattingEvent;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Validator\ConstraintViolationInterface;

Class FormatterTest extends TestCase
{

    public function testOnErrorFormatting_user_exception()
    {
        $violation = $this->createMock(ConstraintViolationInterface::class);
        $violationPath = 'violation path';
        $violationMessage = 'violation message';
        $violationCode = 'e70f90dd-8d45-404f-81df-804612841e7c';
        $violation->expects($this->atLeastOnce())
            ->method('getPropertyPath')
            ->willReturn($violationPath);
        $violation->expects($this->once())
            ->method('getMessage')
            ->willReturn($violationMessage);
        $violation->expects($this->once())
            ->method('getMessage')
            ->willReturn($violationMessage);
        $violation->expects($this->once())
            ->method('getCode')
            ->willReturn($violationCode);

        $violationList = new ConstraintViolationList(array($violation));

        $previous = new UserException($violationList);
        $error = new Error('', 0, null, null, null, $previous);

        $event = new ErrorFormattingEvent($error, array());

        // Call formatter
        $formatter = new Formatter();
        $formatter->onErrorFormatting($event);
        // Check formatting
        $formattedError = $event->getFormattedError();
        // State
        $this->assertTrue($formattedError->offsetExists('state'));
        $this->assertSame(array(
            $violationPath => array($violationMessage)
        ), $formattedError->offsetGet('state'));
        // Code
        $this->assertTrue($formattedError->offsetExists('code'));
        $this->assertSame(array(
            $violationPath => array($violationCode)
        ), $formattedError->offsetGet('code'));
    }

    public function testOnErrorFormatting_generic_exception()
    {
        $error = new Error('foobar');

        $event = new ErrorFormattingEvent($error, array());

        // Call formatter
        $formatter = new Formatter();
        $formatter->onErrorFormatting($event);
        // Check formatting
        $formattedError = $event->getFormattedError();
        $this->assertFalse($formattedError->offsetExists('state'));
    }

}