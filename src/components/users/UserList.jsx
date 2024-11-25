import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, userDetails, userList } from '../../redux/user/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserList = () => {
  const { user, allUserData, isPending, userToken, isSuccess } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(isSuccess, userToken, "token success from userlist")



  useEffect(() => {
    dispatch(userList())
  }, [user])

  const handleDelete = (id) => {
    console.log(id, "user delete")

    toast.warn(
      <div>
        <p>Are you sure you want to delete this user?</p>
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-danger me-2 "
            style={{ minWidth: '120px' }}
            onClick={() => {
              dispatch(deleteUser(id));
              toast.dismiss();
              toast.success('User deleted successfully!');
            }}
          >
            Yes, Delete
          </button>
          <button className="btn btn-secondary "
            style={{ minWidth: '120px' }} onClick={() => toast.dismiss()}>
            Cancel
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        pauseOnHover: true,
        hideProgressBar: true,
      }
    );
  }
  const handleDetails = (id) => {
    navigate(`/userdetails/${id}`)
  }
  const handleUpdate = (id) => {
    navigate(`/userupdate/${id}`)
  }
  if (isPending) {
    return <p className='text-light'>LOADING.....</p>
  }
  return (
    <>
      <table className='table table-dark  table-bordered '>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>CHANGES</th>
          </tr>
        </thead>
        <tbody>
          {allUserData?.map((user, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className='d-flex justify-content-evenly '>
                  <button className='btn btn-info p-1' onClick={() => handleUpdate(user.id)}>UPDATE</button>
                  <button className='btn btn-danger' onClick={() => handleDelete(user.id)}>DELETE</button>
                  <button className='btn btn-warning' onClick={() => handleDetails(user.id)} >DETAILS</button>
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </>
  )
}
export default UserList