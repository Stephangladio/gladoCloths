
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const success = login(email.trim(), password);

        if (success) {
            navigate("/profile");
        } else {
            setError("Invalid email or password. Please try again.");
        }
    }

    const inputClass =
        "w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black";

    return (
        <section className="min-h-[70vh] flex items-center justify-center px-6 py-12">
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold">Welcome Back</h1>
                    <p className="text-sm text-gray-500 mt-2">
                        Sign in to your GLADO account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

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
                            placeholder="Enter your password"
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
                        SIGN IN
                    </button>

                </form>

                <p className="text-sm text-center text-gray-500 mt-7">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-black underline">
                        Create Account
                    </Link>
                </p>

            </div>
        </section>
    );
}

export default Login;