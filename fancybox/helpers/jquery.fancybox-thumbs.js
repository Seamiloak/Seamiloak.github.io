/*!
 * Thumbnail helper for fancyBox
 * version: 1.0.7 (Mon, 01 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             thumbs: {
 *                 width  : 50,
 *                 height : 50
 *             }
 *         }
 *     });
 *
 */
!function(t){
//Add helper object
t.fancybox.helpers.thumbs={defaults:{width:50,// thumbnail width
height:50,// thumbnail height
position:"bottom",// 'top' or 'bottom'
source:function(i){// function to obtain the URL of the thumbnail image
var h;return i.element&&(h=t(i.element).find("img").attr("src")),!h&&"image"===i.type&&i.href&&(h=i.href),h}},wrap:null,list:null,width:0,init:function(i,h){var e,s=this,o=i.width,n=i.height,l=i.source;
//Build list structure
e="";for(var a=0;a<h.group.length;a++)e+='<li><a style="width:'+o+"px;height:"+n+'px;" href="javascript:jQuery.fancybox.jumpto('+a+');"></a></li>';this.wrap=t('<div id="fancybox-thumbs"></div>').addClass(i.position).appendTo("body"),this.list=t("<ul>"+e+"</ul>").appendTo(this.wrap),
//Load each thumbnail
t.each(h.group,(function(i){var e=h.group[i],a=l(e);a&&t("<img />").load((function(){var h,e,l,a=this.width,r=this.height;s.list&&a&&r&&(
//Calculate thumbnail width/height and center it
h=a/o,e=r/n,l=s.list.children().eq(i).find("a"),h>=1&&e>=1&&(h>e?(a=Math.floor(a/e),r=n):(a=o,r=Math.floor(r/h))),t(this).css({width:a,height:r,top:Math.floor(n/2-r/2),left:Math.floor(o/2-a/2)}),l.width(o).height(n),t(this).hide().appendTo(l).fadeIn(300))})).attr("src",a).attr("title",e.title)})),
//Set initial width
this.width=this.list.children().eq(0).outerWidth(!0),this.list.width(this.width*(h.group.length+1)).css("left",Math.floor(.5*t(window).width()-(h.index*this.width+.5*this.width)))},beforeLoad:function(t,i){
//Remove self if gallery do not have at least two items
i.group.length<2?i.helpers.thumbs=!1:
//Increase bottom margin to give space for thumbs
i.margin["top"===t.position?0:2]+=t.height+15},afterShow:function(t,i){
//Check if exists and create or update list
this.list?this.onUpdate(t,i):this.init(t,i),
//Set active element
this.list.children().removeClass("active").eq(i.index).addClass("active")},
//Center list
onUpdate:function(i,h){this.list&&this.list.stop(!0).animate({left:Math.floor(.5*t(window).width()-(h.index*this.width+.5*this.width))},150)},beforeClose:function(){this.wrap&&this.wrap.remove(),this.wrap=null,this.list=null,this.width=0}}}(jQuery);