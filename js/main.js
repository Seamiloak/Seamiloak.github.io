/**
  * 當menu過多時，自動適配，避免UI錯亂
  * @param {*} n
  * 傳入 1 sidebar打開時
  * 傳入 2 正常狀態下
  */
const blogNameWidth=$("#blog_name").width(),menusWidth=$(".menus").width(),sidebarWidth=$("#sidebar").width(),adjustMenu=function(t){const e=$("#nav");let i;i=0===t||(1===t?blogNameWidth+menusWidth>e.width()-sidebarWidth-30:blogNameWidth+menusWidth>e.width()-30),i?(e.find(".toggle-menu").addClass("is-visible-inline"),e.find(".menus_items").addClass("is-invisible"),e.find("#search_button span").addClass("is-invisible")):(e.find(".toggle-menu").removeClass("is-visible-inline"),e.find(".menus_items").removeClass("is-invisible"),e.find("#search_button span").removeClass("is-invisible"))}
// 初始化header
,initAdjust=()=>{window.innerWidth<768?adjustMenu(0):adjustMenu(2),$("#nav").css({opacity:"1",animation:"headerNoOpacity 1s"})}
/**
 * 進入post頁sidebar處理
 */,OpenSidebarAuto=()=>{window.innerWidth>1024&&$("#toggle-sidebar").hasClass("on")&&setTimeout((function(){openSidebar()}),400)}
/**
 * 點擊左下角箭頭,顯示sidebar
 */,closeSidebar=()=>{$("#sidebar").removeClass("tocOpenPc").animate({left:"-300px"},400),$(".menus").animate({paddingRight:0},400),$("#body-wrap").animate({paddingLeft:0},400),$("#toggle-sidebar").css({transform:"rotateZ(0deg)",color:"#1F2D3D",opacity:"1"}),setTimeout((function(){adjustMenu(2)}),400)},openSidebar=()=>{adjustMenu(1),$("#sidebar").addClass("tocOpenPc").animate({left:0},400),$(".menus").animate({paddingRight:300},400),$("#body-wrap").animate({paddingLeft:300},400),$("#toggle-sidebar").css({transform:"rotateZ(180deg)",color:"#99a9bf",opacity:"1"})},toggleSidebar=function(){$("#toggle-sidebar").on("click",(function(){const t=$(this).hasClass("on");t?$(this).removeClass("on"):$(this).addClass("on"),t?closeSidebar():openSidebar()}))}
/**
 * 手機menu和toc按鈕點擊
 * 顯示menu和toc的sidebar
 */,sidebarFn=()=>{const t=$(".toggle-menu"),e=$("#mobile-sidebar-menus"),i=$("#mobile-toc-button"),n=$("#menu_mask"),o=$("body"),s=$("#sidebar");function a(a){sidebarPaddingR(),o.css("overflow","hidden"),n.fadeIn(),"menu"===a&&(t.removeClass("close").addClass("open"),e.addClass("open")),"toc"===a&&(i.removeClass("close").addClass("open"),s.addClass("tocOpenMobile").css({transform:"translate3d(-100%,0,0)",left:""}))}function c(a){o.css({overflow:"","padding-right":""}),n.fadeOut(),"menu"===a&&(t.removeClass("open").addClass("close"),e.removeClass("open")),"toc"===a&&(i.removeClass("open").addClass("close"),s.removeClass("tocOpenMobile").css({transform:""}))}t.on("click",(function(){a("menu")})),i.on("click",(function(){a("toc")})),n.on("click touchstart",(function(e){t.hasClass("open")&&c("menu"),i.hasClass("open")&&c("toc")})),$(window).on("resize",(function(e){t.is(":visible")||t.hasClass("open")&&c("menu")}));window.matchMedia("(max-width: 1024px)").addListener((function(t){t.matches?s.hasClass("tocOpenPc")&&closeSidebar():($("#toggle-sidebar").hasClass("on")&&openSidebar(),i.hasClass("open")&&c("toc"))})),
// toc元素點擊
s.find(".toc-link").on("click",(function(t){window.innerWidth<=1024?c("toc"):(t.preventDefault(),scrollToDest(decodeURI($(this).attr("href"))))}))}
/**
 * 首頁top_img底下的箭頭
 */,scrollDownInIndex=()=>{$("#scroll_down").on("click",(function(){scrollToDest("#content-inner")}))}
