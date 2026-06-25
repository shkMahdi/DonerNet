import Link from "next/link";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";
const Footer = () => {
    return (
        <footer className="bg-[#080A0C] text-[#E8E6E3] border-t border-[#1D2127]">

            {/* MAIN FOOTER */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <aside>
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 font-bold text-xl uppercase tracking-wide text-[#E8E6E3]"
                            style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
                        >
                            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="14" y1="14" x2="4" y2="6" stroke="#5B6270" strokeWidth="1.1" />
                                <line x1="14" y1="14" x2="24" y2="7" stroke="#5B6270" strokeWidth="1.1" />
                                <line x1="14" y1="14" x2="22" y2="23" stroke="#5B6270" strokeWidth="1.1" />
                                <circle cx="4" cy="6" r="2.2" fill="#080A0C" stroke="#5B6270" strokeWidth="1.1" />
                                <circle cx="24" cy="7" r="2.2" fill="#080A0C" stroke="#5B6270" strokeWidth="1.1" />
                                <circle cx="22" cy="23" r="2.2" fill="#080A0C" stroke="#5B6270" strokeWidth="1.1" />
                                <path d="M14 4C14 4 7.5 12 7.5 16C7.5 19.5 10.5 22 14 22C17.5 22 20.5 19.5 20.5 16C20.5 12 14 4 14 4Z" fill="#E63946" />
                            </svg>
                            DonorNet
                        </Link>

                        <p className="mt-4 text-sm leading-6 text-[#8B93A1] max-w-xs">
                            A donor network built to close the gap between an empty
                            blood bank and the next available donor.
                        </p>

                        <div className="mt-5 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5DCAA5] shadow-[0_0_0_3px_rgba(93,202,165,0.18)]" />
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#8B93A1]">
                                All systems operational
                            </span>
                        </div>

                        {/* SOCIAL */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-sm border border-[#262B32] text-[#8B93A1] hover:border-[#5B6270] hover:text-[#E8E6E3] transition-colors"
                            >
                                <FaFacebookF size={15} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-sm border border-[#262B32] text-[#8B93A1] hover:border-[#5B6270] hover:text-[#E8E6E3] transition-colors"
                            >
                                <FaXTwitter size={15} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-sm border border-[#262B32] text-[#8B93A1] hover:border-[#5B6270] hover:text-[#E8E6E3] transition-colors"
                            >
                                <FaLinkedinIn size={15} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 flex items-center justify-center rounded-sm border border-[#262B32] text-[#8B93A1] hover:border-[#5B6270] hover:text-[#E8E6E3] transition-colors"
                            >
                                <FaInstagram size={15} />
                            </a>
                        </div>
                    </aside>

                    {/* NAVIGATE */}
                    <nav className="flex flex-col gap-3">
                        <h6 className="font-mono text-[11px] uppercase tracking-wider text-[#5B6270] mb-1">
                            Navigate
                        </h6>
                        <Link href="/" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            Home
                        </Link>
                        <Link href="/requests" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            Find requests
                        </Link>
                        <Link href="/about" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            About
                        </Link>
                        <Link href="/blood-banks" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            Blood banks
                        </Link>
                        <Link href="/dashboard" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            My dashboard
                        </Link>
                    </nav>

                    {/* ACCOUNT */}
                    <nav className="flex flex-col gap-3">
                        <h6 className="font-mono text-[11px] uppercase tracking-wider text-[#5B6270] mb-1">
                            Account
                        </h6>
                        <Link href="/login" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            Sign in
                        </Link>
                        <Link href="/register" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            Register as donor
                        </Link>
                        <Link href="/dashboard/requests" className="text-sm text-[#8B93A1] hover:text-[#E63946] transition-colors">
                            My requests
                        </Link>

                    </nav>

                    {/* CONTACT */}
                    <nav className="flex flex-col gap-4">
                        <h6 className="font-mono text-[11px] uppercase tracking-wider text-[#5B6270] mb-1">
                            Contact
                        </h6>
                        <div className="flex items-start gap-2.5 text-[#8B93A1] text-sm">
                            <FiMail className="mt-0.5 shrink-0 text-[#5B6270]" size={15} />
                            <span>hello@donornet.app</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[#8B93A1] text-sm">
                            <FiPhone className="mt-0.5 shrink-0 text-[#5B6270]" size={15} />
                            <span>+880 1XXX-XXXXXX</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[#8B93A1] text-sm">
                            <FiMapPin className="mt-0.5 shrink-0 text-[#5B6270]" size={15} />
                            <span>Connecting donors across 63+ districts</span>
                        </div>
                    </nav>
                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="border-t border-[#1D2127]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#5B6270]">

                    <p className="text-center md:text-left">
                        © 2026{" "}
                        <span className="text-[#E8E6E3] font-semibold">DonorNet</span>
                        . All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        <Link href="/privacy" className="hover:text-[#E63946] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-[#E63946] transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/disclaimer" className="hover:text-[#E63946] transition-colors">
                            Medical Disclaimer
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;