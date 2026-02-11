(function () {
  // защита от повторной загрузки
  if (window.__MYCHAT_LOADED__) return;
  window.__MYCHAT_LOADED__ = true;

  var iframe = document.createElement("iframe");

  iframe.src = "https://curly-scene-692e.pr-zt.workers.dev/widget.html";
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "360px";
  iframe.style.height = "520px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";
  iframe.style.borderRadius = "12px";
  iframe.style.background = "transparent";

  iframe.allow = "clipboard-write";

  function mount() {
    document.body.appendChild(iframe);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
