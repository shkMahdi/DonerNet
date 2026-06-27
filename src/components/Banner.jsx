'use client'
import { useSession } from '@/app/lib/auth-client';
import Link from 'next/link';

const Banner = () => {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <section className="bg-[#0B0D10] border-b border-[#1D2127] overflow-hidden">
            <div className="max-w-[1180px] mx-auto px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

                    {/* Left: copy */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider text-[#E63946]">
                                Live network · 4,218 active donors
                            </span>
                        </div>

                        <h1
                            className="text-[44px] sm:text-[56px] lg:text-[64px] font-bold uppercase leading-[0.98] tracking-tight text-[#E8E6E3]"

                        >
                            Your next<br />
                            heartbeat could<br />
                            be <span className="text-[#E63946]">someone&apos;s</span><br />
                            only chance.
                        </h1>

                        <p className="mt-6 text-[#8B93A1] text-[16px] sm:text-[18px] italic leading-relaxed max-w-md" style={{ fontFamily: "'Source Serif 4', serif" }}>
                            DonorNet connects verified blood donors with hospitals and
                            patients in real time, built for the moments when minutes
                            decide everything.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3.5 mt-9">
                            <Link
                                href="/donation-requests"
                                className="inline-flex items-center justify-center bg-[#E63946] text-white text-sm font-semibold rounded-sm px-7 py-3.5 hover:bg-[#d12d3a] transition-colors"
                            >
                                Donate Blood
                            </Link>
                            <Link
                                href="dashboard/create-request"
                                className="inline-flex items-center justify-center border border-[#262B32] text-[#8B93A1] text-sm font-semibold rounded-sm px-7 py-3.5 hover:border-[#5B6270] hover:text-[#E8E6E3] transition-colors"
                            >
                                Request blood →
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 sm:gap-10 mt-12 pt-7 border-t border-[#1D2127]">
                            <div className="font-mono">
                                <span className="block text-2xl sm:text-[26px] font-semibold text-[#E8E6E3]">12,940</span>
                                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5B6270] mt-1">
                                    Lives supported
                                </span>
                            </div>
                            <div className="font-mono">
                                <span className="block text-2xl sm:text-[26px] font-semibold text-[#E8E6E3]">4,218</span>
                                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5B6270] mt-1">
                                    Active donors
                                </span>
                            </div>
                            <div className="font-mono">
                                <span className="block text-2xl sm:text-[26px] font-semibold text-[#E8E6E3]">63</span>
                                <span className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#5B6270] mt-1">
                                    Partner hospitals
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right: blood type visual */}
                    <div className="hidden lg:flex flex-col gap-3">

                        {/* Top row */}
                        <div className="grid grid-cols-4 gap-3">
                            {['A+', 'B+', 'AB+', 'O+'].map((type) => (
                                <div
                                    key={type}
                                    className="bg-[#14171C] border border-[#1D2127] rounded-sm p-4 flex flex-col items-center justify-center gap-2 aspect-square"
                                >
                                    <svg width="18" height="22" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2C14 2 2 14 2 21C2 27.627 7.373 30 14 30C20.627 30 26 27.627 26 21C26 14 14 2 14 2Z" fill="rgba(230,57,70,0.15)" stroke="#E63946" strokeWidth="1.5" />
                                    </svg>
                                    <span className="font-mono font-bold text-sm text-[#E8E6E3]">{type}</span>
                                </div>
                            ))}
                        </div>

                        {/* Middle: urgent request card */}
                        <div className="bg-[#14171C] border border-[#E63946]/30 rounded-sm p-5 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#E63946]" />
                            <div className="pl-3">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#E63946]">Urgent request</span>
                                </div>
                                <p className="text-[#E8E6E3] text-sm font-semibold mb-1">O− needed · Dhaka Medical</p>
                                <p className="text-[#5B6270] text-xs font-mono">2 units · today by 6:00 PM</p>
                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[0, 1, 2].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full bg-[#1D2127] border border-[#262B32] flex items-center justify-center text-[9px] font-bold text-[#5B6270]">
                                                {['A', 'R', 'M'][i]}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[#5B6270] text-[11px] font-mono">3 donors notified</span>
                                </div>
                            </div>
                        </div>

                        {/* Bottom row */}
                        <div className="grid grid-cols-4 gap-3">
                            {['A−', 'B−', 'AB−', 'O−'].map((type) => (
                                <div
                                    key={type}
                                    className="bg-[#14171C] border border-[#1D2127] rounded-sm p-4 flex flex-col items-center justify-center gap-2 aspect-square"
                                >
                                    <svg width="18" height="22" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 2C14 2 2 14 2 21C2 27.627 7.373 30 14 30C20.627 30 26 27.627 26 21C26 14 14 2 14 2Z" fill="rgba(230,57,70,0.06)" stroke="#5B6270" strokeWidth="1.5" />
                                    </svg>
                                    <span className="font-mono font-bold text-sm text-[#5B6270]">{type}</span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom label */}
                        <p className="text-center font-mono text-[10px] uppercase tracking-wider text-[#5B6270]">
                            All 8 blood types · nationwide coverage
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;