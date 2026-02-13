(function () {
  if (window.__MYCHAT_LOADED__) return;
  window.__MYCHAT_LOADED__ = true;

  const siteId = window?.FLEX_CHAT_ID || null;

  if (!siteId) {
    console.log("No site ID, widget will not render");
    return;
  }

  // fetch("https://api.flex-chat.com/api/widget-access", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     siteId,
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (!data.allowed) {
  //       console.log("Widget blocked for this user");
  //       return;
  //     }

  //     initWidget();
  //   })
  //   .catch(() => console.log("Access check failed"));

  function initWidget() {
    var iframe = document.createElement("iframe");
    var button = document.createElement("div");

    var style = document.createElement("style");
    style.innerHTML = `
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(106, 124, 255, 0.6);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(106, 124, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(106, 124, 255, 0);
  }
}
`;
    document.head.appendChild(style);

    var isOpen = false;

    var SUPPORT_ICON = `
<svg viewBox="0 0 24 24" width="30" height="30" fill="none">
  <path d="M12 3C7.58 3 4 6.58 4 11V14C4 15.1 4.9 16 6 16H7V11H5C5 7.69 8.13 5 12 5C15.87 5 19 7.69 19 11H17V16H18C19.1 16 20 15.1 20 14V11C20 6.58 16.42 3 12 3Z" fill="currentColor"/>
  <path d="M10 18H14C14 19.1 13.1 20 12 20C10.9 20 10 19.1 10 18Z" fill="currentColor"/>
</svg>
`;

    var CLOSE_ICON = `
<svg viewBox="0 0 24 24" width="22" height="22" fill="none">
  <path
    d="M18 6L6 18M6 6L18 18"
    stroke="currentColor"
    stroke-width="2.5"
    stroke-linecap="round"
  />
</svg>
`;

    var DESKTOP_STYLE = {
      width: "366px",
      height: "526px",
      right: "20px",
      bottom: "90px",
      borderRadius: "16px",
    };

    function updateButtonIcon() {
      button.innerHTML = isOpen ? CLOSE_ICON : SUPPORT_ICON;
    }

    function isMobile() {
      return window.innerWidth <= 480;
    }

    function updateButtonVisibility() {
      if (isMobile() && isOpen) {
        button.style.display = "none";
      } else {
        button.style.display = "flex";
      }
    }

    iframe.src = `https://curly-scene-692e.pr-zt.workers.dev/widget.html?siteId=${siteId}`;
    // iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "fullscreen");
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

    // desktop fullscreen
    function applyDesktop() {
      iframe.style.width = DESKTOP_STYLE.width;
      iframe.style.height = DESKTOP_STYLE.height;
      iframe.style.right = DESKTOP_STYLE.right;
      iframe.style.bottom = DESKTOP_STYLE.bottom;
      iframe.style.borderRadius = DESKTOP_STYLE.borderRadius;
    }

    // mobile fullscreen
    function applyMobile() {
      iframe.style.width = "100vw";
      iframe.style.height = "100vh";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.borderRadius = "0";
    }

    function updateLayout() {
      if (window.innerWidth <= 480) {
        applyMobile();
      } else {
        applyDesktop();
      }

      updateButtonVisibility();
    }

    updateLayout();
    window.addEventListener("resize", updateLayout);

    // support button
    button.innerHTML = SUPPORT_ICON;
    button.style.position = "fixed";
    button.style.bottom = "20px";
    button.style.right = "20px";
    button.style.width = "60px";
    button.style.height = "60px";
    button.style.borderRadius = "50%";
    button.style.background =
      "linear-gradient(90deg, #6a64f6, #a96ddf, #c77fcd, #a789c9)";
    button.style.color = "white";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.fontSize = "24px";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
    button.style.zIndex = "999999";
    button.style.animation = "pulse 2s infinite";

    button.onclick = function () {
      isOpen = !isOpen;
      iframe.style.display = isOpen ? "block" : "none";
      updateButtonIcon();
      updateLayout();
      updateButtonVisibility();
    };

    window.addEventListener("message", function (e) {
      if (e.data && e.data.type === "MYCHAT_CLOSE") {
        isOpen = false;
        iframe.style.display = "none";
        updateButtonIcon();
        updateButtonVisibility();
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
  }

  initWidget();
})();
