import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {
    group_list: [],
    current_group_conversation: null,
    group_messages: [],
  },
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversation(state, action) {
      console.log(action.payload.conversations);
      const new_list = action.payload.conversations.conversations?.map(
        (row) => ({
          chat_id: row.chat_id,
          _id: row._id,
          name: row.name,
          status: row.status,
          avatar: row.avatar,
          about:row.about,
          last_msg: row.last_message,
          unread: row.unread_message_count,
          last_message_time: row.last_message_time,
        })
      );
      state.direct_chat.conversations = new_list;
    },
    updateConversation(state, action) {
      const new_conversation = action.payload.conversations;
      state.direct_chat.conversations = state.direct_chat.conversations?.map(
        (el) => {
          if (el.chat_id !== new_conversation.chat_id) {
            return el;
          } else {
            return {
              chat_id: new_conversation.chat_id,
              _id: new_conversation._id,
              name: new_conversation.name,
              status: new_conversation.status,
              avatar: new_conversation.avatar,
              about: new_conversation.about,
              last_msg: new_conversation.las_message,
              unread: new_conversation.unread_message_count,
              last_message_time: new_conversation.last_message_time,
            };
          }
        }
      );
    },
    addConversation(state, action) {
      console.log(action.payload.conversations);
      const new_conversation = action.payload.conversations;
      state.direct_chat.conversations?.push({
        chat_id: new_conversation.chat_id,
        _id: new_conversation._id,
        name: new_conversation.name,
        status: new_conversation.status,
        avatar: new_conversation.avatar,
        about: new_conversation.about,
        last_msg: new_conversation.las_message,
        unread: new_conversation.unread_message_count,
        last_message_time: new_conversation.last_message_time,
      });
    },
    setCurrentConversation(state, action) {
      state.direct_chat.current_conversation = action.payload;
    },
    fetchCurrentMessages(state, action) {
      const user_id = action.payload.user_id;
      const messages = action.payload.messages;
      const formatted_messages = messages?.map((el) => ({
        id: el.message_id,
        chat_id: el.chat_id,
        type: el.message_type,
        time: el.message_time,
        message: el.text,
        imgUrl : el.imageUrl,
        docUrl : el.docUrl,
        incoming: el.to_user_id === user_id,
        outgoing: el.from_user_id === user_id,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages?.push(action.payload.message);
    },
    fetchGroupList(state, action) {
      // console.log(action.payload.list);
      const new_list = action.payload.list?.map((el) => {
        return {
          group_id: el.group_id,
          group_name: el.group_name,
          tagline: el.tagline,
          avatar: el.icon,
          last_message: el.last_message,
          last_message_time: el.last_message_time,
          group_admin: el.group_admin,
        };
      });
      state.group_chat.group_list = new_list
    },
    setCurrentGroupChat(state,action){
      state.group_chat.current_group_conversation = action.payload.current_group_chat
    },
    fetchGroupMessages(state,action){
      const user_id = action.payload.user_id
      const messages = action.payload.messages
      const formated_message = messages?.map((el)=>{
        return {
          id:el.message_id,
          group_id:el.group_id,
          type : el.type,
          from_user_id:el.from_user_id,
          sender_name:el.from_user_id === user_id ? "You" :el.from_user_name,
          message:el.message,
          message_time:el.message_time,
          imgUrl : el.imageUrl,
          docUrl : el.docUrl,
          incoming : el.from_user_id !== user_id,
          outgoing : el.from_user_id === user_id
        }
      })
      state.group_chat.group_messages = formated_message
    },
    addGroupMessage(state,action){
      state.group_chat.group_messages.push(action.payload.message)
    }
  },
});

export default slice.reducer;

export function fetchConversation(data) {
  return (dispatch, getState) => {
    dispatch(slice.actions.fetchConversation({ conversations: data }));
  };
}

export function UpdateConversation(data) {
  return (dispatch, getState) => {
    dispatch(slice.actions.updateConversation({ conversations: data }));
  };
}
export function AddConversation(data) {
  return (dispatch, getState) => {
    dispatch(slice.actions.addConversation({ conversations: data }));
  };
}

export const SetCurrentConversation = (current_conversation) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.setCurrentConversation(current_conversation));
  };
};

export const FetchCurrentMessages = (data) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.fetchCurrentMessages({
        messages: data,
        user_id: getState().auth.uid,
      })
    );
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({ message }));
  };
};


export function FetchGrooupList(data){
  return async (dispatch, getState)=>{
      dispatch(slice.actions.fetchGroupList({ list : data}))
  }
}

export function FetchGroupMessage(data){
  return async (dispatch,getState)=>{
    dispatch(slice.actions.fetchGroupMessages({
      user_id:getState().auth.uid,
      messages : data
    }))
  }
}

export function SetCurrentGroupChat(data){
  return async (dispatch,getState)=>{
    dispatch(slice.actions.setCurrentGroupChat({current_group_chat:data}))
  }
}

export function AddGroupMessage(message){
  return async (dispatch,getState)=>{
    dispatch(slice.actions.addGroupMessage({message}))
  }
}


