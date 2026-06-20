import { getMyRequests } from '@/app/lib/api/my-requests';
import React from 'react';

const MyRequests = async () => {
    const requesterEmail = "mahdi@sheikh.com"
    const requests = await getMyRequests(requesterEmail)
    console.log(requests)
    return (
        <div className="bg-[#0B0D10] flex items-center justify-center py-4">
            <div className="w-full max-w-6xl">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">List of Request</span>
                </div>
                <h1 className="text-4xl font-bold text-[#E8E6E3] mb-1">
                    My Donation Requests
                </h1>
                <p className="text-sm text-[#8B93A1] mb-8">
                    Manage and track your blood donation posts.
                </p>
            </div>
        </div>
    );
};

export default MyRequests;