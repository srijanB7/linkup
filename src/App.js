import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { OtherUser } from "./pages/OtherUser";

import { SinglePost } from "./pages/SinglePost";
import { Bookmarks } from "./pages/Bookmarks";
import { Explore } from "./pages/Explore";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequiresAuth>
                            <Home />
                        </RequiresAuth>
                    }
                />
                <Route
                    path="/profile/:id"
                    element={
                        <RequiresAuth>
                            <OtherUser />
                        </RequiresAuth>
                    }
                />
                <Route
                    path="/post/:id"
                    element={
                        <RequiresAuth>
                            <SinglePost />
                        </RequiresAuth>
                    }
                />
                <Route 
                    path="/bookmarks"
                    element={
                        <RequiresAuth>
                            <Bookmarks />
                        </RequiresAuth>
                    }
                />
                <Route 
                    path="/explore"
                    element={
                        <RequiresAuth>
                            <Explore />
                        </RequiresAuth>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <CheckLogin>
                            <Login />
                        </CheckLogin>
                    }
                />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
}

function RequiresAuth({ children }) {
    const location = useLocation();
    const user = localStorage.getItem("user");
    return user ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} />
    );
}

function CheckLogin({ children }) {
    const location = useLocation();
    const user = localStorage.getItem("user");
    return user ? <Navigate to="/" state={{ from: location }} /> : children;
}

export default App;
