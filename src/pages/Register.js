/*Register page */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../Redux/UserSlice";

const Register = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
});
//Action on change
const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
};
//Action on submit
const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ credentials, navigate, toast }));
};

//getting and submitting form data
return (
    <>
    <ToastContainer autoClose={1500} />
    <h3>Create an account</h3>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="nameInput" className="form-label mt-4">
            Your Name
        </label>
        <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={credentials.name}
            onChange={handleChange}
            placeholder="name"
            required
        />
        </div>
        <div className="form-group">
        <label htmlFor="emailInput" className="form-label mt-4">
            Email address
        </label>
        <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
        />
        </div>
        <div className="form-group">
        <label htmlFor="passwordInput" className="form-label mt-4">
            Password
        </label>
        <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
        />
        </div>
        <div className="form-group">
        <label for="confirmPassword" className="form-label mt-4">
            Confirm password
        </label>
        <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
        />
        </div>
        <input
        type="submit"
        value="Register"
        className="btn btn-primary my-3"
        />
        <p>
        <Link to="/login"> Already have an account? </Link>
        </p>
    </form>
    </>
);
};
export default Register;
