/* global Pace */
Pace.options.restartOnPushState=!1,document.addEventListener("pjax:send",()=>{Pace.restart()});