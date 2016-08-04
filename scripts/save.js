$(document).ready(function() {
  if (document.querySelectorAll && window.addEventListener && "classList" in document.documentElement) {

    function storeUserEditable() {
      var edits = document.querySelector(".editor").innerHTML;
      localStorage.setItem("userEditable", edits);
    }

    function getUserEditable() {
      var edits = localStorage.getItem("userEditable");
      if (edits) {
        document.querySelector(".editor").innerHTML = edits;
      }
    }

    function clearUserEditable() {
      if (confirm("Permanently erase all changes?")) {
        localStorage.clear();
        document.querySelector(".editor").innerHTML = "<div class='handle'></div><h1 style='filter: blur(0px);' contenteditable autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'>1ilI|!</h1>";
      }
    }

    window.addEventListener("load", function() {
      getUserEditable();
    }, false);


    var save = document.querySelector(".func--save");
    var clear = document.querySelector(".func--reset");
    save.addEventListener("click", function(e) {
      e.preventDefault();
      storeUserEditable();
    }, false);
    clear.addEventListener("click", function(e) {
      e.preventDefault();
      clearUserEditable();
    }, false);

  }
});
