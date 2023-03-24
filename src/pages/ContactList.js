/*Contact list page */
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../components/Spinner";
import {
  deleteAllContacts,
  deleteContact,
  getAllContacts,
} from "../Redux/ContactSlice";
import {
  FcDeleteDatabase,
  FcDeleteRow,
  FcCancel,
} from "react-icons/fc";
import { MdCreateNewFolder, MdEditDocument } from "react-icons/md";

const ContactList = () => {
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { allContacts } = useSelector((state) => state.contactsData);
  console.log(allContacts);
  const { userAuth } = useSelector((state) => state);
  const { loading } = useSelector((state) => state.contactsData);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteContact(modalData._id));
    setShowModal(false);
  };

  const deleteAllHandler = (e) => {
    e.preventDefault();
    dispatch(deleteAllContacts());
  };
  const searchedContact = allContacts?.filter((el) =>
    el.name.trim().toLowerCase().includes(searchInput.trim().toLowerCase())
  );

  return (
    <>
      <div>
        <h4>Contact List</h4>
        <hr className="my-3" />
        {loading && <Spinner />}
        {!allContacts ? (
          <h4>No contacts found!</h4>
        ) : (
          <>
            <form className="d-flex">
              <input
                type="text"
                name="searchInput"
                id="searchInput"
                className="form-control my-2"
                placeholder="Contact Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
            <p>
              Total Contacts: <strong>{allContacts.length}</strong>
            </p>
            <table className="table table-hover">
              <thead>
                <tr className="table table-dark">
                  <th scope="col">Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                </tr>
              </thead>
              <tbody>
                {userAuth?.userLoggedIn?.userFound
                  ? searchedContact?.map((el) => (
                      <tr
                        className="table-light"
                        key={el._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(el);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{el.name}</th>
                        <td>{el.address}</td>
                        <td>{el.email}</td>
                        <td>{el.phone}</td>
                      </tr>
                    ))
                  : "Must Login to access contacts information! "}
              </tbody>
            </table>
          </>
        )}
        <Link title="Create Contact" className="mx-2" to={"/create"}>
          <MdCreateNewFolder size={50} />
        </Link>
        <Button
          title="Delete All Contacts"
          variant="warning"
          onClick={deleteAllHandler}
        >
          <FcDeleteDatabase size={20} />
        </Button>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            <strong>Name</strong>: {modalData.name}
          </p>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone</strong>: {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link
            title="Edit Contact"
            className="btn btn-info"
            to={`/edit/${modalData._id}`}
          >
            <MdEditDocument size={20} />
          </Link>
          <Button
            title="Delete Contact"
            variant="warning"
            onClick={deleteHandler}
          >
            <FcDeleteRow size={20} />
          </Button>
          <Button
            title="Cancel"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            <FcCancel size={20} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactList;
