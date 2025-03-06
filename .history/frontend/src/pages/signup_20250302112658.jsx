import { useState } from "react";
import { useAuthStore } from "../utilis/auth";

const Signup = () => {
    const { signup, error } = useAuthStore();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        error("");

        if (!username || !email || !phoneNumber || !password || !gender) {
            error("Please fill in all required fields");
            return;
        }
        try {
            await signup(username, email, phoneNumber, password, gender);
        } catch (err) {
            console.log(err.response ? err.response.data.message : 'Sign up failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background-image.jpg')" }}>
            <div className="bg-blue-600 p-8 rounded-lg shadow-md w-96 text-white">
                <h2 className="text-2xl font-bold mb-6 text-center">UniTradeHub Signup</h2>
                {error && <p className="text-red-300 text-center">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block">Username</label>
                        <input type="text" className="w-full p-2 border rounded mt-1 text-black" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Email</label>
                        <input type="email" className="w-full p-2 border rounded mt-1 text-black" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Phone Number</label>
                        <input type="text" className="w-full p-2 border rounded mt-1 text-black" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Gender</label>
                        <select className="w-full p-2 border rounded mt-1 text-black" value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="w-full p-2 border rounded mt-1 text-black" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-300" onClick={togglePasswordVisibility}>
                                {showPassword ? "🙈" : "👁"}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-white text-blue-600 py-2 rounded hover:bg-gray-200">Signup</button>
                </form>
                <div className="mt-4 text-center">
                    <a href="/login" className="text-white hover:underline">Already have an account? Login</a>
                </div>
            </div>
        </div>
    );
};

export default Signup;
