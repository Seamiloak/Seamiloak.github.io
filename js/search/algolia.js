$((function(){const a=()=>{$("body").css({width:"100%",overflow:"hidden"}),$("#algolia-search").css("display","block"),$(".ais-search-box--input").focus(),$("#search-mask").fadeIn(),
// shortcut: ESC
document.addEventListener("keydown",(function a(i){"Escape"===i.code&&(e(),document.removeEventListener("keydown",a))}))},e=()=>{$("body").css({width:"",overflow:""}),$("#algolia-search").css({animation:"search_close .5s"}),setTimeout((function(){$("#algolia-search").css({animation:"",display:"none"})}),500),$("#search-mask").fadeOut()},i=()=>{$("a.social-icon.search").on("click",a),$("#search-mask, .search-close-button").on("click touchstart",e)};i(),window.addEventListener("pjax:success",(function(){e(),i()}));const s=GLOBAL_CONFIG.algolia;if(!(s.appId&&s.apiKey&&s.indexName))return console.error("Algolia setting is invalid!");const t=instantsearch({appId:s.appId,apiKey:s.apiKey,indexName:s.indexName,searchParameters:{hitsPerPage:s.hits.per_page||10},searchFunction:function(a){$("#algolia-search-input").find("input").val()&&a.search()}});t.addWidget(instantsearch.widgets.searchBox({container:"#algolia-search-input",reset:!1,magnifier:!1,placeholder:GLOBAL_CONFIG.algolia.languages.input_placeholder})),t.addWidget(instantsearch.widgets.hits({container:"#algolia-hits",templates:{item:function(a){return'<a href="'+(a.permalink?a.permalink:GLOBAL_CONFIG.root+a.path)+'" class="algolia-hit-item-link">'+a._highlightResult.title.value+"</a>"},empty:function(a){return'<div id="algolia-hits-empty">'+GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/,a.query)+"</div>"}},cssClasses:{item:"algolia-hit-item"}})),t.addWidget(instantsearch.widgets.stats({container:"#algolia-stats",templates:{body:function(a){return"<hr>"+GLOBAL_CONFIG.algolia.languages.hits_stats.replace(/\$\{hits}/,a.nbHits).replace(/\$\{time}/,a.processingTimeMS)+'<span class="algolia-logo pull-right">  <img src="'+GLOBAL_CONFIG.root+'img/algolia.svg" alt="Algolia" /></span>'}}})),t.addWidget(instantsearch.widgets.pagination({container:"#algolia-pagination",scrollTo:!1,showFirstLast:!1,labels:{first:'<i class="fas fa-angle-double-left"></i>',last:'<i class="fas fa-angle-double-right"></i>',previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'},cssClasses:{root:"pagination",item:"pagination-item",link:"page-number",active:"current",disabled:"disabled-item"}})),t.start(),window.pjax&&t.on("render",()=>{window.pjax.refresh(document.getElementById("algolia-hits"))})}));