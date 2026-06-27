import { PropagateLoader } from "react-spinners";

export default function DashboardLoading() {
    return (
        <div className="flex flex-1 items-center justify-center min-h-[60vh]">
            <PropagateLoader color="#E63946" />
        </div>
    );
}
