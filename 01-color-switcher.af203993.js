const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};t.startBtn.addEventListener("click",(function(){n(),t.startBtn.setAttribute("disabled",!0),t.stopBtn.removeAttribute("disabled"),e=setInterval(n,1e3)})),t.stopBtn.addEventListener("click",(function(){t.startBtn.removeAttribute("disabled"),t.stopBtn.setAttribute("disabled",!0),clearInterval(e)})),t.stopBtn.setAttribute("disabled",!0);let e=null;function n(){document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}
//# sourceMappingURL=01-color-switcher.af203993.js.map