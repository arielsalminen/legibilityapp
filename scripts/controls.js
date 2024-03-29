// Sanity check
var type, once, initialSize;
var ua = navigator.userAgent;
var html = document.documentElement;

// Needed for when things are loaded from localStorage
// to reinitialize the instances
function initFunctionalities() {
  (function() {
    if (!feature.svg || !feature.localStorage || !feature.addEventListener || !feature.css3Dtransform || !feature.viewportUnit) {
      document.getElementById("notice-2").className += " active";
      html.className = "nosupport";
      throw new Error("Browser not supported");
    }
  })();

  type = document.getElementsByTagName("h1")[0];

  $(".draggable").draggable({
    handle: ".handle"
  });

  $(".editor").draggable({
    handle: ".handle"
  });

  $(".editor").on("click", function(e) {
    e.preventDefault();
    $("h1").focus();
  });

  $('input[type="range"]').on('input', function () {
    var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);
    $(this).css('background', '-webkit-linear-gradient(left, #419bf9 0%, #419bf9 ' + percent + '%, #B3B3B3 ' + percent + '%)');
  });

  // hide controls and set heading images to closed
  $('.group').hide();
  $('#controls h3').addClass("closed");

  // hide controls and set heading images to closed
  $('#legibility').next(".group").show();
  $('#legibility').removeClass("closed");

  // show/hide control group
  $('#controls h3').click(
    function() {
      $(this).toggleClass("closed");
      $(this).next(".group").slideToggle(200);
    }
  );

  $('h1').focus(function() {
    $(".editor").addClass("focus");
  });
  $('h1').blur(function() {
    $(".editor").removeClass("focus");
  });

  if (ua.match(/firefox/i)) {
    document.getElementById("overglow").disabled = true;
  }

  if (ua.match(/ipad/i)) {
    document.documentElement.className += " ipad";
  }

  // update changes
  $("#inputForm").on("change", function() {
    refreshFeatures();
  });

  refreshFeatures();

  $("#typeface").higooglefonts({
    loadedCallback:function(font){
      $("h1").css("font-family", font);
    }
  });

  refreshFont();

  $("select").each(function() {
   if (!$(this).hasClass("customselect")) {
     $(this).select2({
       theme: "classic",
       minimumResultsForSearch: 30
     });
     if ($(".select2").next(".select2")) {
       $(".select2").next(".select2").remove();
     }
   }
  });

  var size = document.getElementById("textsize");
  var vision = document.getElementById("vision");
  var $vision = $("#vision");
  var contrast = document.getElementById("contrast");
  var overglow = document.getElementById("overglow");
  var $overglow = $("#overglow");
  var pixelation = document.getElementById("pixelation");
  var $pixelation = $("#pixelation");
  var spacing = document.getElementById("letterspacing");
  var leading = document.getElementById("leading");
  var weight = document.getElementById("weight");

  function getSize() {

    var style = window.getComputedStyle(type, null).getPropertyValue('font-size') || 0;
    return parseFloat(style);
  }

  function toggle3dSpace() {

    if ($(".floor").hasClass("active")) {
      type.style.transform = "rotate3d(359, -50, 80, 70deg)";
    } else if ($(".wall-left").hasClass("active")) {
      type.style.transform = "rotate3d(-120, 180, -40, 60deg) ";
    } else if ($(".wall-right").hasClass("active")) {
      type.style.transform = "rotate3d(120, 180, 40, 60deg) ";
    } else {
      type.style.transform = "translateZ(0)";
    }
  }

  function resetPixelation() {

    if (html.classList.contains("space3d")) {
      toggle3dSpace();
    } else {
      type.style.transform = "translateZ(0)";
    }
    pixelation.value = 0;
    $pixelation.css('background', '#B3B3B3');
    $("#pixelationoutput").html("0px");
    type.style.fontSize = initialSize + "px";
    html.classList.remove("pixelation");
  }

  initialSize = getSize();
  once = false;

  size.addEventListener("input", function () {

    resetPixelation();
    if (size.value > 0) {
      html.classList.add("size");
    } else {
      html.classList.remove("size");
    }
    once = false;
    type.style.fontSize = size.value + "vw";
    initialSize = getSize();
  }, false);

  $vision.on("input", function () {

    resetPixelation();

    if (vision.value > 0) {
      html.classList.add("vision");
    } else {
      html.classList.remove("vision");
    }
    if (html.classList.contains("overglow")) {
      type.style.webkitFilter =
      type.style.mozFilter =
      type.style.filter = "blur(" + ((vision.value / 10) + (overglow.value / 1.5)) + "px)";
    } else {
      type.style.webkitFilter =
      type.style.mozFilter =
      type.style.filter = "blur(" + vision.value / 10 + "px)";
    }
  });

  contrast.addEventListener("input", function () {

    type.style.opacity =  contrast.value / 100;
  }, false);

  $overglow.on("input", function () {

    resetPixelation();

    if (overglow.value > 0) {
      html.classList.add("overglow");
    } else {
      html.classList.remove("overglow");
    }
    if (html.classList.contains("vision")) {
      if (html.classList.contains("negative")) {
        type.style.webkitTextStroke = ((vision.value / 20) + (overglow.value / 2)) + "px #fff";
        type.style.textShadow = "0 0 " + overglow.value * 4 + "px #fff";
      } else {
        type.style.webkitTextStroke = ((vision.value / 20) + (overglow.value / 2)) + "px #111";
        type.style.textShadow = "0 0 " + overglow.value * 4 + "px #111";
      }
      if (!html.classList.contains("space3d")) {
        type.style.transform = "translateZ(0)";
      }
    } else {
      if (html.classList.contains("negative")) {
        type.style.webkitTextStroke = overglow.value / 2 + "px #fff";
        if (ua.match(/safari/i) && !ua.match(/chrome/i)) {
          type.style.textShadow = "0 0 " + overglow.value + "px rgba(255,255,255,.3), 0 0 " + overglow.value * 0.5 + "px rgba(255,255,255,.3)";
        } else {
          type.style.textShadow = "0 0 " + overglow.value * 4 + "px #fff, 0 0 " + overglow.value * 2 + "px #fff";
        }
      } else {
        type.style.webkitTextStroke = overglow.value / 2 + "px #111";
        if (ua.match(/safari/i) && !ua.match(/chrome/i)) {
          type.style.textShadow = "0 0 " + overglow.value + "px rgba(0,0,0,.3), 0 0 " + overglow.value * 0.5 + "px rgba(0,0,0,.3)";
        } else {
          type.style.textShadow = "0 0 " + overglow.value * 4 + "px #111, 0 0 " + overglow.value * 2 + "px #111";
        }
      }
      type.style.webkitFilter = "blur(" + overglow.value / 6 + "px)";
    }
  });

  $pixelation.on("input", function () {

    document.getElementById("overglow").value = 0;
    document.getElementById("vision").value = 0;
    $overglow.css('background', '#B3B3B3');
    $("#overglowoutput").html("0");
    $vision.css('background', '#B3B3B3');
    $("#visionoutput").html("0ft");
    html.classList.remove("overglow");
    html.classList.remove("vision");

    if (!once) {
      initialSize = getSize();
      once = true;
    }
    if (pixelation.value > 0) {
      html.classList.add("pixelation");
      type.style.textShadow = "none";
      type.style.webkitTextStroke = "0";
      type.style.webkitFilter = "none";
      type.style.fontSize = initialSize / pixelation.value + "px";
      if (html.classList.contains("space3d")) {
        type.style.mozTransform = "translateZ(0) scale(" + pixelation.value + ")";
        type.style.transform = "translateZ(0) scale(" + pixelation.value + ")";
        if ($(".floor").hasClass("active")) {
          type.style.transform = "translateZ(0) scale(" + pixelation.value + ") rotate3d(359, -50, 80, 70deg)";
        } else if ($(".wall-left").hasClass("active")) {
          type.style.transform = "translateZ(0) scale(" + pixelation.value + ") rotate3d(-120, 180, -40, 60deg) ";
        } else if ($(".wall-right").hasClass("active")) {
          type.style.transform = "translateZ(0) scale(" + pixelation.value + ") rotate3d(120, 180, 40, 60deg) ";
        }
      } else {
        type.style.mozTransform = "translateZ(0) scale(" + pixelation.value + ")";
        type.style.transform = "translateZ(0) scale(" + pixelation.value + ")";
      }
    } else {
      if (html.classList.contains("space3d")) {
        toggle3dSpace();
      } else {
        type.style.transform = "none";
      }

      html.classList.remove("pixelation");
      type.style.fontSize = initialSize + "px";
      once = false;
    }
  });

  spacing.addEventListener("input", function () {

    type.style.letterSpacing = spacing.value + "em";
  }, false);

  leading.addEventListener("input", function () {

    type.style.lineHeight = leading.value;
  }, false);

  weight.addEventListener("input", function () {

    type.style.fontWeight = weight.value;
  }, false);

  $(".svg-hover").on("click", function(e) {

    html.classList.add("space3d");

    $(".reset").show();
    e.preventDefault();
    $(".svg-hover").removeClass("active");
    $(".svg-hover").addClass("deactive");
    $(this).addClass("active").removeClass("deactive");

    if (!html.classList.contains("pixelation")) {
      toggle3dSpace();
    } else {
      if ($(this).hasClass("floor")) {
        type.style.transform = "translateZ(0) scale(" + pixelation.value + ") rotate3d(359, -50, 80, 70deg)";
      } else if ($(this).hasClass("wall-left")) {
        type.style.transform = "translateZ(0) scale(" + pixelation.value + ") rotate3d(-120, 180, -40, 60deg) ";
      } else if ($(this).hasClass("wall-right")) {
        type.style.transform = "translateZ(0) scale(" + pixelation.value + ") rotate3d(120, 180, 40, 60deg) ";
      }
    }
  });

  $(".reset").on("click", function(e) {

    e.preventDefault();
    $(".svg-hover").removeClass("active");
    if (!html.classList.contains("pixelation")) {
      type.style.transform = "none";
    } else {
      type.style.transform = "translateZ(0) scale(" + pixelation.value + ")";
    }
    document.documentElement.classList.remove("space3d");
    $(this).hide();
  });
}

