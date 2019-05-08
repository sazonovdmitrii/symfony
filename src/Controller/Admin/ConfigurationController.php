<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Controller\AdminController as BaseAdminController;

class ConfigurationController extends BaseAdminController
{
    private $_template = 'admin/Configuration/form.html.twig';

    protected function renderTemplate($actionName, $templatePath, array $parameters = array())
    {
        return $this->render($this->_template, $parameters);
    }
}
