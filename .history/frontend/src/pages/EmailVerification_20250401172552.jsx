import React, { useState } from 'react';
import {  Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClockIcon, EnvelopeIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../utilis/auth';

const EmailVerification = () => {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate()
    const location = useLocation();
    const [email, setEmail]=useState()
    const [open ,setOpen] = useState(false)
    // Get email from location state or auth store
    const {SendAnotherCode} = useAuthStore()

    const AnotherCodehandle=()=>{
        SendAnotherCode()
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ text: '', type: '' });

        try {
             await axios.post('http://localhost:5000/auth/email-verification', {
                email,
                code
            });

            setMessage({
                text: 'Email verified successfully! Redirecting...',
                type: 'success'
            });

            setTimeout(() => navigate('/home'), 2000);
    
        } catch (error) {
            setMessage({ 
                text: error.response?.data?.message || 'Verification failed',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
           await axios.post('http://localhost:5000/auth/resendcode', { email });
            setMessage({
                text: 'New verification code sent!',
                type: 'success'
            });
            startCountdown();
        } catch (error) {
            setMessage({
                text: 'Failed to resend code. Please try again.',
                type: 'error'
            });
        }
    };

    const startCountdown = () => {
        setCanResend(false);
        setCountdown(60);

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    // Start countdown on component mount
    React.useEffect(() => {
        startCountdown();
    }, []);

    return (
        <div className="h-auto lg:min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <EnvelopeIcon className="mx-auto h-12 w-12 text-blue-600" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Verify Your Email
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We've sent a 4 verification code to your email .Please check on spam or promotion  folder
                    </p>
                </div>

                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                Verification Code
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    
                                    type="text"
                                   
                                    required
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="123456"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </div>
                    </form>

<button onClick={() =>{setOpen(true)}} >resend</button>
                    {/* <div className="mt-4 text-center text-sm">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={!canResend}
                            className={`font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center mx-auto ${!canResend ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <ArrowPathIcon className="h-4 w-4 mr-1" />
                            {canResend ? 'Resend Code' : `Resend in ${countdown}s`}
                        </button>
                    </div> */}

                    {open && <div className="fixed z-10">
                            <div>
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                   Resend Email
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                        placeholder="hello@gmail.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                onClick={AnotherCodehandle}
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                                        }`}
                                >
                                  {isLoading ? 'Sending...' : 'Send Code Again'}
                                </button>
                            </div>
                       
                        </div>}
                    {message.text && (
                        <div
                            className={`mt-4 p-3 rounded-md text-center text-sm ${message.type === 'success'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                        >
                            {message.text}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
                <p>
                    Didn't receive the email? Check your spam folder or{' '}
                    <button
                        onClick={handleResendCode}
                        disabled={!canResend}
                        className={`font-medium text-blue-600 hover:text-blue-500 ${!canResend ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        resend
                    </button>
                </p>
            </div>
        </div>
    );
};

export default EmailVerification;