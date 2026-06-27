import { auth } from "@/app/lib/auth";
import { getMyRequests } from "@/app/lib/api/my-requests";
import { headers } from "next/headers";
import MyRequestsTable from "@/app/dashboard/my-requests/MyRequestsTable";

const DonorDashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const requesterEmail = user?.email;

    const requests = await getMyRequests(requesterEmail);
    const recentRequests = requests
        .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`))
        .slice(0, 3);

    return (
        <div className="bg-[#0B0D10] min-h-screen py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">My Activity</span>
                </div>
                <h1 className="text-[#8B93A1] mb-8">
                    Track and manage your recent blood donation requests.
                </h1>

                <MyRequestsTable requests={recentRequests} />
            </div>
        </div>
    );
}

export default DonorDashboard;