// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

function addHandler(
  containerElement,
  targetCallback,
  textCallback,
  successCallback,
  errorCallback,
) {
  containerElement.addEventListener(
    'click',
    (event) => {
      if (targetCallback(event.target) === false) {
        return;
      }

      const textToCopy = textCallback(event.target);

      event.preventDefault();

      if (this.copyToClipboard(textToCopy)) {
        successCallback(event.target, textToCopy);
      } else {
        errorCallback(event.target, textToCopy);
      }
    },
  );
}

function copyToClipboard(text) {
  let copySuccessful = false;
  const currentSelection = (document.getSelection().rangeCount > 0)
    ? document.getSelection().getRangeAt(0)
    : false;
  const textAreaElement = document.createElement('textarea');
  const currentVerticalPosition = window.pageYOffset
    || document.documentElement.scrollTop;

  textAreaElement.setAttribute('readonly', '');
  textAreaElement.style.left = '-9999px';
  textAreaElement.style.position = 'absolute';
  textAreaElement.style.top = `${currentVerticalPosition}px`;
  textAreaElement.value = text;

  document.body.appendChild(textAreaElement);
  textAreaElement.select();

  try {
    document.execCommand('copy');
    copySuccessful = true;
  } catch (err) {
    copySuccessful = false;
  }

  document.body.removeChild(textAreaElement);

  if (currentSelection) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(currentSelection);
  }

  return copySuccessful;
}

module.exports = { addHandler, copyToClipboard };
