<?php
// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

namespace ToolboxSass;

class TwigHelper
{
    /**
     * @return string The full path to toolbox-sass' Twig template directory.
     */
    public static function getTwigDirectory(): string
    {
        return dirname(__DIR__) . DIRECTORY_SEPARATOR . 'twig';
    }
}
