// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

/* eslint-env node */

const SVGO = require('svgo');

class SVGProcessor {
  static get INPUT_EXTENSION() {
    return '.svg';
  }

  static get OUTPUT_EXTENSION() {
    return this.INPUT_EXTENSION;
  }

  // eslint-disable-next-line class-methods-use-this
  process(content) {
    return new SVGO().optimize(content).then((output) => output.data);
  }
}

module.exports = SVGProcessor;
