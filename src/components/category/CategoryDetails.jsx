import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { categoryDetails } from '../../redux/category/CategorySlice'

const CategoryDetails = () => {
  const { id } = useParams()
  const { categoryInfo, isPending } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(categoryDetails(id))
  }, [])
  if (isPending) {
    return <p className='text-light'>PLEASE WAIT WHILE LOADING DETAILS....</p>
  }

  return (
    <>
      <div className="container card align-items-center justify-content-center m-5 form" style={{ color: "white" }} >
        <h1>DETAILS</h1>
        <p>NAME : {categoryInfo?.name} </p>
        <p>CREATED :{categoryInfo?.createAt} </p>
        <p>UPDATED : {categoryInfo?.updateAt} </p>
        <Link to='/categorylist'><button className='btn' style={{ color: "white" }} >BACK</button></Link>
      </div>
    </>
  )
}

export default CategoryDetails