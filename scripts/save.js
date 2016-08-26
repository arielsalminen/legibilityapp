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
        var customFont = document.getElementById("otherfont").value;
        var theme = document.documentElement.className;

        var kern = document.getElementById("kern").checked;
        var liga = document.getElementById("liga").checked;
        var dlig = document.getElementById("dlig").checked;
        var hlig = document.getElementById("hlig").checked;
        var clig = document.getElementById("clig").checked;
        var smcp = document.getElementById("smcp").checked;
        var c2sc = document.getElementById("c2sc").checked;
        var zero = document.getElementById("zero").checked;
        var nalt = document.getElementById("nalt").checked;
        var sups = document.getElementById("sups").checked;
        var subs = document.getElementById("subs").checked;
        var swsh = document.getElementById("swsh").checked;
        var calt = document.getElementById("calt").checked;
        var hist = document.getElementById("hist").checked;
        var salt = document.getElementById("salt").checked;
        var ss01 = document.getElementById("ss01").checked;
        var ss02 = document.getElementById("ss02").checked;
        var ss03 = document.getElementById("ss03").checked;
        var ss04 = document.getElementById("ss04").checked;
        var lnum = document.getElementById("lnum").checked;
        var onum = document.getElementById("onum").checked;
        var pnum = document.getElementById("pnum").checked;
        var tnum = document.getElementById("tnum").checked;
        var frac = document.getElementById("frac").checked;
        var afrc = document.getElementById("afrc").checked;

        saving();
        localStorage.setItem("userEditable", edits);
        localStorage.setItem("userSettings", settings);
        localStorage.setItem("userFont", customFont);
        localStorage.setItem("userTheme", theme);

        localStorage.setItem("userOT-kern", kern);
        localStorage.setItem("userOT-liga", liga);
        localStorage.setItem("userOT-dlig", dlig);
        localStorage.setItem("userOT-hlig", hlig);
        localStorage.setItem("userOT-clig", clig);
        localStorage.setItem("userOT-smcp", smcp);
        localStorage.setItem("userOT-c2sc", c2sc);
        localStorage.setItem("userOT-zero", zero);
        localStorage.setItem("userOT-nalt", nalt);
        localStorage.setItem("userOT-sups", sups);
        localStorage.setItem("userOT-subs", subs);
        localStorage.setItem("userOT-swsh", swsh);
        localStorage.setItem("userOT-calt", calt);
        localStorage.setItem("userOT-hist", hist);
        localStorage.setItem("userOT-salt", salt);
        localStorage.setItem("userOT-ss01", ss01);
        localStorage.setItem("userOT-ss02", ss02);
        localStorage.setItem("userOT-ss03", ss03);
        localStorage.setItem("userOT-ss04", ss04);
        localStorage.setItem("userOT-lnum", lnum);
        localStorage.setItem("userOT-onum", onum);
        localStorage.setItem("userOT-pnum", pnum);
        localStorage.setItem("userOT-tnum", tnum);
        localStorage.setItem("userOT-frac", frac);
        localStorage.setItem("userOT-afrc", afrc);
      }
    }

    function getUserEditable() {
      var edits = localStorage.getItem("userEditable");
      var settings = localStorage.getItem("userSettings");
      var theme = localStorage.getItem("userTheme");
      var customFont = localStorage.getItem("userFont", customFont);

      var userOTkern = localStorage.getItem("userOT-kern", kern) == "true" ? true : false;
      var userOTliga = localStorage.getItem("userOT-liga", liga) == "true" ? true : false;
      var userOTdlig = localStorage.getItem("userOT-dlig", dlig) == "true" ? true : false;
      var userOThlig = localStorage.getItem("userOT-hlig", hlig) == "true" ? true : false;
      var userOTclig = localStorage.getItem("userOT-clig", clig) == "true" ? true : false;
      var userOTsmcp = localStorage.getItem("userOT-smcp", smcp) == "true" ? true : false;
      var userOTc2sc = localStorage.getItem("userOT-c2sc", c2sc) == "true" ? true : false;
      var userOTzero = localStorage.getItem("userOT-zero", zero) == "true" ? true : false;
      var userOTnalt = localStorage.getItem("userOT-nalt", nalt) == "true" ? true : false;
      var userOTsups = localStorage.getItem("userOT-sups", sups) == "true" ? true : false;
      var userOTsubs = localStorage.getItem("userOT-subs", subs) == "true" ? true : false;
      var userOTswsh = localStorage.getItem("userOT-swsh", swsh) == "true" ? true : false;
      var userOTcalt = localStorage.getItem("userOT-calt", calt) == "true" ? true : false;
      var userOThist = localStorage.getItem("userOT-hist", hist) == "true" ? true : false;
      var userOTsalt = localStorage.getItem("userOT-salt", salt) == "true" ? true : false;
      var userOTss01 = localStorage.getItem("userOT-ss01", ss01) == "true" ? true : false;
      var userOTss02 = localStorage.getItem("userOT-ss02", ss02) == "true" ? true : false;
      var userOTss03 = localStorage.getItem("userOT-ss03", ss03) == "true" ? true : false;
      var userOTss04 = localStorage.getItem("userOT-ss04", ss04) == "true" ? true : false;
      var userOTlnum = localStorage.getItem("userOT-lnum", lnum) == "true" ? true : false;
      var userOTonum = localStorage.getItem("userOT-onum", onum) == "true" ? true : false;
      var userOTpnum = localStorage.getItem("userOT-pnum", pnum) == "true" ? true : false;
      var userOTtnum = localStorage.getItem("userOT-tnum", tnum) == "true" ? true : false;
      var userOTfrac = localStorage.getItem("userOT-frac", frac) == "true" ? true : false;
      var userOTafrc = localStorage.getItem("userOT-afrc", afrc) == "true" ? true : false;

      if (edits) {
        document.querySelector(".editor").innerHTML = edits;
        if (settings) {
          document.getElementById("controls").innerHTML = settings;
          savedContentWasLoaded = true;
        }
        if (theme) {
          document.documentElement.className = theme;
        }
        if (customFont) {
          document.getElementById("otherfont").value = customFont;
        }

        document.getElementById("kern").checked = userOTkern;
        document.getElementById("liga").checked = userOTliga;
        document.getElementById("dlig").checked = userOTdlig;
        document.getElementById("hlig").checked = userOThlig;
        document.getElementById("clig").checked = userOTclig;
        document.getElementById("smcp").checked = userOTsmcp;
        document.getElementById("c2sc").checked = userOTc2sc;
        document.getElementById("zero").checked = userOTzero;
        document.getElementById("nalt").checked = userOTnalt;
        document.getElementById("sups").checked = userOTsups;
        document.getElementById("subs").checked = userOTsubs;
        document.getElementById("swsh").checked = userOTswsh;
        document.getElementById("calt").checked = userOTcalt;
        document.getElementById("hist").checked = userOThist;
        document.getElementById("salt").checked = userOTsalt;
        document.getElementById("ss01").checked = userOTss01;
        document.getElementById("ss02").checked = userOTss02;
        document.getElementById("ss03").checked = userOTss03;
        document.getElementById("ss04").checked = userOTss04;
        document.getElementById("lnum").checked = userOTlnum;
        document.getElementById("onum").checked = userOTonum;
        document.getElementById("pnum").checked = userOTpnum;
        document.getElementById("tnum").checked = userOTtnum;
        document.getElementById("frac").checked = userOTfrac;
        document.getElementById("afrc").checked = userOTafrc;

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
      initFunctionalities();
    }

    function clearUserEditable() {
      if (confirm("Permanently erase all changes?")) {
        localStorage.removeItem("userEditable");
        localStorage.removeItem("userSettings");
        localStorage.removeItem("userTheme");
        localStorage.removeItem("userFont");
        document.getElementById("editor").innerHTML = "<div class='handle'></div><h1 style='filter: blur(0px);' contenteditable autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false'>1ilI|!</h1>";
        var editorContent = $.get(document.location.href, function(data) {
          var editorState = $(data).filter("div#controls").html();
          document.querySelector("#controls").innerHTML = editorState;
          document.documentElement.className = "";
          initFunctionalities();
        });
      }
    }

    getUserEditable();


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
