import { createContext, useReducer } from "react";

export const ChatListData = createContext({
  chatList : [],
  handleUserClicked : () => {},
  handleUserInput : () => {},
});

const getDataFromAdmin = (clickId) => {

  let arrDispatchData = [];

  arrCollegeDataList.forEach( (list) => {
    if(list.id == clickId)
    {
      if(list.subData)
      {
        let arrSubData = list.subData;
        arrSubData.forEach( (subData) => {
          arrDispatchData = [
            {
              id : subData.id,
              title : subData.title,
              isLink : subData.isLink,
            }
          ];
        })
        arrDispatchData = arrSubData;
      }
    }
    else if(list.subData){
      let arrSubData = list.subData;
      arrSubData.forEach( (item) => {
        if(item.id == clickId)
        {
          if(item.subInnerData)
          {
            let arrSubInnerData = item.subInnerData;
            arrSubInnerData.forEach( (innerItem) => {
              arrDispatchData = [
                {
                  id : innerItem.id,
                  title : innerItem.title,
                  isLink : innerItem.isLink,
                }
              ];
            })
            arrDispatchData = arrSubInnerData;
          }
        }
      })
    }
  })
  return arrDispatchData;
}

const chatListReducer = (currChatList, action) => {
    let newChatList = currChatList;
    if(action.type === 'CLICK_BY_USER')
    {
      newChatList = [...newChatList, { id : action.payload.clickId, from : 'USER', title : action.payload.clickTitle, }];

      const arrGetDataFRomAdmin = getDataFromAdmin(action.payload.clickId);

     arrGetDataFRomAdmin.forEach( (item) => {
      newChatList = [...newChatList, { id : item.id, from : 'ADMIN', title : item.title, }];
     })
    }else if(action.type === 'INPUT_BY_USER'){
      newChatList = [...newChatList, { id : '0', from : 'USER', title : action.payload.userMsg, }];
      newChatList = [...newChatList, { id : '0', from : 'ADMIN', title : 'Thank you for chat with us', }];
      //newChatList = [...newChatList, { id : '0', from : 'ADMIN', title : 'Thank you for chat with us', }];
    }

    return newChatList;
}


const ChatListProvider = ({ children }) => {

 

 const[chatList, dispatchedChatList] =  useReducer(chatListReducer, DEFAULT_CHAT_LIST);

 const handleUserClicked = (clickId,clickTitle) => {
  dispatchedChatList({
      type : 'CLICK_BY_USER',
      payload : {
        clickId,
        clickTitle,
      },
    });
 }

 const handleUserInput = (userMsg) => {
  dispatchedChatList({
    type : 'INPUT_BY_USER',
    payload : {
      userMsg,
    },
  });
 }


    
  return(
  <ChatListData.Provider value={{chatList, handleUserClicked, handleUserInput}}>
    {children}
  </ChatListData.Provider> 
  );
}

const DEFAULT_CHAT_LIST = [
  {
    id : 1,
    from : "ADMIN",
    title : "Hello, welcome to KGCoding! 👋",
    isLink : '0',
  },
  {
    id : 2,
    from : "ADMIN",
    title : "How can I help you?",
    isLink : '0',
  },
  {
    id : 1,
    from : "ADMIN",
    title : "🎓Browse Courses",
    isLink : '1',
  },
];

const arrCollegeDataList = [
  {
    id : '1',
    title : 'Courses',
    isLink : '1',
    subData : [
      {
        id : '1.1',
        title : 'Premium Courses',
        isLink : '1',
        subInnerData : [
          {
            id : '1.1.1',
            title : 'MERN Stack',
            isLink : '0',
          },
          {
            id : '1.1.2',
            title : 'DSA using JAVA',
            isLink : '0',
          },
        ],
      },
      {
        id : '1.2',
        title : 'Free Youtube Courses',
        isLink : '1',
        subInnerData : [
          {
            id : '1.2.1',
            title : 'Javascript',
            isLink : '0',
          },
          {
            id : '1.2.2',
            title : 'React REDUXE',
            isLink : '0',
          },
          {
            id : '1.2.3',
            title : 'JAVA',
            isLink : '0',
          },
        ],
      }
    ],
  },
];

export default ChatListProvider;
