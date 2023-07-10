import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { AuthContext } from "../../context/AuthContext";
export const SideBar = () => {
    const { users, followUser } = useContext(UserContext);
    const { currUser, setCurrUser } = useContext(AuthContext);
    
    const unfollowedUsers = users?.filter(
        (user) =>
            !currUser?.following.some(
                (user1) => user1?.username === user?.username
            )
    ).filter(user => user?.username !== currUser?.username);
    //console.log(unfollowedUsers);
    return (
        <div className="sidebar-container">
            <h3>Suggested Users</h3>
            <div className="users">
                {unfollowedUsers.map((user) => (
                    <div key={user?._id} className="user-container">
                        <Link className="user" to={`/profile/${user?._id}`}>
                            <img
                                src={user.avatarUrl}
                                className="profile-image"
                            />
                            <p>{`${user?.firstName} ${user?.lastName}`}</p>
                        </Link>
                        <button onClick={() => followUser(user?._id)}>
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
