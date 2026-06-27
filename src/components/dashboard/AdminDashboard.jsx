import { getAllRequests } from "@/app/lib/api/all-requests";
import { getAllUsers } from "@/app/lib/api/all-users";
import { auth } from "@/app/lib/auth";
import { Users, HeartHandshake, Droplet } from "lucide-react";
import { headers } from "next/headers";

const AdminDashboard = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers(),
    });


    const allUsers = await getAllUsers(token) ?? [];
    const allRequests = await getAllRequests();

    const userCnt = allUsers.length;
    const reqCnt = allRequests.length;
    const totalFunding = "$12,000";

    const stats = [
        {
            label: 'Total donors',
            value: userCnt.toLocaleString(),
            icon: Users,
        },
        {
            label: 'Total funding',
            value: totalFunding,
            icon: HeartHandshake,
        },
        {
            label: 'Blood donation requests',
            value: reqCnt.toLocaleString(),
            icon: Droplet,
        },
    ];

    return (
        <div className="px-6 sm:px-9 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 bg-[#1D2127] border border-[#1D2127] rounded-md overflow-hidden">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-[#14171C] p-6">
                            <div className="w-10 h-10 rounded-sm bg-[rgba(230,57,70,0.1)] flex items-center justify-center mb-5">
                                <Icon size={18} className="text-[#E63946]" />
                            </div>
                            <div
                                className="text-3xl font-bold text-[#E8E6E3] mb-1.5"
                                style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
                            >
                                {stat.value}
                            </div>
                            <div className="font-mono text-[11px] uppercase tracking-wider text-[#8B93A1]">
                                {stat.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AdminDashboard;