import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import auth from '../../../utils/firebase.config';


/**
 * first of all make a slice as before 
 * then createAsyncThunk and export it 
 * in that thunk call the create user from firebase 
 * then return it as an object
 * then connect it to the slice as extraReducer 
 * take a parameter like builder and chain it through addCase 
 * there are three cases pending , fulfiled and rejected 
 * 
 * thunk will have parameters in an object like {email, password , name , ......}
 * 
 */

const initialState = {
  name: '',
  email: '',
  isLoading: true,
  isError: false,
  error: ''
};

export const createUser = createAsyncThunk('userSlice/createUser', async ({ email, password, name }) => {
  const data = await createUserWithEmailAndPassword(auth, email, password)
  console.log(data)

  await updateProfile(auth.currentUser, {
    displayName: name,
  })


  return {
    email: data.user.email,
    name: data.user.displayName
  };
})

export const logInUser = createAsyncThunk('userSlice/logInUser', async ({ email, password }) => {
  const data = await signInWithEmailAndPassword(auth, email, password);
  return {
    email: data.user.email,
    name: data.user.displayName
  }
})


export const googleSignIn = createAsyncThunk('userSlice/googleSignIn', async () => {
  const provider = new GoogleAuthProvider()
  const data = await signInWithPopup(auth, provider)
  return {
    email: data.user.email,
    name: data.user.name
  }
})



const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    toggleLoading: (state, { payload }) => {
      state.isLoading = payload
    },
    setUser: (state, { payload }) => {
      state.name = payload.name,
        state.email = payload.email
    },
    logOutUser: (state) => {
      state.name = '';
      state.email = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.name = '';
      state.email = '';
      state.isLoading = true;
      state.isError = false;
    })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(createUser.rejected, (state, action) => {
        state.name = '';
        state.email = '';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
    builder.addCase(logInUser.pending, (state) => {
      state.name = '';
      state.email = '';
      state.isLoading = true;
      state.isError = false;
    })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.name = '';
        state.email = '';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })
    builder.addCase(googleSignIn.pending, (state) => {
      state.name = '';
      state.email = '';
      state.isLoading = true;
      state.isError = false;
    })
      .addCase(googleSignIn.fulfilled, (state, { payload }) => {
        state.name = payload.name;
        state.email = payload.email;
        state.isLoading = false;
        state.isError = false;
        state.error = '';
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        state.name = '';
        state.email = '';
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      })


  }
});

export const { toggleLoading, setUser, logOutUser } = userSlice.actions

export default userSlice.reducer;
