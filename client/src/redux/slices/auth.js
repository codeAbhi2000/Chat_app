import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { openSnackBar } from "./app";

const initialState = {
  isLoggedIn: false,
  token: "",
  email: "",
  uid: null,
  loggedInUser: {
    name: "",
    avatar: null,
    about: "",
  },
  groupsYouIn: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
      const user = action.payload.profile;
      state.loggedInUser = {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      };
      state.groupsYouIn = action.payload.groupsIn;
    },
    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
      state.uid = null;
      state.loggedInUser = {
        name: "",
        avatar: null,
        about: "",
      };
    },
    updateRegisterUserEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export default slice.reducer;

export function loginUseer(inputvalues) {
  return async (dispatch, getState) => {
    Axios.post(
      "http://13.126.35.197:5000/auth/login",
      {
        ...inputvalues,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        dispatch(
          slice.actions.login({
            isLoggedIn: true,
            token: res.data.token,
            uid: res.data.uid,
            profile: res.data.profile,
            groupsIn: res.data.profile.groupsIn,
          })
        );
        dispatch(openSnackBar({ severity: "success", message: res.data.msg }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackBar({ severity: "error", message: err.response.data.msg })
        );
      });
  };
}

export function logoutUser() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.signOut());
  };
}

export function forgotPassword(inputData) {
  return (dispatch, getState) => {
    Axios.post(
      "http://13.126.35.197:5000/auth/forgotPassword",
      {
        ...inputData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        dispatch(openSnackBar({ severity: "info", message: res?.data.msg }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackBar({ severity: "error", message: err.response?.data.msg })
        );
      });
  };
}

export function resetPassowrd(inputData) {
  const { uid, password, token } = inputData;
  return (dispatch, getState) => {
    Axios.post(
      "http://13.126.35.197:5000/auth/resetPassword",
      {
        uid: uid,
        pass: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((res) => {
        console.log(res);
        dispatch(openSnackBar({ severity: "success", message: res.data.msg }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackBar({ severity: "error", message: err.response.data.msg })
        );
      });
  };
}

export function registerUser(inputData) {
  return async (dispatch, getState) => {
    Axios.post(
      "http://13.126.35.197:5000/auth/register",
      {
        ...inputData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        dispatch(
          slice.actions.updateRegisterUserEmail({ email: inputData.email })
        );
        dispatch(openSnackBar({ severity: "success", message: res.data.msg }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackBar({ severity: "error", message: err.response.data.msg })
        );
      });
  };
}

export function verifyUser(inputData) {
  return (dispatch, getState) => {
    Axios.post(
      "http://13.126.35.197:5000/auth/verifyOtp",
      {
        ...inputData,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        dispatch(openSnackBar({ severity: "success", message: res.data.msg }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          openSnackBar({ severity: "error", message: err.response.data.msg })
        );
      });
  };
}
