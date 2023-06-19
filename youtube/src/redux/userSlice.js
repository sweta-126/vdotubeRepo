import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser:null,
  loading:false,
  error:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginStart:(state)=>{
        state.loading = true
      },
      loginSuccess:(state,action)=>{
        state.loading = false;
        state.currentUser = action.payload;
      },
      loginFailure:(state)=>{
        state.loading = false;
        state.error = true;
      },
      logout:(state)=>{
       // return initialState;
       state.currentUser = null;
       state.loading = false;
       state.error = false;
      },
      registerStart:(state)=>{
        state.loading = true
      },
      registerSuccess:(state,action)=>{
        state.loading = false;
        state.currentUser = action.payload;
      },
      registerFailure:(state)=>{
        state.loading = false;
        state.error = true;
      },
      subscription: (state, action) => {
        if (state.currentUser.subscribedUsers.includes(action.payload)) {
          state.currentUser.subscribedUsers.splice(
            state.currentUser.subscribedUsers.findIndex(
              (channelId) => channelId === action.payload
            ),
            1
          );
        } else {
          state.currentUser.subscribedUsers.push(action.payload);
        }
      },
    },
  });

  export const {loginStart,loginSuccess, loginFailure, logout,subscription, registerStart, registerSuccess, registerFailure } = userSlice.actions;

  export default userSlice.reducer;