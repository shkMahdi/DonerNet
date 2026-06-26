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


                </div>
            </div>
        </section>
    );
};

export default Banner;