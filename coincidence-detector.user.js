// ==UserScript==
// @name          Coincidence Detector
// @description   This userscript annotates the names of the Coincidences it detects on the webpages that you read. If you are non-Coincidence, then you SHOULD install this userscript. If you can't see why you would ever need to install such a script, just install it out of curiosity, and let it annotate the webpages that you read for a week, then you will see why this userscript could be useful. This script is fully private, and it doesn't collect or send any of your data anywhere.
// @author        Richard Spencer
// @license       If you're not a Coincidence, you can do whatever you want with this script. If you are a Coincidence, you are not permitted to do anything with this script, including downloading its source code to your computer, which you just did by opening this webpage, so you should close it right now and never ever remember it again. CAUTION: please be careful when using this script, as it may modify parts of the webpages that are supposed to contain the content written by you (see https://greasyfork.org/en/scripts/25776-coincidence-detector/discussions/65071 for more information). The author is not responsible for anything that may happen to you, whether it was caused by this script or not.
// @version       14.88
// @include       *
// @grant         GM_getResourceText
// @resource      theTree https://coincidencedetector.com/theTree.json
// @homepageURL   https://coincidencedetector.com/
// @namespace     https://coincidencedetector.com/
// ==/UserScript==

/* BELOW IS THE SOURCE CODE THAT'S BEEN MINIFIED FOR SPEED, IT'S 100% FUNCTIONALLY EQUIVALENT TO THE FULL SOURCE CODE. THIS CODE DOES NOTHING RIGHT NOW. GREASYFORK RULES DO NOT ALLOW MINIFIED CODE, SO IT'S BEEN COMMENTED OUT. IF YOU'D LIKE TO USE THE MINIFIED CODE, THEN YOU MUST STUDY IT AND DECIDE WHETHER YOU WANT TO USE IT BY YOURSELF. MADE WITH http://closure-compiler.appspot.com */
/* THIS VERSION OF THE USERSCRIPT IS NOT HOSTED ON GREASYFORK, BECAUSE IT'S A PIECE OF SHIT, THEREFORE MINIFIED CODE IS ENABLED BY DEFAULT. */


var e="(".repeat(3),f=")".repeat(3),g=JSON.parse(GM_getResourceText("theTree").toLowerCase()),h=0,k=window.performance.now(),l=window.performance.now();m(document.body);l=Math.abs(window.performance.now()-l-k);console.info("#LeoFongGANG","Coincidence Detector says it made "+h+" text nodes great again.");console.info("#LeoFongGANG","Summary time - "+l+".");console.info("#LeoFongGANG","Time per poked text node - "+l/h+".");var p=new MutationObserver(n);p.observe(document.body,{childList:!0,subtree:!0});
function n(c){c.forEach(function(a){"childList"==a.type&&a.addedNodes.forEach(function(b){b.nodeType==Node.ELEMENT_NODE&&(p.disconnect(),b.isContentEditable||m(b),p.observe(document.body,{childList:!0,subtree:!0}))})})}
function m(c){var a;switch(c.nodeType){case 1:case 9:case 11:for(a=c.firstChild;a;)c=a.nextSibling,m(a),a=c;break;case 3:h++;a="";for(var b=c.nodeValue.split(/\b/),d;0<b.length;)d=q(b,g),1<d[0]?(a=0<d[1]?e+b.slice(-d[0]).join("")+f+a:b.slice(-d[0]).join("")+a,b=b.slice(0,-d[0])):a=b.pop()+a;c.nodeValue=a}}
function q(c,a){var b=c[c.length-1].toLowerCase();if(b in a){if(0<=a[b])return[1,a[b]];if(2<=c.length){var d=q(c.slice(0,-1),a[b]);if(0<d[0])return[d[0]+1,d[1]]}if(""in a[b])return[1,a[b][""]]}return[-1,0]};


/* BELOW IS THE FULL SOURCE CODE. THIS CODE WILL BE EXECUTED BY YOUR WEB BROWSER AFTER INSTALL. */
/* THIS VERSION OF THE USERSCRIPT IS NOT HOSTED ON GREASYFORK, BECAUSE IT'S A PIECE OF SHIT, THEREFORE THIS CODE WILL NOT BE EXECUTED BY DEFAULT. */

/*const DEFAULT_ECHO_FACTOR = 3;
const DEFAULT_MIN_WORDS = 1;

const ECHO_LEFT = '('.repeat(DEFAULT_ECHO_FACTOR);
const ECHO_RIGHT = ')'.repeat(DEFAULT_ECHO_FACTOR);



var theTree = JSON.parse(GM_getResourceText('theTree').toLowerCase());

var count = 0;


var beginTime = window.performance.now();
var timeWalk = window.performance.now();
walk(document.body);
timeWalk = Math.abs(window.performance.now() - timeWalk - beginTime);


console.info('#LeoFongGANG', `Coincidence Detector says it made ${count} text nodes great again.`);
console.info('#LeoFongGANG', `Summary time - ${timeWalk}.`);
console.info('#LeoFongGANG', `Time per poked text node - ${timeWalk / count}.`);


var observer = new MutationObserver(mutationHandler);
observer.observe(document.body, { childList: true, subtree: true });


function mutationHandler(mutations) {
	mutations.forEach(function(m) {
		if (m.type != 'childList') return;

		m.addedNodes.forEach(function(n) {
			if (n.nodeType != Node.ELEMENT_NODE) return;

			observer.disconnect();
			if (!n.isContentEditable) {
				walk(n);
			}

			observer.observe(document.body, { childList: true, subtree: true });
		});
	});
}

function walk(node) {
	// I stole this function from here:
	// http://is.gd/mwZp7E

	var next;
	var child = node.firstChild;

	switch (node.nodeType) {
		case 1:
		case 9:
		case 11:
			child = node.firstChild;
			while (child) {
				next = child.nextSibling;
				walk(child);
				child = next;
			}
		break;

		case 3:
			handleTextTree(node);
		break;
	}
}

function handleTextTree(textNode) {
	count++;

	var oldtext = textNode.nodeValue;
	var newtext = '';
	var words = oldtext.split(/\b/);
	var n;
	var r;


	while (words.length > 0) {
	  r = checkName(words, theTree);
	  if (r[0] > DEFAULT_MIN_WORDS) {
		if (r[1] > 0) {
		  newtext = ECHO_LEFT + words.slice(-r[0]).join('') + ECHO_RIGHT + newtext;
		}
		else {
		  newtext = words.slice(-r[0]).join('') + newtext;
		}
		words = words.slice(0,-r[0]);
	  }
	  else {
		newtext = words.pop() + newtext;
	  }
	}
	textNode.nodeValue = newtext;
}

function checkName(words, obj) {
	var word = words[words.length - 1].toLowerCase();
	var r;

	if (word in obj) {
	  if (obj[word] >= 0) 
		return [1, obj[word]];
	  
	  if (words.length >= 2) {
		r = checkName(words.slice(0, -1), obj[word]);
		if (r[0] > 0) {
		  return [r[0] + 1, r[1]];
		}
	  }

	  if ('' in obj[word]) 
		return [1, obj[word]['']];
	  
	}
	return [-1, 0];
}
*/