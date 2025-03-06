import { useState } from "react";
import market from "../assets/market.avif";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            console.log("Login successful", data);
            // Handle successful login (e.g., save token, redirect user)
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div
            className="flex justify-center items-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${market})` }}
        >
            <div className="bg-blue-600 p-8 rounded-lg shadow-md w-96 text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">UniTradeHub Login</h2>
                {error && <p className="text-red-300 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded mt-1 bg-white text-black"
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
                                className="w-full p-2 border bg-white rounded mt-1 "
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
                <div className="mt-4 text-center">
                    <a href="/signup" className="text-white hover:underline">Sign up</a>
                    <span className="mx-2">|</span>
                    <a href="/forgot-password" className="text-white hover:underline">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
