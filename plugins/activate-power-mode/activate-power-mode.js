!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.POWERMODE=e():t.POWERMODE=e()}(this,(function(){/******/
return function(t){// webpackBootstrap
/******/ // The module cache
/******/
var e={};
/******/ // The require function
/******/function o(n){
/******/ // Check if module is in cache
/******/
if(e[n])
/******/
return e[n].exports;
/******/ // Create a new module (and put it into the cache)
/******/var r=e[n]={
/******/
exports:{},
/******/
id:n,
/******/
loaded:!1
/******/};
/******/ // Execute the module function
/******/
/******/ // Return the exports of the module
/******/
return t[n].call(r.exports,r,r.exports,o),
/******/ // Flag the module as loaded
/******/
r.loaded=!0,r.exports;
/******/}
/******/ // expose the modules object (__webpack_modules__)
/******/
/******/ // Load entry module and return exports
/******/
return o.m=t,
/******/ // expose the module cache
/******/
o.c=e,
/******/ // __webpack_public_path__
/******/
o.p="",o(0);
/******/}
/************************************************************************/
/******/([
/* 0 */
/***/
function(t,e,o){"use strict";var n=document.createElement("canvas");n.width=window.innerWidth,n.height=window.innerHeight,n.style.cssText="position:fixed;top:0;left:0;pointer-events:none;z-index:999999",window.addEventListener("resize",(function(){n.width=window.innerWidth,n.height=window.innerHeight})),document.body.appendChild(n);var r=n.getContext("2d"),i=[],a=0,d=!1;function l(t,e){return Math.random()*(e-t)+t}function c(t){if(p.colorful){var e=l(0,360);return"hsla("+l(e-10,e+10)+", 100%, "+l(50,80)+"%, 1)"}return window.getComputedStyle(t).color}function u(t,e,o){return{x:t,y:e,alpha:1,color:o,velocity:{x:2*Math.random()-1,y:2*Math.random()-3.5}}}function p(){for(// spawn particles
var t=function(){var t,e=document.activeElement;if("TEXTAREA"===e.tagName||"INPUT"===e.tagName&&"text"===e.getAttribute("type")){var n=o(1)(e,e.selectionEnd);return t=e.getBoundingClientRect(),{x:n.left+t.left,y:n.top+t.top,color:c(e)}}var r=window.getSelection();if(r.rangeCount){var i=r.getRangeAt(0),a=i.startContainer;return a.nodeType===document.TEXT_NODE&&(a=a.parentNode),{x:(t=i.getBoundingClientRect()).left,y:t.top,color:c(a)}}return{x:0,y:0,color:"transparent"}}(),e=5+Math.round(10*Math.random());e--;)i[a]=u(t.x,t.y,t.color),a=(a+1)%500;// shake screen
if(p.shake){var n=1+2*Math.random(),r=n*(Math.random()>.5?-1:1),l=n*(Math.random()>.5?-1:1);document.body.style.marginLeft=r+"px",document.body.style.marginTop=l+"px",setTimeout((function(){document.body.style.marginLeft="",document.body.style.marginTop=""}),75)}d||requestAnimationFrame(f)}function f(){d=!0,r.clearRect(0,0,n.width,n.height);for(var t=!1,e=n.getBoundingClientRect(),o=0;o<i.length;++o){var a=i[o];a.alpha<=.1||(a.velocity.y+=.075,a.x+=a.velocity.x,a.y+=a.velocity.y,a.alpha*=.96,r.globalAlpha=a.alpha,r.fillStyle=a.color,r.fillRect(Math.round(a.x-1.5)-e.left,Math.round(a.y-1.5)-e.top,3,3),t=!0)}t?requestAnimationFrame(f):d=!1}p.shake=!0,p.colorful=!1,t.exports=p},
/* 1 */
/***/
function(t,e){
/* jshint browser: true */
!function(){
// The properties that we copy into a mirrored div.
// Note that some browsers, such as Firefox,
// do not concatenate properties, i.e. padding-top, bottom etc. -> padding,
// so we have to do every single property specifically.
var e=["direction",// RTL support
"boxSizing","width",// on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
"height","overflowX","overflowY",// copy the scrollbar for IE
"borderTopWidth","borderRightWidth","borderBottomWidth","borderLeftWidth","borderStyle","paddingTop","paddingRight","paddingBottom","paddingLeft",
// https://developer.mozilla.org/en-US/docs/Web/CSS/font
"fontStyle","fontVariant","fontWeight","fontStretch","fontSize","fontSizeAdjust","lineHeight","fontFamily","textAlign","textTransform","textIndent","textDecoration",// might not make a difference, but better be safe
"letterSpacing","wordSpacing","tabSize","MozTabSize"],o=null!=window.mozInnerScreenX;function n(t,n,r){var i=r&&r.debug||!1;if(i){var a=document.querySelector("#input-textarea-caret-position-mirror-div");a&&a.parentNode.removeChild(a)}
// mirrored div
var d=document.createElement("div");d.id="input-textarea-caret-position-mirror-div",document.body.appendChild(d);var l=d.style,c=window.getComputedStyle?getComputedStyle(t):t.currentStyle;// currentStyle for IE < 9
// default textarea styles
l.whiteSpace="pre-wrap","INPUT"!==t.nodeName&&(l.wordWrap="break-word"),// only for textarea-s
// position off-screen
l.position="absolute",// required to return coordinates properly
i||(l.visibility="hidden"),// not 'display: none' because we want rendering
// transfer the element's properties to the div
e.forEach((function(t){l[t]=c[t]})),o?
// Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
t.scrollHeight>parseInt(c.height)&&(l.overflowY="scroll"):l.overflow="hidden",d.textContent=t.value.substring(0,n),
// the second special handling for input type="text" vs textarea: spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
"INPUT"===t.nodeName&&(d.textContent=d.textContent.replace(/\s/g," "));var u=document.createElement("span");
// Wrapping must be replicated *exactly*, including when a long word gets
// onto the next line, with whitespace at the end of the line before (#7).
// The  *only* reliable way to do that is to copy the *entire* rest of the
// textarea's content into the <span> created at the caret position.
// for inputs, just '.' would be enough, but why bother?
u.textContent=t.value.substring(n)||".",// || because a completely empty faux span doesn't render at all
d.appendChild(u);var p={top:u.offsetTop+parseInt(c.borderTopWidth),left:u.offsetLeft+parseInt(c.borderLeftWidth)};return i?u.style.backgroundColor="#aaa":document.body.removeChild(d),p}void 0!==t&&void 0!==t.exports?t.exports=n:window.getCaretCoordinates=n}();
/***/}
/******/])}));