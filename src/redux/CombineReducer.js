import { combineReducers } from "@reduxjs/toolkit";
import userSlice from '../redux/user/UserSlice'
import categorySlice from "../redux/category/CategorySlice"
import productSlice from "../redux/products/ProductSlice"


const rootReducers = combineReducers({
    user: userSlice,
    category:categorySlice,
    product: productSlice,
    
})
export default rootReducers