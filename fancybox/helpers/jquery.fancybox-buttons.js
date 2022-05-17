/*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
!function(t){
//Shortcut for fancyBox object
var s=t.fancybox;
//Add helper object
s.helpers.buttons={defaults:{skipSingle:!1,// disables if gallery contains single image
position:"top",// 'top' or 'bottom'
tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'},list:null,buttons:null,beforeLoad:function(t,s){
//Remove self if gallery do not have at least two items
if(t.skipSingle&&s.group.length<2)return s.helpers.buttons=!1,void(s.closeBtn=!0);
//Increase top margin to give space for buttons
s.margin["bottom"===t.position?2:0]+=30},onPlayStart:function(){this.buttons&&this.buttons.play.attr("title","Pause slideshow").addClass("btnPlayOn")},onPlayEnd:function(){this.buttons&&this.buttons.play.attr("title","Start slideshow").removeClass("btnPlayOn")},afterShow:function(l,i){var n=this.buttons;n||(this.list=t(l.tpl).addClass(l.position).appendTo("body"),n={prev:this.list.find(".btnPrev").click(s.prev),next:this.list.find(".btnNext").click(s.next),play:this.list.find(".btnPlay").click(s.play),toggle:this.list.find(".btnToggle").click(s.toggle),close:this.list.find(".btnClose").click(s.close)}),
//Prev
i.index>0||i.loop?n.prev.removeClass("btnDisabled"):n.prev.addClass("btnDisabled"),
//Next / Play
i.loop||i.index<i.group.length-1?(n.next.removeClass("btnDisabled"),n.play.removeClass("btnDisabled")):(n.next.addClass("btnDisabled"),n.play.addClass("btnDisabled")),this.buttons=n,this.onUpdate(l,i)},onUpdate:function(t,s){var l;this.buttons&&(l=this.buttons.toggle.removeClass("btnDisabled btnToggleOn"),
//Size toggle button
s.canShrink?l.addClass("btnToggleOn"):s.canExpand||l.addClass("btnDisabled"))},beforeClose:function(){this.list&&this.list.remove(),this.list=null,this.buttons=null}}}(jQuery);