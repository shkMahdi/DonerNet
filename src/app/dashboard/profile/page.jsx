'use client'
import { useSession } from "@/app/lib/auth-client";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@heroui/react";

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const ProfilePage = () => {
    // All hooks at the TOP, before any early returns!
    const { data: session, isPending } = useSession();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState(null);

    const user = session?.user;
    const { name, email, avatar, bloodGroup, district, upazila } = user || {};

    // Fetch districts and upazilas
    useEffect(() => {
        fetch('/districts.json')
            .then((res) => res.json())
            .then((data) => {
                const table = data.find((item) => item.type === 'table');
                setDistricts(table?.data || []);
                // Set selected district from user data
                if (user?.district) {
                    const selectedDistrict = table?.data?.find((d) => d.name === user.district);
                    if (selectedDistrict) {
                        setSelectedDistrictId(selectedDistrict.id);
                    }
                }
            });

        fetch('/upazilas.json')
            .then((res) => res.json())
            .then((data) => {
                const table = data.find((item) => item.type === 'table');
                setUpazilas(table?.data || []);
            });
    }, [user]);

    // Derived value
    const filteredUpazilas = useMemo(() => {
        if (!selectedDistrictId) return [];
        return upazilas.filter((u) => String(u.district_id) === String(selectedDistrictId));
    }, [selectedDistrictId, upazilas]);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewAvatar(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        console.log(data);
    };

    // Early return after all hooks!
    if (isPending || !user) {
        return <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl">
                <div className="bg-[#14171C] border border-[#1D2127] rounded-md p-8 sm:p-10">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">Your Profile</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-[#E8E6E3] mb-1">Profile</h1>
                            <p className="text-sm text-[#8B93A1] mb-8">Update your donor profile information</p>
                        </div>
                        <div>
                            <Button variant='outline' size="sm" className=" text-white text-sm font-semibold rounded-sm py-3.5 mt-2 hover:bg-[#d12d3a] transition-colors disabled:opacity-60">
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Avatar upload */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full bg-[#191D23] border border-[#262B32] flex items-center justify-center overflow-hidden flex-shrink-0">
                                {previewAvatar || avatar ? (
                                    <Image
                                        src={previewAvatar || avatar}
                                        alt={name || 'User avatar'}
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <Upload size={24} className="text-[#5B6270]" />
                                )}
                            </div>
                            <div>
                                <label htmlFor="avatar" className="inline-block cursor-pointer text-[13px] font-semibold text-[#E8E6E3] border border-[#262B32] rounded-sm px-4 py-2 hover:border-[#5B6270] transition-colors">
                                    Change photo
                                </label>
                                <input
                                    id="avatar"
                                    type="file"
                                    {...register('avatar')}
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                <p className="text-[11px] text-[#5B6270] mt-1.5">PNG or JPG (optional)</p>
                            </div>
                        </div>

                        {/* Name */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">Full name</label>
                                <input
                                    id="name"
                                    type="text"
                                    defaultValue={name}
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                                />
                                {errors.name && <p className="text-xs text-[#E63946] mt-1.5">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="bloodGroup" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">Blood group</label>
                                <select
                                    id="bloodGroup"
                                    defaultValue={bloodGroup}
                                    {...register('bloodGroup', { required: 'Blood group is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] transition-colors appearance-none"
                                    style={{
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238B93A1' stroke-width='1.5'/%3E%3C/svg%3E\")",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 14px center',
                                    }}
                                >
                                    <option value="" disabled>Select</option>
                                    {bloodGroups.map((bg) => <option key={bg} value={bg}>{bg}</option>)}
                                </select>
                                {errors.bloodGroup && <p className="text-xs text-[#E63946] mt-1.5">{errors.bloodGroup.message}</p>}
                            </div>
                        </div>


                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">Email address</label>
                            <input
                                disabled
                                id="email"
                                type="email"
                                defaultValue={email}
                                className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors opacity-70"
                            />
                        </div>

                        {/*District row and upazila*/}
                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <label htmlFor="district" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">District</label>
                                <select
                                    id="district"
                                    defaultValue={district}
                                    {...register('district', { required: 'District is required' })}
                                    onChange={(e) => {
                                        const selected = districts.find((d) => d.name === e.target.value);
                                        setSelectedDistrictId(selected?.id ?? '');
                                    }}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] transition-colors appearance-none"
                                    style={{
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238B93A1' stroke-width='1.5'/%3E%3C/svg%3E\")",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 14px center',
                                    }}
                                >
                                    <option value="" disabled>Select</option>
                                    {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                                </select>
                                {errors.district && <p className="text-xs text-[#E63946] mt-1.5">{errors.district.message}</p>}
                            </div>

                            {/* Upazila */}
                            <div>
                                <label htmlFor="upazila" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">Upazila</label>
                                <select
                                    id="upazila"
                                    disabled={!selectedDistrictId}
                                    defaultValue={upazila}
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
                                    {filteredUpazilas.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
                                </select>
                                {errors.upazila && <p className="text-xs text-[#E63946] mt-1.5">{errors.upazila.message}</p>}
                            </div>
                        </div>



                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#E63946] text-white text-sm font-semibold rounded-sm py-3.5 mt-2 hover:bg-[#d12d3a] transition-colors disabled:opacity-60"
                        >
                            {isSubmitting ? 'Updating Profile...' : 'Update Profile'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;