<script>
(function () {
  "use strict";

  // ===== CONFIG =====
  var CHATBOT_URL = "https://stephenjepson-chatbot.netlify.app/"; // no auto-open
  // Updated product links (no coupon text in message; your Payhip links handle it)
  var VIDEO1_LINK = "https://payhip.com/b/MbNq8";
  var VIDEO2_LINK = "https://payhip.com/b/Bd7MQ";

  // Remove any legacy welcome overlay if it exists
  var legacyWelcome = document.getElementById("sj-welcome");
  if (legacyWelcome && legacyWelcome.parentNode) legacyWelcome.parentNode.removeChild(legacyWelcome);

  // ===== Small round Chat Button (SVG icon only) =====
  var chatBtn = document.createElement("button");
  chatBtn.type = "button";
  chatBtn.setAttribute("aria-label", "Open chat");
  chatBtn.title = "Chat with Stephen";
  chatBtn.style.position = "fixed";
  chatBtn.style.bottom = "24px";
  chatBtn.style.right = "24px";
  chatBtn.style.width = "52px";
  chatBtn.style.height = "52px";
  chatBtn.style.borderRadius = "50%";
  chatBtn.style.border = "none";
  chatBtn.style.background = "#2563eb"; // blue-600
  chatBtn.style.color = "#fff";
  chatBtn.style.boxShadow = "0 10px 24px rgba(0,0,0,0.18)";
  chatBtn.style.zIndex = "100000";
  chatBtn.style.cursor = "pointer";
  chatBtn.style.display = "grid";
  chatBtn.style.placeItems = "center";
  chatBtn.style.padding = "0";
  chatBtn.style.lineHeight = "0";

  // Minimal chat bubble SVG
  var svg = ''
    + '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4A4 4 0 0 1 4 15V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z"/>'
    + '</svg>';
  chatBtn.innerHTML = svg;
  document.body.appendChild(chatBtn);

  // ===== Share Button (kept, smaller) =====
  var shareBtn = document.createElement("button");
  shareBtn.type = "button";
  shareBtn.textContent = "🎉 Share 90% Off";
  shareBtn.style.position = "fixed";
  shareBtn.style.bottom = "24px";
  shareBtn.style.right = "88px"; // to the left of chat
  shareBtn.style.height = "44px";
  shareBtn.style.borderRadius = "999px";
  shareBtn.style.border = "none";
  shareBtn.style.padding = "0 14px";
  shareBtn.style.fontWeight = "700";
  shareBtn.style.fontSize = "14px";
  shareBtn.style.background = "#f59e0b"; // amber-500
  shareBtn.style.color = "#111";
  shareBtn.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
  shareBtn.style.zIndex = "100000";
  shareBtn.style.cursor = "pointer";
  document.body.appendChild(shareBtn);

  // ===== Chat Iframe (hidden by default) =====
  var iframe = document.createElement("iframe");
  iframe.src = CHATBOT_URL; // no query params; won’t auto-open
  iframe.title = "Stephen Jepson Chatbot";
  iframe.style.position = "fixed";
  iframe.style.bottom = "86px";
  iframe.style.right = "24px";
  iframe.style.width = "390px";
  iframe.style.height = "540px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "16px";
  iframe.style.boxShadow = "0 16px 40px rgba(0,0,0,0.25)";
  iframe.style.display = "none";
  iframe.style.background = "rgba(255,255,255,0.98)";
  iframe.style.zIndex = "100001";
  document.body.appendChild(iframe);

  // Close button for iframe
  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.setAttribute("aria-label", "Close chat");
  closeBtn.title = "Close";
  closeBtn.textContent = "×";
  closeBtn.style.position = "fixed";
  closeBtn.style.bottom = "640px";
  closeBtn.style.right = "34px";
  closeBtn.style.width = "36px";
  closeBtn.style.height = "36px";
  closeBtn.style.borderRadius = "50%";
  closeBtn.style.border = "none";
  closeBtn.style.background = "#111827"; // gray-900
  closeBtn.style.color = "#fff";
  closeBtn.style.fontSize = "22px";
  closeBtn.style.lineHeight = "22px";
  closeBtn.style.display = "none";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.20)";
  closeBtn.style.zIndex = "100002";
  document.body.appendChild(closeBtn);

  // Toggle handlers
  function toggleChat() {
    var showing = iframe.style.display !== "none";
    iframe.style.display = showing ? "none" : "block";
    closeBtn.style.display = showing ? "none" : "grid";
  }
  chatBtn.onclick = toggleChat;
  closeBtn.onclick = toggleChat;

  // ===== Share logic (updated copy) =====
  shareBtn.onclick = function () {
    var shareMsg =
      "🎉 A Special Price for A Few Days, 1 Dollar for My Videos.\n\n" +
      "Use these links to auto-apply the coupon at checkout:\n" +
      "👉 Never Leave The Playground Play Active Video: " + VIDEO1_LINK + "\n" +
      "👉 The 5 in One Play Active Video!: " + VIDEO2_LINK + "\n\n" +
      "Take advantage of 90% off for a very short time.\n\n" +
      "Warmly, Stephen";

    if (navigator.share) {
      navigator.share({
        title: "Stephen Jepson — Special $1 Videos",
        text: shareMsg
      }).catch(function () {});
    } else {
      try { navigator.clipboard.writeText(shareMsg); } catch (e) {}
      var old = shareBtn.textContent;
      shareBtn.textContent = "Copied! 🎉";
      setTimeout(function(){ shareBtn.textContent = old; }, 1600);
    }
  };

  // ===== Small-screen tweaks =====
  var mq = window.matchMedia("(max-width: 480px)");
  function adjustForMobile(e) {
    if (e.matches) {
      iframe.style.width = "92vw";
      iframe.style.height = "65vh";
      iframe.style.right = "4vw";
      iframe.style.bottom = "88px";
      closeBtn.style.bottom = "calc(88px + 65vh - 10px)";
      closeBtn.style.right = "calc(4vw + 8px)";
    } else {
      iframe.style.width = "390px";
      iframe.style.height = "540px";
      iframe.style.right = "24px";
      iframe.style.bottom = "86px";
      closeBtn.style.bottom = "640px";
      closeBtn.style.right = "34px";
    }
  }
  adjustForMobile(mq);
  mq.addEventListener && mq.addEventListener("change", adjustForMobile);
})();
</script>
