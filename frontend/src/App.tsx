import React from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import HomePage from "./components/HomePage";

const App: React.FC = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>
        </>
    );
};

function Layout() {
    return (
        <>
            <nav
                className="w-full flex h-[10vh] justify-center items-center  bg-gray-300
            "
            >
                <ul className="flex gap-5">
                    <Link
                        to="/"
                        className="shadow-sm  bg-gray-50 shadow-gray-700 px-4 py-[2px] font-semibold rounded-2xl hover:text-gray-800"
                    >
                        Home
                    </Link>

                    <Link
                        to="Signup"
                        className="shadow-sm  bg-gray-50 shadow-gray-700 px-4 py-[2px] font-semibold rounded-2xl hover:text-gray-800"
                    >
                        Signup
                    </Link>

                    <Link
                        to="login"
                        className="shadow-sm  bg-gray-50 shadow-gray-700 px-4 font-semibold py-[2px] rounded-2xl hover:text-gray-800"
                    >
                        Login
                    </Link>
                </ul>
            </nav>

            <div style={{ height: "80vh" }}>
                <Outlet />
            </div>
        </>
    );
}

export default App;
