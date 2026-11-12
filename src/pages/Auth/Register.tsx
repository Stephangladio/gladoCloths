
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const existingAccount = localStorage.getItem("glado-account");

        if (existingAccount) {
            try {
                const account = JSON.parse(existingAccount);

                if (account.email === email.trim()) {
                    setError("An account with this email already exists.");
                    return;
                }
            } catch (err) {
                console.warn("Corrupted account data found in storage. Resetting...", err);
                localStorage.removeItem("glado-account");
            }
        }

        register(fullName.trim(), email.trim(), password);
        navigate("/profile");
    }

    const inputClass =
        "w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black";

    return (
        <section className="min-h-[70vh] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold">
                        Create an Account
                    </h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Join GLADO and explore our collection.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(event) => setFullName(event.target.value)}
                            placeholder="Enter your full name"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Minimum 6 characters"
                            className={inputClass}
                            minLength={6}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            placeholder="Confirm your password"
                            className={inputClass}
                            required
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 text-sm font-semibold hover:bg-gray-800"
                    >
                        CREATE ACCOUNT
                    </button>

                </form>

                <p className="text-sm text-center text-gray-500 mt-7">
                    Already have an account?{" "}
                    <Link to="/login" className="text-black underline">
                        Sign In
                    </Link>
                </p>

            </div>
        </section>
    );
}

export default Register;