/*!
 * fancyBox - jQuery Plugin
 * version: 2.1.5 (Fri, 14 Jun 2013)
 * requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
!function(e,t,i,n){"use strict";var o=i("html"),a=i(e),r=i(t),s=i.fancybox=function(){s.open.apply(this,arguments)},l=navigator.userAgent.match(/msie/i),c=null,d=void 0!==t.createTouch,p=function(e){return e&&e.hasOwnProperty&&e instanceof i},h=function(e){return e&&"string"===i.type(e)},f=function(e){return h(e)&&e.indexOf("%")>0},u=function(e,t){var i=parseInt(e,10)||0;return t&&f(e)&&(i=s.getViewport()[t]/100*i),Math.ceil(i)},g=function(e,t){return u(e,t)+"px"};i.extend(s,{
// The current version of fancyBox
version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,// Set to 2 for retina display support
autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!d,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",// 'auto', 'yes' or 'no'
wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",// enter
34:"up",// page down
39:"left",// right arrow
40:"up"},prev:{8:"right",// backspace
33:"down",// page up
37:"right",// left arrow
38:"down"},close:[27],// escape key
play:[32],// space - start/stop slideshow
toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,
// Override some properties
index:0,type:null,href:null,content:null,title:null,
// HTML templates
tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},
// Properties for each animation type
// Opening fancyBox
openEffect:"fade",// 'elastic', 'fade' or 'none'
openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",
// Closing fancyBox
closeEffect:"fade",// 'elastic', 'fade' or 'none'
closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",
// Changing next gallery item
nextEffect:"elastic",// 'elastic', 'fade' or 'none'
nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",
// Changing previous gallery item
prevEffect:"elastic",// 'elastic', 'fade' or 'none'
prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",
// Enable default helpers
helpers:{overlay:!0,title:!0},
// Callbacks
onCancel:i.noop,// If canceling
beforeLoad:i.noop,// Before loading
afterLoad:i.noop,// After loading
beforeShow:i.noop,// Before changing in current item
afterShow:i.noop,// After opening
beforeChange:i.noop,// Before changing gallery item
beforeClose:i.noop,// Before closing
afterClose:i.noop},
//Current state
group:{},// Selected group
opts:{},// Group options
previous:null,// Previous element
coming:null,// Element being loaded
current:null,// Currently loaded element
isActive:!1,// Is activated
isOpen:!1,// Is currently open
isOpened:!1,// Have been fully opened at least once
wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},
// Loaders
ajaxLoad:null,imgPreload:null,
// Some collections
transitions:{},helpers:{},
/*
		 *	Static methods
		 */
