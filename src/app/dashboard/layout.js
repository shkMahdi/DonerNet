import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";

export const metadata = {
    title: "Dashboard — DonorNet",
};

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-[#0B0D10] overflow-hidden">
                {/* Sidebar — fixed on desktop, slide-in on mobile */}
                <DashboardSidebar />

                {/* Right side — navbar + scrollable content */}
                <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                    <DashboardNavbar />
                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
