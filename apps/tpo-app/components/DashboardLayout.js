'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export function DashboardLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.clear();
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push('/login');
    };

    const isActive = (path) => pathname === path;

    return (
        <div className="min-h-screen bg-[#e8edff] flex">
            <aside className="w-64 bg-white shadow-lg rounded-r-3xl min-h-screen flex flex-col fixed h-full z-10 hidden lg:flex">
                <div className="p-6 mb-4">
                    <div className="text-2xl font-bold text-blue-700">TPO App</div>
                    <div className="h-1 w-20 bg-blue-100 rounded mt-2"></div>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto text-slate-600">
                    <Link href="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard') ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-slate-50 hover:text-blue-600'}`}>
                        Dashboard
                    </Link>
                    <Link href="/dashboard/exams" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard/exams') ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-slate-50 hover:text-blue-600'}`}>
                        Manage Exams
                    </Link>
                    <Link href="/dashboard/tint" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard/tint') ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-slate-50 hover:text-blue-600'}`}>
                        TINT toolkit
                    </Link>
                    <Link href="/dashboard/students" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${isActive('/dashboard/students') ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-slate-50 hover:text-blue-600'}`}>
                        Students
                    </Link>
                </nav>

                <div className="p-4 mt-auto">
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors">
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 lg:ml-64 p-4 lg:p-10">
                {children}
            </main>
        </div>
    );
}
