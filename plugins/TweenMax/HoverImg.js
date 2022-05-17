/**
 * HoverImg.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2019, JoeyBling
 */
// from http://www.quirksmode.org/js/events_properties.html#position
const getMousePos=function(e){let t=0,n=0;return e||(e=window.event),e.pageX||e.pageY?(t=e.pageX,n=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,n=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),{x:t,y:n}}
// Generate a random float.
,getRandomFloat=function(e,t){(Math.random()*(t-e)+e).toFixed(2)};
/**
 * One class per effect. 
 * Lots of code is repeated, so that single effects can be easily used. 
 */
// Effect 1
class HoverImgFx1{constructor(e){this.DOM={el:e},this.DOM.reveal=document.createElement("div"),this.DOM.reveal.className="hover-reveal",this.DOM.reveal.style.overflow="hidden",this.DOM.reveal.innerHTML=`<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`,this.DOM.el.appendChild(this.DOM.reveal),this.DOM.revealInner=this.DOM.reveal.querySelector(".hover-reveal__inner"),this.DOM.revealInner.style.overflow="hidden",this.DOM.revealImg=this.DOM.revealInner.querySelector(".hover-reveal__img"),this.DOM.letters=Array.from(this.DOM.el.querySelectorAll("span")),this.initEvents()}initEvents(){this.positionElement=e=>{const t=getMousePos(e),n=document.body.scrollLeft+document.documentElement.scrollLeft,s=document.body.scrollTop+document.documentElement.scrollTop;this.DOM.reveal.style.top=t.y-220-s+"px",this.DOM.reveal.style.left=t.x+1-n+"px"},this.mouseenterFn=e=>{this.positionElement(e),this.showImage(),this.animateLetters()},this.mousemoveFn=e=>requestAnimationFrame(()=>{this.positionElement(e)}),this.mouseleaveFn=()=>{this.hideImage()},this.DOM.el.addEventListener("mouseenter",this.mouseenterFn),this.DOM.el.addEventListener("mousemove",this.mousemoveFn),this.DOM.el.addEventListener("mouseleave",this.mouseleaveFn)}showImage(){TweenMax.killTweensOf(this.DOM.revealInner),TweenMax.killTweensOf(this.DOM.revealImg),this.tl=new TimelineMax({onStart:()=>{this.DOM.reveal.style.opacity=1,TweenMax.set(this.DOM.el,{zIndex:1e3})}}).add("begin").set([this.DOM.revealInner,this.DOM.revealImg],{transformOrigin:"50% 100%"}).add(new TweenMax(this.DOM.revealInner,.4,{ease:Expo.easeOut,startAt:{x:"50%",y:"120%",rotation:50},x:"0%",y:"0%",rotation:0}),"begin").add(new TweenMax(this.DOM.revealImg,.4,{ease:Expo.easeOut,startAt:{x:"-50%",y:"-120%",rotation:-50},x:"0%",y:"0%",rotation:0}),"begin").add(new TweenMax(this.DOM.revealImg,.7,{ease:Expo.easeOut,startAt:{scale:2},scale:1}),"begin")}hideImage(){TweenMax.killTweensOf(this.DOM.revealInner),TweenMax.killTweensOf(this.DOM.revealImg),this.tl=new TimelineMax({onStart:()=>{TweenMax.set(this.DOM.el,{zIndex:999})},onComplete:()=>{TweenMax.set(this.DOM.el,{zIndex:""}),TweenMax.set(this.DOM.reveal,{opacity:0})}}).add("begin").add(new TweenMax(this.DOM.revealInner,.6,{ease:Expo.easeOut,y:"-120%",rotation:-5}),"begin").add(new TweenMax(this.DOM.revealImg,.6,{ease:Expo.easeOut,y:"120%",rotation:5,scale:1.2}),"begin")}animateLetters(){this.DOM.letters.forEach((e,t)=>{TweenMax.set(e,{opacity:0});const n=2*t/100;TweenMax.to(e,.07*t+.2,{ease:Expo.easeOut,delay:n,startAt:{x:"100%"},x:"0%",opacity:1})})}}
// 判断字符串是否是图片格式类型
function isImageType(e){return/\.(gif|jpg|jpeg|png)$/i.test(e)}