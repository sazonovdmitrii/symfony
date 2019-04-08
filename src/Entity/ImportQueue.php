<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ImportQueueRepository")
 */
class ImportQueue
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
    private $path;

    /**
     * @ORM\Column(type="array", nullable=true)
     */
    private $status = [];

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $created;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $type;

    /**
     * @var array
     */
    static private $types = [
        'Градиент',
        'Марина Парфюм'
    ];

    const STATUS_NEW = 'Новое';
    const STATUS_IN_PROCESS = 'В процессе';
    const STATUS_DONE = 'Завершено';
    /**
     * @var array
     */
    static private $statuses = [
        self::STATUS_NEW,
        self::STATUS_IN_PROCESS,
        self::STATUS_DONE
    ];

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updated;

    public function __construct()
    {
        $this->created = new \DateTime('now');
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(?string $path): self
    {
        $this->path = $path;

        return $this;
    }

    public function getStatus(): ?array
    {
        return $this->status;
    }

    public function setStatus(?array $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(?\DateTimeInterface $created): self
    {
        $this->created = $created;
        return $this;
    }

    public function getType(): ?int
    {
        return $this->type;
    }

    public function setType(?int $type): self
    {
        $this->type = $type;

        return $this;
    }

    /**
     * @return array
     */
    static public function getAllTypes()
    {
        return self::$types;
    }

    /**
     * @return array
     */
    static public function getAllStatuses()
    {
        return self::$statuses;
    }

    public function getUpdated(): ?\DateTimeInterface
    {
        return $this->updated;
    }

    public function setUpdated(?\DateTimeInterface $updated): self
    {
        $this->updated = $updated;

        return $this;
    }
}
