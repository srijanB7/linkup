import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { BiHome, BiSun, BiMoon, BiBookmark, BiLogOut } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { AuthContext } from "../../context/AuthContext";

export const NavBar = () => {
    const { currUser, singoutHandler } = useContext(AuthContext);
    const id = currUser?._id;
    function handleLogout() {
        singoutHandler();
    }

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <h1>LinkUp</h1>

                <div className="links">
                    <Link className="nav-link" to="/">
                        <BiHome size="30px" />
                    </Link>
                    <Link className="nav-link" to="/explore">
                        <MdOutlineExplore className="icons" size="30px" />
                    </Link>
                    <Link className="nav-link" to="/bookmarks">
                        <BiBookmark size="30px" />
                    </Link>
                    {/* <Link className="nav-link">
                        <BiSun size="30px" />
                    </Link>
                    <Link className="nav-link">
                        <BiMoon size="30px" />
                    </Link> */}
                    <Link to={`/profile/${id}`} className="nav-link">
                        <img
                            src={currUser?.avatarUrl}
                            className="navbar-image"
                        />
                    </Link>
                    <button className="logout-btn" onClick={handleLogout}>
                        <BiLogOut size="40px" />
                    </button>
                </div>
            </nav>
        </div>
    );
};
