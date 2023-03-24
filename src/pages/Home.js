/*Home page */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = (props) => {
    const { userAuth } = useSelector((state) => state);
    const { userLoggedIn } = useSelector((state) => state.userAuth);
    return (
        <div className="jumbotron">
            <h4 className="display-4">{userAuth?.userLoggedIn?.userFound? `Welcome ${userAuth?.userLoggedIn?.userFound.name}`
            : "Welcome to the home page, please login!" }</h4>
            <p className="lead">This is the contact management system App.</p>
            <hr className="my-4"/>
            <p>Your space is private, only users with access rights can enter this page.
                You can create, display, update and delete your own personal or professional contact list</p>
            <div className="lead">
            {userLoggedIn? (
                        <section className="nav-item">
                            <Link to = "/allcontacts">
                                <button  className="btn btn-primary btn-lg mx-3" >Manage Contacts</button>
                            </Link>
                        </section>
                    ): (
                        <section className="nav-item">
                            <Link to = "/login">
                                <button  className="btn btn-primary btn-lg mx-3" >Login</button>
                            </Link>
                        </section>
                    )}
            </div>
        </div>
    
    )
    
};

export default Home;