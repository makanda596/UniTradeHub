import { useState } from "react";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        gender: "",
        profilepic: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.username || !formData.email || !formData.phoneNumber || !formData.password || !formData.gender) {
            setError("Please fill in all required fields");
            return;
        }

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            console.log("Signup successful", data);
            // Handle successful signup (e.g., redirect user)
        } catch (err) {
            setError(err.message);
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
                        <input type="text" name="username" className="w-full p-2 border rounded mt-1 text-black" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Email</label>
                        <input type="email" name="email" className="w-full p-2 border rounded mt-1 text-black" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Phone Number</label>
                        <input type="text" name="phoneNumber" className="w-full p-2 border rounded mt-1 text-black" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="block">Gender</label>
                        <select name="gender" className="w-full p-2 border rounded mt-1 text-black" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="password" className="w-full p-2 border rounded mt-1 text-black" value={formData.password} onChange={handleChange} required />
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
