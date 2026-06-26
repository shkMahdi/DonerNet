import { getAllRequests } from "@/app/lib/api/all-requests";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AllRequestsTable from "./AllRequestsTable";

const AllRequestsPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !["admin", "volunteer"].includes(session.user.role)) {
        redirect("/dashboard");
    }

    const requests = await getAllRequests();

    return (
        <div className="bg-[#0B0D10] min-h-screen py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">All Donation Requests</span>
                </div>

                <h1 className="text-4xl font-bold text-[#E8E6E3] mb-2">
                    All Donation Requests
                </h1>
                <p className="text-[#8B93A1] mb-8">
                    Track and manage all blood donation requests.
                </p>

                <AllRequestsTable requests={requests} />
            </div>
        </div>
    );
};

export default AllRequestsPage;
