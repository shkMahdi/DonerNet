import { getRequestDetail } from "@/app/lib/api/request-detail";
import DonateModal from "@/components/DonateModal";
import { MapPin, Calendar, Clock } from 'lucide-react';


const RequestDetail = async ({ params }) => {
    const { id } = await params;
    const request = await getRequestDetail(id);
    return (
        <div className="relative min-h-screen overflow-hidden text-[#E8E6E3]">
            {/* Background circles */}
            <div className="absolute inset-0 bg-[#0B0D10] -z-20" />
            <div className="absolute -left-40 -bottom-40 h-128 w-lg rounded-full border border-[#262B32] -z-10" />
            <div className="absolute -top-40 -right-40 h-128 w-lg rounded-full border border-[#262B32] -z-10" />

            <div className="relative z-10 px-6 py-16">
                <div className="w-full max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">Request Details</span>
                    </div>

                    <div className="bg-[#14171C] border border-[#1D2127] rounded-md p-8 sm:p-10">
                        {/* Top row: blood type + status */}
                        <div className="flex items-start justify-between mb-6">
                            <div
                                className="font-bold text-[56px] leading-none text-[#E63946]"
                                style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
                            >
                                {request.bloodGroup}
                            </div>
                            <span
                                className={`font-mono text-[12px] uppercase tracking-wider px-3 py-1.5 rounded-sm ${request.status === "pending" ? "bg-[#3D3318] text-[#D9A441]" :
                                    request.status === "in progress" ? "bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20" :
                                        "bg-[#7A2027] text-[#FF9FA6]"
                                    }`}
                            >
                                {request.status}
                            </span>
                        </div>

                        {/* Recipient name */}
                        <h1 className="text-3xl font-bold text-[#E8E6E3] mb-6">
                            {request.name}
                        </h1>

                        {/* Details grid */}
                        <div className="space-y-5">
                            {/* Hospital */}
                            <div className="flex items-start gap-3 text-[14px]">
                                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#191D23] shrink-0">
                                    <MapPin size={16} className="text-[#E63946]" />
                                </div>
                                <div>
                                    <p className="text-[#8B93A1] text-xs uppercase tracking-wide mb-1">Hospital</p>
                                    <p className="text-[#E8E6E3] font-medium">{request.hospitalName}</p>
                                    {request.hospitalAddress && (
                                        <p className="text-[#5B6270] text-sm mt-1">{request.hospitalAddress}</p>
                                    )}
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-3 text-[14px]">
                                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#191D23] shrink-0">
                                    <MapPin size={16} className="text-[#5B6270]" />
                                </div>
                                <div>
                                    <p className="text-[#8B93A1] text-xs uppercase tracking-wide mb-1">Location</p>
                                    <p className="text-[#E8E6E3] font-medium">{request.upazila}, {request.district}</p>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="flex items-start gap-3 text-[14px]">
                                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#191D23] shrink-0">
                                    <Calendar size={16} className="text-[#5B6270]" />
                                </div>
                                <div>
                                    <p className="text-[#8B93A1] text-xs uppercase tracking-wide mb-1">Date</p>
                                    <p className="text-[#E8E6E3] font-medium">{request.date}</p>
                                </div>
                            </div>

                            {/* Time */}
                            <div className="flex items-start gap-3 text-[14px]">
                                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-[#191D23] shrink-0">
                                    <Clock size={16} className="text-[#5B6270]" />
                                </div>
                                <div>
                                    <p className="text-[#8B93A1] text-xs uppercase tracking-wide mb-1">Time</p>
                                    <p className="text-[#E8E6E3] font-medium">{request.time}</p>
                                </div>
                            </div>
                            <DonateModal request={request} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestDetail;