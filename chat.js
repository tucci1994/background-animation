// Stili CSS
const styles = `
  .chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .chat-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #FF9D1B;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
    color: #fff;
    font-size: 24px;
  }

  .chat-box {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 300px;
    height: 400px;
    max-height: 400px;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #ced4da;
    display: none; /* Aggiunta: nascondi la chat all'avvio */
    overflow-y: auto; /* Aggiunta: abilita lo scroll se ci sono molti messaggi */
  }

  .chat-header {
    padding: 5px;
    height: 40px;
    background-color: #4A4A4A;
    border-radius: 10px 10px 0px 0px;
    border-bottom: 1px solid #ced4da;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  .chat-header-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
    margin-right: 10px;
  }

  .chat-input {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    background-color: #f5f5f5;
    border-top: 1px solid #ced4da;
  }

  .chat-input textarea {
    flex-grow: 1;
    border: none;
    padding: 15px;
    margin-top: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    resize: vertical;
    align-self: flex-end;
  }

  .chat-input button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .color {
    background-color: red;
  }

  .open {
    background-color: #FFA500;
  }

  .align-bottom {
    align-self: flex-end;
  }

  .message {
    background-color: #f0f0f0;
    border-radius: 5px;
    padding: 10px;
    margin: 5px 10px;
  }
`;

function createChat() {
  const chatContainer = document.createElement("div");
  chatContainer.className = "chat-container";

  const chatCircle = document.createElement("div");
  chatCircle.className = "chat-circle align-bottom";
  chatCircle.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
      <path fill="#4A4A4A" d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4l0 0 0 0 0 0 0 0 .3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
    </svg>
  `;

  const chatBox = document.createElement("div");
  chatBox.className = "chat-box";

  const chatHeader = document.createElement("div");
  chatHeader.className = "chat-header";

  const chatImage = document.createElement("img");
  chatImage.src = "costituzioneSrl_logo_favicon.png";
  chatImage.className = "chat-header-image";

  chatHeader.appendChild(chatImage);

  const chatInput = document.createElement("div");
  chatInput.className = "chat-input align-bottom";

  const inputField = document.createElement("textarea");
  inputField.placeholder = "Inserisci il tuo messaggio...";

  const sendButton = document.createElement("button");
  sendButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
    </svg>
  `;

  sendButton.addEventListener("click", sendMessage);

  chatInput.appendChild(inputField);
  chatInput.appendChild(sendButton);

  chatBox.appendChild(chatHeader);
  chatBox.appendChild(chatInput);

  chatCircle.addEventListener("click", toggleChat);

  chatContainer.appendChild(chatCircle);
  chatContainer.appendChild(chatBox);

  document.body.appendChild(chatContainer);
}

let isChatOpen = false;

function toggleChat() {
  isChatOpen = !isChatOpen;
  updateChat();
}

function updateChat() {
  const chatCircle = document.querySelector(".chat-circle");
  const chatBox = document.querySelector(".chat-box");

  if (isChatOpen) {
    chatCircle.classList.add("open");
    chatBox.style.display = "block";
  } else {
    chatCircle.classList.remove("open");
    chatBox.style.display = "none";
  }
}

function sendMessage() {
  const inputField = document.querySelector(".chat-input textarea");
  const message = inputField.value.trim();

  if (message !== "") {
    console.log("Messaggio inviato:", message);
    inputField.value = "";

    const messageBox = document.createElement("div");
    messageBox.className = "message";
    messageBox.textContent = message;

    const chatBox = document.querySelector(".chat-box");
    chatBox.appendChild(messageBox);

    chatBox.scrollTop = chatBox.scrollHeight;

    const url =
      "https://layer02.costituzionesrl.com/conversations/edca8d4c-dcac-40a5-b08b-639bfc301178/ask";

    const data = {
      history_enabled: false,
      query: message,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Risposta:", responseData);
      })
      .catch((error) => {
        console.error("Errore nella richiesta:", error);
      });
  }
}

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

createChat();
