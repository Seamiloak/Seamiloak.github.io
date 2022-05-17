/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/ribbon.js
**/
/*jshint -W030 */
!function(){function e(e,t,n){return Number(e.getAttribute(t))||n}
// get user config
var t=document.getElementsByTagName("script"),n=t[t.length-1];// 当前加载的script
config={z:e(n,"zIndex",-1),// z-index
a:e(n,"alpha",.6),// alpha
s:e(n,"size",90)};var i,o,c=document.createElement("canvas"),a=c.getContext("2d"),l=window.devicePixelRatio||1,d=window.innerWidth,r=window.innerHeight,g=config.s,h=Math,s=0,f=2*h.PI,u=h.cos,m=h.random;function x(){for(a.clearRect(0,0,d,r),i=[{x:0,y:.7*r+g},{x:0,y:.7*r-g}];i[1].x<d+g;)y(i[0],i[1])}function y(e,t){a.beginPath(),a.moveTo(e.x,e.y),a.lineTo(t.x,t.y);var n=t.x+(2*m()-.25)*g,c=function e(t){return(o=t+(2*m()-1.1)*g)>r||o<0?e(t):o}(t.y);a.lineTo(n,c),a.closePath(),s-=f/-50,a.fillStyle="#"+(127*u(s)+128<<16|127*u(s+f/3)+128<<8|127*u(s+f/3*2)+128).toString(16),a.fill(),i[0]=i[1],i[1]={x:n,y:c}}c.width=d*l,c.height=r*l,a.scale(l,l),a.globalAlpha=config.a,c.style.cssText="opacity: "+config.a+";position:fixed;top:0;left:0;z-index: "+config.z+";width:100%;height:100%;pointer-events:none;",
// create canvas
document.getElementsByTagName("body")[0].appendChild(c),document.onclick=x,document.ontouchstart=x,x()}();