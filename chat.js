console.log("ciao");
function Chat() {
  var isChatOpen = false;

  function toggleChat() {
    isChatOpen = !isChatOpen;
    updateChat();
  }

  function updateChat() {
    var chatContainer = document.querySelector(".chat-container");
    var chatCircle = document.querySelector(".chat-circle");
    var chatBox = document.querySelector(".chat-box");

    if (isChatOpen) {
      chatCircle.classList.add("open");
      chatBox.style.display = "block";
    } else {
      chatCircle.classList.remove("open");
      chatBox.style.display = "none";
    }
  }

  function createChatElement(className, content) {
    var element = document.createElement("div");
    element.className = className;
    element.innerHTML = content;
    return element;
  }

  function initializeChatGpt() {
    var chatContainer = createChatElement("chat-container", "");
    var chatCircle = createChatElement("chat-circle", "Chat");
    var chatBox = createChatElement("chat-box", "");

    chatCircle.addEventListener("click", toggleChat);

    chatContainer.appendChild(chatCircle);
    chatContainer.appendChild(chatBox);

    document.body.appendChild(chatContainer);
  }

  initializeChatGpt();
}
