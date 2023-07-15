import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post/Post";
import { PostContext } from "../context/PostContext";

export const SinglePost = () => {
    const { id } = useParams();
    const { posts, getPosts } = useContext(PostContext);

    const post = posts?.find((post) => post._id === id);
   
    
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <div>
            <NavBar />
            <div className="single-post">{post && <Post {...post} />}</div>
        </div>
    );
};
