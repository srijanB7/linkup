import { useContext } from "react";
import { NavBar } from "../components/NavBar/NavBar"
import { Post } from "../components/Post/Post";
import { PostContext } from "../context/PostContext"

export const Explore = () => {
    const { posts } = useContext(PostContext);
    return (
    <>
        <NavBar/>
        <div className="explore-posts">
            <h1>Explore</h1>
            {
                posts?.map(post => <Post key={post?._id} {...post}/>)
            }
        </div>
    </>
  )
}
