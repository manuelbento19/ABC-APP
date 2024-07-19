import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Logo } from "../logo"; 

const Links = [
    {
        title: "Sobre nós",
        path: "/sobrenos"
    },
    {
        title: "Serviços",
        path: "/servicos"
    },
    {
        title: "Benefícios",
        path: "/beneficios"
    },
    {
        title: "Perguntas Frequentes",
        path: "/faqs"
    }
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isAuthenticated = false; // Defina esta variável com base no estado de autenticação do usuário

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Logo />
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-50"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {Links.map((item) => (
                        <Link key={item.title} to={item.path} className="text-sm hover:transition-transform hover:scale-105 font-semibold leading-6 text-gray-50">
                            {item.title}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isAuthenticated ? (
                        <div className="sm:flex sm:gap-4">
                            <Link to="/userpage" className="border-0 px-5 py-2.5 text-sm font-medium text-white">
                                User Page
                            </Link>
                            <Link to="/profile" className="border-0 px-5 py-2.5 text-sm font-medium text-white">
                                Profile
                            </Link>
                            <Link to="/logout" className="border-0 px-5 py-2.5 text-sm font-medium text-white">
                                Logout
                            </Link>
                        </div>
                    ) : (
                        <div className="sm:flex sm:gap-4">
                            <Link to="/login" className="border-0 px-5 py-2.5 text-sm font-medium text-white hover:transition-transform hover:scale-105 ">
                                Login
                            </Link>
                            <Link to="/register" className="hidden sm:block rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:transition-transform hover:scale-105 ">
                                Registrar
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5">
                            <div className="flex lg:flex-1">
                                <Logo />
                            </div>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-200/10">
                            <div className="space-y-2 py-6">
                                {Links.map((item) => (
                                    <Link
                                        key={item.title}
                                        to={item.path}
                                        className="text-center -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-800"
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                {isAuthenticated ? (
                                    <div className="sm:flex sm:gap-4">
                                        <Link to="/userpage" className="border-0 px-5 py-2.5 text-sm font-bold text-white">
                                            User Page
                                        </Link>
                                        <Link to="/profile" className="border-0 px-5 py-2.5 text-sm font-bold text-white">
                                            Profile
                                        </Link>
                                        <Link to="/logout" className="border-0 px-5 py-2.5 text-sm font-bold text-white">
                                            Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="sm:flex text-center m-auto justify-center  sm:gap-4">
                                        <Link to="/login" className="border-0 px-5 py-2.5 text-sm font-bold text-white hover:bg-gray-800 rounded-full">
                                            Login
                                        </Link>
                                        <Link to="/register" className="sm:block rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
                                            Registrar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