/**
 * 代碼
 * 只適用於Hexo默認的代碼渲染
 */,addHighlightTool=function(){const t=$("figure.highlight"),e=GLOBAL_CONFIG.highlightCopy,i=GLOBAL_CONFIG.highlightLang,n=GLOBAL_CONFIG_SITE.isHighlightShrink;if(t.length&&(e||i||void 0!==n)){let o="",s="";const a=!0===n?"closed":"";if(void 0!==n&&(o=`<i class="fas fa-angle-down expand ${a}"></i>`),e&&(s='<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>'),i){let e;t.each((function(){const t=$(this);e=t.attr("class").split(" ")[1],"plain"!==e&&void 0!==e||(e="Code");const i=`<div class="code-lang">${e}</div>`;t.prepend(`<div class="highlight-tools ${a}">${o+i+s}</div>`)}))}else t.prepend(`<div class="highlight-tools ${a}">${o+s}</div>`);
/**
     * 代碼收縮
     */
/**
     * 代碼copy
     */
if(void 0!==n&&t.find(".highlight-tools >.expand").on("click",(function(){const t=$(this),e=t.parent().nextAll();t.toggleClass("closed"),e.is(":visible")?e.css("display","none"):e.css("display","block")})),e){const e=function(t,e){document.queryCommandSupported&&document.queryCommandSupported("copy")?(document.execCommand("copy"),void 0!==GLOBAL_CONFIG.Snackbar?snackbarShow(GLOBAL_CONFIG.copy.success):$(e).prev(".copy-notice").text(GLOBAL_CONFIG.copy.success).animate({opacity:1},450,(function(){setTimeout((function(){$(e).prev(".copy-notice").animate({opacity:0},650)}),400)}))):void 0!==GLOBAL_CONFIG.Snackbar?snackbarShow(GLOBAL_CONFIG.copy.noSupport):$(e).prev(".copy-notice").text(GLOBAL_CONFIG.copy.noSupport)}
// click events;
t.find(".highlight-tools >.copy-button").on("click",(function(){const t=$(this).parents("figure.highlight");t.addClass("copy-true");const i=window.getSelection(),n=document.createRange();n.selectNodeContents(t.find("table .code pre")[0]),i.removeAllRanges(),i.addRange(n);const o=i.toString();e(o,this),i.removeAllRanges(),t.removeClass("copy-true")}))}}}
/**
 * PhotoFigcaption
 */;function addPhotoFigcaption(){$("#article-container img").not(".justified-gallery img").each((function(t,e){const i=$(e);if(i.attr("alt")){const t=$('<div class="img-alt is-center">'+i.attr("alt")+"</div>");i.after(t)}}))}
/**
 * justified-gallery 圖庫排版
 */let detectJgJsLoad=!1;const runJustifiedGallery=function(){const t=$(".justified-gallery");if(t.length){const e=t.find("img");e.unwrap(),e.length&&e.each((function(t,e){$(e).attr("data-lazy-src")&&$(e).attr("src",$(e).attr("data-lazy-src")),$(e).wrap("<div></div>")})),detectJgJsLoad?initJustifiedGallery(t):($("head").append(`<link rel="stylesheet" type="text/css" href="${GLOBAL_CONFIG.justifiedGallery.css}">`),$.getScript(""+GLOBAL_CONFIG.justifiedGallery.js,(function(){initJustifiedGallery(t)})),detectJgJsLoad=!0)}}
/**
 * fancybox和 mediumZoom
 */,addLightBox=function(){const t=GLOBAL_CONFIG.medium_zoom;if(GLOBAL_CONFIG.fancybox){$("#article-container img:not(.gallery-group-img)").not($("a>img")).each((function(t,e){const i=$(e).attr("data-lazy-src")?$(e).attr("data-lazy-src"):$(e).attr("src"),n=$(e).attr("alt")?$(e).attr("alt"):"";$(e).wrap(`<a href="${i}" data-fancybox="group" data-caption="${n}" class="fancybox"></a>`)})),$().fancybox({selector:"[data-fancybox]",loop:!0,transitionEffect:"slide",protect:!0,buttons:["slideShow","fullScreen","thumbs","close"],hash:!1})}else if(t){const t=mediumZoom(document.querySelectorAll("#article-container :not(a)>img"));t.on("open",(function(e){const i="dark"===$(document.documentElement).attr("data-theme")?"#121212":"#fff";t.update({background:i})}))}}
