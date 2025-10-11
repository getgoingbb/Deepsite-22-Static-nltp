// Stephen Jepson chatbot and share widget
// This script creates floating chat and share buttons on the page
// and loads an external chatbot in an iframe. It also provides
// coupon links for the premium instructional videos.

// Immediately invoked function to avoid polluting the global scope
(function() {
  // ===== CONFIGURATION =====
  // Photo used in the chat button; update this URL if you change the image location
  var STEPHEN_IMAGE_URL = "https://slides.neverleavetheplayground.com/assets/img/watch-26-66.jpg";
  // URL of the embedded chatbot application; hosted on Netlify
  var CHATBOT_URL = "https://stephenjepson-chatbot.netlify.app/";

  // Direct Payhip coupon links (auto-applies coupon at checkout)
  // These coupons offer a $1 deal for the premium instructional videos
  var VIDEO1_LINK = "https://payhip.com/b/Mgw7n?coupon=QRZ81RA0FZ"; // Playground Active Video
  var VIDEO2_LINK = "https://payhip.com/b/jK30s?coupon=T5ZZJPL1KQ"; // 5 in One Video

  // ===== Floating Chat Button =====
  // Create the chat button element. We use a small chat icon instead of a large photo
  var chatBtn = document.createElement('button');
  // Use an emoji chat bubble for the icon and keep the label for accessibility
  chatBtn.innerHTML = '<span style="font-size:20px;margin-right:8px;">💬</span> Chat with Stephen';
  // Position and style the chat button
  chatBtn.style.position = "fixed";
  chatBtn.style.bottom = "30px";
  chatBtn.style.right = "30px";
  chatBtn.style.zIndex = "99999";
  chatBtn.style.background = "#2a8bdb";
  chatBtn.style.color = "#fff";
  chatBtn.style.border = "none";
  chatBtn.style.borderRadius = "20px";
  chatBtn.style.padding = "13px 22px";
  chatBtn.style.fontWeight = "bold";
  chatBtn.style.fontSize = "17px";
  chatBtn.style.boxShadow = "0 4px 18px rgba(0,0,0,0.13)";
  chatBtn.style.cursor = "pointer";
  chatBtn.style.display = "flex";
  chatBtn.style.alignItems = "center";
  chatBtn.style.gap = "8px";
  document.body.appendChild(chatBtn);

  // ===== Floating Share Button =====
  var shareBtn = document.createElement('button');
  shareBtn.innerHTML = "🎉 Share $1 Deal";
  shareBtn.style.position = "fixed";
  shareBtn.style.bottom = "30px";
  // Position this button to the left of the chat button
  shareBtn.style.right = "210px";
  shareBtn.style.zIndex = "99999";
  shareBtn.style.background = "#f7b801";
  shareBtn.style.color = "#111";
  shareBtn.style.border = "none";
  shareBtn.style.borderRadius = "17px";
  shareBtn.style.padding = "13px 22px";
  shareBtn.style.fontWeight = "bold";
  shareBtn.style.fontSize = "16px";
  shareBtn.style.boxShadow = "0 3px 14px rgba(0,0,0,0.11)";
  shareBtn.style.cursor = "pointer";
  document.body.appendChild(shareBtn);

  // ===== Floating Chatbot Popup =====
  // Create the iframe that will host the chatbot
  var iframe = document.createElement('iframe');
  iframe.src = CHATBOT_URL;
  iframe.title = "Stephen Jepson Chatbot";
  iframe.style.position = "fixed";
  iframe.style.bottom = "90px";
  iframe.style.right = "30px";
  iframe.style.width = "390px";
  iframe.style.height = "540px";
  iframe.style.border = "none";
  iframe.style.borderRadius = "18px";
  iframe.style.boxShadow = "0 12px 36px rgba(0,0,0,0.23)";
  iframe.style.display = "none";
  iframe.style.background = "rgba(255,255,255,0.97)";
  iframe.style.zIndex = "100000";
  document.body.appendChild(iframe);

  // ===== Close Button in Popup =====
  // This button sits above the iframe to allow closing the chat
  var closeBtn = document.createElement('button');
  closeBtn.innerHTML = "×";
  closeBtn.title = "Close chat";
  closeBtn.style.position = "fixed";
  closeBtn.style.bottom = "600px";
  closeBtn.style.right = "54px";
  closeBtn.style.zIndex = "100001";
  closeBtn.style.width = "40px";
  closeBtn.style.height = "40px";
  closeBtn.style.fontSize = "27px";
  closeBtn.style.background = "#2a8bdb";
  closeBtn.style.color = "#fff";
  closeBtn.style.border = "none";
  closeBtn.style.borderRadius = "50%";
  closeBtn.style.boxShadow = "0 2px 8px rgba(0,0,0,0.16)";
  closeBtn.style.display = "none";
  closeBtn.style.cursor = "pointer";
  document.body.appendChild(closeBtn);

  // ==== Button Actions ==== 
  // Toggle the chatbot iframe when chat button is clicked
  chatBtn.onclick = function() {
    var shouldShow = iframe.style.display === "none";
    iframe.style.display = shouldShow ? "block" : "none";
    closeBtn.style.display = shouldShow ? "block" : "none";
  };
  // Hide the chatbot when the close button is clicked
  closeBtn.onclick = function() {
    iframe.style.display = "none";
    closeBtn.style.display = "none";
  };

  // ==== Share Button Logic ==== 
  shareBtn.onclick = function() {
    var shareMsg =
      "🎉 I just got Stephen Jepson’s best videos for $1 each!\n\n" +
      "Use these links to auto-apply the coupon at checkout:\n" +
      "👉 Never Leave The Playground Active Video: " + VIDEO1_LINK + "\n" +
      "👉 The 5 in One Play Active Video: " + VIDEO2_LINK + "\n\n" +
      "You should check it out too!";
    // If the browser supports the Web Share API, open a native share dialog
    if (navigator.share) {
      navigator
        .share({
          title: "Stephen Jepson $1 Playground Videos",
          text: shareMsg,
          // The url param is typically appended after the text in native dialogs, but all
          // required information is in the text, so leaving out url is fine.
        })
        .catch(function() {
          // If sharing fails or user cancels, silently ignore
        });
    } else {
      // Fallback: copy to clipboard and show temporary "Copied!" message
      navigator.clipboard.writeText(shareMsg);
      shareBtn.innerHTML = "Copied! 🎉";
      setTimeout(function() {
        shareBtn.innerHTML = "🎉 Share $1 Deal";
      }, 1800);
    }
  };
})();