$(document).ready(function() {

  /*document.addEventListener("touchmove", function(e) {
    e.preventDefault();
  }, false);*/

  var ua = navigator.userAgent;
  var type = document.getElementsByTagName("h1")[0];
  var html = document.documentElement;

  if (ua.match(/firefox/i)) {
    document.getElementById("overglow").disabled = true;
  }

  $('input[type="range"]').on('input', function () {
    var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);
    $(this).css('background', '-webkit-linear-gradient(left, #419bf9 0%, #419bf9 ' + percent + '%, #B3B3B3 ' + percent + '%)');
  });

  $(".draggable").draggable({
    handle: ".handle"
  });

  // hide controls and set heading images to closed
  $('.group, #font, #otherfont').hide();
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
  $("#inputForm").change(
    function() {
      refreshFeatures();
    }
  )
  $("#reset").click(
    function() {
      window.location.reload();
    }
  )

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
  var contrast = document.getElementById("contrast");
  var overglow = document.getElementById("overglow");
  var pixelation = document.getElementById("pixelation");
  var spacing = document.getElementById("letterspacing");
  var leading = document.getElementById("leading");
  var weight = document.getElementById("weight");
  var wideness = document.getElementById("wideness");
  var heightness = document.getElementById("heightness");

  function getSize() {
    var style = window.getComputedStyle(type, null).getPropertyValue('font-size') || 0;
    return parseFloat(style);
  }

  var initialSize = getSize();
  var once = false;

  size.addEventListener("input", function () {
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

  vision.addEventListener("input", function () {
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
  }, false);

  contrast.addEventListener("input", function () {
    type.style.opacity =  contrast.value / 100;
  }, false);

  overglow.addEventListener("input", function () {
    if (overglow.value > 0) {
      html.classList.add("overglow");
    } else {
      html.classList.remove("overglow");
    }
    if (html.classList.contains("vision")) {
      type.style.webkitTextStroke = ((vision.value / 20) + (overglow.value / 2)) + "px #222";
      type.style.textShadow = "0 0 " + overglow.value * 4 + "px #222";
      type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
    } else {
      type.style.webkitFilter = "blur(" + overglow.value / 6 + "px)";
      type.style.webkitTextStroke = overglow.value / 2 + "px #222";
      if (ua.match(/safari/i) && !ua.match(/chrome/i)) {
        type.style.textShadow = "0 0 " + overglow.value + "px rgba(0,0,0,.3), 0 0 " + overglow.value * 0.5 + "px rgba(0,0,0,.3)";
      } else {
        type.style.textShadow = "0 0 " + overglow.value * 4 + "px #222, 0 0 " + overglow.value * 2 + "px #222";
      }

      type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0)";
    }
  }, false);

  pixelation.addEventListener("input", function () {
    if (!once) {
      initialSize = getSize();
      once = true;
    }
    if (pixelation.value > 0) {
        html.classList.add("pixelation");
        type.style.mozTransform = "translateY(-50%) translateX(-50%) translateZ(0) scale(" + pixelation.value + ")";
        type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0) scale(" + pixelation.value + ")";
        type.style.fontSize = initialSize / pixelation.value + "px";
    } else {
      type.style.transform = "translateY(-50%) translateX(-50%)";
      html.classList.remove("pixelation");
      type.style.fontSize = initialSize + "px";
      once = false;
    }
  }, false);

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
    type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0) scale(" + wideness.value + ", 1.0)";
  }, false);

  heightness.addEventListener("input", function () {
    type.style.transform = "translateY(-50%) translateX(-50%) translateZ(0) scale(1.0, " + heightness.value + ")";
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
    $('#otherfont').show();
  } else {
    $('#otherfont').hide();
    document.getElementsByTagName("h1")[0].style.fontFamily = typefaceSelect.value;
  }
}

function refreshOther() {
  document.getElementsByTagName("h1")[0].style.fontFamily = document.getElementById("otherfont").value;
}
