/*Navbar using Bootswatch CSS */
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/UserSlice";

const Navbar = ({title = "Contact Management System"}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = (e) => {
        e.preventDefault();
        dispatch(logout(navigate));
    };
    useEffect(() => {}, [dispatch]);
    const { userAuth } = useSelector((state) => state);
    const { userLoggedIn } = useSelector((state) => state.userAuth);
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            
            <div className="container-fluid">
                <Link to="/">
                    <button className="btn btn-primary ">{title}</button>
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarColor01">
                
                    <ul className="navbar-nav ms-auto">
                    
                        {!userLoggedIn && (
                            <li className="nav-item">
                                
                                <Link to="/login">
                                    <button className="btn btn-primary " >Login</button>
                                </Link>
                            </li> )}
                            {!userLoggedIn && (
                            <li className="nav-item">
                                <Link to = "/register">
                                    <button className="btn btn-primary ">Register</button>
                                </Link>
                            </li>)}
                            {userLoggedIn && 
                            userLoggedIn.userFound.role === "admin" && 
                            (
                                <li className="nav-item">
                                    <Link  className="btn btn-primary mx-2" to = "/allusers">
                                        Users List
                                    </Link>
                                </li>
                            )}
                            {userLoggedIn && (
                                <li className="nav-item">
                                    <Link  className="btn btn-primary mx-2" to = "/allcontacts">
                                        Contact List
                                    </Link>
                                </li>
                            )}
                            {userLoggedIn && (
                                <li className="nav-item">
                                    <Link className="btn btn-primary mx-2" to = "/create">
                                        Create
                                    </Link>
                                </li>
                            )}
                            {userLoggedIn && (
                                <li className="nav-item" onClick={logoutHandler}>
                                    <button  className="btn btn-warning">Logout</button>
                                </li>
                            )}
                    </ul>
                    <span style={{color: "white", fontWeight: "bold"}}  className = "mx-5">{userAuth?.userLoggedIn?.userFound?` Hi ${userAuth?.userLoggedIn?.userFound.name}`
                : "" }</span>
                </div>
            </div>
        </nav>
        
    );
};

export default Navbar;