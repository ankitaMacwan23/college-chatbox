import { useContext, useRef } from "react";
import { ChatListData } from "../store/chat-store-list";

const Footer = ({ onUserSendClick }) => {
  let inputElement = useRef();
  const { handleUserInput } = useContext(ChatListData);

  const addUserMessage = () => {
    inputElement = inputElement.current.value;
    handleUserInput(inputElement);

  }
  return(
    <div className="p-4 border-t flex">
      <input id="user-input" ref={inputElement} type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button id="send-button" onClick={addUserMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send 
        </button>
    </div>
  );
}
export default Footer;