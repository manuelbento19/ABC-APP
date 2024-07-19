import React, { useState } from 'react';
import { FaHome, 
         FaUsers, 
         FaEnvelope, 
         FaBell, 
         FaSearch, 
         FaBars, 
         FaTimes } from 'react-icons/fa';
import {Logo} from "../components/logo"; 
import CarexLogo from "../assets/img/carex_logo.png";
import { Link } from 'react-router-dom';
export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="w-screen h-16 bg-gray-900">
            <div className="h-5/6 max-w-screen-xl mx-auto pt-4 flex justify-between items-center px-4 sm:px-6 lg:px-11">
                <div className="flex items-center">
                        <Logo/>
                    <div className="ml-4 flex items-center relative">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            className="hidden bg-gray-700 focus-visible:ring-transparent border-0 sm:block h-8 w-40 sm:w-60 md:w-62 rounded-md pl-10"
                        />
                        <FaSearch className="hidden sm:block absolute left-2 text-gray-500" />
                        <FaSearch className="text-white block sm:hidden" />
                    </div>
                </div>
                <div className="sm:hidden">
                    <FaBars className="text-white text-xl cursor-pointer" onClick={handleToggleMenu} />
                </div>
                <div className="hidden sm:flex flex-col sm:flex-row space-x-0 sm:space-x-6 md:space-x-8">
                    <ul className="flex flex-col sm:flex-row list-none space-y-4 sm:space-y-0 sm:space-x-6 md:space-x-8">
                        <Link to="/userpage" className="flex flex-col justify-center items-center cursor-pointer">
                            <div className="cursor-pointer">
                                <FaHome className="text-white" />
                            </div>
                            <div className="text-xs mt-0 text-white">Home</div>
                        </Link>
                        <Link to="/connections" className="flex flex-col justify-center items-center cursor-pointer">
                            <div className="cursor-pointer">
                                <FaUsers className="text-white" />
                            </div>
                            <div className="text-xs mt-0 text-white">Conexões</div>
                        </Link>
                        
                        <Link to="/messages" className="flex flex-col justify-center items-center cursor-pointer">
                            <div className="cursor-pointer">
                                <FaEnvelope className="text-white" />
                            </div>
                            <div className="text-xs mt-0 text-white">Mensagem</div>
                        </Link>
                        <Link  to="/notification" className="flex flex-col justify-center items-center cursor-pointer">
                            <div className="cursor-pointer">
                                <FaBell className="text-white" />
                            </div>
                            <div className="text-xs mt-0 text-white">Notificação</div>
                        </Link>
                       <Link to="/profile" className="flex flex-col justify-center items-center cursor-pointer">
                            <div className="cursor-pointer">
                                <div className="w-5 h-5 rounded-full bg-gray-200">
                                    <img src={CarexLogo} className='rounded-full w-full h-full' alt="" />
                                </div>
                            </div>
                            <div className="text-xs mt-0 text-white">Perfil</div>
                        </Link>
                    </ul>
                </div>
            </div>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-slate-900  z-50 flex flex-col items-center justify-center p-4">
                    <FaTimes className="text-white text-2xl cursor-pointer absolute top-4 right-4" onClick={handleCloseMenu} />
                    <ul className="grid grid-cols-2 gap-8">
                        
                        <li className="flex flex-col justify-center items-center space-y-2">
                            <div className="cursor-pointer">
                                <FaSearch className="text-white text-4xl" />
                            </div>
                            <div className="text-lg mt-0 text-white">Pesquisar</div>
                        </li>
                        <li className="flex flex-col justify-center items-center space-y-2">
                            <div className="cursor-pointer">
                                <FaHome className="text-white text-4xl" />
                            </div>
                            <div className="text-lg mt-0 text-white">Home</div>
                        </li>
                        <Link to="/connections" className="flex flex-col justify-center items-center space-y-2">
                            <div className="cursor-pointer">
                                <FaUsers className="text-white text-4xl" />
                            </div>
                            <div className="text-lg mt-0 text-white">Conexões</div>
                        </Link>
                        
                        <Link to="/messages" className="flex flex-col justify-center items-center space-y-2">
                            <div className="cursor-pointer">
                                <FaEnvelope className="text-white text-4xl" />
                            </div>
                            <div className="text-lg mt-0 text-white">Mensagem</div>
                        </Link>
                        <Link to="/notification" className="flex flex-col justify-center items-center space-y-2">
                            <div className="cursor-pointer">
                                <FaBell className="text-white text-4xl" />
                            </div>
                            <div className="text-lg mt-0 text-white">Notificação</div>
                        </Link>
                        <Link to="/profile" className="flex flex-col justify-center items-center space-y-2">
                            <div className="cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-gray-200">
                                    <img src={CarexLogo} className="rounded-full w-full h-full" alt="" />
                                </div>
                            </div>
                            <div className="text-lg mt-0 text-white">Perfil</div>
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}
