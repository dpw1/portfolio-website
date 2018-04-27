(function() {
  //automatically enumerate "expertise"
  (function numberExpertise() {
    waitForElement(".t-expertise .c-number", function() {
      var $expertiseItems = document.querySelectorAll('.t-expertise .c-number');
      for (var i = 0; i < $expertiseItems.length; i++) {
        var num = i < 10 ? '0' + (i+1) : (i+1);
        $expertiseItems[i].innerHTML = num;
      }

    });

  })();
})();
