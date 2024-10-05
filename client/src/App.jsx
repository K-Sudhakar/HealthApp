import React, { useState,useContext  } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddHealthRecord from "./components/AddHealthRecord";
import RecordModal from "./components/RecordModal";
import { KJUR, b64utoutf8 } from 'jsrsasign';
import { UserContext,UserProvider } from './context/UserContext';

const App = () => {
    const { user, setUser } = useContext(UserContext); // To store user info after login
 const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
const refreshRecords = () => {
        // Logic to refresh the records, e.g., fetching from an API
        console.log("Records refreshed");
    };

const handleCloseModal = () => {
        setModalOpen(false);
    };

     const handleLoginSuccess = async (credentialResponse) => {
console.log(credentialResponse);
setUser({name:credentialResponse.credential});

 try {
                // Decode the JWT token to get user info
              const decoded = KJUR.jws.JWS.parse(credentialResponse.credential);
                console.log('Decoded JWT:', decoded);

                setUser({ ...decoded.payloadObj });
            } catch (error) {
                console.error('Error decoding JWT:', error);
            }
    };

    const handleLoginFailure = () => {
        console.log('Login Failed'); // For error handling
    };

    const handleLogout = () => {
        setUser(null); // Clear user info
        console.log('User logged out');
    };

    return (
<UserProvider> 
        <GoogleOAuthProvider clientId="67842117185-4o04uemq2l697f6qm5dr534tj0vv7rh8.apps.googleusercontent.com">
            <div>
                {user ? (
                    <>
                        <p>Welcome, {user.name}</p>
                        <img src={user.picture} alt="Profile" />
                        <button onClick={handleLogout}>Logout</button>
 <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddHealthRecord  sample={"test"}
                onClose={handleCloseModal}
                selectedRecord={selectedRecord}
                refreshRecords={refreshRecords} userId={true} />}  />
        <Route path="/record/:id" element={<RecordModal />} />
      </Routes>
    </Router>
 {console.log('User passed to AddHealthRecord:', user.sub)} {/* Log user.sub */}
                    </>
                ) : (
                    <div>
                        <h1>Please Log In</h1>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                        />
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
</UserProvider>
    );
};

export default App;
