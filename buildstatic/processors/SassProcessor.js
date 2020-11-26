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

  static preprocess(data) {
    return data;
  }

  static process(data) {
    return postcss([autoprefixer]).process(
      sass.renderSync({ data: data.content }).css.toString(),
      { from: data.inputFilePath },
    )
      .then((postCSSOutput) => new CleanCSS().minify(postCSSOutput.css).styles);
  }
}

module.exports = SassProcessor;
