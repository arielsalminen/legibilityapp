if (document.querySelectorAll && window.addEventListener && "classList" in document.documentElement) {

  function saving() {
    var btn = document.querySelector(".btn__save");
    btn.classList.add("btn__save--saving");
    window.setTimeout(function() {
      btn.classList.remove("btn__save--saving");
      var contents = document.querySelector(".btn__content");
      contents.innerHTML = "Saved";
    }, 1000);
  }

  var ended;
  function endOfTyping() {
    var contents = document.querySelector(".btn__content");
    contents.innerHTML = "Save";
    window.clearInterval(ended);
    ended = window.setInterval(function() {
      storeUserEditable();
      window.clearInterval(ended);
    }, 2000);
  }

  function updateIllustration(content) {
    var illustration = document.querySelector(".placeholder__wrapper");
    illustration.innerHTML = content;
  }

  function storeUserEditable() {
    saving();
    var edits = document.querySelector("#editable").innerHTML;
    var illustration = document.querySelector(".placeholder__wrapper").innerHTML;
    if (illustration === "") {
      illustration = " ";
    }
    localStorage.setItem("userEditable", edits);
    localStorage.setItem("userEditable2", illustration);
  }

  function getUserEditable() {
    var edits = localStorage.getItem("userEditable");
    var edits2 = localStorage.getItem("userEditable2");
    var input = document.querySelector("#placeholder-editor");
    if (edits) document.querySelector("#editable").innerHTML = edits;
    if (edits2) {
      document.querySelector(".placeholder__wrapper").innerHTML = edits2;
      input.value = edits2;
    }
  }

  function clearUserEditable() {
    if (confirm("Permanently delete all your changes?")) {
      localStorage.clear();
      document.getElementById("editable").innerHTML = "<h1 contentEditable='true' spellcheck='false'>Sketchpad</h1><p contenteditable='true' spellcheck='false'><strong>You can edit this content.</strong> Changes are automatically saved to browser’s localStorage and can be cleared using the controls below. Use Cmd+Z to undo. Style Guide: <a href='http://viljam.is/styleguide'>http://viljam.is/styleguide</a><span class='fleuron' title='Made with love by @viljamis'>&nbsp;❦</span></p>";
      document.querySelector(".placeholder__wrapper").innerHTML = "w<span class='kern'>e</span>b";
      document.querySelector("#placeholder-editor").value = "web";
      initUserEditing();
    }
  }

  function initUserEditing() {
    var header = document.querySelector("h1");

    setTimeout(function() {
      header.focus();
    }, 300);
    header.addEventListener("keyup", function(evt) {
      if (evt.keyCode !== 38 && evt.keyCode !== 40 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.keyCode !== 17 && evt.keyCode !== 18 && evt.keyCode !== 9 && evt.keyCode !== 27 && evt.keyCode !== 16) {
        endOfTyping();
      }
    }, false);
  }

  window.addEventListener("load", function() {
    getUserEditable();
    initUserEditing();
  }, false);

  var save = document.querySelector(".btn__save");
  var clear = document.querySelector(".btn__clear");
  save.addEventListener("click", function(e) {
    e.preventDefault();
    storeUserEditable();
  }, false);
  clear.addEventListener("click", function(e) {
    e.preventDefault();
    clearUserEditable();
  }, false);

}
