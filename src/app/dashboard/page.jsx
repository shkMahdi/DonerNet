import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { headers } from "next/headers";
import { auth } from "../lib/auth";
import DonorDashboard from "@/components/dashboard/DonorDashboard";


const DashboardHome = async () => {
    const session = await auth.api.getSession({ headers: await headers() })
    const user = session?.user;

    if (!session) {
        return (
            <div className="px-6 sm:px-9 py-8">
                <div className="h-6 w-48 bg-[#1D2127] rounded animate-pulse mb-3" />
                <div className="h-4 w-72 bg-[#1D2127] rounded animate-pulse" />
            </div>
        );
    }

    return (
        <div>
            <div className="px-6 sm:px-9 py-8 border-b border-[#1D2127]">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5DCAA5] shadow-[0_0_0_3px_rgba(93,202,165,0.18)]" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#8B93A1]">
                        Logged in as {user?.role}
                    </span>
                </div>

                <h1
                    className="text-3xl sm:text-[32px] font-bold text-[#E8E6E3]"

                >
                    Welcome back, {user?.name?.split(' ')[0]}
                </h1>

                <p className="text-sm text-[#8B93A1] mt-2">
                    Here&apos;s what&apos;s happening across the network today.
                </p>
            </div>
            {(user?.role === 'admin' || user?.role === 'volunteer') && <AdminDashboard />}
            {user?.role === 'donor' && <DonorDashboard />}
        </div>
    );
};

export default DashboardHome;