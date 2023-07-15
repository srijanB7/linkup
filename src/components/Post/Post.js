import React, { useContext, useEffect, useState } from "react";
import "./Post.css";
import { UserContext } from "../../context/UserContext";
import { AiOutlineHeart, AiFillHeart, AiOutlineDelete } from "react-icons/ai";
import { RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { GoComment } from "react-icons/go";
import { Link } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import { Modal } from "@mui/material";

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
    padding: "1rem"
};

export const Post = ({ _id, username, content, createdAt, likes, mediaURL, fromBookMark }) => {
    const { users } = useContext(UserContext);
    const {
        likePost,
        dislikePost,
        addToBookMark,
        bookMarks,
        removeFrombookMark,
        deletePost,
        editPost
    } = useContext(PostContext);
    const user = users?.find((user) => user.username === username);
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const showDeleteAndEdit = loggedInUser?.username === user?.username;
    const [like, setLike] = useState(
        likes?.likedBy.some((user) => {
            return user.username === loggedInUser.username;
        }) ?? false
    );
    let isLiked = like;
    const [post, setPost] = useState(null);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [postContent, setPostContent] = useState(content)

    const isBookmarked = bookMarks?.some((post) => post._id === _id);

    function handleLike() {
        if (!like) {
            likePost(_id);
            isLiked = true;
            setLike(true);
        } else {
            setLike(false);
            isLiked = false;
            dislikePost(_id);
        }
    }

    function handleBookMark() {
        if (!isBookmarked) {
            addToBookMark(_id);
            
        } else {
            removeFrombookMark(_id);
        }

        
    }

    function handleEdit() {
        handleClose();
        const PostDetails = {
            content: postContent,
            comments: [],
            mediaUrl: "",
        };
        editPost(post?._id, PostDetails);
    }

    const getPost = async (id) => {
        try {
            const res = await fetch(`/api/posts/${id}`);
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setPost(data.post);
                
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getPost(_id);
    }, [like]);
    
    return (
        <div className="post-container">
            <div className="post-header">
                <img className="profilepage-image" src={user?.avatarUrl} />
                <Link
                    to={`/profile/${user?._id}`}
                    className="username-container"
                >
                    <p>
                        {user?.firstName} {user?.lastName}
                    </p>
                    <p>@{username}</p>
                </Link>
                <p className="date">{createdAt?.slice(0, 10)}</p>
                { !fromBookMark && showDeleteAndEdit && (
                    <div className="modify-btns">
                        <button className="delete-btn" onClick={() => deletePost(_id)}>Delete</button>
                        <button className="edit-btn" onClick={() => handleOpen()}>Edit</button>
                    </div>
                )}
                <Modal
                    open={open}
                    onClose={handleClose}
                    
                >
                    <div className="modal-container" style={style}>
                        <img
                            src={user?.avatarUrl}
                            className="profilepage-image"
                        />
                        <textarea className="edit-postarea" value={postContent} onChange={(e) => setPostContent(e.target.value)}>

                        </textarea>
                        <button className="editPost-btn" onClick={handleEdit}>Post</button>
                    </div>
                </Modal>
            </div>
            <div className="post-content">
                <Link className="link" to={`/post/${_id}`}>
                    <p>{content}</p>
                    {
                        mediaURL !== "" && <img src={mediaURL}/>
                    }
                </Link>
            </div>
            <div className="post-footer">
                <button className="post-btn" onClick={handleLike}>
                    {!isLiked ? (
                        <AiOutlineHeart size="20px" />
                    ) : (
                        <AiFillHeart size="20px" color="red" />
                    )}
                </button>
                <p>{post?.likes?.likeCount}</p>
                <button className="post-btn" onClick={handleBookMark}>
                    {!isBookmarked ? (
                        <RiBookmarkLine size="20px" />
                    ) : (
                        <RiBookmarkFill size="20px" color="black" />
                    )}
                </button>
                
            </div>
        </div>
    );
};
