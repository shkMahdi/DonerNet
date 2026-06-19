import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AllRequestsPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !["admin", "volunteer"].includes(session.user.role)) {
        redirect("/dashboard");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#E8E6E3] mb-6">All Requests</h1>
        </div>
    );
};

export default AllRequestsPage;
