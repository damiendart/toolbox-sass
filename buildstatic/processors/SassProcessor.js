// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

/* eslint-env node */

const autoprefixer = require('autoprefixer');
const CleanCSS = require('clean-css');
const postcss = require('postcss');
const sass = require('sass');

class SassProcessor {
  static get INPUT_EXTENSION() {
    return '.scss';
  }

  static get OUTPUT_EXTENSION() {
    return '.css';
  }

  static process(content, context) {
    return postcss([autoprefixer]).process(
      sass.renderSync({ data: content }).css.toString(),
      { from: context.inputFile.name },
    )
      .then((postCSSOutput) => new CleanCSS().minify(postCSSOutput.css).styles);
  }
}

module.exports = SassProcessor;
