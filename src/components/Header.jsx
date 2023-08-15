import Logo from './Logo';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { clearToken } from '../rtk/AuthSlice';
import { Link } from 'react-router-dom'

export default function Header(){

    const isAuthenticated = useSelector((state) => state.auth.token); // Retrieve auth token
    const user = useSelector((state) => state.auth.user); // Retrieve user profile info
    const dispatch = useDispatch();
  
    const handleLogout = () => {
      dispatch(clearToken());
    };

    return (
        <header>
            <nav className="main-nav">
                <Logo/>
                <div>
                    {isAuthenticated ? (
                        <>
                            <Link className="main-nav-item" to="/account">
                                <i className="fa fa-user-circle"></i>
                                {user && <>{user.firstName}</>}
                            </Link>
                            <Link className="main-nav-item" onClick={handleLogout} to='/'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <Link className="main-nav-item" to="/login">
                            <i className="fa fa-user-circle"></i>
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>

    );
}