open:function(e,t){if(e&&(i.isPlainObject(t)||(t={}),!1!==s.close(!0)))
// Normalize group
return i.isArray(e)||(e=p(e)?i(e).get():[e]),
// Recheck if the type of each element is `object` and set content type (image, ajax, etc)
i.each(e,(function(n,o){var a,r,l,c,d,f,u,g={};"object"===i.type(o)&&(
// Check if is DOM element
o.nodeType&&(o=i(o)),p(o)?(g={href:o.data("fancybox-href")||o.attr("href"),title:i("<div/>").text(o.data("fancybox-title")||o.attr("title")).html(),isDom:!0,element:o},i.metadata&&i.extend(!0,g,o.metadata())):g=o),a=t.href||g.href||(h(o)?o:null),r=void 0!==t.title?t.title:g.title||"",!(c=(l=t.content||g.content)?"html":t.type||g.type)&&g.isDom&&((c=o.data("fancybox-type"))||(c=(d=o.prop("class").match(/fancybox\.(\w+)/))?d[1]:null)),h(a)&&(
// Try to guess the content type
c||(s.isImage(a)?c="image":s.isSWF(a)?c="swf":"#"===a.charAt(0)?c="inline":h(o)&&(c="html",l=o)),
// Split url into two pieces with source url and content selector, e.g,
// "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
"ajax"===c&&(f=a.split(/\s+/,2),a=f.shift(),u=f.shift())),l||("inline"===c?a?l=i(h(a)?a.replace(/.*(?=#[^\s]+$)/,""):a):g.isDom&&(l=o):"html"===c?l=a:c||a||!g.isDom||(c="inline",l=o)),i.extend(g,{href:a,type:c,content:l,title:r,selector:u}),e[n]=g})),
// Extend the defaults
s.opts=i.extend(!0,{},s.defaults,t),
// All options are merged recursive except keys
void 0!==t.keys&&(s.opts.keys=!!t.keys&&i.extend({},s.defaults.keys,t.keys)),s.group=e,s._start(s.opts.index)},
// Cancel image loading or abort ajax request
cancel:function(){var e=s.coming;e&&!1===s.trigger("onCancel")||(s.hideLoading(),e&&(s.ajaxLoad&&s.ajaxLoad.abort(),s.ajaxLoad=null,s.imgPreload&&(s.imgPreload.onload=s.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),s.coming=null,
// If the first item has been canceled, then clear everything
s.current||s._afterZoomOut(e)))},
// Start closing animation if is open; remove immediately if opening/closing
close:function(e){s.cancel(),!1!==s.trigger("beforeClose")&&(s.unbindEvents(),s.isActive&&(s.isOpen&&!0!==e?(s.isOpen=s.isOpened=!1,s.isClosing=!0,i(".fancybox-item, .fancybox-nav").remove(),s.wrap.stop(!0,!0).removeClass("fancybox-opened"),s.transitions[s.current.closeMethod]()):(i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),s._afterZoomOut())))},
// Manage slideshow:
//   $.fancybox.play(); - toggle slideshow
//   $.fancybox.play( true ); - start
//   $.fancybox.play( false ); - stop
play:function(e){var t=function(){clearTimeout(s.player.timer)},i=function(){t(),s.current&&s.player.isActive&&(s.player.timer=setTimeout(s.next,s.current.playSpeed))},n=function(){t(),r.unbind(".player"),s.player.isActive=!1,s.trigger("onPlayEnd")};!0===e||!s.player.isActive&&!1!==e?s.current&&(s.current.loop||s.current.index<s.group.length-1)&&(s.player.isActive=!0,r.bind({"onCancel.player beforeClose.player":n,"onUpdate.player":i,"beforeLoad.player":t}),i(),s.trigger("onPlayStart")):n()},
// Navigate to next gallery item
next:function(e){var t=s.current;t&&(h(e)||(e=t.direction.next),s.jumpto(t.index+1,e,"next"))},
// Navigate to previous gallery item
prev:function(e){var t=s.current;t&&(h(e)||(e=t.direction.prev),s.jumpto(t.index-1,e,"prev"))},
// Navigate to gallery item by index
jumpto:function(e,t,i){var n=s.current;n&&(e=u(e),s.direction=t||n.direction[e>=n.index?"next":"prev"],s.router=i||"jumpto",n.loop&&(e<0&&(e=n.group.length+e%n.group.length),e%=n.group.length),void 0!==n.group[e]&&(s.cancel(),s._start(e)))},
// Center inside viewport and toggle position type to fixed or absolute if needed
reposition:function(e,t){var n,o=s.current,a=o?o.wrap:null;a&&(n=s._getPosition(t),e&&"scroll"===e.type?(delete n.position,a.stop(!0,!0).animate(n,200)):(a.css(n),o.pos=i.extend({},o.dim,n)))},update:function(e){var t=e&&e.originalEvent&&e.originalEvent.type,i=!t||"orientationchange"===t;i&&(clearTimeout(c),c=null),s.isOpen&&!c&&(c=setTimeout((function(){var n=s.current;n&&!s.isClosing&&(s.wrap.removeClass("fancybox-tmp"),(i||"load"===t||"resize"===t&&n.autoResize)&&s._setDimension(),"scroll"===t&&n.canShrink||s.reposition(e),s.trigger("onUpdate"),c=null)}),i&&!d?0:300))},
// Shrink content to fit inside viewport or restore if resized
toggle:function(e){s.isOpen&&(s.current.fitToView="boolean"===i.type(e)?e:!s.current.fitToView,
// Help browser to restore document dimensions
d&&(s.wrap.removeAttr("style").addClass("fancybox-tmp"),s.trigger("onUpdate")),s.update())},hideLoading:function(){r.unbind(".loading"),i("#fancybox-loading").remove()},showLoading:function(){var e,t;s.hideLoading(),e=i('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"),
// If user will press the escape-button, the request will be canceled
r.bind("keydown.loading",(function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),s.cancel())})),s.defaults.fixed||(t=s.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x})),s.trigger("onLoading")},getViewport:function(){var t=s.current&&s.current.locked||!1,i={x:a.scrollLeft(),y:a.scrollTop()};return t&&t.length?(i.w=t[0].clientWidth,i.h=t[0].clientHeight):(
// See http://bugs.jquery.com/ticket/6724
i.w=d&&e.innerWidth?e.innerWidth:a.width(),i.h=d&&e.innerHeight?e.innerHeight:a.height()),i},
// Unbind the keyboard / clicking actions
unbindEvents:function(){s.wrap&&p(s.wrap)&&s.wrap.unbind(".fb"),r.unbind(".fb"),a.unbind(".fb")},bindEvents:function(){var e,t=s.current;t&&(
// Changing document height on iOS devices triggers a 'resize' event,
// that can change document height... repeating infinitely
a.bind("orientationchange.fb"+(d?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),s.update),(e=t.keys)&&r.bind("keydown.fb",(function(n){var o=n.which||n.keyCode,a=n.target||n.srcElement;
// Skip esc key if loading, because showLoading will cancel preloading
if(27===o&&s.coming)return!1;
// Ignore key combinations and key events within form elements
n.ctrlKey||n.altKey||n.shiftKey||n.metaKey||a&&(a.type||i(a).is("[contenteditable]"))||i.each(e,(function(e,a){return t.group.length>1&&void 0!==a[o]?(s[e](a[o]),n.preventDefault(),!1):i.inArray(o,a)>-1?(s[e](),n.preventDefault(),!1):void 0}))})),i.fn.mousewheel&&t.mouseWheel&&s.wrap.bind("mousewheel.fb",(function(e,n,o,a){for(var r,l=e.target||null,c=i(l),d=!1;c.length&&!(d||c.is(".fancybox-skin")||c.is(".fancybox-wrap"));)d=(r=c[0])&&!(r.style.overflow&&"hidden"===r.style.overflow)&&(r.clientWidth&&r.scrollWidth>r.clientWidth||r.clientHeight&&r.scrollHeight>r.clientHeight),c=i(c).parent();0===n||d||s.group.length>1&&!t.canShrink&&(a>0||o>0?s.prev(a>0?"down":"left"):(a<0||o<0)&&s.next(a<0?"up":"right"),e.preventDefault())})))},trigger:function(e,t){var n,o=t||s.coming||s.current;if(o){if(i.isFunction(o[e])&&(n=o[e].apply(o,Array.prototype.slice.call(arguments,1))),!1===n)return!1;o.helpers&&i.each(o.helpers,(function(t,n){n&&s.helpers[t]&&i.isFunction(s.helpers[t][e])&&s.helpers[t][e](i.extend(!0,{},s.helpers[t].defaults,n),o)}))}r.trigger(e)},isImage:function(e){return h(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return h(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,n,o,a,r,l={};if(e=u(e),!(t=s.group[e]||null))return!1;if(
// Convert margin and padding properties to array - top, right, bottom, left
a=(l=i.extend(!0,{},s.opts,t)).margin,r=l.padding,"number"===i.type(a)&&(l.margin=[a,a,a,a]),"number"===i.type(r)&&(l.padding=[r,r,r,r]),
// 'modal' propery is just a shortcut
l.modal&&i.extend(!0,l,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),
// 'autoSize' property is a shortcut, too
l.autoSize&&(l.autoWidth=l.autoHeight=!0),"auto"===l.width&&(l.autoWidth=!0),"auto"===l.height&&(l.autoHeight=!0)
/*
			 * Add reference to the group, so it`s possible to access from callbacks, example:
			 * afterLoad : function() {
			 *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
			 * }
			 */,l.group=s.group,l.index=e,
// Give a chance for callback or helpers to update coming item (type, title, etc)
s.coming=l,!1!==s.trigger("beforeLoad")){if(o=l.type,n=l.href,!o)
//If we can not determine content type then drop silently or display next/prev item if looping through gallery
return s.coming=null,!(!s.current||!s.router||"jumpto"===s.router)&&(s.current.index=e,s[s.router](s.direction));
// Check before try to load; 'inline' and 'html' types need content, others - href
if(s.isActive=!0,"image"!==o&&"swf"!==o||(l.autoHeight=l.autoWidth=!1,l.scrolling="visible"),"image"===o&&(l.aspectRatio=!0),"iframe"===o&&d&&(l.scrolling="scroll"),
// Build the neccessary markup
l.wrap=i(l.tpl.wrap).addClass("fancybox-"+(d?"mobile":"desktop")+" fancybox-type-"+o+" fancybox-tmp "+l.wrapCSS).appendTo(l.parent||"body"),i.extend(l,{skin:i(".fancybox-skin",l.wrap),outer:i(".fancybox-outer",l.wrap),inner:i(".fancybox-inner",l.wrap)}),i.each(["Top","Right","Bottom","Left"],(function(e,t){l.skin.css("padding"+t,g(l.padding[e]))})),s.trigger("onReady"),"inline"===o||"html"===o){if(!l.content||!l.content.length)return s._error("content")}else if(!n)return s._error("href");"image"===o?s._loadImage():"ajax"===o?s._loadAjax():"iframe"===o?s._loadIframe():s._afterLoad()}else s.coming=null},_error:function(e){i.extend(s.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:s.coming.tpl.error}),s._afterLoad()},_loadImage:function(){
// Reset preload image so it is later possible to check "complete" property
var e=s.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,s.coming.width=this.width/s.opts.pixelRatio,s.coming.height=this.height/s.opts.pixelRatio,s._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,s._error("image")},e.src=s.coming.href,!0!==e.complete&&s.showLoading()},_loadAjax:function(){var e=s.coming;s.showLoading(),s.ajaxLoad=i.ajax(i.extend({},e.ajax,{url:e.href,error:function(e,t){s.coming&&"abort"!==t?s._error("ajax",e):s.hideLoading()},success:function(t,i){"success"===i&&(e.content=t,s._afterLoad())}}))},_loadIframe:function(){var e=s.coming,t=i(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",d?"auto":e.iframe.scrolling).attr("src",e.href);
// This helps IE
i(e.wrap).bind("onReset",(function(){try{i(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}})),e.iframe.preload&&(s.showLoading(),t.one("load",(function(){i(this).data("ready",1),
// iOS will lose scrolling if we resize
d||i(this).bind("load.fb",s.update),
// Without this trick:
//   - iframe won't scroll on iOS devices
//   - IE7 sometimes displays empty iframe
i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),s._afterLoad()}))),e.content=t.appendTo(e.inner),e.iframe.preload||s._afterLoad()},_preloadImages:function(){var e,t,i=s.group,n=s.current,o=i.length,a=n.preload?Math.min(n.preload,o-1):0;for(t=1;t<=a;t+=1)"image"===(e=i[(n.index+t)%o]).type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,n,o,a,r,l=s.coming,c=s.current,d="fancybox-placeholder";if(s.hideLoading(),l&&!1!==s.isActive){if(!1===s.trigger("afterLoad",l,c))return l.wrap.stop(!0).trigger("onReset").remove(),void(s.coming=null);switch(c&&(s.trigger("beforeChange",c),c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),s.unbindEvents(),e=l,t=l.content,n=l.type,o=l.scrolling,i.extend(s,{wrap:e.wrap,skin:e.skin,outer:e.outer,inner:e.inner,current:e,previous:c}),a=e.href,n){case"inline":case"ajax":case"html":e.selector?t=i("<div>").html(t).find(e.selector):p(t)&&(t.data(d)||t.data(d,i('<div class="'+d+'"></div>').insertAfter(t).hide()),t=t.show().detach(),e.wrap.bind("onReset",(function(){i(this).find(t).length&&t.hide().replaceAll(t.data(d)).data(d,!1)})));break;case"image":t=e.tpl.image.replace(/\{href\}/g,a);break;case"swf":t='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+a+'"></param>',r="",i.each(e.swf,(function(e,i){t+='<param name="'+e+'" value="'+i+'"></param>',r+=" "+e+'="'+i+'"'})),t+='<embed src="'+a+'" type="application/x-shockwave-flash" width="100%" height="100%"'+r+"></embed></object>"}p(t)&&t.parent().is(e.inner)||e.inner.append(t),
// Give a chance for helpers or callbacks to update elements
s.trigger("beforeShow"),
// Set scrolling before calculating dimensions
e.inner.css("overflow","yes"===o?"scroll":"no"===o?"hidden":o),
// Set initial dimensions and start position
s._setDimension(),s.reposition(),s.isOpen=!1,s.coming=null,s.bindEvents(),s.isOpened?c.prevMethod&&s.transitions[c.prevMethod]():i(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),s.transitions[s.isOpened?e.nextMethod:e.openMethod](),s._preloadImages()}},_setDimension:function(){var e,t,n,o,a,r,l,c,d,p,h,m,y,x,v,w,b,k=s.getViewport(),C=0,O=s.wrap,W=s.skin,_=s.inner,S=s.current,T=S.width,E=S.height,L=S.minWidth,H=S.minHeight,P=S.maxWidth,R=S.maxHeight,j=S.scrolling,M=S.scrollOutside?S.scrollbarWidth:0,A=S.margin,I=u(A[1]+A[3]),D=u(A[0]+A[2]);
// Reset dimensions so we could re-check actual size
if(O.add(W).add(_).width("auto").height("auto").removeClass("fancybox-tmp"),
// Any space between content and viewport (margin, padding, border, title)
a=I+(n=u(W.outerWidth(!0)-W.width())),r=D+(o=u(W.outerHeight(!0)-W.height())),l=f(T)?(k.w-a)*u(T)/100:T,c=f(E)?(k.h-r)*u(E)/100:E,"iframe"===S.type){if(w=S.content,S.autoHeight&&1===w.data("ready"))try{w[0].contentWindow.document.location&&(_.width(l).height(9999),b=w.contents().find("body"),M&&b.css("overflow-x","hidden"),c=b.outerHeight(!0))}catch(e){}}else(S.autoWidth||S.autoHeight)&&(_.addClass("fancybox-tmp"),
// Set width or height in case we need to calculate only one dimension
S.autoWidth||_.width(l),S.autoHeight||_.height(c),S.autoWidth&&(l=_.width()),S.autoHeight&&(c=_.height()),_.removeClass("fancybox-tmp"));
// Try to fit inside viewport (including the title)
if(T=u(l),E=u(c),h=l/c,
// Calculations for the content
L=u(f(L)?u(L,"w")-a:L),P=u(f(P)?u(P,"w")-a:P),H=u(f(H)?u(H,"h")-r:H),
// These will be used to determine if wrap can fit in the viewport
d=P,p=R=u(f(R)?u(R,"h")-r:R),S.fitToView&&(P=Math.min(k.w-a,P),R=Math.min(k.h-r,R)),x=k.w-I,v=k.h-D,S.aspectRatio?(T>P&&(E=u((T=P)/h)),E>R&&(T=u((E=R)*h)),T<L&&(E=u((T=L)/h)),E<H&&(T=u((E=H)*h))):(T=Math.max(L,Math.min(T,P)),S.autoHeight&&"iframe"!==S.type&&(_.width(T),E=_.height()),E=Math.max(H,Math.min(E,R))),S.fitToView)if(_.width(T).height(E),O.width(T+n),
// Real wrap dimensions
m=O.width(),y=O.height(),S.aspectRatio)for(;(m>x||y>v)&&T>L&&E>H&&!(C++>19);)E=Math.max(H,Math.min(R,E-10)),(T=u(E*h))<L&&(E=u((T=L)/h)),T>P&&(E=u((T=P)/h)),_.width(T).height(E),O.width(T+n),m=O.width(),y=O.height();else T=Math.max(L,Math.min(T,T-(m-x))),E=Math.max(H,Math.min(E,E-(y-v)));M&&"auto"===j&&E<c&&T+n+M<x&&(T+=M),_.width(T).height(E),O.width(T+n),m=O.width(),y=O.height(),e=(m>x||y>v)&&T>L&&E>H,t=S.aspectRatio?T<d&&E<p&&T<l&&E<c:(T<d||E<p)&&(T<l||E<c),i.extend(S,{dim:{width:g(m),height:g(y)},origWidth:l,origHeight:c,canShrink:e,canExpand:t,wPadding:n,hPadding:o,wrapSpace:y-W.outerHeight(!0),skinSpace:W.height()-E}),!w&&S.autoHeight&&E>H&&E<R&&!t&&_.height("auto")},_getPosition:function(e){var t=s.current,i=s.getViewport(),n=t.margin,o=s.wrap.width()+n[1]+n[3],a=s.wrap.height()+n[0]+n[2],r={position:"absolute",top:n[0],left:n[3]};return t.autoCenter&&t.fixed&&!e&&a<=i.h&&o<=i.w?r.position="fixed":t.locked||(r.top+=i.y,r.left+=i.x),r.top=g(Math.max(r.top,r.top+(i.h-a)*t.topRatio)),r.left=g(Math.max(r.left,r.left+(i.w-o)*t.leftRatio)),r},_afterZoomIn:function(){var e=s.current;e&&(s.isOpen=s.isOpened=!0,s.wrap.css("overflow","visible").addClass("fancybox-opened").hide().show(0),s.update(),
// Assign a click event
(e.closeClick||e.nextClick&&s.group.length>1)&&s.inner.css("cursor","pointer").bind("click.fb",(function(t){i(t.target).is("a")||i(t.target).parent().is("a")||(t.preventDefault(),s[e.closeClick?"close":"next"]())})),
// Create a close button
e.closeBtn&&i(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb",(function(e){e.preventDefault(),s.close()})),
// Create navigation arrows
e.arrows&&s.group.length>1&&((e.loop||e.index>0)&&i(e.tpl.prev).appendTo(s.outer).bind("click.fb",s.prev),(e.loop||e.index<s.group.length-1)&&i(e.tpl.next).appendTo(s.outer).bind("click.fb",s.next)),s.trigger("afterShow"),
// Stop the slideshow if this is the last item
e.loop||e.index!==e.group.length-1?s.opts.autoPlay&&!s.player.isActive&&(s.opts.autoPlay=!1,s.play(!0)):s.play(!1))},_afterZoomOut:function(e){e=e||s.current,i(".fancybox-wrap").trigger("onReset").remove(),i.extend(s,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),s.trigger("afterClose",e)}}),
/*
	 *	Default transitions
	 */
s.transitions={getOrigPosition:function(){var e=s.current,t=e.element,i=e.orig,n={},o=50,a=50,r=e.hPadding,l=e.wPadding,c=s.getViewport();return!i&&e.isDom&&t.is(":visible")&&((i=t.find("img:first")).length||(i=t)),p(i)?(n=i.offset(),i.is("img")&&(o=i.outerWidth(),a=i.outerHeight())):(n.top=c.y+(c.h-a)*e.topRatio,n.left=c.x+(c.w-o)*e.leftRatio),("fixed"===s.wrap.css("position")||e.locked)&&(n.top-=c.y,n.left-=c.x),n={top:g(n.top-r*e.topRatio),left:g(n.left-l*e.leftRatio),width:g(o+l),height:g(a+r)}},step:function(e,t){var i,n,o=t.prop,a=s.current,r=a.wrapSpace,l=a.skinSpace;"width"!==o&&"height"!==o||(i=t.end===t.start?1:(e-t.start)/(t.end-t.start),s.isClosing&&(i=1-i),n=e-("width"===o?a.wPadding:a.hPadding),s.skin[o](u("width"===o?n:n-r*i)),s.inner[o](u("width"===o?n:n-r*i-l*i)))},zoomIn:function(){var e=s.current,t=e.pos,n=e.openEffect,o="elastic"===n,a=i.extend({opacity:1},t);
// Remove "position" property that breaks older IE
delete a.position,o?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===n&&(t.opacity=.1),s.wrap.css(t).animate(a,{duration:"none"===n?0:e.openSpeed,easing:e.openEasing,step:o?this.step:null,complete:s._afterZoomIn})},zoomOut:function(){var e=s.current,t=e.closeEffect,i="elastic"===t,n={opacity:.1};i&&(n=this.getOrigPosition(),e.closeOpacity&&(n.opacity=.1)),s.wrap.animate(n,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:i?this.step:null,complete:s._afterZoomOut})},changeIn:function(){var e,t=s.current,i=t.nextEffect,n=t.pos,o={opacity:1},a=s.direction;n.opacity=.1,"elastic"===i&&(e="down"===a||"up"===a?"top":"left","down"===a||"right"===a?(n[e]=g(u(n[e])-200),o[e]="+=200px"):(n[e]=g(u(n[e])+200),o[e]="-=200px")),
// Workaround for http://bugs.jquery.com/ticket/12273
"none"===i?s._afterZoomIn():s.wrap.css(n).animate(o,{duration:t.nextSpeed,easing:t.nextEasing,complete:s._afterZoomIn})},changeOut:function(){var e=s.previous,t=e.prevEffect,n={opacity:.1},o=s.direction;"elastic"===t&&(n["down"===o||"up"===o?"top":"left"]=("up"===o||"left"===o?"-":"+")+"=200px"),e.wrap.animate(n,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){i(this).trigger("onReset").remove()}})}},
/*
	 *	Overlay helper
	 */
s.helpers.overlay={defaults:{closeClick:!0,// if true, fancyBox will be closed when user clicks on the overlay
speedOut:200,// duration of fadeOut animation
showEarly:!0,// indicates if should be opened immediately or wait until the content is ready
css:{},// custom CSS properties
locked:!d,// if true, the content will be locked into overlay
fixed:!0},overlay:null,// current handle
fixed:!1,// indicates if the overlay has position "fixed"
el:i("html"),// element that contains "the lock"
// Public methods
create:function(e){var t;e=i.extend({},this.defaults,e),this.overlay&&this.close(),t=s.coming?s.coming.parent:e.parent,this.overlay=i('<div class="fancybox-overlay"></div>').appendTo(t&&t.lenth?t:"body"),this.fixed=!1,e.fixed&&s.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=i.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(a.bind("resize.overlay",i.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",(function(e){if(i(e.target).hasClass("fancybox-overlay"))return s.isActive?s.close():t.close(),!1})),this.overlay.css(e.css).show()},close:function(){a.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(i(".fancybox-margin").removeClass("fancybox-margin"),this.el.removeClass("fancybox-lock"),a.scrollTop(this.scrollV).scrollLeft(this.scrollH)),i(".fancybox-overlay").remove().hide(),i.extend(this,{overlay:null,fixed:!1})},
// Private, callbacks
update:function(){var e,i="100%";
// Reset width/height so it will not mess
this.overlay.width(i).height("100%"),
// jQuery does not return reliable result for IE
l?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),r.width()>e&&(i=r.width())):r.width()>a.width()&&(i=r.width()),this.overlay.width(i).height(r.height())},
// This is where we can manipulate DOM, because later it would cause iframes to reload
onReady:function(e,t){var n=this.overlay;i(".fancybox-overlay").stop(!0,!0),n||this.create(e),e.locked&&this.fixed&&t.fixed&&(t.locked=this.overlay.append(t.wrap),t.fixed=!1),!0===e.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){t.locked&&!this.el.hasClass("fancybox-lock")&&(!1!==this.fixPosition&&i("*").filter((function(){return"fixed"===i(this).css("position")&&!i(this).hasClass("fancybox-overlay")&&!i(this).hasClass("fancybox-wrap")})).addClass("fancybox-margin"),this.el.addClass("fancybox-margin"),this.scrollV=a.scrollTop(),this.scrollH=a.scrollLeft(),this.el.addClass("fancybox-lock"),a.scrollTop(this.scrollV).scrollLeft(this.scrollH)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){
// Remove overlay if exists and fancyBox is not opening
// (e.g., it is not being open using afterClose callback)
this.overlay&&!s.coming&&this.overlay.fadeOut(e.speedOut,i.proxy(this.close,this))}},
/*
	 *	Title helper
	 */
s.helpers.title={defaults:{type:"float",// 'float', 'inside', 'outside' or 'over',
position:"bottom"},beforeShow:function(e){var t,n,o=s.current,a=o.title,r=e.type;if(i.isFunction(a)&&(a=a.call(o.element,o)),h(a)&&""!==i.trim(a)){switch(t=i('<div class="fancybox-title fancybox-title-'+r+'-wrap">'+a+"</div>"),r){case"inside":n=s.skin;break;case"outside":n=s.wrap;break;case"over":n=s.inner;break;default:// 'float'
n=s.skin,t.appendTo("body"),l&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),
//Increase bottom margin so this title will also fit into viewport
s.current.margin[2]+=Math.abs(u(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](n)}}},
// jQuery plugin initialization
i.fn.fancybox=function(e){var t,n=i(this),o=this.selector||"",a=function(a){var r,l,c=i(this).blur(),d=t;a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||c.is(".fancybox-wrap")||(r=e.groupAttr||"data-fancybox-group",(l=c.attr(r))||(r="rel",l=c.get(0)[r]),l&&""!==l&&"nofollow"!==l&&(d=(c=(c=o.length?i(o):n).filter("["+r+'="'+l+'"]')).index(this)),e.index=d,
// Stop an event from bubbling if everything is fine
!1!==s.open(c,e)&&a.preventDefault())};return t=(e=e||{}).index||0,o&&!1!==e.live?r.undelegate(o,"click.fb-start").delegate(o+":not('.fancybox-item, .fancybox-nav')","click.fb-start",a):n.unbind("click.fb-start").bind("click.fb-start",a),this.filter("[data-fancybox-start=1]").trigger("click"),this},
// Tests that need a body at doc ready
r.ready((function(){var t,n,a,r;void 0===i.scrollbarWidth&&(
// http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
i.scrollbarWidth=function(){var e=i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),n=t.innerWidth()-t.height(99).innerWidth();return e.remove(),n}),void 0===i.support.fixedPosition&&(i.support.fixedPosition=(a=i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),r=20===a[0].offsetTop||15===a[0].offsetTop,a.remove(),r)),i.extend(s.defaults,{scrollbarWidth:i.scrollbarWidth(),fixed:i.support.fixedPosition,parent:i("body")}),
//Get real width of page scroll-bar
t=i(e).width(),o.addClass("fancybox-lock-test"),n=i(e).width(),o.removeClass("fancybox-lock-test"),i("<style type='text/css'>.fancybox-margin{margin-right:"+(n-t)+"px;}</style>").appendTo("head")}))}(window,document,jQuery);