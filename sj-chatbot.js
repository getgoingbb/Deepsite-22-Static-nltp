(function () {
  "use strict";

  // ====== CONFIG ======
  var CHATBOT_URL = "https://stephenjepson-chatbot.netlify.app/";
  var VIDEO1_LINK = "https://payhip.com/b/MbNq8"; // Play Active Video
  var VIDEO2_LINK = "https://payhip.com/b/Bd7MQ"; // 5 in One Video

  var SHARE_TEXT =
    "🎉 A Special Price for A Few Days, 1 Dollar for My Videos.\n\n" +
    "Use these links to auto-apply the coupon at checkout:\n" +
    "👉 Never Leave The Playground Play Active Video: " + VIDEO1_LINK + "\n" +
    "👉 The 5 in One Play Active Video!: " + VIDEO2_LINK + "\n\n" +
    "Take advantage of 90% off for a very short time.\n\n" +
    "Warmly, Stephen";

  // ====== UTIL ======
  function once(id) { return document.getElementById(id); }
  function css(el, styles) { for (var k in styles) el.style[k] = styles[k]; return el; }
  function el(tag, attrs, styles, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (styles) css(e, styles);
    if (html != null) e.innerHTML = html;
    return e;
  }
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
      window.addEventListener("load", fn, { once: true });
    } else {
      fn();
    }
  }

  function init() {
    if (window.__SJ_CHATBOT_INITED__) return;
    window.__SJ_CHATBOT_INITED__ = true;

    // Remove any legacy welcome overlay if it exists
    var legacyWelcome = once("sj-welcome");
    if (legacyWelcome && legacyWelcome.parentNode) legacyWelcome.parentNode.removeChild(legacyWelcome);

    // ===== Chat Button (small SVG) =====
    var chatBtn = el("button", { id: "sj-chat-btn", type: "button", "aria-label": "Open chat", title: "Chat with Stephen" },
      {
        position: "fixed", bottom: "24px", right: "24px",
        width: "52px", height: "52px", borderRadius: "50%", border: "none",
        background: "#2563eb", color: "#fff", boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
        zIndex: "100000", cursor: "pointer", display: "grid", placeItems: "center", padding: "0", lineHeight: "0"
      },
      '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4A4 4 0 0 1 4 15V7a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z"/></svg>'
    );
    document.body.appendChild(chatBtn);

    // ===== Share Button =====
    var shareBtn = el("button", { id: "sj-share-btn", type: "button" }, {
      position: "fixed", bottom: "24px", right: "88px", height: "44px",
      borderRadius: "999px", border: "none", padding: "0 14px",
      fontWeight: "700", fontSize: "14px", background: "#f59e0b", color: "#111",
      boxShadow: "0 8px 18px rgba(0,0,0,0.12)", zIndex: "100000", cursor: "pointer"
    });
    shareBtn.textContent = "🎉 Share 90% Off";
    document.body.appendChild(shareBtn);

    // ===== Chat Iframe (hidden) =====
    var iframe = el("iframe", { id: "sj-chat-iframe", title: "Stephen Jepson Chatbot", src: CHATBOT_URL }, {
      position: "fixed", bottom: "86px", right: "24px", width: "390px", height: "540px",
      border: "none", borderRadius: "16px", boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
      display: "none", background: "rgba(255,255,255,0.98)", zIndex: "100001"
    });
    document.body.appendChild(iframe);

    // Close button
    var closeBtn = el("button", { id: "sj-chat-close", type: "button", "aria-label": "Close chat", title: "Close" }, {
      position: "fixed", bottom: "640px", right: "34px", width: "36px", height: "36px",
      borderRadius: "50%", border: "none", background: "#111827", color: "#fff",
      fontSize: "22px", lineHeight: "22px", display: "none", cursor: "pointer",
      boxShadow: "0 6px 16px rgba(0,0,0,0.20)", zIndex: "100002"
    }, "×");
    document.body.appendChild(closeBtn);

    // ===== Share Popover (desktop fallback with clickable links) =====
    var sharePanel = el("div", { id: "sj-share-panel", role: "dialog", "aria-modal": "false" }, {
      position: "fixed", bottom: "76px", right: "88px", minWidth: "280px",
      background: "#fff", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.08)",
      boxShadow: "0 16px 36px rgba(0,0,0,0.18)", padding: "12px 12px 10px",
      zIndex: "100000", display: "none"
    });
    sharePanel.innerHTML =
      '<div style="font-weight:700;margin-bottom:8px;color:#111">Share links</div>' +
      '<div style="display:flex;flex-direction:column;gap:8px;font-size:14px">' +
      '  <a href="' + VIDEO1_LINK + '" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:underline">Never Leave The Playground Play Active Video</a>' +
      '  <a href="' + VIDEO2_LINK + '" target="_blank" rel="noopener" style="color:#2563eb;text-decoration:underline">The 5 in One Play Active Video!</a>' +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-top:10px">' +
      '  <button id="sj-copy-share" type="button" style="flex:0 0 auto;background:#111827;color:#fff;border:none;border-radius:8px;padding:8px 10px;font-weight:700;cursor:pointer">Copy Message</button>' +
      '  <button id="sj-close-share" type="button" style="flex:0 0 auto;background:#e5e7eb;color:#111;border:none;border-radius:8px;padding:8px 10px;font-weight:600;cursor:pointer">Close</button>' +
      '</div>';
    document.body.appendChild(sharePanel);

    function toggleChat() {
      var showing = iframe.style.display !== "none";
      iframe.style.display = showing ? "none" : "block";
      closeBtn.style.display = showing ? "none" : "grid";
    }
    chatBtn.onclick = toggleChat;
    closeBtn.onclick = toggleChat;

    // Share click
    shareBtn.onclick = function () {
      if (navigator.share) {
        navigator.share({ title: "Stephen Jepson — Special $1 Videos", text: SHARE_TEXT })
          .catch(function () { /* user canceled */ });
      } else {
        // Desktop fallback with clickable anchors
        sharePanel.style.display = (sharePanel.style.display === "none" ? "block" : "none");
      }
    };

    // Copy message in popover
    var copyBtn = sharePanel.querySelector("#sj-copy-share");
    var closeShare = sharePanel.querySelector("#sj-close-share");
    copyBtn.onclick = function () {
      try { navigator.clipboard.writeText(SHARE_TEXT); } catch (e) {}
      var old = shareBtn.textContent;
      shareBtn.textContent = "Copied! 🎉";
      setTimeout(function () { shareBtn.textContent = old; }, 1500);
    };
    closeShare.onclick = function () { sharePanel.style.display = "none"; };

    // Small-screen layout adjustments
    var mq = window.matchMedia && window.matchMedia("(max-width: 480px)");
    function adjust(e) {
      var small = e && e.matches || (mq && mq.matches);
      if (small) {
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
    if (mq) {
      adjust(mq);
      if (mq.addEventListener) mq.addEventListener("change", adjust);
      else if (mq.addListener) mq.addListener(adjust);
    }
  }

  ready(init);
})();
