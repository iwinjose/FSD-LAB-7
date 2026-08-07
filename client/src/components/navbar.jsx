import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="fixed w-full top-0 z-50 transition-all duration-300 glass-nav" id="navbar">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <nav className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-2 group">
                            <span className="font-heading font-bold text-2xl text-slate-800 tracking-tight">
                                Turf <span className="text-primary">Arena</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="font-medium text-slate-600 hover:text-primary transition-colors">Home</Link>
                        <Link to="/admin" className="font-medium text-primary hover:text-primary-dark transition-colors">Admin</Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login" className="font-heading font-semibold text-slate-600 hover:text-primary transition-colors">Login</Link>
                        <Link to="/register" className="bg-slate-800 text-white px-6 py-2.5 rounded-full font-heading font-semibold hover:bg-slate-700 transition-colors shadow-md hover:-translate-y-0.5">Register</Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-primary focus:outline-none p-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-slate-100 shadow-xl transition-all duration-300">
                    <div className="px-6 py-6 space-y-4 flex flex-col items-center">
                        <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-slate-800 hover:text-primary">Home</Link>
                        <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-medium text-primary hover:text-primary-dark">Admin</Link>
                        <hr className="w-full border-slate-200" />
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-heading font-semibold text-primary">Login to Account</Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;