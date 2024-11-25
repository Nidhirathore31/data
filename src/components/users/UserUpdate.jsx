import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../../redux/user/UserSlice'

const UserUpdate = () => {
  const { id } = useParams()
  const { allUserData } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const user = allUserData.find((user) => user.id == id)
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email })
    }
  }, [user])
  const getData = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    dispatch(updateUser({ id: user.id, formData }))
    navigate('/userlist')
  }
  return (
    <>
      <form className='d-flex flex-column  justify-content-center align-items-center form' onSubmit={handleUpdate} >
        <input
          type='text'
          name='name'
          className="form-control m-1"
          placeholder='Enter Your Name'
          value={formData.name}
          onChange={getData}
          required
        />
        <input
          type='text'
          name='email'
          className="form-control m-1"
          placeholder='Enter Your Email'
          value={formData.email}
          onChange={getData}
          required
        />
        <input
          type='text'
          name='password'
          className="form-control m-1"
          placeholder='Enter Your Password'
          value={formData.password}
          onChange={getData}
          required
        />
        <button type='submit' className="btn btn-success m-1">Save</button>
        <Link to='/userlist'><button className='btn' style={{ color: "white" }} >BACK</button></Link>
      </form>
    </>
  )
}

export default UserUpdate