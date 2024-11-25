import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary mt-3 p-3" >
                <div className="container-fluid" >

                        <h2 className="m-0">USER</h2>
                    <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className="nav-link ms-3 fs-5" aria-current="page" to="/login">
                                LOGIN
                            </Link>
                            <Link className="nav-link fs-5" to='/spacecraft'>
                            </Link>
                            <Link className="nav-link fs-5" to='/register'>
                                REGISTER
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar