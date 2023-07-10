import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarData } from "../data/AvatarData";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [currUser, setCurrUser] = useState(null);
    
    const loginHandler = async (userName, password) => {
        const userData = {
            username: userName,
            password,
        };
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify(userData),
            });

            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                // console.log(data);
                localStorage.setItem("token", data?.encodedToken);
                localStorage.setItem("user", JSON.stringify(data?.foundUser));
                setCurrUser(JSON.parse(localStorage.getItem("user")));
                navigate("/");
            }
            if (res.status === 400) {
                console.log("No user found. Please sign up");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const signUpHandler = async (
        email,
        username,
        firstName,
        lastName,
        password
    ) => {
        const userDetails = {
            email,
            password,
            username,
            firstName,
            lastName,
            avatarUrl: AvatarData[4].avatarUrl
        };
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(userDetails),
            });
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                //console.log(data)
                localStorage.setItem("token", data?.encodedToken);
                localStorage.setItem("user", JSON.stringify(data?.createdUser));
                setCurrUser(JSON.parse(localStorage.getItem("user")));
                navigate("/");
            }
            if (res.status === 400) {
                console.log("Sign Up failed. Try again");
            }
        } catch (e) {
            console.error(e);
        }
    };

    const singoutHandler = () => {
        localStorage.clear();
        setCurrUser(null);
        navigate("/login");
        window.location.reload(false);
        
    }

    return (
        <AuthContext.Provider
            value={{ loginHandler, signUpHandler, currUser, setCurrUser, singoutHandler, }}
        >
            {children}
        </AuthContext.Provider>
    );
};
