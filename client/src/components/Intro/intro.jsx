import React, { useEffect, useState, useContext } from 'react';
import { FaSuitcase, FaHouse, FaLocationPin, FaRss } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';
import { AuthContext } from '../../context/AuthContext'; // Importe o contexto de autenticação

export function Intro() {
  const { user, userType } = useContext(AuthContext); // Obtenha o usuário e o tipo de usuário do contexto


  if (!user) {
    return (
      // Mostra "Loading..." enquanto os dados do usuário estão sendo carregados
      <div className="loading-container flex justify-center items-center h-screen">
        <img src={aguardar} alt="Loading..." className="loading-gif" />
      </div>
    );
  }


  return (
    <div className="shadow-fb rounded w-full bg-gray-800 p-4">
      <div className="text-xl font-bold text-fBlack">Sobre</div>
      <div className="mt-4 flex items-center">
        <FaSuitcase />
        <span className="ml-2">
         Área de Actuação <b>{user.AreaAtuacao}</b>
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaHouse />
        <span className="ml-2">
          NIF/BI: <b>  {userType === 'empresa' ? user.company?.NIF : user.entrepreneur?.BI}</b>
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaHouse />
        <span className="ml-2">
          <Link>{user.Endereco}</Link>
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaLocationPin />
        <span className="ml-2">
          {user.Provincia}, Angola
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaSuitcase />
        <span className="ml-2">
          Atuando há <b>{userType === 'empresa' ? user.company?.AnosDeExistencia : user.entrepreneur?.DataNascimento}</b> anos
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaRss />
        <span className="ml-2">
          Representente: <b><Link>{userType === 'empresa' ? user.company?.NomeRepresentante : user.entrepreneur?.Nome}</Link></b>
        </span>
      </div>
      <div className="mt-5 flex items-center justify-center">
        <Link className="text-center">
          Ver mais
        </Link>
      </div>
    </div>
  );
}
