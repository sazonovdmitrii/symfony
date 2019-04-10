<?php
namespace App\Service\Import\Formatter;

use App\Service\Import\ImportFormatter;

class Marinaparfyum implements ImportFormatter
{
    private $required = [1,2,3];

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
        if (strpos($row[2], '?') !== false) {
            return false;
        }
        return true;
    }

    /**
     * @param $row
     * @return array
     */
    public function fill($row)
    {
        return [
            'sku' => $row[1],
            'name' => $row[2],
            'price' => $row[3]
        ];
    }
}