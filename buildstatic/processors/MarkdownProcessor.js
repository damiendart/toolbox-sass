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

  static process(data) {
    const parsed = grayMatter(data.content, { delimiters: ['<!--', '-->'] });
    const renderedMarkdown = marked(
      parsed.content,
      { headerIds: false, smartypants: true },
    );

    if ('twigTemplate' in parsed.data) {
      const twigContext = data;

      twigContext.inputFilePath = parsed.data.twigTemplate;
      twigContext.renderedMarkdown = renderedMarkdown;
      twigContext.frontmatter = parsed.data;

      return TwigProcessor.process(twigContext);
    }

    return Promise.resolve(renderedMarkdown);
  }
}

module.exports = MarkdownProcessor;
