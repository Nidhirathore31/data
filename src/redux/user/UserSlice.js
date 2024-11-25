import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from './../service/AxiosService';
import { toast } from "react-toastify";


export const userLogin = createAsyncThunk("login", async (data) => {
  try {
    const res = await axiosInstance.post("/user/login", data)
    toast.success("Login Successfully",{
      autoClose:1000
    })
    return res.data.data
  }
  catch (error) {
    toast.error(error.response?.data?.message || error.message)
    console.log(error)
  }
});
export const userList = createAsyncThunk("list", async () => {
  try {
    const response = await axiosInstance.get("/user?pageNumber=1&pageSize=80")
    toast.success("At userlist",{
      autoClose:1000
    })
    return response.data.data
  }
  catch (error) {
    toast.error(error.response?.data?.message || error.message)
    console.log(error)
  }
});

export const deleteUser = createAsyncThunk("delete", async (id) => {
  try {
    const response = await axiosInstance.delete(`/user/${id}`)
    const data = { id: id }
    return response
  }
  catch (error) {
    toast.error(error.response?.data?.message || error.message)
    console.log(error)
  }
});

export const userDetails = createAsyncThunk("details", async (id) => {
  try {
    const response = await axiosInstance.get(`/user/${id}`)
    
    return response.data.user
  }
  catch (error) {
    toast.error(error.response?.data?.message || error.message)
    console.log(error)
  }
});
export const updateUser = createAsyncThunk("update", async (data) => {
  
  const { id, formData } = data
  try {
    const response = await axiosInstance.put(`/user/${id}`, formData)
    
    return response
  }
  catch (error) {
    toast.error(error.response?.data?.message || error.message)
    console.log(error)
  }
});
export const registerUser = createAsyncThunk("register",async(formData)=>{
  try{
    const response = await axiosInstance.post('/user',formData)
    toast.success("Register Successfully",{
      autoClose:1000
    })
    return response.data.data
  }
  catch(error){
    toast.error(error.response?.data?.message || error.message)
    console.log(error)
  }
});
export const emailVerification = createAsyncThunk("verify",async(data)=>{
  try{
    const response = await axiosInstance.get(`/user/email/verification?token=${data?.emailVerificationTOken}&userId=${data?.id}`)
    toast.success("Verified Successfully",{
      autoClose:1000
    })
    return response.data
  }
 catch(error){
  toast.error(error.response?.data?.message || error.message)
  console.log(error)
 }
});
export const googleLogin = createAsyncThunk("google",async(userToken)=>{
  try{
    
    console.log(userToken,"user token")
    
    const response = await axiosInstance.post('/user/google-login', userToken)
    console.log(response,"googlelogin")
    return response
  }
 catch(error){
  toast.error(error.response?.data?.message || error.message)
  console.log(error)
 }
});

const slice = createSlice({
  name: "user",
  initialState: {
    user: {},
    userToken: "",
    allUserData: [],
    userInfo: {},
    updateUser:{},
    isSuccess: false,
    isError: false,
    isPending: false,
    message: "",
    updateStatus: "failed",
    registerUserInfo:null,
    verificationMessage:""
  },
  reducers:{
      setUserInfo:(state,action)=>{
        state.updateUser = action.payload
      },
   resetState:(state)=>{
    state.registerUserInfo = null;
    state.isSuccess = false;
    state.isError = false;
    state.isPending = false;
   }
  },

  extraReducers: (builder) => {
    builder
      // loginuser
      .addCase(userLogin.pending, (state, action) => {
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token)
        state.userToken = action.payload.token;
    
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
        state.message = action.error.message || "Login failed";
      })
      // userlist
      .addCase(userList.pending, (state, action) => {
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;
        state.allUserData = action.payload
        // toast.success("Login Successfully")

      })
      .addCase(userList.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
      })
      // deleteuser
      .addCase(deleteUser.pending, (state, action) => {
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;
        state.allUserData = state.allUserData.filter(
          (user) => user.id != action.payload.id
        )
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
      })
      //  userdetails
      .addCase(userDetails.pending, (state, action) => {
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(userDetails.fulfilled, (state, action) => {
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;
        state.userInfo = action.payload
      })
      .addCase(userDetails.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
      })
      //  updateuser
      .addCase(updateUser.pending, (state, action) => {
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
      })
      // register
      .addCase(registerUser.pending,(state,action)=>{
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;
        state.registerUserInfo = action.payload
      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
      })
      // emailverification
      .addCase(emailVerification.pending,(state,action)=>{
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(emailVerification.fulfilled,(state,action)=>{
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;
        state.verificationMessage = action.payload?.message
      })
      .addCase(emailVerification.rejected,(state,action)=>{
        state.isError =true;
        state.isPending = false;
        state.isSuccess = false;
      })
      // googolelogin
      .addCase(googleLogin.pending,(state,action)=>{
        state.isError = false;
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(googleLogin.fulfilled,(state,action)=>{
        localStorage.setItem("token", action.payload?.token)
        state.userToken = action.payload?.token;
        // state.userToken = localStorage.getItem("token")
        state.user = action.payload
        state.isError = false;
        state.isPending = false;
        state.isSuccess = true;

      })
      .addCase(googleLogin.rejected,(state,action)=>{
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
      })

  }
})
export const {resetState} = slice.actions
export default slice.reducer
