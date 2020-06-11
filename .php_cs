<?php
// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

use PhpCsFixer\Config;
use Symfony\Component\Finder\Finder;

return Config::create()
    ->setRules([
        '@PSR2' => true,
        'array_syntax' => ['syntax' => 'short'],
        'ordered_imports' => ['sortAlgorithm' => 'alpha'],
        'no_unused_imports' => true,
    ])
    ->setFinder(
        Finder::create()
            ->notPath('vendor')
            ->in(__DIR__)
            ->name('*.php')
            ->name('*.twig')
    );
