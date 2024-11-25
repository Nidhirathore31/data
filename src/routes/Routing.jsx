import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './../components/pages/Login';
import Register from './../components/pages/Register';
import NavBar from '../components/NavBar';
import { useSelector } from 'react-redux';
import LayOut from './LayOut';
import EmailVerification from './../components/pages/EmailVerification';


const Routing = () => {
  const { userToken } = useSelector((state) => state.user)
  
  return (
    <>
      {!userToken ? (
        <>
          <NavBar />
         
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/verification' element={<EmailVerification/>}></Route>
          </Routes>
         
        </>
      ) : <LayOut />}
    </>
  )
}

export default Routing