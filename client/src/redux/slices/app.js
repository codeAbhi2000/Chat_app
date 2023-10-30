import { createSlice } from "@reduxjs/toolkit";

import { useDispatch } from 'react-redux';



const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT",
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar(state, action) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
  },
});


export function ToggleSidebar() {
    const dispatch = useDispatch();
    return async () => {
        dispatch(slice.actions.toggleSidebar());
    };
}

export function UpdateSidebarType(type) {
    const dispatch = useDispatch();
    return async () => {
        dispatch(
            slice.actions.updateSidebarType({
                type,
            })
            );
        };
    }
    
    
export default slice.reducer;
