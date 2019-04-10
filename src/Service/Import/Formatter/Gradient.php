<?php
namespace App\Service\Import\Formatter;

use App\Service\Import\ImportFormatter;

class Gradient implements ImportFormatter
{
    private $required = [0,1,2,3];

    /**
     * @param $row
     * @return bool
     */
    public function filter($row)
    {
        $result = true;
        foreach($this->required as $index) {
            if(!(isset($row[$index]) && $row[$index])) {
                $result = false;
            }
        }
        return $result;
    }

    /**
     * @param $row
     * @return bool
     */
    public function validate($row)
    {
        $result = false;
        if(is_numeric($row[0])) {
            $result = true;
        }
        return $result;
    }

    /**
     * @param $row
     * @return array
     */
    public function fill($row)
    {
        return [
            'sku' => $row[2],
            'name' => $row[1],
            'price' => $row[8]
        ];
    }
}