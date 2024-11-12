import React, { useEffect, useRef, useState } from 'react';

function App() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false); // State to manage chatbox visibility
  const chatboxRef = useRef(null); // Reference to the chatbox div
  const userInputRef = useRef(null); // Reference to the input field
  const sendButtonRef = useRef(null); // Reference to the send button
  const openChatButtonRef = useRef(null); // Reference to the open chat button
  const closeChatButtonRef = useRef(null); // Reference to the close chat button

  // Function to toggle the chatbox visibility
  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  };

  // Function to add user messages
  const addUserMessage = (message) => {
    const chatbox = chatboxRef.current;
    const messageElement = document.createElement('div');
    messageElement.classList.add('mb-2', 'text-right');
    messageElement.innerHTML = `<p class="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
  };

  // Function to add bot messages
  const addBotMessage = (message) => {
    const chatbox = chatboxRef.current;
    const messageElement = document.createElement('div');
    messageElement.classList.add('mb-2');
    messageElement.innerHTML = `<p class="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">${message}</p>`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
  };

  // Simulate bot response
  const respondToUser = (userMessage) => {
    setTimeout(() => {
      addBotMessage("This is a response from the chatbot.");
    }, 500);
  };

  // Handle message sending on click or Enter key press
  const handleSendMessage = () => {
    const userMessage = userInputRef.current.value;
    if (userMessage.trim() !== "") {
      addUserMessage(userMessage);
      respondToUser(userMessage);
      userInputRef.current.value = "";
    }
  };

  // useEffect to attach event listeners after component mounts
  useEffect(() => {
    const sendButton = sendButtonRef.current;
    const userInput = userInputRef.current;

    const handleKeyUp = (event) => {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    };

    if (userInput) {
      userInput.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      if (userInput) {
        userInput.removeEventListener('keyup', handleKeyUp); // Cleanup
      }
    };
  }, []);

  return (
    <>
      {/* Open Chat Button */}
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          ref={openChatButtonRef}
          onClick={toggleChatbox}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Chat with Admin Bot
        </button>
      </div>

      {/* Chat Container */}
      {isChatboxOpen && (
        <div id="chat-container" className="fixed bottom-16 right-4 w-96">
          <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
              <p className="text-lg font-semibold">Admin Bot</p>
              <button
                ref={closeChatButtonRef}
                onClick={toggleChatbox}
                className="text-gray-300 hover:text-gray-400 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div
              id="chatbox"
              ref={chatboxRef}
              className="p-4 h-80 overflow-y-auto"
            >
              {/* Initial chat messages */}
            </div>

            <div className="p-4 border-t flex">
              <input
                id="user-input"
                ref={userInputRef}
                type="text"
                placeholder="Type a message"
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                id="send-button"
                ref={sendButtonRef}
                onClick={handleSendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
