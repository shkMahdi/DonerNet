"use client";

import { Button } from '@heroui/react';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect, useMemo } from 'react';
import { Eye, EyeOff, Upload, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { authClient } from '../lib/auth-client';
import { useRouter } from 'next/navigation';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const RegisterPage = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const selectedDistrict = watch('district');

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

    // derived value — computed during render, not stored as separate state
    const filteredUpazilas = useMemo(() => {
        if (!selectedDistrict) return [];
        return upazilas.filter((u) => String(u.district_id) === String(selectedDistrict));
    }, [selectedDistrict, upazilas]);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarPreview(URL.createObjectURL(file));
        // actual imgBB upload call goes here — left for your implementation
    };

    const onSubmit = async (data) => {
        const { name, email, password, bloodGroup, district, upazila } = data;

        const { data: signUpData, error } = await authClient.signUp.email({
            name,
            email,
            password,
            bloodGroup,
            district,
            upazila,
            role: "donor",
            status: "active",
        });

        if (error) {
            console.log("FULL ERROR:", JSON.stringify(error, null, 2));
            toast.error(error.message || 'Registration failed');
        } else {
            console.log('Sign-up successful:', signUpData);
            toast.success('Account created! Please log in.');
            router.push('/login');
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl">

                <div className="bg-[#14171C] border border-[#1D2127] rounded-md p-8 sm:p-10">

                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">Join the network</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#E8E6E3] mb-1">
                        CREATE ACCOUNT
                    </h1>
                    <p className="text-sm text-[#8B93A1] mb-8">
                        Register as a donor and get matched with requests near you.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                        {/* Avatar upload */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-full bg-[#191D23] border border-[#262B32] flex items-center justify-center overflow-hidden flex-shrink-0">
                                {avatarPreview ? (
                                    <Image src={avatarPreview} alt="Avatar preview" fill className="object-cover" />
                                ) : uploading ? (
                                    <Loader2 size={20} className="text-[#5B6270] animate-spin" />
                                ) : (
                                    <Upload size={18} className="text-[#5B6270]" />
                                )}
                            </div>
                            <div>
                                <label htmlFor="avatar" className="inline-block cursor-pointer text-[13px] font-semibold text-[#E8E6E3] border border-[#262B32] rounded-sm px-4 py-2 hover:border-[#5B6270] transition-colors">
                                    Upload photo
                                </label>
                                <input
                                    id="avatar"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                                <p className="text-[11px] text-[#5B6270] mt-1.5">PNG or JPG, up to 2MB</p>
                            </div>
                        </div>

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                placeholder="Mahdi Mesbah"
                                className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                            />
                            {errors.name && (
                                <p className="text-xs text-[#E63946] mt-1.5">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Enter a valid email address',
                                    },
                                })}
                                placeholder="you@example.com"
                                className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                            />
                            {errors.email && (
                                <p className="text-xs text-[#E63946] mt-1.5">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Blood group + District row */}
                        <div className="grid grid-cols-2 gap-4">
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

                            <div>
                                <label htmlFor="district" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                    District
                                </label>
                                <select
                                    id="district"
                                    defaultValue=""
                                    {...register('district', { required: 'District is required' })}
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 focus:outline-none focus:border-[#E63946] transition-colors appearance-none"
                                    style={{
                                        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%238B93A1' stroke-width='1.5'/%3E%3C/svg%3E\")",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'right 14px center',
                                    }}
                                >
                                    <option value="" disabled>Select</option>
                                    {districts.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                {errors.district && (
                                    <p className="text-xs text-[#E63946] mt-1.5">{errors.district.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Upazila */}
                        <div>
                            <label htmlFor="upazila" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                Upazila
                            </label>
                            <select
                                id="upazila"
                                disabled={!selectedDistrict}
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
                                    {selectedDistrict ? 'Select upazila' : 'Select a district first'}
                                </option>
                                {filteredUpazilas.map((u) => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                            {errors.upazila && (
                                <p className="text-xs text-[#E63946] mt-1.5">{errors.upazila.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                    })}
                                    placeholder="••••••••••"
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 pr-11 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6270] hover:text-[#8B93A1] transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-[#E63946] mt-1.5">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wide text-[#8B93A1] mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: (value) => value === watch('password') || 'Passwords do not match',
                                    })}
                                    placeholder="••••••••••"
                                    className="w-full bg-[#14171C] border border-[#262B32] text-[#E8E6E3] text-[15px] rounded-sm px-3.5 py-3 pr-11 placeholder:text-[#5B6270] focus:outline-none focus:border-[#E63946] focus:bg-[#171a1f] transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5B6270] hover:text-[#8B93A1] transition-colors"
                                    aria-label="Toggle confirm password visibility"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-[#E63946] mt-1.5">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#E63946] text-white text-sm font-semibold rounded-sm py-3.5 mt-2 hover:bg-[#d12d3a] transition-colors disabled:opacity-60"
                        >
                            {isSubmitting ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-[#8B93A1] mt-7">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#E63946] font-semibold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;