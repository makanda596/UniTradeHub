import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const Emailverification = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState({ text: '', type: '' });
    const { email } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem("email");
        if (!email && storedEmail) {
            useAuthStore.setState({ email: storedEmail });
        }

        if (!storedEmail) {
            setMessage({
                text: 'No email associated with this verification attempt',
                type: 'error'
            });
        }
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!code) {
            setMessage({ text: 'Please enter verification code', type: 'error' });
            return;
        }

        setIsLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const response = await axios.post('https://gessamusystem.onrender.com/auth/verifyEmail', { code });
            if (response.status >= 200 && response.status < 300) {
                setMessage({
                    text: 'Email verified successfully! Redirecting to login...',
                    type: 'success',
                });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setMessage({
                    text: 'Verification failed due to an unexpected server response.',
                    type: 'error',
                });
            }
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || 'Verification failed. Please try again.',
                type: 'error',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendEmail = async () => {
        setIsResending(true);
        setResendMessage({ text: '', type: '' });

        try {
            const response = await axios.post('https://gessamusystem.onrender.com/auth/resendcode', { email });
            if (response.status >= 200 && response.status < 300) {
                setResendMessage({ text: 'Verification email resent successfully!', type: 'success' });
            } else {
                setResendMessage({ text: 'Failed to resend verification email due to an unexpected server response.', type: 'error' });
            }
        } catch (error) {
            setResendMessage({
                text: error.response?.data?.message || 'Failed to resend verification email. Please try again.',
                type: 'error',
            });
        } finally {
            setIsResending(false);
            setTimeout(() => {
                setResendMessage({ text: '', type: '' });
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                        Verify your email {email}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the verification code sent to your email address. If you didn't see your email please check your spam or promotion folder.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="code" className="sr-only">
                                Verification Code
                            </label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Verification Code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            {isLoading ? (
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : null}
                            Verify Email
                        </button>
                    </div>
                </form>
                {message.text && (
                    <div
                        className={`mt-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                    >
                        {message.text}
                    </div>
                )}
                <a href='/' className="bg-blue-400 text-white p-4" >login</a>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        Didn't receive the code?{' '}
                        <button
                            type="button"
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                            onClick={handleResendEmail}
                            disabled={isResending}
                        >
                            {isResending ? 'Resending...' : 'Resend email'}
                        </button>
                    </p>
                    {resendMessage.text && (
                        <div
                            className={`mt-2 p-2 rounded-md text-center text-sm ${resendMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {resendMessage.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Emailverification;