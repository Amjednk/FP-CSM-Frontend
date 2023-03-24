/*Login page */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../Redux/UserSlice";


const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email :"",
        password: "",

    });
    //Action on change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    };
    //Action on submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ credentials, navigate, toast }));
    };
        const { userLoggedIn, appErr } = useSelector((state) => state.userAuth);
        useEffect(() => {
            toast.error(appErr);
        }, [appErr]);

    return ( 
    //getting and submitting form data
    <>
    {!userLoggedIn? ( 
    <form onSubmit={handleSubmit}>
        <h3>LOGIN</h3>
        <div className="form-group">
            <label htmlFor="emailInput" className="form-label mt-4">Email address</label>
            <input type="email" className="form-control" id="emailInput" name="email" value = {credentials.email} 
                onChange={handleChange} placeholder="Enter email" required/>
        </div>
        <div className="form-group">
            <label htmlFor="passwordInput" className="form-label mt-4">Password</label>
            <input type="password" className="form-control" id="passwordInput" name="password"  value = {credentials.password} 
                onChange={handleChange} placeholder="Enter password" required/>
        </div>
        <input type="submit" value="Login" className="btn btn-primary my-3"/>
        <p>  <Link to="/register"> Don't have an account? </Link> </p>
    </form>
    ):<h3>You are already logged in!</h3>}
    </>
    );
};
export default Login;