"use client";

import { PropagateLoader } from "react-spinners";


export default function Spinner() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#0B0D10] px-6 py-16 text-[#E8E6E3]">
            <div className="absolute -left-40 -top-40 h-128 w-lg rounded-full border border-[#262B32]" />
            <div className="absolute -bottom-40 -right-40 h-128 w-lg rounded-full border border-[#262B32]" />
            <div className="flex flex-1 items-center justify-center">
                <PropagateLoader color="#E63946" />
            </div>
        </div>
    );
}