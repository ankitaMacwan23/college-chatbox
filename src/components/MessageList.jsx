import { useContext, useRef , useEffect} from "react";
import { ChatListData } from "../store/chat-store-list";

const MessageList = ({message}) => {

  const { handleUserClicked } = useContext(ChatListData);

  const chatboxRef = useRef(null); // Reference to the chatbox div

  // Log the chatboxRef.current value to the console
  useEffect(() => {
    if (chatboxRef.current) {
      chatbox.scrollTop = chatbox.scrollHeight;
      //console.log(chatboxRef.current); // Now this will log the actual ref value
    }
  }, [chatboxRef]);
  
  return(
    <div key={message.id} className="mb-2" ref={chatboxRef}>
    {/* Check if the message is from the user or admin */}
    {message.from === "USER" ? (
        <div className="mb-2 text-right">
          <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">
            {message.title}
          </p>
        </div>
      ) : (
        <div className="mb-2">
          {message.isLink === '0' ? (
            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">
            {message.title}
          </p>
          ) : (
            <button className="bg-blue-200 hover:bg-grey-400 transition duration-300 text-gray-700 rounded-lg py-2 px-4 inline-block" onClick={() => handleUserClicked(message.id, message.title)}>
            {message.title}
          </button>
          ) }
          
        </div>
      )}





    {/* SubMessages (if any) */}
  </div>
    );
};
export default MessageList;

