import React, { useState, useEffect } from 'react';
import { FaSuitcase, FaHouse, FaLocationPin, FaRss } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';

export function Intro() {
  // Dados simulados para o usuário
  const [userData, setUserData] = useState(null); // Inicializa o estado userData como null

  useEffect(() => {
    // Função para simular a obtenção dos dados do usuário
    const fetchUserData = () => {
      // Dados simulados
      const simulatedData = {
        company: {
          nome_empresa: 'Minha Empresa',
          nif_empresa: '123456789',
          ano_existencia: '10'
        },
        entrepreneur: null, // Dados de empreendedor não estão disponíveis
        title: 'Empresário',
        endereco: 'Rua da Liberdade',
        provincia: 'Luanda'
      };

      // Simula um atraso na obtenção dos dados
      setTimeout(() => {
        setUserData(simulatedData);
      }, 1000); // 1 segundo de atraso para simular carregamento
    };

    fetchUserData(); // Chama a função para simular a obtenção dos dados quando o componente monta
  }, []);

  if (!userData) {
    return (
      // Mostra "Loading..." enquanto os dados do usuário estão sendo carregados
      <div className="loading-container flex justify-center items-center h-screen">
        <img src={aguardar} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

  const { company } = userData;
  const displayName = company ? company.nome_empresa : 'Nome não disponível';

  return (
    <div className="shadow-fb rounded w-full bg-gray-800 p-4">
      <div className="text-xl font-bold text-fBlack">Sobre</div>
      <div className="mt-4 flex items-center">
        <FaSuitcase />
        <span className="ml-2">
          {userData.title}
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaHouse />
        <span className="ml-2">
          NIF: <b>{company.nif_empresa}</b>
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaHouse />
        <span className="ml-2">
          {userData.endereco} Edifício Azul <b>AP. 101 - 3º Andar</b>
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaLocationPin />
        <span className="ml-2">
          {userData.provincia}, Angola
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaSuitcase />
        <span className="ml-2">
          Atuando há <b>{company.ano_existencia}</b> anos
        </span>
      </div>
      <div className="mt-4 flex items-center">
        <FaRss />
        <span className="ml-2">
          Número de Conexões <b>97</b>
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
