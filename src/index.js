import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { makeServer } from "./server";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { PostProvider } from "./context/PostContext";

// Call make Server

makeServer();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserProvider>
                    <PostProvider>
                        <App />
                    </PostProvider>
                </UserProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
