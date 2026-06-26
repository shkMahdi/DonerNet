import { getAllRequests } from "@/app/lib/api/all-requests";
import Link from "next/link";
import RequestCard from "../UI/RequestCard";

const RecentRequest = async () => {
    const requests = await getAllRequests();
    const pendingRequests = requests
        .filter((request) => request.status === "pending")
        .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`))
        .slice(0, 3);

    return (
        <section className="bg-[#0B0D10] py-16 sm:py-20">
            <div className="max-w-[1180px] mx-auto px-6 lg:px-8">

                {/* Pulse divider */}
                <div className="w-full h-9 mb-10">
                    <svg viewBox="0 0 1200 36" preserveAspectRatio="none" className="w-full h-full">
                        <path
                            d="M0,18 L260,18 L290,18 L305,4 L320,32 L335,10 L350,18 L420,18 L900,18 L915,4 L930,32 L945,10 L960,18 L1200,18"
                            fill="none"
                            stroke="#E63946"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                {/* Section head */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#E63946]">
                                Right now
                            </span>
                        </div>
                        <h2
                            className="text-3xl sm:text-4xl font-bold uppercase text-[#E8E6E3]"
                            style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
                        >
                            Heroes needed immediately
                        </h2>
                        <p className="text-sm text-[#8B93A1] mt-2 max-w-xl">
                            Real-time blood requests from people in your community. Your quick response could be the miracle they are waiting for.
                        </p>
                    </div>

                    <Link
                        href="/donation-requests"
                        className="shrink-0 text-[13px] font-semibold text-[#8B93A1] border-b border-[#262B32] pb-0.5 hover:text-[#E63946] hover:border-[#E63946] transition-colors whitespace-nowrap"
                    >
                        View all requests →
                    </Link>
                </div>

                {/* Request grid */}
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
        </section>
    );
};

export default RecentRequest;