"use client";
import { useSession, authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, Bell, Menu, Loader2 } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "./SidebarContext";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const user = session?.user;
    const { toggle } = useSidebar();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
        router.refresh();
    };

    if (!mounted || isPending) {
        return (
            <header className="h-16 flex-shrink-0 bg-[#0D1014] border-b border-[#1D2127] flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="lg:hidden w-8 h-8" />
                    <p className="text-xs font-mono uppercase tracking-wider text-[#5B6270]">Dashboard</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-px h-5 bg-[#1D2127]" />
                    <Loader2 size={20} className="text-[#5B6270] animate-spin" />
                </div>
            </header>
        );
    }

    return (
        <header className="h-16 flex-shrink-0 bg-[#0D1014] border-b border-[#1D2127] flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                {/* Hamburger — only on mobile */}
                <button
                    onClick={toggle}
                    className="lg:hidden w-8 h-8 flex items-center justify-center text-[#8B93A1] hover:text-[#E8E6E3] transition-colors rounded-sm hover:bg-[#14171C]"
                    aria-label="Open sidebar"
                >
                    <Menu size={20} />
                </button>

                <p className="text-xs font-mono uppercase tracking-wider text-[#5B6270]">Dashboard</p>
            </div>

            <div className="flex items-center gap-4">
                
                {/* Divider */}
                <div className="w-px h-5 bg-[#1D2127]" />

                {/* User info */}
                {user && (
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-[13px] font-semibold text-[#E8E6E3] leading-tight">{user.role?.toUpperCase()}</p>
                            <p className="text-[11px] text-[#5B6270] leading-tight">{user.email}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#191D23] border border-[#262B32] flex items-center justify-center flex-shrink-0">
                            {user.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    width={32}
                                    height={32}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className="text-[12px] font-bold text-[#8B93A1]">
                                    {user.name?.charAt(0)?.toUpperCase()}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-8 h-8 flex items-center justify-center text-[#5B6270] hover:text-[#E63946] transition-colors rounded-sm hover:bg-[#14171C]"
                            aria-label="Sign out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default DashboardNavbar;
