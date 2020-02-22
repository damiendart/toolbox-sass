// Copyright (C) 2020 Damien Dart, <damiendart@pobox.com>.
// This file is distributed under the MIT licence. For more information,
// please refer to the accompanying "LICENCE" file.

class Clipboard {
  constructor(containerElement, callbacks = {}) {
    this.containerElement = containerElement;
    this.targetCallback = callbacks.targetCallback;
    this.textCallback = callbacks.textCallback;
    this.successCallback = callbacks.successCallback;
    this.errorCallback = callbacks.errorCallback;
  }

  // eslint-disable-next-line class-methods-use-this
  copyToClipboard(text) {
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

  init() {
    this.containerElement.addEventListener(
      'click',
      (event) => {
        if (this.targetCallback(event.target) === false) {
          return;
        }

        const textToCopy = this.textCallback(event.target);

        event.preventDefault();

        if (this.copyToClipboard(textToCopy)) {
          this.successCallback(event.target, textToCopy);
        } else {
          this.errorCallback(event.target, textToCopy);
        }
      },
    );
  }
}

module.exports = Clipboard;
