// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

/* eslint-env node */

const grayMatter = require('gray-matter');
const marked = require('marked');
const TwigProcessor = require('./TwigProcessor');

class MarkdownProcessor {
  static get INPUT_EXTENSION() {
    return '.md';
  }

  static get OUTPUT_EXTENSION() {
    return '.html';
  }

  static preprocess(data) {
    const parsed = grayMatter(data.content, { delimiters: ['<!--', '-->'] });

    return Object.assign(data, parsed.data);
  }

  static process(data) {
    const renderedMarkdown = marked(
      data.content,
      { headerIds: false, smartypants: true },
    );

    if ('twigTemplate' in data) {
      const twigContext = data;

      twigContext.inputFilePath = data.twigTemplate;
      twigContext.renderedMarkdown = renderedMarkdown;

      return TwigProcessor.process(twigContext);
    }

    return Promise.resolve(renderedMarkdown);
  }
}

module.exports = MarkdownProcessor;
