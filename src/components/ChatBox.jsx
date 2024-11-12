import { useContext, useRef } from "react";
import { ChatListData } from "../store/chat-store-list";
import MessageList from "./MessageList";

const ChatBox = () => {
  const { chatList } = useContext(ChatListData);
  return(
    <div id="chatbox" className="p-4 h-80 overflow-y-auto">
      {/* Initial chat messages */}
        {chatList.map((message) => (
          <MessageList message={message}></MessageList>
      ))}
    </div>
  );
}
export default ChatBox;
    