$(document).ready(function() {

  // Preload font previews
  var pic = new Image();
  pic.src = "../images/fonts.png";

  window.setTimeout(function() {
    $(".overlay").addClass("content-ready");
    $(".func--disabled").removeClass("func--disabled");
  }, 1000);

  if (!localStorage.getItem("userNoticeDismissed")) {
    window.setTimeout(function() {
      $(".notice").addClass("active");
    }, 8000);
  }

  $(".notice").on("click", function() {
    $(this).removeClass("active");
    localStorage.setItem("userNoticeDismissed", true);
  });

  var content = document.querySelector(".tiny-devices").innerHTML;
  document.querySelector(".group--about").innerHTML = content;
});

function refreshFont() {
  var selected = $("#typeface option:selected");
  if (selected) {
    if (selected[0].value == "Specify local font") {
      refreshOther();
    } else {
      document.getElementsByTagName("h1")[0].style.fontFamily = document.getElementById("typeface").value;
    }
  }
}

function refreshBoard() {
  if ($("#board").val() == "negative") {
    document.documentElement.classList.add("negative");
  } else {
    document.documentElement.classList.remove("negative");
  }
  if (!html.classList.contains("pixelation")) {
    $("#overglow").trigger("input");
  }
}

function refreshOther() {
  document.getElementsByTagName("h1")[0].style.fontFamily = document.getElementById("otherfont").value;
}

