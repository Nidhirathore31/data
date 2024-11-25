import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { productDetails } from '../../redux/products/ProductSlice';


const ProductDetails = () => {
  const { product, isPending } = useSelector((state) => state.product)
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(productDetails(id))
    }
  }, [id])
  if (isPending) {
    return <p className='text-light'>LOADING....</p>
  }
  return (
    <>
      <div className="container card align-items-center justify-content-center m-5 form"
        style={{ color: "white" }} >
        <h1>DETAILS</h1>
        <img src={!product?.fileName ? "OOPS IMAGE IS UNAVAILABLE" :
          `https://node-js-wse4.onrender.com/uploads/${product?.fileName}`} alt="img" />
        <p>NAME : {product?.name} </p>
        <p>DESCRIPTION : {product?.description} </p>
        <p>CATEGORY : {product?.category?.name}</p>
        {/* <p>UPDATED : {product?.updateAt} </p> */}
        <Link to='/productlist'><button className='btn' style={{ color: "white" }} >BACK</button></Link>
      </div>
    </>
  )
}

export default ProductDetails