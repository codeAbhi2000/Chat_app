import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  direct_chat: {
    conversations: [],
    current_conversation: null,
    current_messages: [],
  },
  group_chat: {},
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversation(state, action) {
      console.log(action.payload.conversations);
      const new_list = action.payload.conversations.conversations.map(
        (row) => ({
          chat_id: row.chat_id,
          _id: row._id,
          name: row.name,
          status: row.status,
          avatar: row.avatar,
          last_msg: row.last_message,
          unread: row.unread_message_count,
          last_message_time: row.last_message_time,
        })
      );
      state.direct_chat.conversations = new_list;
    },
    updateConversation(state, action) {
      const new_conversation = action.payload.conversations;
      state.direct_chat.conversations = state.direct_chat.conversations.map(
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
      state.direct_chat.conversations.push({
        chat_id: new_conversation.chat_id,
        _id: new_conversation._id,
        name: new_conversation.name,
        status: new_conversation.status,
        avatar: new_conversation.avatar,
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
      const formatted_messages = messages.map((el) => ({
        id: el.message_id,
        chat_id: el.chat_id,
        type: el.type,
        time: el.message_time,
        message: el.text,
        incoming: el.to_user_id === user_id,
        outgoing: el.from_user_id === user_id,
      }));
      state.direct_chat.current_messages = formatted_messages;
    },
    addDirectMessage(state, action) {
      state.direct_chat.current_messages.push(action.payload.message);
    },
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
    dispatch(slice.actions.fetchCurrentMessages({ messages:data,user_id : getState().auth.uid }));
  };
};

export const AddDirectMessage = (message) => {
  return async (dispatch, getState) => {
    dispatch(slice.actions.addDirectMessage({ message }));
  };
};
