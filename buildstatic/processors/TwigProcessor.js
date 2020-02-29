// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

/* eslint-env node */

const { minify } = require('html-minifier');
const {
  TwingEnvironment,
  TwingFilter,
  TwingLoaderFilesystem,
} = require('twing');

const marked = require('marked');

class TwigProcessor {
  static get INPUT_EXTENSION() {
    return '.twig';
  }

  static get OUTPUT_EXTENSION() {
    return '';
  }

  // eslint-disable-next-line no-underscore-dangle
  static _initEnvironment(directory) {
    const twingEnvironment = new TwingEnvironment(
      new TwingLoaderFilesystem(directory),
      { strict_variables: true },
    );

    twingEnvironment.addFilter(
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

    return twingEnvironment;
  }

  static process(content, context) {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-underscore-dangle
      const template = TwigProcessor
        ._initEnvironment(context.inputDirectory)
        .load(
          context.inputFile.name.replace(context.inputDirectory, ''),
        );

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
