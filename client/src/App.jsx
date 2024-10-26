import React, { useContext, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddHealthRecord from "./components/AddHealthRecord";
import RecordModal from "./components/RecordModal";
import { KJUR } from 'jsrsasign';
import { UserContext, UserProvider } from './context/UserContext';
import UserRegistration from './components/UserRegistration';
import logo from './assets/fitmi.png';

const App = () => {
    const { user, setUser } = useContext(UserContext);
    const [isRegistrationOpen, setRegistrationOpen] = useState(false); // State for the registration modal

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = KJUR.jws.JWS.parse(credentialResponse.credential);
            setUser({ ...decoded.payloadObj });
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    };

    const handleLoginFailure = () => {
        console.log('Login Failed');
    };

    const handleLogout = () => {
        setUser(null);
        console.log('User logged out');
    };

    const openRegistrationModal = () => {
        setRegistrationOpen(true);
    };

    const closeRegistrationModal = () => {
        setRegistrationOpen(false);
    };

    return (
        <UserProvider>
            <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="container mx-auto p-4">
                        {user ? (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <table className="w-full">
                                    <tr>
                                        <td>
                                            <div className="text-center">
                                                <img src={logo} alt="FitMi Logo" className="mx-auto h-16" />
                                                <h1 className="text-3xl font-bold text-gray-800 mt-2">Welcome, {user.name}</h1>
                                                <p className="text-gray-600 mt-1">Your health, tracked!</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={user.picture}
                                                    alt="Profile"
                                                    className="rounded-full h-24 w-24"
                                                />
                                                <button
                                                    onClick={handleLogout}
                                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300 mt-2"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <Router>
                                    <Routes>
                                        <Route path="/" element={<Dashboard userId={user.sub} />} />
                                        <Route path="/add" element={<AddHealthRecord />} />
                                        <Route path="/record/:id" element={<RecordModal />} />
                                    </Routes>
                                </Router>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">Please Log In</h2>
                                <img src={logo} alt="FitMi Logo" className="mx-auto h-20 mb-6" />
                                <p className="text-gray-600 text-center mb-6">Access your health metrics and stay fit!</p>
                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={handleLoginFailure}
                                    className="w-full"
                                />
                                <p className="mt-4">
                                    Don't have an account?
                                    <button onClick={openRegistrationModal} className="text-blue-600 hover:underline"> Register here</button>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </GoogleOAuthProvider>
            <UserRegistration isOpen={isRegistrationOpen} onClose={closeRegistrationModal} /> {/* Include the User Registration modal */}
        </UserProvider>
    );
};

export default App;
