"use client"
import { Button } from '@heroui/react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
    { label: 'Donation Requests', href: '/requests' },
    { label: 'Blood banks', href: '/blood-banks' },
    { label: 'About', href: '/about' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-[#0B0D10]/95 backdrop-blur-md border-b border-[#1D2127]">
            <div className="max-w-295 mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-18">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 font-big-shoulders font-bold text-3xl tracking-wide text-[#E8E6E3]">
                        <svg width="36" height="36" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                            <line x1="14" y1="14" x2="4" y2="6" stroke="#5B6270" strokeWidth="1.1" />
                            <line x1="14" y1="14" x2="24" y2="7" stroke="#5B6270" strokeWidth="1.1" />
                            <line x1="14" y1="14" x2="22" y2="23" stroke="#5B6270" strokeWidth="1.1" />
                            <circle cx="4" cy="6" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                            <circle cx="24" cy="7" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                            <circle cx="22" cy="23" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                            <path d="M14 4C14 4 7.5 12 7.5 16C7.5 19.5 10.5 22 14 22C17.5 22 20.5 19.5 20.5 16C20.5 12 14 4 14 4Z" fill="#E63946" />
                        </svg>
                        <p>Donor<span className='text-[#E63946]'>Net</span></p>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden lg:flex items-center gap-9 text-sm font-medium text-[#8B93A1]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="hover:text-[#E8E6E3] transition-colors duration-150"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden lg:flex items-center gap-3.5">
                        <Button
                            as={Link}
                            href="/login"
                            variant="bordered"
                            className="border-[#262B32] text-[#8B93A1] text-[13px] font-semibold rounded-sm hover:border-[#5B6270] hover:text-[#E8E6E3]"
                        >
                            Sign in
                        </Button>
                        <Button
                            as={Link}
                            href="/register"
                            className="bg-[#E63946] text-white text-[13px] font-semibold rounded-sm hover:bg-[#d12d3a]"
                        >
                            Register as donor
                        </Button>
                    </div>

                    {/* Mobile burger button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden flex items-center justify-center w-9 h-9 text-[#8B93A1] hover:text-[#E8E6E3] transition-colors"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[#1D2127] ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'
                    }`}
            >
                <div className="px-6 py-5 flex flex-col gap-1 bg-[#0B0D10]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-[#8B93A1] hover:text-[#E8E6E3] text-sm font-medium py-3 border-b border-[#1D2127] transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex flex-col gap-3 mt-4">
                        <Button
                            as={Link}
                            href="/login"
                            variant="bordered"
                            className="border-[#262B32] text-[#8B93A1] text-[13px] font-semibold rounded-sm w-full hover:border-[#5B6270] hover:text-[#E8E6E3]"
                        >
                            Sign in
                        </Button>
                        <Button
                            as={Link}
                            href="/register"
                            className="bg-[#E63946] text-white text-[13px] font-semibold rounded-sm w-full hover:bg-[#d12d3a]"
                        >
                            Register as donor
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;