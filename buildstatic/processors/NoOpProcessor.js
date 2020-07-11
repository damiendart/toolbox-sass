// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

/* eslint-env node */

class NoOpProcessor {
  static get INPUT_EXTENSION() {
    return null;
  }

  static get OUTPUT_EXTENSION() {
    return null;
  }

  static process(content) {
    return content;
  }
}

module.exports = NoOpProcessor;