/**
 * 滾動處理
 */,scrollFn=function(){let t=0,e=!0;const i=$("#rightside"),n=$("#nav"),o="function"==typeof chatBtnHide,s="function"==typeof chatBtnShow;$(window).scroll(throttle((function(a){const c=$(this).scrollTop(),d=
// find the scroll direction
function(e){const i=e>t;// true is down & false is up
return t=e,i}(c);c>56?(d?(n.hasClass("visible")&&n.removeClass("visible"),s&&!0===e&&(chatBtnHide(),e=!1)):(n.hasClass("visible")||n.addClass("visible"),o&&!1===e&&(window.chatBtnShow(),e=!0)),n.addClass("fixed"),"0"===i.css("opacity")&&i.css({opacity:"1",transform:"translateX(-38px)"})):(0===c&&n.removeClass("fixed").removeClass("visible"),i.css({opacity:"",transform:""}))}),200))}
/**
 *  toc
 */,tocFn=function(){$(".toc-child").hide(),
// main of scroll
$(window).scroll(throttle((function(e){const o=$(this).scrollTop();t(o),i(o),n(o)}),100));
// expand toc-item
const t=function(t){const e=$("#article-container").height(),i=$(window).height(),n=t/(e>i?e-i:$(document).height()-i),o=Math.round(100*n),s=o>100?100:o<=0?0:o;$(".progress-num").text(s),$(".sidebar-toc__progress-bar").animate({width:s+"%"},100)}
// anchor
,e=GLOBAL_CONFIG.isanchor,i=function(t){
// assume that we are not in the post page if no TOC link be found,
// thus no need to update the status
if(0===$(".toc-link").length)return!1;const i=$("#article-container").find("h1,h2,h3,h4,h5,h6");let n="";i.each((function(){const e=$(this);t>e.offset().top-25&&(n="#"+encodeURI($(this).attr("id")))})),""===n&&($(".toc-link").removeClass("active"),$(".toc-child").hide());const o=$(".toc-link.active");if(n&&o.attr("href")!==n){e&&(a=n,window.history.replaceState&&a!==window.location.hash&&window.history.replaceState(void 0,void 0,a)),$(".toc-link").removeClass("active");const t=$('.toc-link[href="'+n+'"]');t.addClass("active");const i=t.parents(".toc-child"),o=i.length>0?i.last():t;
// Returned list is in reverse order of the DOM elements
// Thus `parents.last()` is the outermost .toc-child container
// i.e. list of subsections
(s=o.closest(".toc-item").find(".toc-child")).is(":visible")||s.fadeIn(400),o.closest(".toc-item").siblings(".toc-item").find(".toc-child").hide()}var s,a},n=function(t){if($(".toc-link").hasClass("active")){const e=$(".active").offset().top,i=$("#sidebar .sidebar-toc__content").scrollTop();e>t+$(window).height()-100&&$("#sidebar .sidebar-toc__content").scrollTop(i+100),e<t+100&&$("#sidebar .sidebar-toc__content").scrollTop(i-100)}}}
/**
 * Rightside
 */,$rightsideEle=$("#rightside");
// read-mode
$rightsideEle.on("click","#readmode",(function(){$("body").toggleClass("read-mode")}));
// font change
const originFontSize=$("body").css("font-size");
// Switch Between Light And Dark Mode
if($rightsideEle.on("click","#font_plus",()=>{const t=parseFloat($("body").css("font-size"));t<20&&$("body").css("font-size",t+1)}),$rightsideEle.on("click","#font_minus",()=>{const t=parseFloat($("body").css("font-size"));t>10&&$("body").css("font-size",t-1)}),$("#darkmode").length){const t=function(){"light"===("dark"===document.documentElement.getAttribute("data-theme")?"dark":"light")?(activateDarkMode(),Cookies.set("theme","dark",2),void 0!==GLOBAL_CONFIG.Snackbar&&snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)):(activateLightMode(),Cookies.set("theme","light",2),void 0!==GLOBAL_CONFIG.Snackbar&&snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day))};$rightsideEle.on("click","#darkmode",()=>{t(),"function"==typeof utterancesTheme&&utterancesTheme(),"object"==typeof FB&&window.loadFBComment(),window.DISQUS&&$("#disqus_thread").children().length&&setTimeout(()=>window.disqusReset(),200)})}
// rightside 點擊設置 按鈕 展開
$rightsideEle.on("click","#rightside_config",()=>$("#rightside-config-hide").toggleClass("show")
// Back to top
),$rightsideEle.on("click","#go-up",()=>scrollToDest("body")
/**
 * menu
 * 側邊欄sub-menu 展開/收縮
 * 解決menus在觸摸屏下，滑動屏幕menus_item_child不消失的問題（手機hover的bug)
 */);const clickFnOfSubMenu=function(){$("#mobile-sidebar-menus .expand").on("click",(function(){$(this).parents(".menus_item").find("> .menus_item_child").slideToggle(),$(this).toggleClass("closed")})),$(window).on("touchmove",(function(t){const e=$("#nav .menus_item_child");e.is(":visible")&&e.css("display","none")}))}
