import { getRequestDetail } from "@/app/lib/api/request-detail";
import DonateModal from "@/components/DonateModal";
import { MapPin, Calendar, Clock, Hospital, Phone, AlertCircle, Droplet } from 'lucide-react';


const RequestDetail = async ({ params }) => {
    const { id } = await params;
    const request = await getRequestDetail(id);
    return (
        <div className="relative min-h-screen overflow-hidden text-[#E8E6E3] bg-[#0B0D10]">
            {/* Enhanced background with gradients */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0D10] via-[#0F1115] to-[#0B0D10]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#E63946]/3 blur-[120px] rounded-full" />
            </div>
            <div className="absolute -left-48 -bottom-48 h-[600px] w-[600px] rounded-full border border-[#262B32]/40 -z-10" />
            <div className="absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full border border-[#262B32]/40 -z-10" />

            <div className="relative z-10 px-4 sm:px-6 py-12 sm:py-20">
                <div className="w-full max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2.5 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">Request Details</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#E8E6E3] tracking-tight">
                            Blood Donation Request
                        </h1>
                        <p className="text-sm text-[#8B93A1] mt-2">
                            Every donation saves lives. Your contribution matters.
                        </p>
                    </div>

                    {/* Main card with gradient border */}
                    <div className="relative group">
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-[#E63946]/20 via-[#1D2127] to-[#E63946]/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative bg-[#14171C] border border-[#1D2127] rounded-lg overflow-hidden shadow-2xl">
                            {/* Top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E63946] to-transparent" />

                            <div className="p-6 sm:p-10">
                                {/* Blood type badge + status */}
                                <div className="flex items-start justify-between gap-4 mb-8">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-[#E63946]/10 blur-2xl rounded-full" />
                                        <div className="relative flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E63946] to-[#c42d39] flex items-center justify-center shadow-lg shadow-[#E63946]/20">
                                                <Droplet className="text-white" size={32} fill="currentColor" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1">Blood Group</p>
                                                <div
                                                    className="font-bold text-[48px] leading-none text-[#E63946]"
                                                    style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
                                                >
                                                    {request.bloodGroup}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        className={`font-mono text-[11px] uppercase tracking-wider px-4 py-2 rounded-md ${request.status === "pending" ? "bg-[#3D3318] text-[#D9A441] border border-[#5A4B1E]" :
                                            request.status === "in progress" ? "bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20" :
                                                "bg-[#7A2027] text-[#FF9FA6] border border-[#9A3038]"
                                            }`}
                                    >
                                        {request.status}
                                    </span>
                                </div>

                                {/* Urgent notice for pending */}
                                {request.status === "pending" && (
                                    <div className="flex items-start gap-3 bg-[#E63946]/5 border border-[#E63946]/20 rounded-md p-4 mb-8">
                                        <AlertCircle size={18} className="text-[#E63946] shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-semibold text-[#E63946] mb-1">Urgent Request</p>
                                            <p className="text-xs text-[#8B93A1] leading-relaxed">
                                                This request is awaiting a donor. Your immediate action could save a life.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Recipient info */}
                                <div className="bg-[#191D23] border border-[#262B32] rounded-md p-5 mb-8">
                                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-3">Patient Information</p>
                                    <h2 className="text-2xl font-bold text-[#E8E6E3] mb-1">
                                        {request.name}
                                    </h2>
                                    <p className="text-sm text-[#5B6270]">Requires {request.bloodGroup} blood donation</p>
                                </div>

                                {/* Details grid - 2 columns on larger screens */}
                                <div className="grid sm:grid-cols-2 gap-5 mb-8">
                                    {/* Hospital */}
                                    <div className="bg-[#191D23]/50 border border-[#262B32] rounded-md p-4 hover:bg-[#191D23] transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#E63946]/10 shrink-0">
                                                <Hospital size={18} className="text-[#E63946]" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1.5">Hospital</p>
                                                <p className="text-[#E8E6E3] font-semibold text-sm leading-tight">{request.hospitalName}</p>
                                                {request.hospitalAddress && (
                                                    <p className="text-[#5B6270] text-xs mt-2 leading-relaxed">{request.hospitalAddress}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="bg-[#191D23]/50 border border-[#262B32] rounded-md p-4 hover:bg-[#191D23] transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#5B6270]/10 shrink-0">
                                                <MapPin size={18} className="text-[#8B93A1]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1.5">Location</p>
                                                <p className="text-[#E8E6E3] font-semibold text-sm">{request.upazila}</p>
                                                <p className="text-[#5B6270] text-xs mt-1">{request.district}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date */}
                                    <div className="bg-[#191D23]/50 border border-[#262B32] rounded-md p-4 hover:bg-[#191D23] transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#5B6270]/10 shrink-0">
                                                <Calendar size={18} className="text-[#8B93A1]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1.5">Donation Date</p>
                                                <p className="text-[#E8E6E3] font-semibold text-sm">
                                                    {new Date(request.date).toLocaleDateString('en-US', { 
                                                        weekday: 'short', 
                                                        year: 'numeric', 
                                                        month: 'short', 
                                                        day: 'numeric' 
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="bg-[#191D23]/50 border border-[#262B32] rounded-md p-4 hover:bg-[#191D23] transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#5B6270]/10 shrink-0">
                                                <Clock size={18} className="text-[#8B93A1]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1.5">Preferred Time</p>
                                                <p className="text-[#E8E6E3] font-semibold text-sm">{request.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact info if available */}
                                {request.requesterPhone && (
                                    <div className="bg-[#191D23]/50 border border-[#262B32] rounded-md p-4 mb-8 hover:bg-[#191D23] transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-[#5B6270]/10 shrink-0">
                                                <Phone size={18} className="text-[#8B93A1]" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1.5">Contact Number</p>
                                                <p className="text-[#E8E6E3] font-semibold text-sm">{request.requesterPhone}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Request message if available */}
                                {request.requestMessage && (
                                    <div className="bg-[#191D23]/50 border border-[#262B32] rounded-md p-5 mb-8">
                                        <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-3">Additional Information</p>
                                        <p className="text-[#E8E6E3] text-sm leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif" }}>
                                            {request.requestMessage}
                                        </p>
                                    </div>
                                )}

                                {/* CTA */}
                                {request.status === "pending" && (
                                    <div className="pt-6 border-t border-[#1D2127]">
                                        <DonateModal request={request} />
                                    </div>
                                )}

                                {/* Status message for non-pending */}
                                {request.status !== "pending" && (
                                    <div className="pt-6 border-t border-[#1D2127]">
                                        <div className="text-center py-6">
                                            <p className="text-[#8B93A1] text-sm">
                                                {request.status === "in progress" 
                                                    ? "This request is currently being fulfilled by a donor."
                                                    : "This request has been completed. Thank you to all our donors!"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom note */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-[#5B6270] italic" style={{ fontFamily: "'Source Serif 4', serif" }}>
                            DonorNet connects lives through blood donation. Every contribution matters.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RequestDetail;