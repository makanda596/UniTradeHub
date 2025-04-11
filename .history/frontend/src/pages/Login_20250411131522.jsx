import { useState } from "react";
import market from "../assets/market.avif";
import {useAuthStore} from '../utilis/auth.js'
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {login,error} = useAuthStore()

    axios.defaults.withCredentials = true;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            error("Please fill in all fields");
            return;
        }
        try{
            await login(email, password)
            window.location.href = "/home";
            console.log(import.meta.env.VITE_BACKEND_URL);

        }catch(error){
            console.log(error.response ? error.response.data.message : 'Login failed');
        }
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${market})` }}
        >
            <div className="bg-blue-600 p-6 rounded-lg shadow-md w-84 text-white">
                <div className="flex ">
                    <img src={market} alt="" className="h-16 rounded-md w-16 object-cover"/>
                <h2 className="text-2xl font-bold mb-6 text-center">UniTradeHub Login</h2>
                </div>
                {error && <p className="text-red-600 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Email</label>
                        <input
                            type="email"
                            className="w-full py-1 px-2 border rounded mt-1 bg-white text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full py-1 px-2 border bg-white rounded mt-1 text-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-300"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-white text-blue-600 py-2 rounded hover:bg-gray-200"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center flex flex-col space-y-4">
                    <a href="/ForgotPassword" className="text-white underline">Forgot Password?</a>
                    <a href="/signup" className="text-black hover:underline">Dont Have an Account ? Sign up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
