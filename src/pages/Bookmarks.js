import { useContext, useEffect } from "react";
import { NavBar } from "../components/NavBar/NavBar";
import { PostContext } from "../context/PostContext";
import { Post } from "../components/Post/Post";
import "../App.css";
export const Bookmarks = () => {
    const { bookMarks, getBookMarks, posts } = useContext(PostContext);

    const displayBookMarks = bookMarks.map((item) =>
        [...posts].find(({ _id }) => _id === item?._id)
    );
   
    useEffect(() => {
        getBookMarks();
    }, []);
    
    return (
        <>
            <NavBar />
            <div className="bookmarks-container">
                <h2 className="bookmark-header">Bookmarks</h2>
                {displayBookMarks?.length > 0 ? (
                    displayBookMarks?.map((post) => (
                        <Post key={post?._id} {...post} fromBookMark />
                    ))
                ) : (
                    <p className="no-bookmark-msg">No Bookmarks</p>
                )}
            </div>
        </>
    );
};
