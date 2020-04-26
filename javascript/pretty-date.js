// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.0

function spellOutNumber(number) {
  return ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][number] || number;
}

// The following is based on <http://ejohn.org/files/pretty.js>.
function updatePrettyDates() {
  // Internet Explorer 11 doesn't implement `NodeList.forEach()`,
  // hence the `Array.prototype.forEach()` kludge. See
  // <https://developer.mozilla.org/en-US/docs/Web/API/NodeList#Example>
  // for more information.
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-timestamp]'),
    (element) => {
      const timeSince = Math.floor(
        (new Date().getTime() / 1000) - parseInt(element.getAttribute('data-timestamp'), 10),
      );

      // eslint-disable-next-line no-param-reassign
      element.innerHTML = (timeSince < 60 && `${spellOutNumber(Math.floor(timeSince))} seconds ago`)
        || (timeSince < 120 && 'a minute ago')
        || (timeSince < 3600 && `${spellOutNumber(Math.floor(timeSince / 60))} minutes ago`)
        || (timeSince < 7200 && 'an hour ago')
        || (timeSince < 86400 && `${spellOutNumber(Math.floor(timeSince / 3600))} hours ago`)
        || (timeSince < 172800 && 'a day ago')
        || (timeSince < 2592000 && `${spellOutNumber(Math.floor(timeSince / 86400))} days ago`)
        || (timeSince < 5184000 && 'a month ago')
        || (timeSince < 31536000 && `${spellOutNumber(Math.floor(timeSince / 2592000))} months ago`)
        || (timeSince < 63072000 && 'a year ago')
        || (`${spellOutNumber(Math.ceil(timeSince / 31536000))} years ago`);
    },
  );
}

updatePrettyDates();
window.setInterval(updatePrettyDates, 1000);