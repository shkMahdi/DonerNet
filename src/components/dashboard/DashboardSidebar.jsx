"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ClipboardList, X, Pen, Users, List, User } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useSession } from "@/app/lib/auth-client";

const links = [
    { label: "Overview",        href: "/dashboard",              icon: LayoutDashboard, roles: ["admin", "volunteer", "donor"] },
    { label: "My Profile",      href: "/dashboard/profile",      icon: User,            roles: ["admin", "volunteer", "donor"] },
    { label: "My Requests",     href: "/dashboard/requests",     icon: ClipboardList,   roles: ["admin", "volunteer", "donor"] },
    { label: "Create Request",  href: "/dashboard/create-requests", icon: Pen,          roles: ["admin", "volunteer", "donor"] },
    { label: "All Requests",    href: "/dashboard/all-requests", icon: List,            roles: ["admin", "volunteer"] },
    { label: "All Users",       href: "/dashboard/all-users",    icon: Users,           roles: ["admin"] },
];

const SidebarContent = ({ onLinkClick }) => {
    const pathname = usePathname();
    const { data: session } = useSession();
    const role = session?.user?.role ?? "donor";

    const visibleLinks = links.filter((link) => link.roles.includes(role));

    return (
        <aside className="w-60 flex-shrink-0 bg-[#0D1014] border-r border-[#1D2127] flex flex-col h-full">
            {/* Logo + close button (close only shown on mobile) */}
            <div className="h-16 flex items-center justify-between px-5 border-b border-[#1D2127]">
                <Link
                    href="/"
                    onClick={onLinkClick}
                    className="flex items-center gap-2.5 font-big-shoulders font-bold text-2xl tracking-wide text-[#E8E6E3]"
                >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                        <line x1="14" y1="14" x2="4" y2="6" stroke="#5B6270" strokeWidth="1.1" />
                        <line x1="14" y1="14" x2="24" y2="7" stroke="#5B6270" strokeWidth="1.1" />
                        <line x1="14" y1="14" x2="22" y2="23" stroke="#5B6270" strokeWidth="1.1" />
                        <circle cx="4" cy="6" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                        <circle cx="24" cy="7" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                        <circle cx="22" cy="23" r="2.2" fill="#0B0D10" stroke="#5B6270" strokeWidth="1.1" />
                        <path d="M14 4C14 4 7.5 12 7.5 16C7.5 19.5 10.5 22 14 22C17.5 22 20.5 19.5 20.5 16C20.5 12 14 4 14 4Z" fill="#E63946" />
                    </svg>
                    <p>Donor<span className="text-[#E63946]">Net</span></p>
                </Link>
                {onLinkClick && (
                    <button
                        onClick={onLinkClick}
                        className="lg:hidden flex items-center justify-center w-8 h-8 text-[#5B6270] hover:text-[#E8E6E3] transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
                {visibleLinks.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={onLinkClick}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-[13px] font-medium transition-colors ${
                                isActive
                                    ? "bg-[#E63946]/10 text-[#E63946]"
                                    : "text-[#8B93A1] hover:text-[#E8E6E3] hover:bg-[#14171C]"
                            }`}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom label */}
            <div className="px-5 py-4 border-t border-[#1D2127]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#5B6270]">
                    {role === "admin" ? "Admin Portal" : role === "volunteer" ? "Volunteer Portal" : "Donor Portal"}
                </span>
            </div>
        </aside>
    );
};

const DashboardSidebar = () => {
    const { isOpen, close } = useSidebar();

    return (
        <>
            {/* Desktop — always visible */}
            <div className="hidden lg:flex">
                <SidebarContent />
            </div>

            {/* Mobile — slide-in overlay */}
            {/* Backdrop */}
            <div
                className={`lg:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={close}
                aria-hidden="true"
            />

            {/* Slide panel */}
            <div
                className={`lg:hidden fixed top-0 left-0 z-50 h-full transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <SidebarContent onLinkClick={close} />
            </div>
        </>
    );
};

export default DashboardSidebar;
