import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode/dist/jwt-decode'; // Adjusted import

const App = () => {
    const [user, setUser] = useState(null); // To store user info after login

    const handleLoginSuccess = (credentialResponse) => {
        const decoded = jwt_decode(credentialResponse.credential); // Decode JWT token to get user info
        setUser(decoded); // Store user info in state
        console.log('Login Success:', decoded); // For debugging
    };

    const handleLoginFailure = () => {
        console.log('Login Failed'); // For error handling
    };

    const handleLogout = () => {
        setUser(null); // Clear user info
        console.log('User logged out');
    };

    return (
        <GoogleOAuthProvider clientId="67842117185-4o04uemq2l697f6qm5dr534tj0vv7rh8.apps.googleusercontent.com">
            <div>
                {user ? (
                    <>
                        <p>Welcome, {user.name}</p>
                        <button onClick={handleLogout}>Logout</button>
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
    );
};

export default App;
