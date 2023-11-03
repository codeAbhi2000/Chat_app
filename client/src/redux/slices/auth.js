import { createSlice } from "@reduxjs/toolkit";
import Axios from 'axios'
import { openSnackBar } from "./app";

const initialState = {
    isLoggedIn : false,
    token:'',
    email:''
}


const slice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        signOut(state,action){
            state.isLoggedIn = false
            state.token = ''
        },
        updateRegisterUserEmail(state,action){
            state.email = action.payload.email
        }
    }
})

export default slice.reducer

export function loginUseer(inputvalues) {
    return async (dispatch,getState)=>{
        Axios.post('http://localhost:5000/auth/login',{
          ...inputvalues
        },{
            headers:{
                "Content-Type":'application/json'
            }
        }).then((res)=>{
            console.log(res);
            dispatch(slice.actions.login({
                isLoggedIn : true,
                token:res.data.token
            }))
            dispatch(openSnackBar({severity:'success',message:res.data.msg}))
        }).catch((err)=>{
            console.log(err);
            dispatch(openSnackBar({severity:'error',message:err.data.msg}))
        })
    }
}

export function logoutUser(){
    return async (dispatch,getState)=>{
        dispatch(slice.actions.signOut())
    }
}

export function forgotPassword(inputData) {
    return (dispatch,getState)=>{
        Axios.post('http://localhost:5000/auth/forgotPassword',{
            ...inputData
        },{
            headers:{
                "Content-Type":'application/json'
            }
        }).then((res)=>{
            console.log(res);
            dispatch(openSnackBar({severity:'info',message:res.data.msg}))
        }).catch(err =>{
            console.log(err);
            dispatch(openSnackBar({severity:'error',message:err.data.msg}))
        })
    }
}

export function resetPassowrd(inputData) {
    const {uid,password,token} = inputData
    return (dispatch,getState)=>{
        Axios.post('http://localhost:5000/auth/resetPassword',{
            uid : uid,
            pass: password
        },{
            headers:{
                "Content-Type":'application/json',
                Authorization: token
            }
        }).then((res)=>{
            console.log(res);
            dispatch(openSnackBar({severity:'success',message:res.data.msg}))
        }).catch(err => {
            console.log(err);
            dispatch(openSnackBar({severity:'error',message:err.data.msg}))
        })
    }
}


export function registerUser(inputData){
    return async (dispatch,getState)=>{
        Axios.post('http://localhost:5000/auth/register',{
            ...inputData
        },
        {
            headers:{
                "Content-Type":'application/json',
            }
        }).then((res)=>{
            console.log(res);
            dispatch(slice.actions.updateRegisterUserEmail({email : inputData.email}))
            dispatch(openSnackBar({severity:'success',message:res.data.msg}))
        }).catch(err => {
            console.log(err);
            dispatch(openSnackBar({severity:'error',message:err.data.msg}))
        })
    }
}

export function  verifyUser(inputData) {
    return (dispatch,getState)=>{
        Axios.post('http://localhost:5000/auth/verifyOtp',{
            ...inputData
        },{
            headers:{
                "Content-Type":'application/json',
            }
        }).then((res)=>{
            console.log(res);
            dispatch(openSnackBar({severity:'success',message:res.data.msg}))
        }).catch(err =>{
            console.log(err);
            dispatch(openSnackBar({severity:'error',message:err.data.msg}))
        })
    }
}