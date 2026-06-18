"use client";

import { Button } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { authClient } from '../lib/auth-client';

const LoginPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        console.log(data);

        const { data: signInData, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password
        });

        if (error) {
            console.log("FULL ERROR:", JSON.stringify(error, null, 2));
            toast.error('Login failed: ' + error.message);
        } else {
            console.log('Sign-in successful:', signInData);
            toast.success('Login successful!');
            router.push('/');
        }
    };

    return (
        <div className=" bg-[#0B0D10] flex items-center justify-center px-4 min-h-screen">
            <div className="w-full max-w-md">

                <div className="bg-[#14171C] border border-[#1D2127] rounded-md p-8 sm:p-10">

                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] shadow-[0_0_0_3px_rgba(230,57,70,0.14)]" />
                        <span className="text-[11px] font-mono uppercase tracking-wider text-[#E63946]">Donor & staff access</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#E8E6E3] mb-1">
                        SIGN IN
                    </h1>
                    <p className="text-sm text-[#8B93A1] mb-8">
                        Enter your credentials to access your donor profile or hospital dashboard.
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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
                                        minLength: { value: 8, message: 'Password must be at least 6 characters' },
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
                        </div>



                        <Button
                            type="submit"
                            className="w-full bg-[#E63946] text-white text-sm font-semibold rounded-sm py-3.5 mt-2 hover:bg-[#d12d3a] transition-colors"
                        >
                            Sign in
                        </Button>
                    </form>

                    <p className="text-center text-sm text-[#8B93A1] mt-7">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-[#E63946] font-semibold hover:underline">
                            Register as a donor
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;