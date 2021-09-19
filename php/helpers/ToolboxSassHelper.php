<?php

// Copyright (C) 2019-2021 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

declare(strict_types=1);

namespace ToolboxSass\Helpers;

class ToolboxSassHelper
{
    /**
     * Returns the full path to toolbox-sass' Twig template directory.
     *
     * @return string The full path to toolbox-sass' Twig template directory
     */
    public static function getTwigDirectory(): string
    {
        return dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'twig';
    }

    /**
     * Returns the full path to toolbox-sass' PHP views directory.
     *
     * @return string The full path to toolbox-sass' PHP views directory
     */
    public static function getViewsDirectory(): string
    {
        return dirname(__DIR__) . DIRECTORY_SEPARATOR . 'views';
    }
}
