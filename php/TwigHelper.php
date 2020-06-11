<?php

namespace ToolboxSass;

class TwigHelper
{
    /**
     * @return string The full path to toolbox-sass' Twig directory.
     */
    public static function getTwigDirectory(): string
    {
        return dirname(__DIR__) . DIRECTORY_SEPARATOR . 'twig';
    }
}
