<?php

// Copyright (C) 2019-2021 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

declare(strict_types=1);

namespace ToolboxSass\Helpers;

class PHPCSFixerHelper
{
    /**
     * Returns an array of "house" PHP CS Fixer rules that I use for
     * freelance and personal projects.
     *
     * @return array An array of PHP CS Fixer rules
     */
    public static function getHouseRules(): array
    {
        return [
            '@PhpCsFixer' => true,
            '@PSR2' => true,
            'array_syntax' => ['syntax' => 'short'],
            'concat_space' => ['spacing' => 'one'],
            'declare_strict_types' => true,
            'ordered_imports' => ['sort_algorithm' => 'alpha'],
            'no_unused_imports' => true,
            'multiline_whitespace_before_semicolons' => [
                'strategy' => 'no_multi_line',
            ],
            'void_return' => true,
        ];
    }
}
