import { useState } from "react";
import market from "../assets/market.avif";

import { useAuthStore } from "../utilis/auth";

const Signup = () => {
    const { signup, error } = useAuthStore();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePassword = (password) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setConfirmPasswordError("");
        setLoading(true);

        if (!username || !email || !phoneNumber || !password || !confirmPassword || !gender) {
            error("Please fill in all required fields");
            setLoading(false);
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await signup(username, email, phoneNumber, password, gender);
            window.location.href ="/EmailVerification"
        } catch (error) {
            console.log(error.response ? error.response.data.message : 'Sign up failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background-image.jpg')" }}>
            {/* Main content container */}
            <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-md overflow-hidden">
                {/* Form container */}
                <div className="bg-white p-8 w-full md:w-1/2 text-blue-600">
                    <h2 className="text-xl font-bold mt-6 mb-4 text-center">UniTradeHub Signup</h2>
                    {error && <p className="text-red-300 text-center">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block">Username</label>
                            <input type="text" className="w-full px-2 py-1 border rounded mt-0 text-black" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block">Email</label>
                            <input type="email" className="w-full px-2 py-1 border rounded mt-0 text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block">Phone Number</label>
                            <input type="text" className="w-full px-2 py-1 border rounded mt-0 text-black" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                        </div>
                        <div className="mb-4">
                            <label className="block">Gender</label>
                            <select className="w-full px-2 py-1 border rounded mt-0 text-black" value={gender} onChange={(e) => setGender(e.target.value)} required>
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"} className="w-full px-2 py-1 border rounded mt-0 text-black" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-300" onClick={togglePasswordVisibility}>
                                    {showPassword ? "🙈" : "👁"}
                                </button>
                            </div>
                            {passwordError && <p className="text-red-300 text-sm">{passwordError}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block">Confirm Password</label>
                            <div className="relative">
                                <input type={showConfirmPassword ? "text" : "password"} className="w-full px-2 py-1 border rounded mt-01 text-black" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-300" onClick={toggleConfirmPasswordVisibility}>
                                    {showConfirmPassword ? "🙈" : "👁"}
                                </button>
                            </div>
                            {confirmPasswordError && <p className="text-red-300 text-sm">{confirmPasswordError}</p>}
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 py-2 rounded cursor-pointer flex justify-center items-center">
                            {loading ? <span className="loader border-2 border-t-2 border-white w-5 h-5 rounded-full animate-spin"></span> : "Signup"}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <a href="/" className="text-blue-600 hover:underline">Already have an account? Login</a>
                    </div>
                </div>
                
                {/* Image container - hidden on small screens, visible on medium and larger screens */}
                <div className="hidden md:block md:w-1/2 bg-cover bg-center">
                <img src={market} alt="" className="h-full"/>
                </div>
            </div>
        </div>
    );
};

export default Signup;