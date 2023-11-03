import { createSlice } from "@reduxjs/toolkit";

// import { useDispatch } from 'react-redux';

// import { dispatch } from "../store";

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
