$((function(){let e=!1;const t=function(){var t;$("body").css({width:"100%",overflow:"hidden"}),$("#local-search").css("display","block"),$("#local-search-input input").focus(),$("#search-mask").fadeIn(),e||(t=GLOBAL_CONFIG.localSearch.path,$.ajax({url:GLOBAL_CONFIG.root+t,dataType:"xml",success:function(e){
// get the contents from search data
const t=$("entry",e).map((function(){return{title:$("title",this).text(),content:$("content",this).text(),url:$("url",this).text()}})).get(),s=$("#local-search-input input")[0],c=$("#local-hits")[0];s.addEventListener("input",(function(){let e='<div class="search-result-list">';const s=this.value.trim().toLowerCase().split(/[\s]+/);if(c.innerHTML="",this.value.trim().length<=0)return void $(".local-search-stats__hr").hide();let a=0;
// perform local searching
t.forEach((function(t){let c=!0;t.title&&""!==t.title.trim()||(t.title="Untitled");let n=t.title.trim().toLowerCase();const i=t.content.trim().replace(/<[^>]+>/g,"").toLowerCase(),l=t.url;let o=-1,r=-1,h=-1;
// show search results
if(
// only match artiles with not empty titles and contents
""!==n||""!==i?s.forEach((function(e,t){o=n.indexOf(e),r=i.indexOf(e),o<0&&r<0?c=!1:(r<0&&(r=0),0===t&&(h=r))})):c=!1,c){const c=t.content.trim().replace(/<[^>]+>/g,"");if(h>=0){
// cut out 130 characters
let t=h-30,o=h+100;t<0&&(t=0),0===t&&(o=100),o>c.length&&(o=c.length);let r=c.substring(t,o);
// highlight all keywords
s.forEach((function(e){const t=new RegExp(e,"gi");r=r.replace(t,'<span class="search-keyword">'+e+"</span>"),n=n.replace(t,'<span class="search-keyword">'+e+"</span>")})),e+='<div class="local-search__hit-item"><a href="'+l+'" class="search-result-title">'+n+"</a>",a+=1,$(".local-search-stats__hr").show(),""!==i&&(e+='<p class="search-result">'+r+"...</p>")}e+="</div>"}})),0===a&&(e+='<div id="local-search__hits-empty">'+GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/,this.value.trim())+"</div>"),e+="</div>",c.innerHTML=e,window.pjax&&window.pjax.refresh(c)}))}}),e=!0),
// shortcut: ESC
document.addEventListener("keydown",(function e(t){"Escape"===t.code&&(s(),document.removeEventListener("keydown",e))}))},s=function(){$("body").css({width:"",overflow:""}),$("#local-search").css({animation:"search_close .5s"}),setTimeout((function(){$("#local-search").css({animation:"",display:"none"})}),500),$("#search-mask").fadeOut()},c=()=>{$("a.social-icon.search").on("click",t),$("#search-mask, .search-close-button").on("click",s)};c(),window.addEventListener("pjax:success",(function(){$("#local-search").is(":visible")&&s(),c()}))}));