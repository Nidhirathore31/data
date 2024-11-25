import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../service/AxiosService";

const slice = createSlice({
    name:"product",
    initialState:{
        product:{},
        allProduct:[],
        updateProduct:{},
        isSuccess:"false",
        isError:"false",
        isPending:"false",
        productStatus:""
    },
    extraReducers: builder =>{
        builder 
        // add product
        .addCase(addProduct.pending,(state,action)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.isPending = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        })
      .addCase(addProduct.rejected,(state,action)=>{
        state.isPending = false;
        state.isError = true;
        state.isSuccess = false;
      })

    // productdetails
      .addCase(productDetails.pending,(state,action)=>{
        state.isPending = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(productDetails.fulfilled,(state,action)=>{
        state.isPending = false;
        state.isError = false; 
        state.isSuccess = true;
        state.product = action.payload
      })
      .addCase(productDetails.rejected,(state,action)=>{
        state.isPending = false;
        state.isError = true;
        state.isSuccess = false;
      })
    // productlist
    .addCase(productList.pending,(state,action)=>{
        state.isPending = true;
        state.isError = false;
        state.isSuccess = false;
    })
    .addCase( productList.fulfilled,(state,action)=>{
        state.isPending = false;
        state.isError = false;
        state.isSuccess = true;
        state.allProduct = action.payload
    })
    .addCase( productList.rejected,(state,action)=>{
        state.isPending = false;
        state.isError = true;
        state.isSuccess = false;
    })
    // productupdate
    .addCase(productUpdate.pending,(state,action)=>{
       state.isPending = true;
       state.isError = false;
       state.isSuccess = false;
    })
    .addCase(productUpdate.fulfilled,(state,action)=>{
      state.isPending = false;
      state.isError = false;
      state.isSuccess = true;
    //   state.updateProduct = action.payload
    })
    .addCase(productUpdate.rejected,(state,action)=>{
        state.isPending = false;
        state.isError = true;
        state.isSuccess = false;
    })
    }
})
export const addProduct = createAsyncThunk("add",async(data)=>{
    try{
        console.log(data,"add product data")
        const response = await axiosInstance.post("/product",data)
        console.log(response)
        return response
    }
    catch(error){
        console.log(error)
    }
})
export const productDetails = createAsyncThunk("details",async(id)=>{
    try{
        const response = await axiosInstance.get(`/product/${id}`)
        return response.data.data
    }
    catch(error){
        console.log(error)
    }
})
export const productList = createAsyncThunk("list",async()=>{
    try{
        const response = await axiosInstance.get("/product?pageNumber=1&pageSize=50")
       
        return response.data.data
    }
    catch(error){
        console.log(error)
    }
})
export const productUpdate = createAsyncThunk("update",async(newData)=>{
   const {id,data} = newData
  
    try{
        const response = await axiosInstance.post(`/product/${id}`,data)
        return response.data.data
    }
    catch(error){
        console.log(error)
    }
})

export default slice.reducer