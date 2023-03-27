/*Edit contact page */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { editContact, getSingleContact } from "../Redux/ContactSlice";
import { FcCancel } from "react-icons/fc";
import { MdSaveAs } from "react-icons/md";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const EditContact = () => {
const { id } = useParams();
useEffect(() => {
    dispatch(getSingleContact(id));
});
const { singleContact } = useSelector((state) => state.contactsData);
const dispatch = useDispatch();
const navigate = useNavigate();

const [contactDetails, setContactDetails] = useState({
    name: singleContact?.name,
    address: singleContact?.address,
    email: singleContact?.email,
    phone: singleContact?.phone,
});

//Action on change
const handleChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
};
//Action on submit
const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editContact({ id, contactDetails, navigate, toast }));
};

return (
    <>
    <h2>Edit your contact</h2>

    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="nameInput" className="form-label mt-4">
            Name
        </label>
        <input
            defaultValue={singleContact?.name}
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
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
            defaultValue={singleContact?.address}
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
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
            defaultValue={singleContact?.email}
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
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
            defaultValue={singleContact?.phone}
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone"
            onChange={handleChange}
            placeholder="+216 12345678"
            required
        />
        </div>
        <Button title="Save" type="submit" variant="info" className="my-2">
            <MdSaveAs size={20} />
        </Button>
        <Link title="Cancel" className="btn btn-secondary mx-2" to={"/"}>
            <FcCancel size={20} />
        </Link>
    </form>
    </>
);
};
export default EditContact;
