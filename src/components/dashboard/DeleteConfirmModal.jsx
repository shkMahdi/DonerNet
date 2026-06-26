"use client";

import { Button, Modal } from "@heroui/react";
import { Trash2, AlertTriangle } from "lucide-react";

const DeleteConfirmModal = ({ request, onDelete }) => {
    return (
        <Modal key="blur">
            <Modal.Trigger>
                <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    aria-label="Delete request"
                    className="hover:text-red-500 cursor-pointer"
                >
                    <Trash2 size={18} />
                </Button>
            </Modal.Trigger>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="w-full max-w-[400px] bg-[#14171C] border border-[#1D2127] text-[#E8E6E3] p-6 sm:p-8 rounded-sm shadow-2xl relative overflow-hidden">
                        {/* Red danger themed indicator line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E63946] to-transparent opacity-70" />

                        <Modal.CloseTrigger className="absolute right-4 top-4 text-[#8B93A1] hover:text-white transition-colors" />

                        <Modal.Header className="pb-4 border-b border-[#1D2127]">
                            <Modal.Heading className="text-xl font-bold text-[#E8E6E3] tracking-wide flex items-center gap-2">
                                <AlertTriangle size={18} className="text-[#E63946]" /> Confirm Deletion
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="py-6 space-y-4">
                            <p className="text-xs text-[#8B93A1] leading-relaxed">
                                Are you sure you want to delete this donation request? This action is permanent and cannot be undone.
                            </p>

                            <div className="bg-[#191D23] border border-[#262B32] rounded-sm p-4 space-y-1">
                                <p className="text-[10px] font-mono uppercase tracking-wider text-[#8B93A1]">Recipient Name</p>
                                <p className="text-sm font-bold text-[#E8E6E3]">{request?.name}</p>
                                <p className="text-xs text-[#5B6270] truncate">{request?.hospitalName}</p>
                                <p className="text-xs text-[#5B6270]">{request?.district}, {request?.upazila}</p>
                            </div>
                        </Modal.Body>

                        <Modal.Footer className="pt-4 border-t border-[#1D2127] flex gap-3">
                            <Button
                                onClick={onDelete}
                                className="w-full bg-[#E63946] hover:bg-[#d12d3a] text-white font-semibold rounded-sm py-5 transition-all duration-200 cursor-pointer"
                                slot="close"
                            >
                                Yes, Delete Request
                            </Button>
                            <Button
                                className="w-full bg-[#191D23] border border-[#262B32] hover:bg-[#262B32] text-[#8B93A1] hover:text-[#E8E6E3] font-semibold rounded-sm py-5 transition-all duration-200 cursor-pointer"
                                slot="close"
                            >
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeleteConfirmModal;
