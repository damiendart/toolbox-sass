<?php
// Copyright (C) 2019-2021 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

use PhpCsFixer\Config;
use Symfony\Component\Finder\Finder;

return Config::create()
    ->setRules([
        '@PhpCsFixer' => true,
        '@PSR2' => true,
        'array_syntax' => ['syntax' => 'short'],
        'concat_space' => ['spacing' => 'one'],
        'ordered_imports' => ['sortAlgorithm' => 'alpha'],
        'no_unused_imports' => true,
    ])
    ->setFinder(
        Finder::create()
            ->in(join(DIRECTORY_SEPARATOR, [__DIR__, 'php']))
            ->in(join(DIRECTORY_SEPARATOR, [__DIR__, 'twig']))
            ->name('*.php')
            ->name('*.twig')
    );
