/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/ribbon.js
 **/
!function(){var e=document.getElementById("ribbon");if("false"!=e.getAttribute("mobile")||!/Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent)){var t,n,i={z:f(e,"zIndex",-1),// z-index
a:f(e,"alpha",.6),// alpha
s:f(e,"size",90),// size
c:f(e,"data-click",!0)},o=document.createElement("canvas"),a=o.getContext("2d"),c=window.devicePixelRatio||1,d=window.innerWidth,l=window.innerHeight,r=i.s,s=Math,u=0,h=2*s.PI,g=s.cos,b=s.random;o.id="ribbon-canvas",o.width=d*c,o.height=l*c,a.scale(c,c),a.globalAlpha=i.a,o.style.cssText="opacity: "+i.a+";position:fixed;top:0;left:0;z-index: "+i.z+";width:100%;height:100%;pointer-events:none;",
// create canvas
document.getElementsByTagName("body")[0].appendChild(o),"false"!==i.c&&(document.onclick=m,document.ontouchstart=m),m()}function f(e,t,n){return!0===n?e.getAttribute(t)||n:Number(e.getAttribute(t))||n}function m(){for(a.clearRect(0,0,d,l),t=[{x:0,y:.7*l+r},{x:0,y:.7*l-r}];t[1].x<d+r;)x(t[0],t[1])}function x(e,i){a.beginPath(),a.moveTo(e.x,e.y),a.lineTo(i.x,i.y);var o=i.x+(2*b()-.25)*r,c=function e(t){return(n=t+(2*b()-1.1)*r)>l||n<0?e(t):n}(i.y);a.lineTo(o,c),a.closePath(),u-=h/-50,a.fillStyle="#"+(127*g(u)+128<<16|127*g(u+h/3)+128<<8|127*g(u+h/3*2)+128).toString(16),a.fill(),t[0]=t[1],t[1]={x:o,y:c}}}();