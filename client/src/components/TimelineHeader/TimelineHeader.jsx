import React , { useEffect, useState } from 'react';
import { FaChartLine } from "react-icons/fa6";
import Carex1 from "../../assets/img/carex.png";
import CarexLogo from "../../assets/img/carex_logo.png";
import { Link } from "react-router-dom";
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';
import axios from 'axios';
export default function TimelineHeader() {

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
      <div className="px-full sm:px-2 shadow">
        <div className="relative h-96 rounded-b flex justify-center">
          <img
            src={Carex1}
            className="object-cover w-full h-full rounded-b"
            alt="cover"
          />
          <div className="absolute -bottom-6 sm:left-6 -bottom-16">
            <img
              src={CarexLogo}
              className="object-cover border-2 border-gray-900 w-40 h-40 rounded-full"
              alt="cover"
            />
          </div>
        </div>
        <div className="flex justify-between mt-9">
          <div  className="text-center mt-6 mx-3 text-3xl font-bold text-fBlack justify-center">
          <p>{displayName}</p>
          <p className="font-normal text-sm">{userData.area_atuacao}</p>
          </div>
          <div  className="text-center mt-6 text-3xl font-bold text-fBlack justify-center">
            <Link to={"/editprofile"} className="text-sm text-fGrey bg-blue-500 px-2 py-1 rounded">Editar perfil</Link>
          </div>
        </div>
        <div className="border border-fGrey mt-6 border-opacity-10" />
        <div className="flex justify-between dmd:px-4 sm:px-8">
          <div className="flex items-center">
            <div className="px-2  text-fBlue border-b-4 border-fBlue md:px-4 py-5 ">
                <Link>Postagens</Link>          
            </div>
            <div className="px-1 py-5 text-fGrey  md:px-4 py-5 ">
              <Link>Conexões</Link>            
              </div>
            <div className="px-1 py-5 text-fGrey  md:px-4 py-5 ">
              <Link>Visualizações</Link>
              </div>
              <div className="px-1 py-5 text-fGrey  md:px-4 py-5 ">
              <Link to= "/services">Serviços</Link>
              </div>
          </div>
          <div className="flex items-center space-x-2 mr-2">          
            <Link to= "/dashboard" className=" px-1 py-2  h-9 bg-blue-500 rounded flex items-center justify-center focus:outline-none">
              < FaChartLine /> <span className="ml-1"> Dashboard</span>
            </Link>           
          </div>
        </div>
      </div>
    );
  }