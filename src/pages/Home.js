import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { UserContext } from "../context/UserContext";
import { SideBar } from "../components/SideBar/SideBar";
import "../App.css";
import { PostContext } from "../context/PostContext";
import { Post } from "../components/Post/Post";
import { AuthContext } from "../context/AuthContext";
import { SearchBar } from "../components/SearchBar/SearchBar";

export const Home = () => {
    const { getPosts, posts, newPost } = useContext(PostContext);
    const [post, setPost] = useState("");
    const { currUser } = useContext(AuthContext);
    function handleChange(event) {
        setPost(event.target.value);
    }

    const [sortBy, setSortBy] = useState(null);
    let showPosts = posts?.filter(
        (post) => post?.username === currUser?.username
    );

    showPosts = [
        ...showPosts,
        ...posts?.filter((post) =>
            currUser?.following.some((user) => user.username === post.username)
        ),
    ];

    if (sortBy === "date") {
        showPosts.sort((a, b) => {
            const aCreated = a.createdAt?.slice(0, 10);
            const bCreated = b.createdAt?.slice(0, 10);
            if (aCreated < bCreated) return 1;
            if (aCreated > bCreated) return -1;
            return 0;
        });
    }

    if (sortBy === "like") {
        showPosts.sort((a, b) => b.likes?.likeCount - a.likes?.likeCount);
    }

    //console.log(showPosts);
    function handlePostClick() {
        const newPostDetails = {
            content: post,
            comments: [],
            mediaUrl: "",
        };
        newPost(newPostDetails);
        setPost("");
    }

    function handleFilterByDate() {
        setSortBy("date");
    }

    function handleFilterByLike() {
        setSortBy("like");
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="home-container">
            <NavBar />
            <div className="home-body">
                <div className="home-feed">
                    <div className="new-post-container">
                        <img />
                        <textarea
                            placeholder="Whats happening?"
                            value={post}
                            onChange={handleChange}
                            className="new-post"
                        ></textarea>
                        <div className="new-post-footer">
                            <button
                                className="new-post-btn"
                                onClick={handlePostClick}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                    <div className="filter-btns">
                        <button onClick={handleFilterByDate}>
                            Filter By Latest
                        </button>
                        <button onClick={handleFilterByLike}>
                            Filter By Trending
                        </button>
                    </div>
                    {showPosts.length > 0 ? (
                        showPosts?.map((post) => (
                            <Post key={post.id} {...post} />
                        ))
                    ) : (
                        <p>Follow Someone to populate feed</p>
                    )}
                </div>
                <div className="side">
                    <SearchBar />
                    <SideBar />
                </div>
            </div>
        </div>
    );
};
