import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const { setCurrUser } = useContext(AuthContext);
    
    const getUsers = async () => {
        try {
            const res = await fetch("/api/users");
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setUsers(data.users);
            }
            if (res.status === 400) {
                console.log("no users found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getUser = async (id) => {
        try {
            const res = await fetch(`/api/users/${id}`);
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setUser(data.user);
            }
            if (res.status === 400) {
                console.log("no user found");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const followUser = async (id) => {
        const encodedToken = localStorage.getItem("token");
        try {
            const res = await fetch(`/api/users/follow/${id}`, {
                method: "POST",
                headers: { authorization: encodedToken },
            });
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setUser(data?.followUser);
                setCurrUser(data?.user);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const unfollowUser = async (id) => {
        const encodedToken = localStorage.getItem("token");

        try {
            const res = await fetch(`/api/users/unfollow/${id}`, {
                method: "POST",
                headers: { authorization: encodedToken },
            });
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                setUser(data?.followUser);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const editUser = async (userdetails) => {
        const encodedToken = localStorage.getItem("token");
        const userdata = {
            userData: userdetails
        }
        try {
            const res = await fetch("/api/users/edit", {
                method: "POST",
                headers: { authorization: encodedToken},
                body: JSON.stringify(userdata)
            })
            if(res.status === 200 || res.status === 201) {
                const data = await res.json();
                setUser(data.user);
                setCurrUser(data.user);
                setUsers(prev => prev.map(user => {
                    if(user?.username === data.user.username)
                        return data.user;
                    return user;
                }))
            }
        }   catch(err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getUsers();
        setCurrUser(JSON.parse(localStorage.getItem("user")))
    }, []);

    return (
        <UserContext.Provider
            value={{ users, getUser, user, followUser, unfollowUser, editUser }}
        >
            {children}
        </UserContext.Provider>
    );
};
