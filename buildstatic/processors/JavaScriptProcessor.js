// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

/* eslint-env node */

const babel = require('@babel/core');
const browserify = require('browserify');
const stream = require('stream');
const uglifyJS = require('uglify-js');

class JavaScriptProcessor {
  static get INPUT_EXTENSION() {
    return '.js';
  }

  static get OUTPUT_EXTENSION() {
    return this.INPUT_EXTENSION;
  }

  static process(content, context) {
    return new Promise((resolve, reject) => {
      browserify()
        .add(context.inputFile.name)
        .transform(
          (file) => {
            const chunks = [];

            return new stream.Transform({
              flush(callback) {
                babel.transform(
                  Buffer.concat(chunks).toString(),
                  {
                    filename: file,
                    ignore: [/node_modules\/(?!toolbox-sass\/)/],
                    presets: ['@babel/preset-env'],
                  },
                  (err, result) => {
                    if (err) {
                      callback(err);
                    } else {
                      callback(null, result.code);
                    }
                  },
                );
              },
              transform(chunk, encoding, callback) {
                chunks.push(chunk);
                callback();
              },
            });
          },
          { global: true },
        )
        .bundle((err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result.toString());
          }
        });
    })
      .then((bundle) => uglifyJS.minify(bundle).code);
  }
}

module.exports = JavaScriptProcessor;
