import { createSlice,configureStore } from '@reduxjs/toolkit'


let email = createSlice({
  name : 'email',
  initialState : '',
  reducers : {
    setEmail(state,action){
      state = action.payload
    }
  }
})

export let { setEmail } = email.actions 

export default configureStore({
  reducer: {
    email : email.reducer
  }
}) 