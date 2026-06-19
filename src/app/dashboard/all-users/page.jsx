import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AllUsersPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || session.user.role !== "admin") {
        redirect("/dashboard");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-[#E8E6E3] mb-6">All Users</h1>
        </div>
    );
};

export default AllUsersPage;