var defaultOff = [
  'smcp', 'c2sc',
  'lnum', 'onum', 'tnum', 'pnum',
  'frac', 'afrc',
  'sups', 'subs',
  'zero', 'nalt',
  'kern',
  'liga', 'dlig', 'hlig', 'clig',
  'swsh', 'calt', 'hist', 'salt',
  'ss01', 'ss02', 'ss03', 'ss04'
];

var defaultOn = [];

function refreshFeatures() {


  var mfeatures = "";
  var wfeatures = "";
  var f;
  for (f in defaultOn) {
    if (!document.getElementById(defaultOn[f]).checked) { wfeatures += "'" + defaultOn[f] + "' 0, "; }
  }
  for (f in defaultOff) {
    if (document.getElementById(defaultOff[f]).checked) { wfeatures += "'" + defaultOff[f] + "' 1, "; }
  }

  if ("MozFontFeatureSettings" in type.style) {
    // first, reset the property to normal
    type.style.MozFontFeatureSettings = "normal";

    // old Firefox syntax
    type.style.MozFontFeatureSettings = "'" + wfeatures + "'";

    // if that failed setting will be "normal", use standard syntax
    if (type.style.MozFontFeatureSettings == "normal") {
      type.style.MozFontFeatureSettings = wfeatures;
    }
  }

  wfeatures = wfeatures.substring(0, wfeatures.length - 2);
  type.style.msFontFeatureSettings = "'" + wfeatures + "'";
  type.style.oFontFeatureSettings = "'" + wfeatures + "'";
  type.style.webkitFontFeatureSettings = wfeatures;
  type.style.fontFeatureSettings = wfeatures;
};
