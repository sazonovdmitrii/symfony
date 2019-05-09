<?php
namespace App\Service;

class RequestFilterService
{
    private $filtersAttributes = [
        'entity',
        'action',
        'sortField',
        'sortDirection'
    ];

    /**
     * @param \Symfony\Component\HttpFoundation\ParameterBag $query
     * @return array
     */
    public function filterQuery(\Symfony\Component\HttpFoundation\ParameterBag $query)
    {
        $attributes = $this->filtersAttributes;

        return array_filter($query->all(), function($key) use ($attributes) {
            return !in_array($key, $attributes);
        }, ARRAY_FILTER_USE_KEY);
    }
}