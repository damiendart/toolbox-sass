// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

setTimeout(
  () => {
    if (document.documentElement.classList.contains('javascript--loaded')) {
      return;
    }

    document.documentElement.className += ' javascript--loading';
  },
  750,
);

document.addEventListener(
  'readystatechange',
  () => {
    if (document.readyState !== 'complete') {
      return;
    }

    document.documentElement.className = document.documentElement.className.replace(
      /javascript--loading/g,
      '',
    );

    document.documentElement.className += ' javascript--loaded';
  },
);
