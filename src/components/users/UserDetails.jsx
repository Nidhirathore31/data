import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { userDetails } from '../../redux/user/UserSlice';

const UserDetails = () => {
  const { id } = useParams();
  const { userInfo,isPending} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userDetails(id))
  }, [])
  if(isPending){
    return <p className='text-light'>PLEASE WAIT WHILE LOADING USERS....</p>
  }
  return (
    <>
      <div className="container card align-items-center justify-content-center m-5 form" style={{ color: "white" }} >
        <h1>DETAILS</h1>
        <p>NAME : {userInfo?.name}</p>
        <p>EMAIL : {userInfo?.email}</p>
        <p>CREATED : {userInfo?.createAt}</p>
        <p>UPDATED : {userInfo?.updateAt}</p>
        <Link to='/userlist'><button className='btn' style={{ color: "white" }} >BACK</button></Link>
      </div>
    </>
  )
}

export default UserDetails