(function () {
  if (window.__MYCHAT_LOADED__) return;
  window.__MYCHAT_LOADED__ = true;

  var iframe = document.createElement("iframe");
  var button = document.createElement("div");

  var isOpen = false;

  iframe.src = "https://curly-scene-692e.pr-zt.workers.dev/widget.html";
  iframe.style.position = "fixed";
  iframe.style.bottom = "90px";
  iframe.style.right = "20px";
  iframe.style.width = "360px";
  iframe.style.height = "520px";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";
  iframe.style.borderRadius = "16px";
  iframe.style.display = "none";
  iframe.style.background = "transparent";

  // mobile fullscreen
  function applyMobile() {
    if (window.innerWidth <= 480) {
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.borderRadius = "0";
    }
  }

  applyMobile();
  window.addEventListener("resize", applyMobile);

  var img = document.createElement("img");
  img.src = "https://curly-scene-692e.pr-zt.workers.dev/support.png";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.pointerEvents = "none";

  button.appendChild(img);

  // support button
  // button.innerHTML = "💬";
  button.style.position = "fixed";
  button.style.bottom = "20px";
  button.style.right = "20px";
  button.style.width = "56px";
  button.style.height = "56px";
  button.style.borderRadius = "50%";
  button.style.background = "linear-gradient(135deg, #6a7cff, #5b6cf2)";
  button.style.color = "white";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.fontSize = "24px";
  button.style.cursor = "pointer";
  button.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
  button.style.zIndex = "999999";

  button.onclick = function () {
    isOpen = !isOpen;
    iframe.style.display = isOpen ? "block" : "none";
  };

  window.addEventListener("message", function (e) {
    if (e.data && e.data.type === "MYCHAT_CLOSE") {
      isOpen = false;
      iframe.style.display = "none";
    }
  });

  function mount() {
    document.body.appendChild(iframe);
    document.body.appendChild(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
