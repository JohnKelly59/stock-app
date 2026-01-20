import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-900 pt-6 sm:justify-center sm:pt-0 selection:bg-yellow-500 selection:text-black">
            <div>
                <Link href="/">
                    <div className="transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">
                        <ApplicationLogo className="h-24 w-auto fill-current text-yellow-500" />
                    </div>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-gray-800 border-2 border-gray-700 px-6 py-4 shadow-2xl shadow-black sm:max-w-md sm:rounded-lg relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-yellow-600 to-gray-800 opacity-80"></div>
                {children}
            </div>
        </div>
    );
}