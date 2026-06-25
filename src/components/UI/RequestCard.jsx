import Link from 'next/link';
import { MapPin, Calendar, Clock } from 'lucide-react';

const statusStyles = {
    pending: { bg: '#3D3318', text: '#D9A441', label: 'Pending' },
    confirmed: { bg: '#0F2D26', text: '#5DCAA5', label: 'Confirmed' },
    critical: { bg: '#7A2027', text: '#FF9FA6', label: 'Critical' },
};

const RequestCard = ({ request }) => {
    const status = statusStyles[request.status] || statusStyles.pending;

    return (
        <div className="bg-[#14171C] border border-[#1D2127] rounded-md p-6 hover:border-[#262B32] transition-colors">

            {/* Top row: blood type + status */}
            <div className="flex items-start justify-between mb-5">
                <div
                    className="font-bold text-[40px] leading-none text-[#E63946]"
                    style={{ fontFamily: "'Big Shoulders Display', sans-serif" }}
                >
                    {request.bloodGroup}
                </div>
                <span
                    className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-sm"
                    style={{ backgroundColor: status.bg, color: status.text }}
                >
                    {status.label}
                </span>
            </div>

            {/* Recipient name */}
            <h3 className="text-[17px] font-semibold text-[#E8E6E3] mb-1">
                {request.name}
            </h3>

            {/* Location */}
            <div className="flex items-start gap-1.5 text-[13px] text-[#8B93A1] mb-5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-[#5B6270]" />
                <span>
                    {request.hospitalName} · {request.upazila}, {request.district}
                </span>
            </div>

            {/* Date + time */}
            <div className="flex items-center gap-4 text-[13px] text-[#8B93A1] mb-6 pb-5 border-b border-[#1D2127] font-mono">
                <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#5B6270]" />
                    {request.date}
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#5B6270]" />
                    {request.time}
                </div>
            </div>

            {/* View button */}
            <Link
                href={`/donation-requests/${request._id}`}
                className="inline-flex w-full items-center justify-center bg-[#E63946] text-white text-sm font-semibold rounded-sm py-2.5 hover:bg-[#d12d3a] transition-colors"
            >
                View request
            </Link>
        </div>
    );
};

export default RequestCard;