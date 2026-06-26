import { getMyRequests } from '@/app/lib/api/my-requests';
import MyRequestsTable from './MyRequestsTable';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';

const MyRequests = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const requesterEmail = user?.email;

    const requests = await getMyRequests(requesterEmail);

    return (
        <div className="bg-[#0B0D10] min-h-screen py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">My Activity</span>
                </div>

                <h1 className="text-4xl font-bold text-[#E8E6E3] mb-2">
                    My Donation Requests
                </h1>
                <p className="text-[#8B93A1] mb-8">
                    Track and manage all your blood donation requests.
                </p>

                <MyRequestsTable requests={requests} />
            </div>
        </div>
    );
};

export default MyRequests;