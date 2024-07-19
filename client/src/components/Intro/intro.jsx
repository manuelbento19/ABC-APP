import React , { useEffect, useState } from 'react';
import { FaSuitcase, FaHouse, FaLocationPin, FaRss} from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';
import axios from 'axios';
export function Intro() {

  const [userData, setUserData] = useState(null); // Inicializa o estado userData como null
    const [userId, setUserId] = useState(null); // Estado para armazenar o userId
    useEffect(() => {
        // Função para buscar dados do usuário
        const fetchUserData = async () => {
            try {
                  // Obter o userId do localStorage
                const storedUserId = localStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(parseInt(storedUserId));
                const response = await axios.get(`http://localhost:3001/userdata?userId=${storedUserId}`);
                setUserData(response.data); // Atualiza o estado com os dados do usuário       
               
            } else {
                // Redirecionar para a página de login se o userId não existir
                window.location.href = '/login';
              }
            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error); // Lida com erros na solicitação
            }
        };

        fetchUserData(); // Chama a função para buscar os dados quando o componente monta
    }, []);

    if (!userData) {
      return (
        // Mostra "Loading..." enquanto os dados do usuário estão sendo carregados
      <div className="loading-container flex justify-center items-center h-screen">
        <img src={aguardar} alt="Loading..." className="loading-gif" />
      </div>
    );
  }

const { company, entrepreneur } = userData;
const displayName = company ? company.nome_empresa : (entrepreneur ? entrepreneur.nome : 'Nome não disponível');

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
          NIF: <b> {company.nif_empresa}</b>
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <FaHouse />
          <span className="ml-2">
           {userData.endereco}Edifício Azul <b> AP. 101 - 3º Andar </b>
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
            Actuando há <b> {company.ano_existencia}</b> anos      
          </span>
        </div>
        <div className="mt-4 flex items-center">
          <FaRss />
          <span className="ml-2">
            Numero de Conexões <b>97</b>
          </span>
        </div>
        <div className="mt-5 flex items-center justify-center">
       
          <Link className=" text-center">
           Ver mais
          </Link>
        </div>
      </div>
    );
  }