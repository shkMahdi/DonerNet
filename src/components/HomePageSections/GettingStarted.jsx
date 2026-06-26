'use client'
import { useSession } from '@/app/lib/auth-client';
import Link from 'next/link';

const steps = [
    {
        number: '01',
        label: 'Register',
        title: 'Create your donor profile',
        description:
            'Sign up in under two minutes. Verify your blood type, location, and availability so the network knows when you can help.',
        cta: { text: 'Create account', href: '/register' },
    },
    {
        number: '02',
        label: 'Search or request',
        title: 'Find a need or raise one',
        description:
            'Browse live donation requests near you, or submit a request on behalf of a patient. Every listing is verified and time-stamped.',
        cta: { text: 'See requests', href: '/donation-requests' },
    },
    {
        number: '03',
        label: 'Connect',
        title: 'Reach the right person fast',
        description:
            'DonorNet matches compatible donors with patients in real time. One tap puts you in direct contact — no middlemen, no delays.',
        cta: null,
    },
    {
        number: '04',
        label: 'Save a life',
        title: 'Show up. That\'s all it takes.',
        description:
            'Head to the hospital or donation center. Your blood — given freely in a single hour — can keep someone alive for decades.',
        cta: null,
    },
];

const GetStarted = () => {
    const { data: session } = useSession();
    const user = session?.user;


    return (
        <section className="bg-[#0B0D10] border-t border-[#1D2127] py-16 sm:py-20">
            <div className="max-w-[1180px] mx-auto px-6 lg:px-8">

                {/* Section head */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#E63946]">
                            How it works
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold uppercase text-[#E8E6E3]">
                        Four steps.<br className="sm:hidden" /> One life saved.
                    </h2>
                    <p className="text-sm text-[#8B93A1] mt-2 max-w-xl">
                        From registration to the moment a family exhales with relief — here is exactly how DonorNet works.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1D2127]">
                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className="relative bg-[#0B0D10] p-7 flex flex-col gap-4 group"
                        >
                            {/* Connector line (hidden on last) */}
                            {i < steps.length - 1 && (
                                <span
                                    aria-hidden="true"
                                    className="hidden lg:block absolute top-[38px] left-[calc(100%-1px)] w-px h-4 bg-[#1D2127]"
                                />
                            )}

                            {/* Step number */}
                            <span className="font-mono text-[11px] uppercase tracking-widest text-[#E63946]">
                                {step.number}
                            </span>

                            {/* Label chip */}
                            <span className="inline-flex self-start items-center border border-[#262B32] rounded-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#5B6270]">
                                {step.label}
                            </span>

                            {/* Title */}
                            <h3 className="text-[#E8E6E3] font-bold text-[15px] uppercase leading-snug">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[#8B93A1] text-[13px] leading-relaxed flex-1">
                                {step.description}
                            </p>

                            {/* Optional CTA */}
                            {step.cta && (
                                <Link
                                    href={step.cta.href}
                                    className="mt-1 self-start text-[12px] font-semibold text-[#8B93A1] border-b border-[#262B32] pb-0.5 hover:text-[#E63946] hover:border-[#E63946] transition-colors"
                                >
                                    {step.cta.text} →
                                </Link>
                            )}

                            {/* Bottom accent bar on hover */}
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E63946] group-hover:w-full transition-all duration-300" />
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                {!user && <div className="mt-10 pt-8 border-t border-[#1D2127] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-[#8B93A1] text-sm max-w-md">
                        Ready to make a difference? It starts with a single registration and takes less time than you think.
                    </p>
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center bg-[#E63946] text-white text-sm font-semibold rounded-sm px-7 py-3.5 hover:bg-[#d12d3a] transition-colors shrink-0"
                    >
                        Join DonorNet today
                    </Link>
                </div>}
            </div>
        </section>
    );
};

export default GetStarted;