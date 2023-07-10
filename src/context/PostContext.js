import { createContext, useContext, useState } from "react";


export const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [postsByUser, setPostsByUser] = useState([]);
    const [bookMarks, setBookMarks] = useState([]);
    
    const getPosts = async () => {
        try {
            const res = await fetch("/api/posts");
            if (res.status === 200) {
                const data = await res.json();
                setPosts(data.posts);
            }
            if (res.status === 400) {
                console.log("no posts found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getPostsByUser = async (userName) => {
        try {
            const res = await fetch(`/api/posts/user/${userName}`);
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setPostsByUser(data.posts);
            }
            if (res.status === 400) {
                console.log("No posts found");
            }
        } catch (err) {
            console.log(err);
        }
    };
    const likePost = async (id) => {
        const encodedToken = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/posts/like/${id}`, {
                method: "POST",
                headers: { authorization: encodedToken },
            });
            //console.log(res);
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                //console.log(data.posts);
                setPosts(data.posts);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const dislikePost = async (id) => {
        const encodedToken = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/posts/dislike/${id}`, {
                method: "POST",
                headers: { authorization: encodedToken },
            });
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setPosts(data.posts);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const addToBookMark = async (postId) => {
        const encodedToken = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/bookmark/${postId}`, {
                method: "POST",
                headers: { authorization: encodedToken },
            });
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setBookMarks(data.bookmarks);
            }
            if (res.status === 400) {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getBookMarks = async () => {
        const encodedToken = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/bookmark`, {
                method: "GET",
                headers: { authorization: encodedToken },
            });
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                console.log(data);
                setBookMarks(data?.bookmarks);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removeFrombookMark = async (id) => {
        const encodedToken = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/remove-bookmark/${id}`, {
                method: "POST",
                headers: { authorization: encodedToken },
            });
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setBookMarks(data.bookmarks);
            }
            if (res.status === 400) {
                console.log(res);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const newPost = async (post) => {
        const encodedToken = localStorage.getItem("token");
        const postdata = {
            postData: post,
        }
        //console.log(postdata)
        try {
            const res = await fetch(`/api/posts`, {
                method: "POST",
                headers: { authorization: encodedToken },
                body: JSON.stringify(postdata),
            });
            if(res.status === 200 || res.status === 201) {
                const data = await res.json();
                console.log(data.posts);
                setPosts(data.posts);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const deletePost = async (id) => {
        const encodedToken = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: {authorization: encodedToken},
            })
            if(res.status === 200 || res.status === 201) {
                const data = await res.json();
                setPosts(data.posts);
            }
            if(res.status === 400) {
                console.log("failed")
            }
        }   catch(err) {
            console.error(err);
        }
    }

    const editPost = async(id, post) => {
        const encodedToken = localStorage.getItem("token");
        const postdata = {
            postData: post,
        }
        try {
            const res = await fetch(`/api/posts/edit/${id}`, {
                method: "POST",
                headers: {authorization: encodedToken},
                body: JSON.stringify(postdata),
            })
            if(res.status === 200 || res.status === 201) {
                const data = await res.json();
                setPosts(data.posts);
            }
        }   catch(err) {
            console.error(err);
        }
    }

    // if(reset) {
    //     setPosts([]);
    //     setBookMarks([]);
    //     setPostsByUser([]);
    //     //setReset(false)
    // }

    return (
        <PostContext.Provider
            value={{
                getPosts,
                posts,
                getPostsByUser,
                postsByUser,
                likePost,
                dislikePost,
                addToBookMark,
                bookMarks,
                removeFrombookMark,
                setBookMarks,
                newPost,
                deletePost,
                getBookMarks,
                editPost
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
