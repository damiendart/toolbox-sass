<?php

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
