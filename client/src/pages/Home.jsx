import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="flex-grow pt-20">
            {/* Hero Section */}
            <section id="home" className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/images/hero_turf.png" alt="Premium Artificial Turf at Night" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/95"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                        Elevate Your Game at <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-emerald-300 drop-shadow-lg">Turf Arena</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-200 mb-10 font-light max-w-2xl mx-auto drop-shadow-md">
                        Experience world-class artificial turf. Book your slot instantly and play under the floodlights.
                    </p>
                </div>
            </section>

            {/* Floating Updates Button */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 z-40 bg-white text-slate-800 px-6 py-3 rounded-full font-heading font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-primary/30 transition-all duration-300 flex items-center gap-2"
            >
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Updates
            </button>

            {/* Custom Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center transition-all duration-300">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-[90%] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent"></div>
                        <h3 className="font-heading text-2xl font-bold text-center text-slate-800 mb-3">Important Updates</h3>
                        <p className="text-center text-slate-500 mb-8 leading-relaxed">Currently, there are no new updates or tournament announcements. Check back later!</p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3.5 rounded-xl transition-all"
                        >
                            Got it, close
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Home;