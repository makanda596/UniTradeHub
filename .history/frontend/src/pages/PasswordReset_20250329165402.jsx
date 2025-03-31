// ResetPassword.js
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/auth/reset-password/${token}`, { password });
            console.log(password)
            setMessage('Password updated successfully!');
        } catch (error) {  
            setMessage(error.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ResetPassword;