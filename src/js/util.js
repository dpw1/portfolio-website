//wait for element to appear
function waitForElement(elementId, callBack) {
  window.setTimeout(function() {
    var element = document.querySelector(elementId);
    if (element) {
      callBack(elementId, element);
    } else {
      waitForElement(elementId, callBack);
    }
  }, 500);
}

String.prototype.replaceAll = function(obj) {
  let finalString = "";
  let word = this;
  for (let each of word) {
    for (const o in obj) {
      const value = obj[o];
      if (each == o) {
        each = value;
      }
    }
    finalString += each;
  }

  return finalString;
};
