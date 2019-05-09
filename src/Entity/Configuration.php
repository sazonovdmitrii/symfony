<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ConfigurationRepository")
 */
class Configuration
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $option;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $value;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOption(): ?string
    {
        return $this->option;
    }

    public function setOption(?string $option): self
    {
        $this->option = $option;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(?string $value): self
    {
        $this->value = $value;

        return $this;
    }
}
