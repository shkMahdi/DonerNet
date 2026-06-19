"use client"
import { Button } from '@heroui/react';
import Link from 'next/link';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useSession, authClient } from '../app/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

const navLinks = [
    { label: 'Donation Requests', href: '/requests' },
    { label: 'Blood banks', href: '/blood-banks' },
    { label: 'About', href: '/about' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    
    const { data: session } = useSession();
    const user = session?.user;

    const pathname = usePathname();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Hide navbar on dashboard pages — must be after all hooks
    if (pathname.includes("dashboard")) return null;

    const handleLogout = async () => {
        await authClient.signOut();
        setDropdownOpen(false);
        toast.success('You logged out!');
        router.push('/');
        router.refresh();
    };

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
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-sm border border-[#262B32] hover:border-[#5B6270] transition-colors"
                                >
                                    {/* Avatar */}
                                    <div className="w-7 h-7 rounded-full overflow-hidden bg-[#191D23] border border-[#262B32] flex-shrink-0 flex items-center justify-center">
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name}
                                                width={28}
                                                height={28}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <span className="text-[11px] font-bold text-[#8B93A1]">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[13px] font-semibold text-[#E8E6E3] max-w-[120px] truncate">
                                        {user.name}
                                    </span>
                                    <ChevronDown
                                        size={14}
                                        className={`text-[#5B6270] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-44 bg-[#14171C] border border-[#1D2127] rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
                                        <Link
                                            href='/dashboard'
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-[#8B93A1] hover:text-[#E8E6E3] hover:bg-[#191D23] transition-colors"
                                        >
                                            <LayoutDashboard size={15} />
                                            Dashboard
                                        </Link>
                                        <div className="border-t border-[#1D2127]" />
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium text-[#8B93A1] hover:text-[#E63946] hover:bg-[#191D23] transition-colors"
                                        >
                                            <LogOut size={15} />
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="bordered"
                                        className="border-[#262B32] text-[#8B93A1] text-[13px] font-semibold rounded-sm hover:border-[#5B6270] hover:text-[#E8E6E3] cursor-pointer"
                                    >
                                        Sign in
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        className="bg-[#E63946] text-white text-[13px] font-semibold rounded-sm hover:bg-[#d12d3a] cursor-pointer"
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
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
                className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-[#1D2127] ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}
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
                        {user ? (
                            <>
                                <div className="flex items-center gap-3 py-2 border-b border-[#1D2127]">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#191D23] border border-[#262B32] flex-shrink-0 flex items-center justify-center">
                                        {user.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user.name}
                                                width={32}
                                                height={32}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <span className="text-[11px] font-bold text-[#8B93A1]">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-sm font-semibold text-[#E8E6E3] truncate">{user.name}</span>
                                </div>
                                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                                    <Button
                                        variant="bordered"
                                        className="border-[#262B32] text-[#8B93A1] text-[13px] font-semibold rounded-sm w-full hover:border-[#5B6270] hover:text-[#E8E6E3] cursor-pointer"
                                    >
                                        Dashboard
                                    </Button>
                                </Link>
                                <Button
                                    onClick={handleLogout}
                                    className="bg-transparent border border-[#262B32] text-[#E63946] text-[13px] font-semibold rounded-sm w-full hover:bg-[#E63946]/10 cursor-pointer"
                                >
                                    Sign out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button
                                        variant="bordered"
                                        className="border-[#262B32] text-[#8B93A1] text-[13px] font-semibold rounded-sm w-full hover:border-[#5B6270] hover:text-[#E8E6E3] cursor-pointer"
                                    >
                                        Sign in
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        className="bg-[#E63946] text-white text-[13px] font-semibold rounded-sm w-full hover:bg-[#d12d3a] cursor-pointer"
                                    >
                                        Register
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
