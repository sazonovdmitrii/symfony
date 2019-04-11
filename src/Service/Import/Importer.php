<?php
namespace App\Service\Import;
use App\Entity\ImportQueueRelation;
use App\Service\LpService;

class Importer extends LpService
{
    /**
     * @var
     */
    protected $data;

    /**
     * @var
     */
    protected $type;

    /**
     * @param $data
     * @return $this
     */
    public function setData($data)
    {
        $this->data = $data;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param string $type
     * @return $this
     */
    public function setType(string $type)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->type;
    }

    public function process()
    {
        $manager = $this->getDoctrine()
            ->getManager();

        foreach($this->getData() as $data) {
            $item = new ImportQueueRelation();
            $item->setSku($data['sku']);
            $item->setName($data['name']);
            $item->setPrice($data['price']);
            $item->setType($this->getType());
            $manager->persist($item);
            $manager->flush();
        }
    }
}