import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: '' });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            newErrors.email = 'Email address must start with a letter and be valid';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        console.log("Login submitted:", formData);
        setMessage("Logging you in...");
        
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (response.ok) {
                    setMessage("Login successful! Redirecting...");
                    setTimeout(() => navigate('/'), 1000);
                } else {
                    setMessage(data.message || "Invalid credentials");
                }
            } else {
                setMessage(`Server error: ${response.status} ${response.statusText}. Did you restart the server?`);
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("An error occurred during login. Is the backend running?");
        }
    };

    return (
        <main className="flex-grow pt-20 flex items-center justify-center relative overflow-hidden min-h-screen">
            <div className="absolute inset-0 z-0">
                <img src="/images/hero_turf.png" alt="Turf Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
            </div>

            <section className="w-full max-w-md px-6 py-12 relative z-10">
                <div className="bg-white/90 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                    <div className="text-center mb-8">
                        <h2 className="font-heading text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
                        <p className="text-slate-500">Sign in to manage your turf bookings</p>
                    </div>

                    {message && (
                        <div className="mb-4 p-3 rounded bg-emerald-100 text-emerald-700 text-sm text-center font-medium">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="form-group relative">
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`input-field bg-white/70 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                placeholder="Enter your email"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="form-group relative">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`input-field bg-white/70 ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                placeholder="Enter your password"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <button type="submit" className="btn-primary w-full py-3.5 shadow-md flex justify-center items-center gap-2 text-lg mt-4">
                            <span>Sign In</span>
                        </button>

                        <div className="text-center mt-8 text-sm">
                            <span className="text-slate-500">Don't have an account?</span>
                            <Link to="/register" className="text-primary font-semibold hover:text-primary-dark transition-colors ml-1">Sign up</Link>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Login;