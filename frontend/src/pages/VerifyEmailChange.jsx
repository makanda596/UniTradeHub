import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const VerifyEmailChange = ({ id }) => {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [expiryTime, setExpiryTime] = useState(null);
    const [timeLeft, setTimeLeft] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem("changedemail");
        if (storedEmail) setEmail(storedEmail);

        const savedExpiry = localStorage.getItem("verification_expiry");
        if (savedExpiry) {
            setExpiryTime(new Date(savedExpiry));
        } else {
            const newExpiry = new Date(Date.now() + 15 * 60 * 1000);
            setExpiryTime(newExpiry);
            localStorage.setItem("verification_expiry", newExpiry);
        }
    }, []);

    // Countdown timer logic
    useEffect(() => {
        if (!expiryTime) return;

        const interval = setInterval(() => {
            const now = new Date();
            const difference = expiryTime - now;

            if (difference <= 0) {
                setTimeLeft("Expired");
                clearInterval(interval);
            } else {
                const minutes = Math.floor(difference / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [expiryTime]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!code.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Missing Code",
                text: "Please enter the verification code.",
            });
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/verifyemailchange/${id}`,
                { code },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            await Swal.fire({
                icon: "success",
                title: "Verified",
                text: response.data.message || "Email verified successfully.",
                timer: 2000,
                showConfirmButton: false,
            });

            localStorage.removeItem("changedemail");
            localStorage.removeItem("verification_expiry");
            navigate("/settings");
        } catch (err) {
            setError("Invalid verification or code expired");
            Swal.fire({
                icon: "error",
                title: "Verification Failed",
                text: err.response?.data?.message || "Something went wrong.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            setResending(true);
            const token = localStorage.getItem("token");

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/resendChangecode/${id}`,
                { email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const newExpiry = new Date(Date.now() + 15 * 60 * 1000);
            setExpiryTime(newExpiry);
            localStorage.setItem("verification_expiry", newExpiry);

            Swal.fire({
                icon: "success",
                title: "Code Resent",
                text: response.data.message || "New code sent to your email.",
            });
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Resend Failed",
                text: err.response?.data?.message || "Unable to resend code.",
            });
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center">Verify Your New Email</h2>
            <p className="mb-2 text-center">
                A verification code was sent to <strong>{email}</strong>.
            </p>
            <p className="mb-6 text-center text-sm text-gray-600">
                Code expires in: <span className="font-semibold">{timeLeft}</span>
            </p>
            {error && <p className="text-red-600 text-center mb-2">{error}</p>}

            <form onSubmit={handleVerify} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter verification code"
                    className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={loading}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify Code"}
                </button>

                <button
                    type="button"
                    onClick={handleResend}
                    className="w-full bg-gray-100 text-blue-600 py-2 rounded-lg hover:underline"
                    disabled={resending}
                >
                    {resending ? "Resending..." : "Resend Code"}
                </button>
            </form>
        </div>
    );
};

export default VerifyEmailChange;
