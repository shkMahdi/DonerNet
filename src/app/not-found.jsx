"use client";

import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-[480px] text-center">

                {/* Logo */}
                <Link href="/" className="inline-flex items-center justify-center gap-2.5 font-bold text-xl uppercase tracking-wide text-[#E8E6E3] mb-12">
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="14" y1="14" x2="4" y2="6" stroke="#5B6270" strokeWidth="1.1" />
                        <line x1="14" y1="14" x2="24" y2="7" stroke="#5B6270" strokeWidth="1.1" />
                        <line x1="14" y1="14" x2="22" y2="23" stroke="#5B6270" strokeWidth="1.1" />
                        <circle cx="4" cy="6" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                        <circle cx="24" cy="7" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                        <circle cx="22" cy="23" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                        <path d="M14 4C14 4 7.5 12 7.5 16C7.5 19.5 10.5 22 14 22C17.5 22 20.5 19.5 20.5 16C20.5 12 14 4 14 4Z" fill="#E63946" />
                    </svg>
                    DonorNet
                </Link>

                {/* Pulse line with break */}
                <div className="w-full h-9 mb-6">
                    <svg viewBox="0 0 400 36" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
                        <path
                            d="M0,18 L130,18 L150,18 L162,4 L178,32 L192,10 L206,18 L230,18"
                            fill="none"
                            stroke="#262B32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M260,18 L290,18 L302,4 L318,32 L332,10 L346,18 L400,18"
                            fill="none"
                            stroke="#262B32"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className="font-mono text-[11px] uppercase tracking-wider text-[#E63946] mb-3">
                    Signal lost
                </div>

                <h1
                    className="text-[88px] sm:text-[120px] font-bold leading-none text-[#E8E6E3] mb-2"
                    style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
                >
                    404
                </h1>

                <p className="text-[#8B93A1] text-[15px] leading-relaxed mb-10 max-w-[360px] mx-auto">
                    This page does not exist on the network. The request you are looking for may have expired or moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center bg-[#E63946] text-white text-sm font-semibold rounded-sm px-7 py-3.5 hover:bg-[#d12d3a] transition-colors"
                    >
                        Back to homepage
                    </Link>
                    <Link
                        href="/requests"
                        className="inline-flex items-center justify-center border border-[#262B32] text-[#8B93A1] text-sm font-semibold rounded-sm px-7 py-3.5 hover:border-[#5B6270] hover:text-[#E8E6E3] transition-colors"
                    >
                        View active requests
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;