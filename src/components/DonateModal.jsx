"use client";

import { handleDonate } from "@/app/lib/actions/handleDonate";
import { useSession } from "@/app/lib/auth-client";
import { Button, Modal } from "@heroui/react";
import { User, Mail, Heart } from "lucide-react";

const DonateModal = ({ request }) => {
    const { data: session } = useSession();
    const user = session?.user;

    const donateHandler = () => {
        const result = handleDonate(request, user);
        if (result.error) {
            console.log("Error", result.error);
        }
        if (result.result) {
            console.log("Result", result.result);
        }
    };

    return (
        <Modal key="blur">
            <Modal.Trigger>
                <Button className="w-full bg-[#E63946] text-white text-[14px] font-semibold rounded-sm py-5 hover:bg-[#d12d3a] transition-all duration-200 shadow-[0_4px_12px_rgba(230,57,70,0.12)] hover:shadow-[0_6px_20px_rgba(230,57,70,0.22)] cursor-pointer">
                    Donate Now
                </Button>
            </Modal.Trigger>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="w-full max-w-[400px] bg-[#14171C] border border-[#1D2127] text-[#E8E6E3] p-6 sm:p-8 rounded-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E63946] to-transparent opacity-70" />

                        <Modal.CloseTrigger className="absolute right-4 top-4 text-[#8B93A1] hover:text-white transition-colors" />

                        <Modal.Header className="pb-4 border-b border-[#1D2127]">
                            <Modal.Heading className="text-xl font-bold text-[#E8E6E3] tracking-wide flex items-center gap-2">
                                <Heart size={18} className="text-[#E63946]" /> Confirm Donation
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="py-6 space-y-5">
                            <div className="bg-[#191D23] border border-[#262B32] rounded-sm p-4 flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1]">Donating to</p>
                                    <p className="text-sm font-bold text-[#E8E6E3]">{request?.name}</p>
                                    <p className="text-xs text-[#5B6270] truncate max-w-[180px]">{request?.hospitalName}</p>
                                </div>
                                <div className="flex flex-col items-center justify-center bg-[#E63946]/10 border border-[#E63946]/20 rounded-sm px-3.5 py-1.5 shrink-0 min-w-[64px]">
                                    <span className="text-[9px] text-[#E63946] font-mono uppercase tracking-wider">Group</span>
                                    <span className="text-xl font-bold text-[#E63946] leading-none mt-1">{request?.bloodGroup}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1.5">
                                        Donor Name
                                    </label>
                                    <div className="relative flex items-center">
                                        <User size={15} className="absolute left-3 text.5 text-[#5B6270]" />
                                        <input
                                            type="text"
                                            value={user?.name || ""}
                                            readOnly
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] rounded-sm py-2.5 pl-9 pr-4 text-xs font-medium focus:outline-none cursor-not-allowed selection:bg-[#E63946]/30"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8B93A1] mb-1.5">
                                        Donor Email
                                    </label>
                                    <div className="relative flex items-center">
                                        <Mail size={15} className="absolute left-3 text.5 text-[#5B6270]" />
                                        <input
                                            type="text"
                                            value={user?.email || ""}
                                            readOnly
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] rounded-sm py-2.5 pl-9 pr-4 text-xs font-medium focus:outline-none cursor-not-allowed selection:bg-[#E63946]/30"
                                        />
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-[#8B93A1] text-center pt-2 leading-relaxed">
                                Are you sure you want to donate for this request?
                            </p>
                        </Modal.Body>

                        <Modal.Footer className="pt-4 border-t border-[#1D2127] flex gap-3">
                            <Button onClick={donateHandler} className="w-full bg-[#E63946] hover:bg-[#d12d3a] text-white font-semibold rounded-sm py-5 transition-all duration-200 cursor-pointer" slot="close">
                                Confirm & Donate
                            </Button>
                            <Button className="w-full bg-[#191D23] border border-[#262B32] hover:bg-[#262B32] text-[#8B93A1] hover:text-[#E8E6E3] font-semibold rounded-sm py-5 transition-all duration-200 cursor-pointer" slot="close">
                                Change My Mind
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DonateModal;