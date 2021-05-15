<?php
// Copyright (C) 2019-2021 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

declare(strict_types=1);

use PhpCsFixer\Config;
use PhpCsFixer\Finder;
use ToolboxSass\Helpers\PHPCSFixerHelper;

return (new Config())
    ->setRules(PHPCSFixerHelper::getHouseRules())
    ->setFinder(
        Finder::create()
            ->in(__DIR__ . DIRECTORY_SEPARATOR . 'php')
            ->in(__DIR__ . DIRECTORY_SEPARATOR . 'twig')
            ->name('*.php')
            ->name('*.twig')
    );
