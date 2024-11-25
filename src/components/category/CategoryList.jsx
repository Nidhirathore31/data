import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { categoryList } from '../../redux/category/CategorySlice'

const CategoryList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { allCategory, isPending } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(categoryList())
  }, [])
  const handleDetails = (id) => {
    navigate(`/categorydetails/${id}`)
  }
  const handleUpdate = (id) => {
    navigate(`/updatecategory/${id}`)
  }
  if (isPending) {
    return <p className='text-light'>LOADING.....</p>
  }
  return (
    <>
      <div className='d-flex justify-content-start'>
        <Link to='/category'>
          <button className='btn m-1 text-light '>ADD</button>
        </Link>
      </div>
      <table className='table table-dark  table-bordered '>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>INFO</th>
          </tr>
        </thead>
        <tbody>
          {allCategory?.map((user, index) =>
          (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td className='d-flex justify-content-evenly align-items-center'>
                <button className='btn  text-light' onClick={() => handleDetails(user._id)}>DETAILS</button>
                <button className='btn  text-light' onClick={() => handleUpdate(user._id)}>UPDATE</button>
              </td>
            </tr>
          )
          )}
        </tbody>
      </table>
    </>
  )
}

export default CategoryList