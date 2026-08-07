import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-900 pt-20 pb-10 text-slate-300 mt-auto">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-slate-800 pb-16">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white shadow-glow transition-all duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="text-xl w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9.5l3-3 3 3m-6 5l3 3 3-3m-3-5v8" />
                                </svg>
                            </div>
                            <span className="font-heading font-bold text-2xl text-white tracking-tight">Turf<span className="text-primary">Arena</span></span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Your premium destination for booking high-quality sports turfs instantly. Play anytime, anywhere under the best facilities.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-2 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="text-xs text-primary group-hover:translate-x-1 transition-transform w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin" className="hover:text-primary transition-colors flex items-center gap-2 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="text-xs text-primary group-hover:translate-x-1 transition-transform w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    Admin Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-primary transition-colors flex items-center gap-2 group">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="text-xs text-primary group-hover:translate-x-1 transition-transform w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold text-white mb-6">Newsletter</h3>
                        <p className="text-slate-400 mb-4">Subscribe to get special offers and updates about tournaments.</p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Your email" 
                                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 w-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-white transition-all" 
                            />
                            <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-5 py-3 rounded-xl transition-colors shadow-glow">
                                Get Updates
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
                    <p>&copy; 2026 Turf Arena. All Rights Reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;