// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

/* eslint-env node */

const { minify } = require('html-minifier');
const {
  TwingEnvironment,
  TwingFilter,
  TwingLoaderRelativeFilesystem,
} = require('twing');

const marked = require('marked');

class TwigProcessor {
  static get INPUT_EXTENSION() {
    return '.twig';
  }

  static get OUTPUT_EXTENSION() {
    return '';
  }

  constructor() {
    this.twingEnvironment = new TwingEnvironment(
      new TwingLoaderRelativeFilesystem(),
      { strict_variables: true },
    );

    this.twingEnvironment.addFilter(
      new TwingFilter(
        'markdown',
        (markup) => {
          const markdown = markup.toString();
          const indentation = markdown.match(/^\s*/);
          const indentationRegex = new RegExp(
            `^${indentation && indentation.length}` ? indentation[0] : '',
          );

          return marked(
            markdown.split(/\r?\n/).reduce(
              (carry, line) => `${carry}${line.replace(indentationRegex, '')}\n`,
              '',
            ),
            { headerIds: false, smartypants: true },
          );
        },
        [],
        { is_safe: ['html'] },
      ),
    );
  }

  process(content, context) {
    return new Promise((resolve) => {
      const template = this.twingEnvironment.load(context.inputFile.name);

      resolve(template.render(context));
    })
      .then((html) => minify(html,
        {
          collapseWhitespace: true,
          decodeEntities: true,
          minifyJS: true,
          removeComments: true,
          removeEmptyAttributes: true,
        }));
  }
}

module.exports = TwigProcessor;
