import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { productList } from '../../redux/products/ProductSlice';

const ProductList = () => {
  const { allProduct, isPending } = useSelector((state) => state.product)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productList())
  }, [])
  const handleDetails = (id) => {
    navigate(`/productdetails/${id}`)
  }
  const handleUpdate = (id) => {
    navigate(`/updateproduct/${id}`)
  }
  if (isPending) {
    return <p className='text-light'>LOADING.....</p>
  }
  return (

    <>
      <div className='d-flex justify-content-start'>
        <Link to='/product'>
          <button className='btn m-1 text-light '>ADD</button>
        </Link>
      </div>
      <div>
        <div className="card d-flex flex-row flex-wrap m-4 p-1 justify-content-evenly " >
          {allProduct?.map((user, index) =>
          (
            <span key={user._id} className='card mb-1 '>
              <img src={!user.fileName ? "USER NOT FOUND" : `https://node-js-wse4.onrender.com/uploads/${user.fileName}`} className="card-img-top" />
              <div class="card-body ">
                <h5 class="card-title">{user?.name}</h5>
                <button className='btn btn-outline-info' onClick={() => handleDetails(user._id)}>DETAILS</button>
                <button className='btn btn-outline-warning' onClick={() => handleUpdate(user._id)}>UPDATE</button>
              </div>
            </span>
          )
          )}
        </div>
      </div >
    </>
  )
}

export default ProductList