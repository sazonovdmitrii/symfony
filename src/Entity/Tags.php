<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\TagsRepository")
 */
class Tags
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $test = [];

    /**
     * @ORM\Column(type="json_array", nullable=true)
     */
    private $test1;

    /**
     * @ORM\Column(type="guid", nullable=true)
     */
    private $guid;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private $test2 = [];

    /**
     * @ORM\Column(type="object", nullable=true)
     */
    private $test3;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTest(): ?array
    {
        return $this->test;
    }

    public function setTest(?array $test): self
    {
        $this->test = $test;

        return $this;
    }

    public function getTest1()
    {
        return $this->test1;
    }

    public function setTest1($test1): self
    {
        $this->test1 = $test1;

        return $this;
    }

    public function getGuid(): ?string
    {
        return $this->guid;
    }

    public function setGuid(?string $guid): self
    {
        $this->guid = $guid;

        return $this;
    }

    public function getTest2(): ?array
    {
        return $this->test2;
    }

    public function setTest2(?array $test2): self
    {
        $this->test2 = $test2;

        return $this;
    }

    public function getTest3()
    {
        return $this->test3;
    }

    public function setTest3($test3): self
    {
        $this->test3 = $test3;

        return $this;
    }
}
