import React from 'react'
import UserNav from '../components/UserNav'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import UserList from './../components/users/UserList';
import UserDetails from '../components/users/UserDetails';
import NewProduct from '../components/products/NewProduct';
import ProductDetails from '../components/products/ProductDetails';
import ProductList from '../components/products/ProductList';
import ProductUpdate from '../components/products/ProductUpdate';
import CreateCategory from '../components/category/CreateCategory';
import CategoryDetails from '../components/category/CategoryDetails';
import CategoryList from '../components/category/CategoryList';
import UpdateCategory from '../components/category/UpdateCategory';
import UserUpdate from './../components/users/UserUpdate';

const LayOut = () => {
 
  return (
    <>
      <UserNav />
      <Routes>
        {/* user */}
        <Route path='/userlist' element={<PrivateRoute Component={UserList} />}></Route>
        <Route path='/userdetails/:id' element={<PrivateRoute Component={UserDetails} />}></Route>
        <Route path='/userupdate/:id' element={<PrivateRoute Component={UserUpdate} />}></Route>
        {/* product */}
        <Route path='/product' element={<PrivateRoute Component={NewProduct} />}></Route>
        <Route path='/productdetails/:id' element={<PrivateRoute Component={ProductDetails} />}></Route>
        <Route path='/productlist' element={<PrivateRoute Component={ProductList} />}></Route>
        <Route path='/updateproduct/:id' element={<PrivateRoute Component={ProductUpdate} />}></Route>
        {/* category */}
        <Route path='/category' element={<PrivateRoute Component={CreateCategory} />}></Route>
        <Route path='/categorydetails/:id' element={<PrivateRoute Component={CategoryDetails} />}></Route>
        <Route path='/categorylist' element={<PrivateRoute Component={CategoryList} />}></Route>
        <Route path='/updatecategory/:id' element={<PrivateRoute Component={UpdateCategory} />}></Route>
      </Routes>
    </>
  )
}

export default LayOut