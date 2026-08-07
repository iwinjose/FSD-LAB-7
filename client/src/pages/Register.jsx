import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
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

        if (!formData.name.trim()) {
            newErrors.name = 'Full Name is required';
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
            isValid = false;
        }

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
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        console.log("Registration submitted:", formData);
        setMessage("Registering your account...");

        try {
            const response = await fetch('http://localhost:5000/api/register', {
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
                    setMessage("Registration successful! Redirecting to login...");
                    setTimeout(() => navigate('/login'), 1500);
                } else {
                    setMessage(data.message || "Registration failed");
                }
            } else {
                setMessage(`Server error: ${response.status} ${response.statusText}. Please restart the node server.js!`);
            }
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("An error occurred during registration. Is the backend running?");
        }
    };

    return (
        <main className="flex-grow pt-24 pb-12 flex flex-col items-center justify-center relative overflow-hidden min-h-screen">
            <div className="fixed inset-0 z-0">
                <img src="/images/hero_turf.png" alt="Turf Background" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm"></div>
            </div>

            <div className="w-full max-w-md px-6 relative z-10 flex flex-col md:flex-row gap-8 items-start justify-center">
                <section className="w-full max-w-md">
                    <div className="bg-white/90 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                        <div className="text-center mb-6">
                            <h2 className="font-heading text-3xl font-bold text-slate-800 mb-2">Create Account</h2>
                            <p className="text-slate-500">Join Turf Arena today</p>
                        </div>

                        {message && (
                            <div className="mb-4 p-3 rounded bg-emerald-100 text-emerald-700 text-sm text-center font-medium">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="form-group relative">
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`input-field bg-white/70 ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder="John Doe"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div className="form-group relative">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`input-field bg-white/70 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                    placeholder="john@example.com"
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
                                    placeholder="••••••••"
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>

                            <button type="submit" className="btn-primary w-full py-3.5 mt-4 shadow-md flex justify-center items-center gap-2 text-lg">
                                <span>Register</span>
                            </button>

                            <div className="text-center mt-4 text-sm">
                                <span className="text-slate-500">Already have an account?</span>
                                <Link to="/login" className="text-primary font-semibold hover:text-primary-dark transition-colors ml-1">Sign in</Link>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Register;