/**
 * 複製時加上版權信息
 */,addCopyright=()=>{const t=GLOBAL_CONFIG.copyright;document.body.oncopy=e=>{let i;e.preventDefault();const n=window.getSelection(0).toString();return i=n.length>t.limitCount?n+"\n\n\n"+t.languages.author+"\n"+t.languages.link+window.location.href+"\n"+t.languages.source+"\n"+t.languages.info:n,e.clipboardData?e.clipboardData.setData("text",i):window.clipboardData.setData("text",i)}}
/**
 * 網頁運行時間
 */,addRuntime=()=>{const t=$("#webinfo-runtime-count");if(t.length){const e=t.attr("publish_date");t.text(diffDate(e)+" "+GLOBAL_CONFIG.runtime_unit)}}
/**
 * table overflow
 */,addTableWrap=function(){$("#article-container table").not($("figure.highlight > table")).each((function(){$(this).wrap('<div class="table-wrap"></div>')}))}
/**
 * 百度推送
 */,pushToBaidu=()=>{const t=document.createElement("script"),e=window.location.protocol.split(":")[0];t.src="https"===e?"https://zz.bdstatic.com/linksubmit/push.js":"http://push.zhanzhang.baidu.com/push.js",t.dataset.pjax="";const i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(t,i)}
/**
 * tag-hide
 */,clickFnOfTagHide=function(){const t=$(".hide-button");t.length&&t.on("click",(function(t){const e=$(this),i=$(this).next(".hide-content");e.toggleClass("open"),i.toggle(),e.hasClass("open")&&i.find(".justified-gallery").length>0&&initJustifiedGallery(i.find(".justified-gallery"))}))},clickFnOfTabs=function(){$("#article-container .tabs").find(".tab > button").on("click",(function(t){const e=$(this),i=e.parent();if(!i.hasClass("active")){const t=e.parents(".nav-tabs").next();i.siblings(".active").removeClass("active"),i.addClass("active");const n=e.attr("data-href");t.find("> .tab-item-content").removeClass("active"),t.find("> "+n).addClass("active");const o=t.find(n).find(".justified-gallery");o.length>0&&initJustifiedGallery(o)}}))},toggleCardCategory=function(){$(".card-category-list-item.parent i").on("click",(function(t){t.preventDefault();const e=$(this);e.toggleClass("expand"),e.parents(".parent").next().toggle()}))},switchComments=function(){let t=!1;$("#switch-comments-btn").on("click",(function(){$("#post-comment > .comment-wrap > div").each((function(){$(this).is(":visible")?$(this).hide():$(this).css({display:"block",animation:"tabshow .5s"})})),t||"function"!=typeof loadOtherComment||(t=!0,loadOtherComment())}))},addPostOutdateNotice=function(){const t=GLOBAL_CONFIG.noticeOutdate;var e=diffDate(GLOBAL_CONFIG_SITE.postUpdate);if(e>=t.limitDay){const i=`<div class="post-outdate-notice">${t.messagePrev+" "+e+" "+t.messageNext}</div>`;"top"===t.position?$("#article-container").prepend(i):$("#article-container").append(i)}}
