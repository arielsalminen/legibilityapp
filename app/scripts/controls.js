$(document).ready(
function() {

	var type = document.getElementsByTagName("h1")[0];

	$('input[type="range"]').on('input', function () {
            var percent = Math.ceil(((this.value - this.min) / (this.max - this.min)) * 100);
            console.log(this.min);
            $(this).css('background', '-webkit-linear-gradient(left, #419bf9 0%, #419bf9 ' + percent + '%, #B3B3B3 ' + percent + '%)');
        });

	// hide controls and set heading images to closed
	$('.group, #font, #otherfont').hide();
	$('#controls h3').addClass("closed");

	// show typeface selector by default
	$('#legibility, #projectgroup').toggleClass("closed");
	$('#legibility, #projectgroup').next(".group").show();

	// show/hide control group
	$('#controls h3').click(
		function() {
			$(this).toggleClass("closed");
			$(this).next(".group").slideToggle(200);
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
	//refreshFont();
	//refreshFeatures();

	var size = document.getElementById("textsize");
	size.addEventListener("input", function () {
		type.style.fontSize = size.value + "vw";
	});

	var distance = document.getElementById("distance");
	distance.addEventListener("input", function () {
		type.style.webkitTextStroke = distance.value / 20 + "px #fff";
		type.style.webkitFilter = "blur(" + distance.value / 20 + "px)";
	});

	var contrast = document.getElementById("contrast");
	contrast.addEventListener("input", function () {

		type.style.opacity =  contrast.value / 100;
	});

	var overglow = document.getElementById("overglow");
	overglow.addEventListener("input", function () {
		type.style.webkitFilter = "blur(" + overglow.value / 3 + "px)";
		type.style.webkitTextStroke = overglow.value / 2 + "px #222";
	});
})

/*var defaultOff = [
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
    if (!document.getElementById(defaultOn[f]).checked) { wfeatures += "&quot;" + defaultOn[f] + "&quot; 0, "; }
  }
  for (f in defaultOff) {
    if (document.getElementById(defaultOff[f]).checked) { wfeatures += "&quot;" + defaultOff[f] + "&quot; 1, "; }
  }
  wfeatures = wfeatures.substring(0, wfeatures.length - 2);
  document.getElementById("mozfeatures13").innerHTML = wfeatures;
  document.getElementById("msfeatures").innerHTML = wfeatures;
  document.getElementById("ofeatures").innerHTML = wfeatures;
  document.getElementById("webkitfeatures").innerHTML = wfeatures;
  document.getElementById("w3cfeatures").innerHTML = wfeatures;

  refreshSample();

};

function refreshSample() {

  var sample = document.getElementById("sampleText");

  italic = document.getElementById("italic").checked ? "italic" : "";
  italicfamily = italic ? "'" + document.getElementById("font").value+" Italic', " : "";
  fontFamily = italicfamily + "'"+document.getElementById("font").value+"'";
  sample.style.fontFamily = fontFamily + ", sans-serif";
  sample.style.fontStyle = italic;

  var wfeatures = document.getElementById("webkitfeatures").innerHTML;

  if ("MozFontFeatureSettings" in sample.style) {
    // first, reset the property to normal
    sample.style.MozFontFeatureSettings = "normal";

    // old Firefox syntax
    var mfeatures = document.getElementById("mozfeatures").innerHTML;
    sample.style.MozFontFeatureSettings = "'" + mfeatures + "'";

    // if that failed setting will be "normal", use standard syntax
    if (sample.style.MozFontFeatureSettings == "normal") {
      sample.style.MozFontFeatureSettings = wfeatures;
    }
  }

  document.getElementById("w3cfeatures").innerHTML = wfeatures;
  sample.style.msFontFeatureSettings = wfeatures;
  sample.style.oFontFeatureSettings = wfeatures;
  sample.style.webkitFontFeatureSettings = wfeatures;
  sample.style.fontFeatureSettings = wfeatures;
};

function refreshFont() {
    var typefaceSelect = document.getElementById("typeface");
    if ((typefaceSelect.selectedIndex) == 0) {
        $('#otherfont').show();
    } else {
        $('#otherfont').hide();
        document.getElementById("font").value = typefaceSelect.value;
    }
}

function refreshOther() {
    document.getElementById("font").value = document.getElementById("otherfont").value;
    refreshSample();
}

function getFamilies() {
	var all_styles = document.getElementsByTagName('style');
	var fontdeck_style = all_styles[0];
	var style_rules = fontdeck_style.childNodes[0].nodeValue;
	var style_rules_ar = style_rules.split("font-family:'");
	var families = new Array();

	for (var i = 1; i < style_rules_ar.length; i++) {
		families[i-1] = style_rules_ar[i].split("'")[0];
    }

    return families;
}

function initFamilies() {
	var families = getFamilies();
	var typeface_select = document.getElementById("typeface");
	for (var i = 0; i < families.length; i++) {
		var option = document.createElement("option");
		var family = document.createTextNode(families[i]);
		option.appendChild(family);
		option.setAttribute("value", families[i]);
		typeface_select.appendChild(option);
    }
}

window.onload = initFamilies;*/
