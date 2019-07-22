<?php
namespace App\Service\ApiManager;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpClient\HttpClient;

class ApiManager extends AbstractController implements ApiManagerInterface
{
    private $_method;

    private $_url;

    private $_headers;

    private $_content;

    /**
     * @param $url
     * @return $this
     */
    public function setUrl($url)
    {
        $this->_url = $url;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->_url;
    }

    /**
     * @param $method
     * @return $this
     */
    public function setMethod($method)
    {
        $this->_method = $method;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getMethod()
    {
        return $this->_method;
    }

    /**
     * @param array $headers
     * @return $this
     */
    public function setHeaders(array $headers)
    {
        $this->_headers = $headers;
        return $this;
    }

    /**
     * @param array $content
     * @return $this
     */
    public function setContent(array $content)
    {
        $this->_content = $content;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getHeaders()
    {
        return $this->_headers;
    }

    /**
     * @return mixed
     */
    public function getContent()
    {
        return $this->_content;
    }

    /**
     * @return int
     */
    public function getData()
    {
        $httpClient = HttpClient::create();
        $response = $httpClient->request(
            'POST', $this->getUrl() . $this->getMethod(), [
                'headers' => $this->getHeaders(),
                'query' => $this->getContent()
            ]
        );
        return $response->getContent();
    }
}