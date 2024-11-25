import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserNav = () => {
    const navigate = useNavigate()
    const handleLogOut = () => {
        localStorage.clear()
        navigate("/login")
        window.location.reload()
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mt-3 p-3" >
                <div className="container-fluid" >
                    <Link to="/" className="navbar-brand d-flex align-items-center">
                        <h2 className="m-0">USER</h2>
                    </Link>
                    <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link ms-3 fs-5" aria-current="page" to="/userlist">
                                USERLIST
                            </Link>
                            <Link className="nav-link fs-5" to='/productlist'>
                                PRODUCTS
                            </Link>
                            <Link className="nav-link fs-5" to='/categorylist'>
                                CATEGORY
                            </Link>
                            <Link className="nav-link fs-5" to='' onClick={handleLogOut}>
                                LOGOUT
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default UserNav