import RequestCard from "@/components/UI/RequestCard";
import { getAllRequests } from "../lib/api/all-requests";

const DonationRequests = async () => {
    const requests = await getAllRequests();
    const pendingRequests = requests.filter((request) => request.status === "pending");

    return (
        <div className="relative min-h-screen overflow-hidden text-[#E8E6E3]">
            {/* Background circles */}
            <div className="absolute inset-0 bg-[#0B0D10] -z-20" />
            <div className="absolute -left-40 -bottom-40 h-128 w-lg rounded-full border border-[#262B32] -z-10" />
            <div className="absolute -top-40 -right-40 h-128 w-lg rounded-full border border-[#262B32] -z-10" />

            {/* Main content */}
            <div className="relative z-10 px-6 py-2 md:py-8">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">Pending</span>
                    </div>
                    <h1 className="text-4xl font-bold text-[#E8E6E3] mb-1">
                        All Donation Requests
                    </h1>
                    <p className="text-sm text-[#8B93A1] mb-8">
                        Browse pending requests below and find urgent needs matching your blood group.
                    </p>


                    {pendingRequests.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {pendingRequests.map((request) => (
                                <RequestCard key={request._id} request={request} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-[#1D2127] rounded-md">
                            <p className="text-[#8B93A1] text-sm">
                                No pending requests right now. Check back soon.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default DonationRequests;