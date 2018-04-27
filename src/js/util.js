//wait for element to appear
function waitForElement(elementId, callBack){
  window.setTimeout(function(){
    var element = document.querySelector(elementId);
    if(element){
      callBack(elementId, element);
    }else{
      waitForElement(elementId, callBack);
    }
  },500)
}
