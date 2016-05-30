$(document).ready(function() {

  var ua = navigator.userAgent;
  var type = document.getElementsByTagName("h1")[0];
  var html = document.documentElement;

  if (ua.match(/firefox/i)) {
    document.getElementById("overglow").disabled = true;
  }

  $(".svg-hover").on("click", function(e) {
    e.preventDefault();
    $(".svg-hover").removeClass("active");
    $(".svg-hover").addClass("deactive");
    $(this).addClass("active").removeClass("deactive");
  });

  $('input[type="range"]').on('input', function () {
    var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);
    $(this).css('background', '-webkit-linear-gradient(left, #419bf9 0%, #419bf9 ' + percent + '%, #B3B3B3 ' + percent + '%)');
  });

  $(".draggable").draggable({
    handle: ".handle"
  });

  // hide controls and set heading images to closed
  $('.group').hide();
  $('#controls h3').addClass("closed");

  // show typeface selector by default
  $('#legibility').toggleClass("closed");
  $('#legibility').next(".group").show();

  // show/hide control group
  $('#controls h3').click(
    function() {
      $(this).toggleClass("closed");
      $(this).next(".group").slideToggle(200);
      setTimeout(function() {
        resize();
      }, 201);
    }
  );

  // update changes
  $("#inputForm").on("change", function() {
    refreshFeatures();
  });

  refreshFeatures();
  refreshFont();

  $("#typeface").higooglefonts({
    loadedCallback:function(font){
      $("h1").css("font-family", font);
    }
  });

  $("select").each(function() {
   if (!($(this).hasClass("customselect"))) {
     $(this).select2({
       theme: "classic",
       minimumResultsForSearch: 30
     });
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
  var wideness = document.getElementById("wideness");
  var heightness = document.getElementById("heightness");
  var rotateX = document.getElementById("rotatex");
  var rotatey = document.getElementById("rotatey");
  var rotatez = document.getElementById("rotatez");

  function getSize() {
    var style = window.getComputedStyle(type, null).getPropertyValue('font-size') || 0;
    return parseFloat(style);
  }

  function resetPixelation() {
    pixelation.value = 0;
    $pixelation.css('background', '#B3B3B3');
    $("#pixelationoutput").html("0px");
    type.style.fontSize = initialSize + "px";
    html.classList.remove("pixelation");
    type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
  }

  var initialSize = getSize();
  var once = false;

  size.addEventListener("input", function () {
    resetPixelation();

    if (size.value > 0) {
      html.classList.add("size");
    } else {
      html.classList.remove("size");
    }
    once = false;
    type.style.fontSize = size.value + "vw";
    type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
    html.classList.remove("pixelation");
    pixelation.value = 0;
    pixelation.style.background = "-webkit-linear-gradient(left, rgb(65, 155, 249) 0%, rgb(65, 155, 249) 0%, rgb(179, 179, 179) 0%)";
    once = false;

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
        type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
      } else {
        type.style.webkitTextStroke = ((vision.value / 20) + (overglow.value / 2)) + "px #111";
        type.style.textShadow = "0 0 " + overglow.value * 4 + "px #111";
        type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
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
      type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
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
        type.style.mozTransform = "translateY(-50%) translateX(-50%) translateZ(0) scale(" + pixelation.value + ")";
        type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0) scale(" + pixelation.value + ")";
        type.style.fontSize = initialSize / pixelation.value + "px";
    } else {
      type.style.transform = "translateY(-50%) translateX(-50%)";
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

  wideness.addEventListener("input", function () {
    resetPixelation();
    type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0) scale(" + wideness.value + ", " + heightness.value + ")";
  }, false);

  heightness.addEventListener("input", function () {
    resetPixelation();
    type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0) scale(" + wideness.value + ", " + heightness.value + ")";
  }, false);

  rotatex.addEventListener("input", function () {
    type.style.transform = "rotate3d(1, 0, 0, " + rotatex.value + "deg)";
  }, false);

  rotatey.addEventListener("input", function () {
    type.style.transform = "rotate3d(0, 1, 0, " + rotatey.value + "deg)";
  }, false);

  rotatez.addEventListener("input", function () {
    type.style.transform = "rotate3d(1, 2, -1, " + rotatez.value + "deg)";
  }, false);


  var defaultOff = [
    'smcp', 'c2sc',
    'lnum', 'onum', 'tnum', 'pnum',
    'frac', 'afrc',
    'sups', 'subs',
    'zero', 'nalt',
    'kern',
    'liga', 'dlig', 'hlig', 'clig',
    'swsh', 'calt', 'hist', 'salt',
    'ss01', 'ss02', 'ss03', 'ss04', 'ss05','ss06', 'ss07', 'ss08', 'ss09'
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

  function resize() {
    var viewport = window.innerHeight;
    var body = document.body;
    var bodyHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

    if (bodyHeight === viewport) {
      html.classList.add("no-scroll");
    } else {
      html.classList.remove("no-scroll");
    }
  }

  window.addEventListener("resize", resize, false);
  resize();

});

function refreshFont() {
  var typefaceSelect = document.getElementById("typeface");
  if (typefaceSelect.selectedIndex == 0) {
    refreshOther();
  } else {
    document.getElementsByTagName("h1")[0].style.fontFamily = typefaceSelect.value;
  }
}

function refreshBoard() {
  document.getElementById("overglow").value = 0;
  document.getElementById("pixelation").value = 0;
  document.getElementById("vision").value = 0;
  $("#overglow").trigger("input");
  $("#vision").trigger("input");
  $("#pixelation").trigger("input");
  if ($("#board").val() == "negative") {
    document.documentElement.classList.add("negative");
  } else {
    document.documentElement.classList.remove("negative");
  }
  $("#overglow").css('background', '#B3B3B3');
  $("#overglowoutput").html("0");
  $("#pixelation").css('background', '#B3B3B3');
  $("#pixelationoutput").html("0px");
  $("#vision").css('background', '#B3B3B3');
  $("#visionoutput").html("0ft");

  document.documentElement.classList.remove("pixelation");
  document.documentElement.classList.remove("overglow");
  document.documentElement.classList.remove("vision");
  document.getElementsByTagName("h1")[0].style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
}

function refreshOther() {
  document.getElementsByTagName("h1")[0].style.fontFamily = document.getElementById("otherfont").value;
}
