import React, { useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from "react-redux"
import { googleLogin,userLogin } from '../../redux/user/UserSlice';
import {  useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [data, setData] = useState({});
  const { isSuccess,userToken} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const getData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(userLogin(data))
    navigate('/userlist')
  }
  const handleSuccess = async (response) => {
    console.log(response, "response login")
    const userToken = {
      idToken: response.credential
    }
    dispatch(googleLogin(userToken))
  }

  const handleError = async () => {
    alert('something went worng!')
  }

// console.log(isSuccess, userToken, "token success")

  return (
    <>
    
      <div>
        <div className="background ">
          <div className="shape" />
          <div className="shape" />
        </div>
        <form onSubmit={handleSubmit} className='form'>
          <h3>Login Here</h3>
          <label for="username">Username</label>
          <input type="text" placeholder="Email or Phone" id="username" name="email" onChange={getData} required />
          <label for="password">Password</label>
          <input type="password" placeholder="Password" id="password" name='password' onChange={getData} required />
          <button type='submit' >Log In</button>
          <div className="social d-flex justify-content-center">
            <div className="go">
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login