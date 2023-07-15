import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { NavBar } from "../components/NavBar/NavBar";
import { SideBar } from "../components/SideBar/SideBar";
import "../App.css";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import { Post } from "../components/Post/Post";
import { BiLogOut } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";
import { Modal } from "@mui/material";
import { AvatarData } from "../data/AvatarData";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "#fff",
    padding: "1rem",
};

export const OtherUser = () => {
    const { getPostsByUser, postsByUser, posts, getPosts } =
        useContext(PostContext);
    const { user, getUser, followUser, unfollowUser, editUser } = useContext(UserContext);
    const { singoutHandler, currUser } = useContext(AuthContext);
    const { id } = useParams();
    const { users } = useContext(UserContext);
    
    const currentUser = users.find((user) => user._id === id) ?? currUser;
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const following = user?.followers?.some(
        (user) => user?.username === loggedInUser?.username
    );
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [updatedAvatar, setUpdatedAvatar] = useState("");
    const [updatedBio, setUpdatedBio] = useState("");
    const [updatedWebsite, setUpdatedWebsite] = useState(user?.website);
    function handleFollow() {
        if (following) {
            unfollowUser(currentUser?._id);
            //setFollowing(false);
        } else {
            followUser(currentUser?._id);
            //setFollowing(true);
        }
    }

    function handleEdit() {
        const userdetails = {
            ...user, 
            bio: updatedBio,
            website: updatedWebsite,
            avatarUrl: updatedAvatar
        }
        editUser(userdetails);
        handleClose()
        setUpdatedAvatar("");
        setUpdatedBio("");
        setUpdatedWebsite("");
    }

    function handleLogout() {
        singoutHandler();
    }

    useEffect(() => {
        getUser(id);
        getPostsByUser(currentUser?.username);
        getPosts();
    }, [currentUser?.username]);

    const postsByCurrUser = posts?.filter(
        (post) => post?.username === currentUser?.username
    );
   //console.log(loggedInUser?.username, currentUser?.username)
    return (
        <div className="userprofile-container">
            <NavBar />
            <div className="userprofile-body">
                <div className="userprofile-feed">
                    <div className="userprofile-details">
                        <div className="userprofile-first">
                            <img
                                className="profilepage-image"
                                src={user?.avatarUrl}
                            />
                        </div>
                        <div className="userprofile-second">
                            <p>{`${user?.firstName} ${user?.lastName}`}</p>
                            <p>@{user?.username}</p>
                            <p>{user?.bio}</p>

                            <a href={user?.website} target="blank">
                                <p>website</p>
                            </a>
                            <div className="details">
                                <p>{user?.followers.length} Followers</p>
                                <p>{user?.following.length} Following</p>
                            </div>
                        </div>
                        <div className="userprofile-third">
                            {loggedInUser?.username !== currentUser?.username ? (
                                <button onClick={handleFollow}>
                                    {following ? "Unfollow" : "Follow"}
                                </button>
                            ) : (
                                <div className="loggedin-user-btns">
                                    <button onClick={handleOpen} className="edit-btn">
                                        Edit Profile
                                    </button>
                                    <button onClick={handleLogout} className="logout-btn">
                                        <BiLogOut size="20px"/>
                                    </button>
                                </div>
                            )}
                        </div>
                        <Modal open={open} onClose={handleClose}>
                            <div style={style}>
                                <h1>Edit Profile</h1>
                                <h3>Avatar</h3>
                                <div className="avatar-container">
                                    {AvatarData.map((data) => (
                                        <div key={data.id} onClick={() => setUpdatedAvatar(data.avatarUrl)}>
                                            <img
                                                src={data.avatarUrl}
                                                className="avatar-option"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p>
                                    Name: {user?.firstName} {user?.lastName}
                                </p>
                                <p>UserName: {user?.username}</p>
                                <div className="update-field">
                                    <label>Bio:</label>
                                    <input
                                        type="text"
                                        value={updatedBio}
                                        onChange={(e) =>
                                            setUpdatedBio(e.target.value)
                                        }
                                        placeholder={user?.bio}
                                    />
                                </div>
                                <div className="update-field">
                                    <label>Website:</label>
                                    <input
                                        type="text"
                                        value={updatedWebsite}
                                        onChange={(e) =>
                                            setUpdatedWebsite(e.target.value)
                                        }
                                        placeholder={user?.website}
                                    />
                                </div>
                                <button onClick={handleEdit}>Save</button>
                            </div>
                        </Modal>
                    </div>
                    <div className="user-posts">
                        {postsByCurrUser?.map((post) => (
                            <Post key={post._id} {...post} />
                        ))}
                    </div>
                </div>
                <div className="side">
                    <SideBar />
                </div>
            </div>
        </div>
    );
};
