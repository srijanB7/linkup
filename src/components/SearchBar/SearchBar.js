import { useContext, useState } from "react";
import "./SearchBar.css";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
export const SearchBar = () => {
    const { users } = useContext(UserContext);
    const [searchText, setSearchText] = useState("");
    let searchResults = users?.filter((user) => {
        const fullName = (user?.firstName + user?.lastName).toLowerCase();
        return fullName.includes(searchText);
    });
    if (searchText === "") searchResults = [];
    

    return (
        <>
            <div className="search-container">
                <h2>Search Users</h2>
                <input
                    type="text"
                    placeholder="search here"
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(e.target.value.toLowerCase())
                    }
                />
                <div className="search-results">
                    {searchResults?.length > 0 ? (
                        searchResults?.map((user) => (
                            <div key={user?._id} className="single-user">
                                <img
                                    src={user?.avatarUrl}
                                    className="search-user-image"
                                />
                                <Link
                                    className="link"
                                    to={`/profile/${user?._id}`}
                                >
                                    <p className="single-user-name">
                                        {user?.firstName} {user?.lastName}
                                    </p>
                                    <p className="single-user-username">
                                        @{user?.username}
                                    </p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        
                            searchText !== "" ?     
                            (<p>No Results</p>) : (<></>)
                        
                    )}
                </div>
            </div>
        </>
    );
};
