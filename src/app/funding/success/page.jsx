import Link from 'next/link';

export default function FundingSuccess() {
    return (
        <div className="bg-[#0B0D10] min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-sm">
                <div className="w-14 h-14 rounded-full bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-emerald-400 text-2xl">✓</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#E63946]">
                        Payment confirmed
                    </span>
                </div>
                <h1 className="text-3xl font-bold uppercase text-[#E8E6E3] mb-3">Thank you!</h1>
                <p className="text-[#8B93A1] text-sm mb-8">
                    Your donation helps keep DonorNet running and saves more lives every day.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-[#E63946] text-white text-sm font-semibold rounded-sm px-7 py-3.5 hover:bg-[#d12d3a] transition-colors"
                >
                    Back to home
                </Link>
            </div>
        </div>
    );
}