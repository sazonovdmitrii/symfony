<?php
namespace App\Service;

class TranslitService
{
    /**
     * @param $string
     * @return string
     */
    function translit($string)
    {
        $converter = array(
            'а' => 'a',   'б' => 'b',   'в' => 'v',
            'г' => 'g',   'д' => 'd',   'е' => 'e',
            'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
            'и' => 'i',   'й' => 'y',   'к' => 'k',
            'л' => 'l',   'м' => 'm',   'н' => 'n',
            'о' => 'o',   'п' => 'p',   'р' => 'r',
            'с' => 's',   'т' => 't',   'у' => 'u',
            'ф' => 'f',   'х' => 'h',   'ц' => 'c',
            'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
            'э' => 'e',   'ю' => 'yu',  'я' => 'ya',
            'А' => 'a',   'Б' => 'a',   'В' => 'b',
            'Г' => 'g',   'Д' => 'd',   'Е' => 'e',
            'Ё' => 'e',   'Ж' => 'zh',  'З' => 'z',
            'И' => 'i',   'Й' => 'y',   'К' => 'k',
            'Л' => 'l',   'М' => 'm',   'Н' => 'n',
            'О' => 'o',   'П' => 'p',   'Р' => 'r',
            'С' => 's',   'Т' => 't',   'У' => 'u',
            'Ф' => 'f',   'Х' => 'h',   'Ц' => 'c',
            'Ч' => 'ch',  'Ш' => 'sh',  'Щ' => 'sch',
            'Э' => 'e',   'Ю' => 'yu',  'Я' => 'ya',
            'ь' => '',  'ы' => 'y',   'ъ' => '',
            'Ь' => '',  'Ы' => 'y',   'Ъ' => '', ' ' => ''
        );
        return strtr($string, $converter);
    }

    function className($string)
    {
        return ucwords(trim(
            $this->translit($string), "-"
        ));
    }
}