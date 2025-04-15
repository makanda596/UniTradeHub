import { useState } from 'react';
import axios from 'axios';
import { EnvelopeIcon, ArrowPathIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@') || !email.includes('.')) {
            setMessage({ text: 'Please enter a valid email address', type: 'error' });
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`, { email });
            setMessage({
                text: 'Password reset link sent to your email! Check your inbox (and spam folder).',
                type: 'success'
            });
            setSuccess(true);
        } catch (error) {
            const errorMsg = error.response?.data?.message ||
                error.message ||
                'Error sending reset link';
            setMessage({ text: errorMsg, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <EnvelopeIcon className="mx-auto h-12 w-12 text-blue-500" />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Forgot Your Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email and we'll send you a link to reset your password
                    </p>
                </div>

                {!success ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Message Display */}
                        {message.text && (
                            <div className={`rounded-md p-4 ${message.type === 'success' ? 'bg-green-50' : 'bg-red-50'}`}>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        {message.type === 'success' ? (
                                            <CheckCircleIcon className="h-5 w-5 text-green-400" />
                                        ) : (
                                            <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`}>
                                            {message.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                                        Sending...
                                    </span>
                                ) : 'Send Reset Link'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center">
                        <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Check Your Email</h3>
                        <p className="mt-2 text-sm text-gray-600">
                            We've sent password reset instructions to {email}
                        </p>
                        <p className="mt-2 text-sm text-gray-500">
                            Didn't receive the email? Check your spam folder or{' '}
                            <button
                                onClick={() => setSuccess(false)}
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                try again
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;