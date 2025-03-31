import { useState } from "react";
import market from "../assets/market.avif";
import { useAuthStore } from '../utilis/auth.js';
import axios from 'axios';
import { EyeIcon, EyeSlashIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login, error } = useAuthStore();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            error("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            await login(email, password);
            window.location.href = '/home';
        } catch (error) {
            console.error(error.response ? error.response.data.message : 'Login failed');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {/* Left Side - Image */}
            <div className="hidden lg:block lg:w-1/2 h-screen">
                <img
                    src={market}
                    alt="Marketplace"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 p-8 space-y-8">
                <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Login to your UniTradeHub account</p>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center">
                            <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                            {error}
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                                        )}
                                    </button>
                                </div>
                                <div className="mt-2 text-right">
                                    <a
                                        href="/forgot-password"
                                        className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70' : ''}`}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRightIcon className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Don't have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <a
                                href="/signup"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Create new account
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;