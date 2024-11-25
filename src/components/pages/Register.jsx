import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { emailVerification, registerUser } from '../../redux/user/UserSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const { registerUserInfo, isSuccess } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const getData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (registerUserInfo && isSuccess) {
      navigate("/verification")
    }
  }, [registerUserInfo, isSuccess])
  const handleRegister = (e) => {
    e.preventDefault()
  dispatch(emailVerification())
    dispatch(registerUser(formData))
  }
  return (
    <>
      <div>
        <div className="background ">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form className='form' style={{
          height: "560px",
          width: " 400px",
        }} onSubmit={handleRegister}>
          <h3>Register Here</h3>
          <label htmlFor="username">Username</label>
          <input type="text" placeholder="Name" id="username" name="name" onChange={getData} required />
          <label htmlFor="username">Email</label>
          <input type="text" placeholder="Email" id="email" name='email' onChange={getData} required />
          <label htmlFor="password">Password</label>
          <input type="password" placeholder="Password" id="password" name='password' onChange={getData} required />
          <button>REGISTER</button>
        </form>
      </div>
    </>
  )
}

export default Register