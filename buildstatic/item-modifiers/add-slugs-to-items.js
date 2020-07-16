// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

function addSlugsToItems(items) {
  return items.map((item) => {
    if (item.data.outputFilePath.match(/(html?|php)/) === null) {
      return item;
    }

    const updatedItem = item;

    updatedItem.data.slug = item.data.outputFilePath.replace(
      new RegExp(
        `(${item.data.outputBaseDirectoryPath}/|(index)?.(html?|php)$)`,
        'g',
      ),
      '',
    );

    return updatedItem;
  });
}

module.exports = addSlugsToItems;
