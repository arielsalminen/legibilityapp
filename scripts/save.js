$(document).ready(function() {
  if (document.querySelectorAll && window.addEventListener && "classList" in document.documentElement) {

    function saving() {
      var btn = document.querySelector(".func--save");
      btn.classList.add("func--save__saving");
      btn.classList.add("func--save__savingend");
      $(".func--reset").addClass("func--disabled");
      $(".func--reload").addClass("func--disabled");
      btn.innerHTML = "Saving";
      document.documentElement.classList.add("saving");
      window.setTimeout(function() {
        btn.innerHTML = "Saved&nbsp;";
        btn.classList.remove("func--save__saving");
        $(".func--reset").removeClass("func--disabled");
        $(".func--reload").removeClass("func--disabled");
        document.documentElement.classList.remove("saving");
        window.setTimeout(function() {
          btn.innerHTML = "Save";
          btn.classList.remove("func--save__savingend");
        }, 800);
      }, 1400);
    }

    function storeUserEditable() {
      if (!$(".func--save").hasClass("func--save__savingend")) {
        var edits = document.querySelector(".editor").innerHTML;
        var settings = document.getElementById("controls").innerHTML;
        var theme = document.documentElement.className;
        saving();
        localStorage.setItem("userEditable", edits);
        localStorage.setItem("userSettings", settings);
        localStorage.setItem("userTheme", theme);
      }
    }

    function getUserEditable() {
      var edits = localStorage.getItem("userEditable");
      var settings = localStorage.getItem("userSettings");
      var theme = localStorage.getItem("userTheme");
      if (edits) {
        document.querySelector(".editor").innerHTML = edits;
        if (settings) {
          document.getElementById("controls").innerHTML = settings;
        }
        if (theme) {
          document.documentElement.className = theme;
        }
        initFunctionalities();

        var visionValue = document.getElementById("visionoutput").innerHTML;
        document.getElementById("vision").value = visionValue.replace("ft", "");

        var overglowValue = document.getElementById("overglowoutput").innerHTML;
        document.getElementById("overglow").value = overglowValue;

        var pixelationValue = document.getElementById("pixelationoutput").innerHTML;
        document.getElementById("pixelation").value = pixelationValue.replace("px", "");

        var contrastValue = document.getElementById("contrastoutput").innerHTML;
        document.getElementById("contrast").value = contrastValue.replace("%", "");

        var weightValue = document.getElementById("weightoutput").innerHTML;
        document.getElementById("weight").value = weightValue;

        var textsizeValue = document.getElementById("textsizeoutput").innerHTML;
        document.getElementById("textsize").value = textsizeValue.replace("vw", "");

        var leadingValue = document.getElementById("leadingoutput").innerHTML;
        document.getElementById("leading").value = leadingValue;

        var letterspacingValue = document.getElementById("letterspacingoutput").innerHTML;
        document.getElementById("letterspacing").value = letterspacingValue.replace("em", "");
      }
    }

    function clearUserEditable() {
      if (confirm("Permanently erase all changes?")) {
        localStorage.removeItem("userEditable");
        localStorage.removeItem("userSettings");
        localStorage.removeItem("userTheme");
        document.getElementById("editor").innerHTML = "<div class='handle'></div><h1 style='filter: blur(0px);' contenteditable autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'>1ilI|!</h1>";
        var editorContent = $.get(document.location.href, function(data) {
          var editorState = $(data).filter("div#controls").html();
          document.querySelector("#controls").innerHTML = editorState;
          document.documentElement.className = "";
          initFunctionalities();
        });
      }
    }

    window.addEventListener("load", function() {
      getUserEditable();
    }, false);


    var save = document.querySelector(".func--save");
    var clear = document.querySelector(".func--reset");
    var reload = document.querySelector(".func--reload");
    save.addEventListener("click", function(e) {
      e.preventDefault();
      storeUserEditable();
    }, false);
    clear.addEventListener("click", function(e) {
      e.preventDefault();
      clearUserEditable();
    }, false);
    reload.addEventListener("click", function(e) {
      e.preventDefault();
      window.location.reload();
    }, false);

  }
});
