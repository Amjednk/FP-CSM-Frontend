/*Create contact page */

import { useState } from "react";
import { useDispatch } from "react-redux";
import {Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { create } from "../Redux/ContactSlice";

const CreateContact = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [contactDetails, setContactDetails] = useState ({
        name: "",
        address: "",
        email: "",
        phone: "",
    });
    //Action on change
    const handleChange = (e) => {
        const {name, value} = e.target;
        setContactDetails({...contactDetails, [name]: value});
    };
    //Action on submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(create({ contactDetails, navigate, toast }));
    };

    return (
        
        <>
        
        <h2>Create your contact</h2>
        
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="nameInput" className="form-label mt-4">
                Name
            </label>
            <input
                type="text"
                className="form-control"
                id="nameInput"
                name="name"
                value={contactDetails.name}
                onChange={handleChange}
                placeholder="name"
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="addressInput" className="form-label mt-4">
                Address
            </label>
            <input
                type="text"
                className="form-control"
                id="addressInput"
                name="address"
                value={contactDetails.address}
                onChange={handleChange}
                placeholder="address"
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="emailInput" className="form-label mt-4">
                Email
            </label>
            <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={contactDetails.email}
                onChange={handleChange}
                placeholder="email"
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="phoneInput" className="form-label mt-4">
                Phone Number
            </label>
            <input
                type="integer"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={contactDetails.phone}
                onChange={handleChange}
                placeholder="+216 12345678"
                required
            />
            </div>
            <input type="submit" value="Add Contact" className="btn btn-info my-2"/>
            <Link className="btn btn-secondary mx-2"  to={"/"}>
                Cancel
            </Link>
        </form>
        </>
    );
};
export default CreateContact;