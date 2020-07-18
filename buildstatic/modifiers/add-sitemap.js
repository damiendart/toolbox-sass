// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

const path = require('path');
const SVGProcessor = require('../processors/SVGProcessor');

function addSitemap(globalData, items, options = {}) {
  const sitemapEntries = [];
  let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>';

  items.forEach((item) => {
    if (
      'ignorePattern' in options
      && item.data.outputFilePath.match(options.ignorePattern)
    ) {
      return;
    }

    if ('slug' in item.data) {
      sitemapEntries.push(item.data.slug);
    }
  });

  if ('additionalEntries' in options) {
    sitemapEntries.push.apply(options.additionalEntries);
  }

  sitemapXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  sitemapXML += sitemapEntries.sort((a, b) => a.localeCompare(b)).reduce(
    (carry, item) => `${carry}<url><loc>${globalData.urlBase}${item}</loc></url>`,
    '',
  );
  sitemapXML += '</urlset>';

  items.push({
    data: {
      content: sitemapXML,
      inputFilePath: null,
      outputFilePath: path.join(globalData.outputBaseDirectoryPath, 'sitemap.xml'),
    },
    processor: SVGProcessor,
  });

  return [globalData, items];
}

module.exports = addSitemap;
