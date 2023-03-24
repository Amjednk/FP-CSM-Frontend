/*Users list page */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import { getAllUsers } from "../Redux/UserSlice";

//getting states
const UsersList = () => {
const dispatch = useDispatch();
const {allUsers} = useSelector((state) =>state.userAuth);
const { userAuth } = useSelector((state) => state);
const { loading } = useSelector((state) => state.userAuth);

useEffect(() => {
    dispatch(getAllUsers());
}, [dispatch]);

//displaying the list
return (
    <div>
        <h4>Users List</h4>
        <hr className="my-3" />
        {loading && <Spinner />}
        {!allUsers ? (
        <h4>No users found!</h4>
        ) : (
        <>
        <p>Total Users: <strong>{allUsers.length}</strong></p>
        <table className="table table-hover">
            <thead>
            <tr className="table table-dark">
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Blocked</th>
            </tr>
            </thead>
            <tbody>
            {userAuth?.userLoggedIn?.userFound? 
                allUsers?.map((el) => (
                    <tr
                    className="table-light"
                    key={el._id}
                    >
                    <th scope="row">{el.name}</th>
                    <td>{el.email}</td>
                    <td>{el.role}</td>
                    <td>{String(el.isBlocked)}</td>
                    </tr>
                ))
                : "Must Login to access users information! "}
            </tbody>
        </table>
        </>
        )}
    </div>
    );
};

export default UsersList;