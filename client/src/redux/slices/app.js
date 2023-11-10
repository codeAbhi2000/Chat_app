import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'


const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
  snackbar: {
    open: false,
    message: null,
    severity: null,
  },
  users:[],
  friends:[],
  requests:[],
  allUsers:[],
  chat_type:null,
  room_id:null
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType: (state, action) => {
      state.sidebar.type = action.payload;
    },
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.message = action.payload.message;
      state.snackbar.severity = action.payload.severity;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
      state.snackbar.severity = null;
    },
    updateUsers(state,action){
      state.users = action.payload.users
    },
    upDateOtherUser(state,action){
      state.allUsers = action.payload.allUsers
    },
    updateFriends(state,action){
      state.friends = action.payload.friends
    },
    updateRequests(state,action){
      state.requests = action.payload.requests
    },
    selectConversation(state,action){
      state.chat_type = action.payload.chat_type
      state.room_id = action.payload.room_id
    }
  },
});

export default slice.reducer;
/*
function ToggleSidebar() {
    // const dispatch = useDispatch();
    return async () => {
        dispatch(slice.actions.toggleSidebar());
    };
}

function UpdateSidebarType(type) {
    const dispatch = useDispatch();
    return async () => {
        dispatch(
            slice.actions.updateSidebarType({
                type,
            })
            );
        };
    }*/

export const { toggleSidebar, updateSidebarType } = slice.actions;

export function openSnackBar({ severity, message }) {
  return (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        severity,
        message,
      })
    );

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar())
    }, 4000);
  };
}


export function closeSnackBar() {
  return (dispatch,getState)=>{
    dispatch(slice.actions.closeSnackBar())
  }
}

export function getAllOtherUser(){
  return async (dispatch,getState)=>{
      Axios.get(`http://localhost:5000/user/getOtherUsers/${getState().auth.uid}`,{
        headers:{
          "Content-Type": 'application/json',
          Authorization:getState().auth.token
        }
      }).then((res)=>{
        console.log(res);
        dispatch(slice.actions.updateUsers({users:res.data.data}))
      }).catch(err => {
        console.log(err);
      })
  }
}

export function getFriends(){
  return async (dispatch,getState)=>{
      Axios.get(`http://localhost:5000/user/getFriends/${getState().auth.uid}`,{
        headers:{
          "Content-Type": 'application/json',
          Authorization:getState().auth.token
        }
      }).then((res)=>{
        console.log(res);
        dispatch(slice.actions.updateFriends({friends:res.data.data}))
      }).catch(err => {
        console.log(err);
      })
  }
}
export function getFriendRequests(){
  return async (dispatch,getState)=>{
      Axios.get(`http://localhost:5000/user/getFriendRequests/${getState().auth.uid}`,{
        headers:{
          "Content-Type": 'application/json',
          Authorization:getState().auth.token
        }
      }).then((res)=>{
        console.log(res);
        dispatch(slice.actions.updateRequests({requests:res.data.data ?res.data.data:[] }))
      }).catch(err => {
        console.log(err);
      })
  }
}


export function selectChat({room_id,chat_type}) {
  return (dispatch,getState)=>{
    dispatch(slice.actions.selectConversation({room_id,chat_type}))
  }
}

export function getAllUsers(){
  return (dispatch,getState)=>{
    Axios.get(`http://localhost:5000/user/getAllUsers/${getState().auth.uid}`,{
      headers:{
        "Content-Type": 'application/json',
        Authorization:getState().auth.token
      }
    }).then((res)=>{
      console.log(res);
      dispatch(slice.actions.upDateOtherUser({allUsers:res.data.data}))
    }).catch(err=>{
      console.log(err);
    })
  }
}