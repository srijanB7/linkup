import { useContext, useEffect } from "react"
import { NavBar } from "../components/NavBar/NavBar"
import { PostContext } from "../context/PostContext"
import { Post } from "../components/Post/Post";
import "../App.css";
export const Bookmarks = () => {
  const { bookMarks, getBookMarks } = useContext(PostContext);
    
    useEffect(( ) => {
        getBookMarks();
    }, [])
    //console.log(bookMarks)
    return (
    <>
        <NavBar />
        <div className="bookmarks-container">
            <h2 className="bookmark-header">Bookmarks</h2>
            {
                bookMarks?.length > 0 ? 
                bookMarks?.map(post => <Post key={post._id} {...post}/>)
                : <p className="no-bookmark-msg">No Bookmarks</p>
            }
        </div>
    </>
  )
}
