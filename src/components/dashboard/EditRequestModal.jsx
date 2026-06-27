'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal } from '@heroui/react';
import { Edit2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { editRequest } from '@/app/lib/actions/editRequest';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const EditRequestModal = ({ request, onUpdated }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [open, setOpen] = useState(false);

    // Fetch district/upazila lookup data once
    useEffect(() => {
        fetch('/districts.json')
            .then((res) => res.json())
            .then((data) => {
                const table = data.find((item) => item.type === 'table');
                setDistricts(table?.data || []);
            });

        fetch('/upazilas.json')
            .then((res) => res.json())
            .then((data) => {
                const table = data.find((item) => item.type === 'table');
                setUpazilas(table?.data || []);
            });
    }, []);

    // Prefill the form whenever the request data is available.
    // reset() is used instead of defaultValue so RHF actually holds
    // the real values internally — same fix as the Profile page.
    useEffect(() => {
        if (request) {
            reset({
                name: request.name,
                bloodGroup: request.bloodGroup,
                district: request.district,
                upazila: request.upazila,
                hospitalName: request.hospitalName,
                hospitalAddress: request.hospitalAddress,
                date: request.date,
                time: request.time,
                requestMessage: request.requestMessage,
            });
        }
    }, [request, reset]);

    // Sync selectedDistrictId once districts are loaded
    useEffect(() => {
        if (request?.district && districts.length > 0) {
            const selected = districts.find((d) => d.name === request.district);
            if (selected) setSelectedDistrictId(selected.id);
        }
    }, [request, districts]);

    const filteredUpazilas = useMemo(() => {
        if (!selectedDistrictId) return [];
        return upazilas.filter((u) => String(u.district_id) === String(selectedDistrictId));
    }, [selectedDistrictId, upazilas]);

    const onSubmit = async (data) => {
        const result = await editRequest(request._id, data);

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success('Request updated successfully');
            onUpdated?.({ ...request, ...data });
            setOpen(false);
        }
    };

    return (
        <Modal isOpen={open} onOpenChange={setOpen}>
            <Modal.Trigger>
                <Button
                    size="sm"
                    variant="light"
                    isIconOnly
                    aria-label="Edit request"
                    className="text-[#5B6270] hover:text-sky-400"
                    onPress={() => setOpen(true)}
                >
                    <Edit2 size={16} />
                </Button>
            </Modal.Trigger>
            <Modal.Backdrop variant="blur">
                <Modal.Container>
                    <Modal.Dialog className="w-full max-w-[480px] bg-[#14171C] border border-[#1D2127] text-[#E8E6E3] p-6 sm:p-8 rounded-sm shadow-2xl relative overflow-hidden max-h-[85vh] overflow-y-auto">
                        <Modal.CloseTrigger className="absolute right-4 top-4 text-[#8B93A1] hover:text-white transition-colors" />

                        <Modal.Header className="pb-4 border-b border-[#1D2127]">
                            <Modal.Heading className="text-xl font-bold text-[#E8E6E3]">
                                Edit Request
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="py-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                            Recipient Name
                                        </label>
                                        <input
                                            type="text"
                                            {...register('name', { required: 'Name is required' })}
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                                        />
                                        {errors.name && <p className="text-xs text-[#E63946] mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                            Blood Group
                                        </label>
                                        <select
                                            {...register('bloodGroup', { required: 'Blood group is required' })}
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                                        >
                                            {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                                        </select>
                                        {errors.bloodGroup && <p className="text-xs text-[#E63946] mt-1">{errors.bloodGroup.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                            District
                                        </label>
                                        <select
                                            {...register('district', { required: 'District is required' })}
                                            onChange={(e) => {
                                                const selected = districts.find((d) => d.name === e.target.value);
                                                setSelectedDistrictId(selected?.id ?? '');
                                            }}
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                                        >
                                            <option value="" disabled>Select</option>
                                            {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                                        </select>
                                        {errors.district && <p className="text-xs text-[#E63946] mt-1">{errors.district.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                            Upazila
                                        </label>
                                        <select
                                            disabled={!selectedDistrictId}
                                            {...register('upazila', { required: 'Upazila is required' })}
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400 disabled:opacity-50"
                                        >
                                            <option value="" disabled>Select</option>
                                            {filteredUpazilas.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
                                        </select>
                                        {errors.upazila && <p className="text-xs text-[#E63946] mt-1">{errors.upazila.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                        Hospital Name
                                    </label>
                                    <input
                                        type="text"
                                        {...register('hospitalName', { required: 'Hospital name is required' })}
                                        className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                                    />
                                    {errors.hospitalName && <p className="text-xs text-[#E63946] mt-1">{errors.hospitalName.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                        Hospital Address
                                    </label>
                                    <input
                                        type="text"
                                        {...register('hospitalAddress')}
                                        className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            {...register('date', { required: 'Date is required' })}
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                                        />
                                        {errors.date && <p className="text-xs text-[#E63946] mt-1">{errors.date.message}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                            Time
                                        </label>
                                        <input
                                            type="time"
                                            {...register('time', { required: 'Time is required' })}
                                            className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400"
                                        />
                                        {errors.time && <p className="text-xs text-[#E63946] mt-1">{errors.time.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={3}
                                        {...register('requestMessage')}
                                        className="w-full bg-[#191D23] border border-[#262B32] text-[#E8E6E3] text-sm rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-sky-400 resize-none"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-sm py-3 transition-colors disabled:opacity-60"
                                    >
                                        {isSubmitting ? 'Saving...' : 'Confirm Changes'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        slot="close"
                                        className="w-full rounded-sm py-3"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditRequestModal;