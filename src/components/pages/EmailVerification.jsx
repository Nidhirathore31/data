import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { emailVerification, resetState } from '../../redux/user/UserSlice'

const EmailVerification = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { registerUserInfo, isSuccess, verificationMessage } = useSelector((state) => state.user)
  const data = {
    id: registerUserInfo?.id,
    emailVerificationTOken: registerUserInfo?.emailVerificationTOken
  }
  useEffect(() => {
    if (verificationMessage && isSuccess) {
      navigate("/login")
    }
  }, [isSuccess, verificationMessage])
  const handleVerification = (data) => {
    dispatch(emailVerification(data))
    dispatch(resetState())
  }
  return (
    <>
      <div className="container">
        <p className='text-danger'>Please verify your email!</p>
        <button className='btn btn-success' onClick={() => handleVerification(data)}>VERIFY</button>
      </div>
    </>
  )
}

export default EmailVerification