<?php
namespace App\Service;

class AdminTagService extends TagService
{
    private $tags = [];

    public function getTags()
    {
        return $this->tags;
    }

    public function setTags($tags)
    {
        $this->tags = $tags;
        return $this;
    }

    public function parseRequest($request)
    {
        $result = [];
        foreach($request as $key => $value) {
            if (strpos($key, 'tag_') !== false && $value) {
                $result[str_replace('tag_', '', $key)] = $value;
            }
        }
        return $result;
    }

    public function update()
    {
        foreach($this->getTags() as $tagId => $tagValue) {

        }
    }
}