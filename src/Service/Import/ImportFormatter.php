<?php
namespace App\Service\Import;

interface ImportFormatter
{
    public function filter($row);

    public function validate($row);
}