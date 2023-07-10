import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const Signup = () => {
    const { signUpHandler } = useContext(AuthContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    function handleClick() {
        signUpHandler(email, password, userName, firstName, lastName);
    }
    return (
        <div className="signup-container">
            <h1>LinkUp</h1>
            <h2>Sign Up</h2>
            <div className="signup-main">
                <div className="firstname-container">
                    <label>First Name</label>
                    <input
                        type="text"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="lastname-container">
                    <label>Last Name</label>
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="username-container">
                    <label>User Name</label>
                    <input
                        type="text"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="signup-email-container">
                    <label>Email </label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="signup-password-container">
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="signup-btn-container">
                    <button onClick={handleClick}>Signup</button>
                </div>
            </div>
        </div>
    );
};
