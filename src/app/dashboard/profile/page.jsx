'use client'
import { authClient, useSession } from "@/app/lib/auth-client";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import Image from "next/image";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { imgUpload } from "@/app/lib/imgUpload";
import Spinner from "@/components/Spinner";

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const ProfilePage = () => {
    const { data: session, isPending } = useSession();
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [previewAvatar, setPreviewAvatar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newAvatarUrl, setNewAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [locationsLoaded, setLocationsLoaded] = useState(false);


    const user = session?.user;
    const { name, email, avatar, bloodGroup, district, upazila } = user || {};

    // Fetch districts and upazilas first
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const [districtsRes, upazilasRes] = await Promise.all([
                    fetch('/districts.json').then(res => res.json()),
                    fetch('/upazilas.json').then(res => res.json())
                ]);
                
                const districtsTable = districtsRes.find((item) => item.type === 'table');
                const upazilasTable = upazilasRes.find((item) => item.type === 'table');
                
                setDistricts(districtsTable?.data || []);
                setUpazilas(upazilasTable?.data || []);
                setLocationsLoaded(true);
            } catch (error) {
                console.error('Failed to fetch locations:', error);
            }
        };
        
        fetchLocations();
    }, []);

    const filteredUpazilas = useMemo(() => {
        if (!selectedDistrictId) return [];
        return upazilas.filter((u) => String(u.district_id) === String(selectedDistrictId));
    }, [selectedDistrictId, upazilas]);

    // 1. First set selectedDistrictId when user and districts are ready
    useEffect(() => {
        if (user && locationsLoaded && districts.length > 0) {
            const selectedDistrict = districts.find((d) => d.name === user.district);
            if (selectedDistrict) {
                setSelectedDistrictId(selectedDistrict.id);
            }
        }
    }, [user, locationsLoaded, districts]);

    // 2. Now reset the form AFTER we have selectedDistrictId and filteredUpazilas
    useEffect(() => {
        if (
            user && 
            locationsLoaded && 
            selectedDistrictId && 
            filteredUpazilas.some(u => u.name === user.upazila)
        ) {
            reset({
                name: user.name,
                bloodGroup: user.bloodGroup,
                district: user.district,
                upazila: user.upazila,
            });
        }
    }, [user, locationsLoaded, selectedDistrictId, filteredUpazilas, reset]);

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Set local preview immediately
        setPreviewAvatar(URL.createObjectURL(file));
        setUploading(true);

        try {
            const imageResult = await imgUpload(file);
            if (imageResult?.url) {
                setNewAvatarUrl(imageResult.url);
                toast.success('Image uploaded successfully!');
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error('Failed to upload image');
            // Reset on error
            setPreviewAvatar(null);
            setNewAvatarUrl(null);
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        reset({
            name: user.name,
            bloodGroup: user.bloodGroup,
            district: user.district,
            upazila: user.upazila,
        });
        setPreviewAvatar(null);
        setNewAvatarUrl(null);
        setIsEditing(false);
    };


    const onSubmit = async (data) => {
        try {
            // Determine which avatar URL to use: new one if uploaded, else original
            const finalAvatarUrl = newAvatarUrl || avatar;

            const payload = {
                name: data.name,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                avatar: finalAvatarUrl,
            };

            const { error } = await authClient.updateUser(payload);

            if (error) {
                toast.error(error.message || "Failed to update information.");
            } else {
                toast.success("Information updated successfully!");
                setIsEditing(false);
                setPreviewAvatar(null);
                setNewAvatarUrl(null);
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong while updating your profile.");
        }
    };

    if (isPending || !user || !locationsLoaded) {
        return <Spinner />;
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
                            <p className="text-sm text-[#8B93A1] mb-8">Update your profile information</p>
                        </div>
                        <div>
                            <Button hidden={isEditing} onClick={handleEdit} variant='outline' size="sm" className=" text-white text-sm font-semibold rounded-sm py-3.5 mt-2 hover:bg-[#d12d3a] transition-colors disabled:opacity-60">
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Avatar upload */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative w-24 h-24 rounded-full bg-[#191D23] border border-[#262B32] flex items-center justify-center overflow-hidden shrink-0">
                                {uploading ? (
                                    <div className="text-[#5B6270]">Uploading...</div>
                                ) : previewAvatar || avatar ? (
                                    <Image
                                        src={previewAvatar || avatar}
                                        alt={name || 'User avatar'}
                                        width={96}
                                        height={96}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <Upload size={24} className="text-[#5B6270]" />
                                )}
                            </div>
                            <div>
                                <p hidden={isEditing} className="text-xs text-[#5B6270]">Profile Photo</p>
                            </div>
                            <div className="text-center" hidden={!isEditing}>
                                <label htmlFor="avatar" className="inline-block cursor-pointer text-xs font-semibold text-[#E8E6E3] border border-[#262B32] rounded-sm px-4 py-2 hover:border-[#5B6270] transition-colors">
                                    Change photo
                                </label>
                                <input
                                    id="avatar"
                                    type="file"
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
                                    disabled={!isEditing}
                                    id="name"
                                    type="text"
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                                />
                                {errors.name && <p className="text-xs text-[#E63946] mt-1.5">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="bloodGroup" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">Blood group</label>
                                <select
                                    disabled={!isEditing}
                                    id="bloodGroup"
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

                        {/* District row and upazila */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="district" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">District</label>
                                <select
                                    disabled={!isEditing}
                                    id="district"
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
                                    disabled={!selectedDistrictId || !isEditing}
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

                        <div className="flex justify-between items-center gap-4">
                            <Button
                                hidden={!isEditing}
                                type="submit"
                                disabled={isSubmitting || uploading}
                                className="w-full bg-[#E63946] text-white rounded-sm hover:bg-[#d12d3a]"
                            >
                                {isSubmitting ? 'Updating Profile...' : 'Update Profile'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                hidden={!isEditing}
                                onClick={handleCancel}
                                className="rounded-sm w-full text-white"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;