import CapaDefault from "../../assets/img/CapaDefoult.jpg";
import ProfileDefault from "../../assets/img//profileDefoult.png";
import React, { useEffect, useState, useContext } from 'react';
import { FaChartLine } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';
import { AuthContext } from '../../context/AuthContext'; // Importe o contexto de autenticação

export default function TimelineHeader() {
  const { user, userType } = useContext(AuthContext); // Obtenha o usuário e o tipo de usuário do contexto
  const location = useLocation(); // Obter o path da URL atual

  if (!user) {
    return (
      <div className="loading-container flex justify-center items-center h-screen">
        <img src={aguardar} alt="Loading..." className="loading-gif" />
      </div>
    );
  }
  return (
    <div className="px-full sm:px-2 shadow">
      <div className="relative h-96 rounded-b flex justify-center">
        <img
          src={user.FotoCapa ? user.FotoCapa : CapaDefault}
          className="object-cover w-full h-full rounded-b"
          alt="cover"
        />
        <div className="absolute -bottom-6 sm:left-6 -bottom-16">
          <img
            src={user.FotoPerfil ? user.FotoPerfil : ProfileDefault}
            className="object-cover border-2 border-gray-900 w-40 h-40 rounded-full"
            alt="cover"
          />
        </div>
      </div>
      <div className="flex justify-between mt-9">
        <div className="text-center mt-6 mx-3 text-3xl font-bold text-fBlack justify-center">
          <p> {userType === 'empresa' ? user.company?.NomeEmpresa : user.entrepreneur?.Nome}</p>
          <p className="font-normal text-sm">{user.tipo}</p>
        </div>
        <div className="text-center mt-6 text-3xl font-bold text-fBlack justify-center">
          <Link to={"/editprofile"} className="text-sm text-fGrey bg-blue-500 px-2 py-1 rounded">Editar perfil</Link>
        </div>
      </div>
      <div className="border border-fGrey mt-6 border-opacity-10" />
      <div className="flex justify-between dmd:px-4 sm:px-8">
        <div className="flex items-center">
          <div className={`px-2 text-fBlue border-b-4 border-fBlue md:px-4 py-5`}> {/* Adicione a classe 'active' */}
            <Link to="/">Postagens</Link>
          </div>
          <div className={`px-1 py-5 text-fGrey md:px-4 ${location.pathname === '/connections' ? 'active' : ''}`}> {/* Adicione a classe 'active' */}
            <Link to="/connections">Conexões</Link>
          </div>
          <div className={`px-1 py-5 text-fGrey md:px-4 ${location.pathname === '/views' ? 'active' : ''}`}> {/* Adicione a classe 'active' */}
            <Link to="/views">Visualizações</Link>
          </div>
          <div className={`px-1 py-5 text-fGrey md:px-4 ${location.pathname === '/services' ? 'active' : ''}`}> {/* Adicione a classe 'active' */}
            <Link to="/services">Serviços</Link>
          </div>
        </div>
        <div className={`px-1 py-5 text-fGrey md:px-4 ${location.pathname === '/dashboard' ? 'active' : ''}`}>
          <Link to="/dashboard" className="px-1 py-2 h-9 bg-blue-500 rounded flex items-center justify-center focus:outline-none">
            <FaChartLine /> <span className="ml-1">Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}