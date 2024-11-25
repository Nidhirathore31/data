import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import axiosInstance from '../service/AxiosService';

export const categoryList = createAsyncThunk(
    "list",
    async () => {
        
        try {
            const response = await axiosInstance.get("/category?pageNumber=1&pageSize=100")
            return response.data.data
        }
        catch (error) {
            console.log(error)
        }
    })
    export const createCategory = createAsyncThunk("create", async (data) => {
        try {
            const response = await axiosInstance.post("/category", data)
            return response.data.data
        }
        catch (error) {
            console.log(error)
        }
    })
    export const categoryDetails = createAsyncThunk("details",async(id)=>{
        try{
            const response = await axiosInstance.get(`/category/${id}`)
            return response.data.details
        }
       catch(error){
        console.log(error)
       }
    })
    export const categoryUpdate = createAsyncThunk("update",async(data)=>{
        const {id,...formData} = data
        try{
            const response = await axiosInstance.put(`/category/${id}`,formData)
            return response.data.data
        }
        catch(error){
            console.log(error)
        }
    })



const slice = createSlice({
    name: "category",
    initialState: {
        category:{},
        allCategory: [],
        categoryInfo:{},
        categoryStatus:"",
        isSuccess: false,
        isError: false,
        isPending: false,

    },
    extraReducers: (builder) => {
        builder
        // create
            .addCase(createCategory.pending, (state, action) => {
                state.isPending = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.categoryStatus = "success"
                state.allCategory = [...state.allCategory,action.payload]

            })
            .addCase(createCategory.rejected, (state, action) => {
                state.isPending = false;
                state.isSuccess = false;
                state.isError = true;
            })
            // list
            .addCase(categoryList.pending, (state, action) => {
                state.isPending = true;
                state.isSuccess = false;
                state.isError = false
            })
            .addCase(categoryList.fulfilled, (state, action) => {
                // console.log(action.payload,"from category")
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                // state.categoryStatus =""
                state.allCategory = action.payload
            })
            .addCase(categoryList.rejected, (state, action) => {
                state.isPending = false;
                state.isSuccess = false;
                state.isError = true;
            })
            // details
            .addCase(categoryDetails.pending,(state,action)=>{
                state.isPending = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(categoryDetails.fulfilled,(state,action)=>{
        
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
                state.categoryInfo = action.payload
            })
            .addCase(categoryDetails.rejected,(state,action)=>{
                state.isPending = false;
                state.isSuccess = false;
                state.isError = true;
            })
            // update
            .addCase(categoryUpdate.pending,(state,action)=>{
               state.isPending = true;
               state.isSuccess = false;
               state.isError = false;
            })
            .addCase(categoryUpdate.fulfilled,(state,action)=>{
                state.isPending = false;
                state.isSuccess = true;
                state.isError = false;
            })
            .addCase(categoryUpdate.rejected,(state,action)=>{
                state.isPending=false;
                state.isSuccess=false;
                state.isError = true;
            })
    }
})




export default slice.reducer 