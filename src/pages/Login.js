import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
    const { loginHandler } = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");



    const handleLogin = () => {
        loginHandler(userName, password);
    };
    const handleGuestLogin = () => {
        setUserName("adarshbalika");
        setPassword("adarshBalika123");
        loginHandler("adarshbalika", "adarshBalika123");

    };

    return (
        <div className="login-container">
            <h1>Link Up</h1>
            <h2>Login</h2>
            <div className="login-main">
                <div className="email-container">
                    <label>UserName</label>
                    <input
                        type="text"
                        placeholder="example123"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div className="password-container">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="btn-container">
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleGuestLogin}>Guest Login</button>
                    <p>
                        Don't have and account?{" "}
                        <Link to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
