import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { categoryUpdate } from '../../redux/category/CategorySlice'

const UpdateCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    status: false
  })
  const { id } = useParams()
  const { allCategory } = useSelector((state) => state.category)
  const user = allCategory.find((user) => user._id == id)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, status: user.status })
    }
  }, [user])
  const getData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(categoryUpdate({ id: user._id, ...formData }))
    navigate('/categorylist')
  }
  return (
    <>
      <form className='d-flex flex-column  justify-content-center align-items-center form'
        onSubmit={handleUpdate} >
        <input
          type='text'
          name='name'
          value={formData.name}
          className="form-control m-1"
          onChange={getData}
          required
        />
        <select name="status" id="" value={formData.status} onChange={getData} className='form-control'>
          <option value="">Select Status</option>
          <option value={true}>active</option>
          <option value={false}>Inactive</option>
        </select>
        <button type='submit' className="btn btn-success m-1">Save</button>
        <Link to='/categorylist'><button className='btn' style={{ color: "white" }} >BACK</button></Link>
      </form>
    </>
  )
}
export default UpdateCategory




