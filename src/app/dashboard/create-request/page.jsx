'use client'

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload, Loader2 } from 'lucide-react';
import { Button } from "@heroui/react";
import Link from "next/link";

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];


const CreateRequestPage = () => {
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const [selectedDistrictId, setSelectedDistrictId] = useState('');


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

    const filteredUpazilas = useMemo(() => {
        if (!selectedDistrictId) return [];
        return upazilas.filter((u) => String(u.district_id) === String(selectedDistrictId));
    }, [selectedDistrictId, upazilas]);


    const onSubmit = (data) => {
         const { name, bloodGroup, district, upazila, hospitalName, hospitalAddress, date, time, requestMessage } = data;

         const request = {
            name, 
            bloodGroup,
            district, 
            upazila,
            hospitalName,
            hospitalAddress,
            date,
            time, 
            requestMessage,
            status: "pending"
         }
         console.log(request);
    }

    return (
        <div className="bg-[#0B0D10] flex items-center justify-center py-4">
            <div className="w-full max-w-6xl">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">Make A Request</span>
                </div>
                <h1 className="text-4xl font-bold text-[#E8E6E3] mb-1">
                    Make A Donation Request
                </h1>
                <p className="text-sm text-[#8B93A1] mb-8">
                    And Get Help Form Nearby Blood Doners
                </p>

                <div className="bg-[#14171C] border border-[#1D2127] rounded-md p-4 sm:p-10">

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* name +  Blood group*/}
                        <div className="grid grid-cols-2 gap-4">

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    Recipient's Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    placeholder="John Mia"
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                                />
                                {errors.name && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.name.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="bloodGroup" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    Blood group
                                </label>
                                <select
                                    id="bloodGroup"
                                    defaultValue=""
                                    {...register('bloodGroup', { required: 'Blood group is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] transition-colors appearance-none"
                                    style={{
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238B93A1' stroke-width='1.5'/%3E%3C/svg%3E\")",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 14px center',
                                    }}
                                >
                                    <option value="" disabled>Select</option>
                                    {bloodGroups.map((bg) => (
                                        <option key={bg} value={bg}>{bg}</option>
                                    ))}
                                </select>
                                {errors.bloodGroup && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.bloodGroup.message}</p>
                                )}
                            </div>

                        </div>

                        {/* district and upazila */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* districts */}
                            <div>
                                <label htmlFor="district" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    District
                                </label>
                                <select
                                    id="district"
                                    defaultValue=""
                                    {...register('district', { required: 'District is required' })}
                                    onChange={(e) => {
                                        const selected = districts.find((d) => d.name === e.target.value);
                                        setSelectedDistrictId(selected?.id ?? '');
                                        register('district').onChange(e);
                                    }}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] transition-colors appearance-none"
                                    style={{
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238B93A1' stroke-width='1.5'/%3E%3C/svg%3E\")",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 14px center',
                                    }}
                                >
                                    <option value="" disabled>Select</option>
                                    {districts.map((d) => (
                                        <option key={d.id} value={d.name}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.district && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.district.message}</p>
                                )}
                            </div>

                            {/* Upazila */}
                            <div>
                                <label htmlFor="upazila" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    Upazila
                                </label>
                                <select
                                    id="upazila"
                                    disabled={!selectedDistrictId}
                                    defaultValue=""
                                    {...register('upazila', { required: 'Upazila is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] transition-colors appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238B93A1' stroke-width='1.5'/%3E%3C/svg%3E\")",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 14px center',
                                    }}
                                >
                                    <option value="" disabled>
                                        {selectedDistrictId ? 'Select upazila' : 'Select a district first'}
                                    </option>
                                    {filteredUpazilas.map((u) => (
                                        <option key={u.id} value={u.name}>{u.name}</option>
                                    ))}
                                </select>
                                {errors.upazila && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.upazila.message}</p>
                                )}
                            </div>


                        </div>

                        {/* hospitals name and address */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="hospitalName" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    Hospital Name
                                </label>
                                <input
                                    id="hospitalName"
                                    type="text"
                                    {...register('hospitalName', { required: 'Hospital name is required' })}
                                    placeholder="ABC Hospital"
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                                />
                                {errors.hospitalName && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.hospitalName.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="hospitalAddress" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    Hospital Address
                                </label>
                                <input
                                    id="hospitalAddress"
                                    type="text"
                                    {...register('hospitalAddress', { required: 'Hospital Address is required' })}
                                    placeholder="Building Number / Street No. / Area"
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                                />
                                {errors.hospitalAddress && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.hospitalAddress.message}</p>
                                )}
                            </div>
                        </div>

                        {/* date and time */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* date */}
                            <div>
                                <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    Donation Date
                                </label>
                                <input
                                    id="date"
                                    type="date"
                                    {...register('date', { required: 'Date is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors [color-scheme:dark]"
                                />
                                {errors.date && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.date.message}</p>
                                )}
                            </div>
                            {/* time */}
                            <div>
                                <label htmlFor="time" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    Donation Time
                                </label>
                                <input
                                    id="time"
                                    type="time"
                                    {...register('time', { required: 'Time is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors [color-scheme:dark]"
                                />
                                {errors.time && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.time.message}</p>
                                )}
                            </div>
                        </div>

                        {/* req message */}
                        <div>
                            <label htmlFor="requestMessage" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                Request Message <span className="text-xs font-light">(Optional)</span>
                            </label>
                            <textarea
                                id="requestMessage"
                                type="text"
                                {...register('requestMessage')}
                                placeholder="Explain why the blood is needed. . ."
                                className="w-full h-24 bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                            />
                            {errors.requestMessage && (
                                <p className="text-xs text-[#E63946] mt-1.5">{errors.requestMessage.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#E63946] text-white text-sm font-semibold rounded-sm py-3.5 hover:bg-[#d12d3a] transition-colors disabled:opacity-60"
                        >
                            {isSubmitting ? 'Creating Request...' : 'Create Donation Rrquest'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateRequestPage;