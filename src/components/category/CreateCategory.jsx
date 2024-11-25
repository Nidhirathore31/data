import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/category/CategorySlice';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: false
  })
  const { categoryStatus } = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData = (e) => {
    // setFormData({...formData,[e.target.value]:e.target.name})
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev, [name]: value
    }))
  }
  useEffect(() => {
    if (categoryStatus == "success") {
      navigate('/categorylist')
    }
  }, [categoryStatus, navigate])
  const handleCreate = (e) => {
    e.preventDefault()
    dispatch(createCategory(formData))
  }
  return (
    <>
      <form className='form' onSubmit={handleCreate}>
        <h3>CREATE CATEGORY</h3>
        <label for="name">NAME</label>
        <input type="text" placeholder="Enter Name" id="name" name="name" value={formData.name} onChange={getData} />
        <label for="status">STATUS</label>
        <select className='form-control' name="status" value={formData.status} onChange={getData} id="">
          <option value="">Select Status</option>
          <option value={true}>active</option>
          <option value={false}>Inactive</option>
        </select>
        <button type='submit' >CREATE</button>
      </form>
    </>
  )
}
export default CreateCategory