// Copyright (C) 2019-2021 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

// The following is based on
// <https://programmingwithmosh.com/javascript/javascript-throttle-and-debounce-patterns/>.
function throttle(callback, interval = 0) {
  let throttled = true;

  // eslint-disable-next-line func-names
  return function (...args) {
    if (!throttled) {
      return;
    }

    throttled = false;
    callback.apply(this, args);
    if (interval > 0) {
      // eslint-disable-next-line no-return-assign
      setTimeout(() => throttled = true, interval);
    } else {
      // eslint-disable-next-line no-return-assign
      window.requestAnimationFrame(() => throttled = true);
    }
  };
}

module.exports = throttle;
