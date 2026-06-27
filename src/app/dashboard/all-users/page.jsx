import { getAllUsers } from "@/app/lib/api/all-users";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AllUserTable from "./AllUserTable";

const AllUsersPage = async () => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || session.user.role !== "admin") {
        redirect("/dashboard");
    }

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });


    const allUsers = await getAllUsers(token) ?? [];
    console.log(allUsers);

    return (
        <div className="bg-[#0B0D10] min-h-screen py-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">All Users</span>
                </div>

                <h1 className="text-4xl font-bold text-[#E8E6E3] mb-2">
                    All Users
                </h1>
                <p className="text-[#8B93A1] mb-8">
                    Track and manage all users.
                </p>

                <AllUserTable AllUsers={allUsers} />
            </div>
        </div>
    );
};

export default AllUsersPage;
