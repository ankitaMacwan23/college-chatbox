import { useState, useRef, useContext } from "react";
import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
import Footer from "./components/Footer";
import ChatListProvider, { ChatListData } from "./store/chat-store-list";

function App() {
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  const toggleChatbox = () => {
    setIsChatboxOpen(!isChatboxOpen);
  }

  const handleSendMessage = () => {
    console.log('User Type a message');
  }
  return(
  <>
    {/* Open Chat Button */}
    <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
         onClick={toggleChatbox}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Chat with KGCoding Chatbox
        </button>
    </div>

    {/* Chat Container */}
    
      {isChatboxOpen &&  
      <ChatListProvider>
      <div id="chat-container" className="fixed bottom-16 right-4 w-96 border">
        <Header toggleChatbox={toggleChatbox}></Header>
        <ChatBox></ChatBox>
        <Footer onUserSendClick={handleSendMessage}></Footer>
      </div>
      </ChatListProvider>
      }
    
  </>
  );
};

export default App;