/**
 * lazyload
 */;GLOBAL_CONFIG.islazyload&&(window.lazyLoadOptions={elements_selector:"img",threshold:0,data_src:"lazy-src"},window.addEventListener("LazyLoad::Initialized",(function(t){window.lazyLoadInstance=t.detail.instance}),!1));const unRefreshFn=function(){$(window).on("resize",(function(){window.innerWidth<768?adjustMenu(0):$("#sidebar").hasClass("tocOpenPc")&&$("#nav").hasClass("fixed")?adjustMenu(1):adjustMenu(2)})),$("#mobile-sidebar-menus .expand").on("click",(function(){$(this).parents(".menus_item").find("> .menus_item_child").slideToggle(),$(this).toggleClass("closed")})),$(window).on("touchmove",(function(t){const e=$("#nav .menus_item_child");e.is(":visible")&&e.css("display","none")})),void 0!==GLOBAL_CONFIG.copyright&&addCopyright(),GLOBAL_CONFIG.baiduPush&&pushToBaidu()},refreshFn=function(){window.innerWidth<768?adjustMenu(0):adjustMenu(2),$("#nav").css({opacity:"1",animation:"headerNoOpacity 1s"}),GLOBAL_CONFIG_SITE.isPost&&(window.innerWidth>1024&&$("#toggle-sidebar").hasClass("on")&&setTimeout((function(){openSidebar()}),400),$("#toggle-sidebar").on("click",(function(){const t=$(this).hasClass("on");t?$(this).removeClass("on"):$(this).addClass("on"),t?closeSidebar():openSidebar()})),GLOBAL_CONFIG_SITE.isSidebar&&tocFn(),void 0!==GLOBAL_CONFIG.noticeOutdate&&addPostOutdateNotice()),sidebarFn(),GLOBAL_CONFIG_SITE.isHome&&$("#scroll_down").on("click",(function(){scrollToDest("#content-inner")})),addHighlightTool(),GLOBAL_CONFIG.isPhotoFigcaption&&addPhotoFigcaption(),runJustifiedGallery(),addLightBox(),scrollFn(),GLOBAL_CONFIG.runtime&&addRuntime(),$("#article-container table").not($("figure.highlight > table")).each((function(){$(this).wrap('<div class="table-wrap"></div>')})),clickFnOfTagHide(),$("#article-container .tabs").find(".tab > button").on("click",(function(t){const e=$(this),i=e.parent();if(!i.hasClass("active")){const t=e.parents(".nav-tabs").next();i.siblings(".active").removeClass("active"),i.addClass("active");const n=e.attr("data-href");t.find("> .tab-item-content").removeClass("active"),t.find("> "+n).addClass("active");const o=t.find(n).find(".justified-gallery");o.length>0&&initJustifiedGallery(o)}})),$(".card-category-list-item.parent i").on("click",(function(t){t.preventDefault();const e=$(this);e.toggleClass("expand"),e.parents(".parent").next().toggle()})),switchComments()};$((function(){window.innerWidth<768?adjustMenu(0):adjustMenu(2),$("#nav").css({opacity:"1",animation:"headerNoOpacity 1s"}),GLOBAL_CONFIG_SITE.isPost&&(window.innerWidth>1024&&$("#toggle-sidebar").hasClass("on")&&setTimeout((function(){openSidebar()}),400),$("#toggle-sidebar").on("click",(function(){const t=$(this).hasClass("on");t?$(this).removeClass("on"):$(this).addClass("on"),t?closeSidebar():openSidebar()})),GLOBAL_CONFIG_SITE.isSidebar&&tocFn(),void 0!==GLOBAL_CONFIG.noticeOutdate&&addPostOutdateNotice()),sidebarFn(),GLOBAL_CONFIG_SITE.isHome&&$("#scroll_down").on("click",(function(){scrollToDest("#content-inner")})),addHighlightTool(),GLOBAL_CONFIG.isPhotoFigcaption&&addPhotoFigcaption(),runJustifiedGallery(),addLightBox(),scrollFn(),GLOBAL_CONFIG.runtime&&addRuntime(),$("#article-container table").not($("figure.highlight > table")).each((function(){$(this).wrap('<div class="table-wrap"></div>')})),clickFnOfTagHide(),$("#article-container .tabs").find(".tab > button").on("click",(function(t){const e=$(this),i=e.parent();if(!i.hasClass("active")){const t=e.parents(".nav-tabs").next();i.siblings(".active").removeClass("active"),i.addClass("active");const n=e.attr("data-href");t.find("> .tab-item-content").removeClass("active"),t.find("> "+n).addClass("active");const o=t.find(n).find(".justified-gallery");o.length>0&&initJustifiedGallery(o)}})),$(".card-category-list-item.parent i").on("click",(function(t){t.preventDefault();const e=$(this);e.toggleClass("expand"),e.parents(".parent").next().toggle()})),switchComments(),$(window).on("resize",(function(){window.innerWidth<768?adjustMenu(0):$("#sidebar").hasClass("tocOpenPc")&&$("#nav").hasClass("fixed")?adjustMenu(1):adjustMenu(2)})),$("#mobile-sidebar-menus .expand").on("click",(function(){$(this).parents(".menus_item").find("> .menus_item_child").slideToggle(),$(this).toggleClass("closed")})),$(window).on("touchmove",(function(t){const e=$("#nav .menus_item_child");e.is(":visible")&&e.css("display","none")})),void 0!==GLOBAL_CONFIG.copyright&&addCopyright(),GLOBAL_CONFIG.baiduPush&&pushToBaidu()}));