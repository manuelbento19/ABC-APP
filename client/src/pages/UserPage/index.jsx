import React, { useEffect, useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';
import "./userpage.css";
import Carex1 from "../../assets/img/carex.png";
import CarexLogo from "../../assets/img/carex_logo.png";
import { CreatePost } from '../../components/CreatePost/CreatePost';
import { MainPost } from '../../components/MainPost/MainPost';
import { Link } from 'react-router-dom';
import axios from 'axios';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';

export function UserPage() {
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
        <PrincipalPage>
            <div className="home-page-cards flex flex-col lg:flex-row justify-between rounded-md">
                <div className="home-page-col-one bg-gray-800 rounded-md hidden lg:block w-full lg:w-1/5 h-96">
                    <div className="col-card-one-img1 mb-4">
                        <img src={Carex1} alt="" className="w-full h-32 object-cover"/>
                    </div>
                    <div className="col-card-onde-img2 relative flex justify-center items-center mb-4">
                        <img src={CarexLogo} alt="" className="w-20 h-20 rounded-full absolute -top-10"/>
                    </div>
                    <div className="parte-name-empresa text-center text-white font-bold mt-5 mb-1">
                        <h1><Link to="/edit-profile" className="text-lg  hover:underline">{displayName}</Link></h1>
                    </div>
                    <div className="parte-descricao-empresa text-center text-white mb-2">
                        <p>{userData.title}</p>
                    </div>
                    <div className="hr-line w-full h-px bg-gray-600 my-2"></div>
                    <div className="whoviewurprofilesec text-white">

                    <div className="flex justify-between text-blue-400 mb-2 px-2 hover:cursor-pointer">
                            <span className='text-white'>Área de Actuação:</span>
                            <span className='text-nowrap'>{userData.area_atuacao}</span>
                        </div>
                        <div className="flex justify-between text-blue-400 mb-2 px-2 hover:cursor-pointer">
                            <span className='text-white'>Visualização do Perfil:</span>
                            <span>40</span>
                        </div>
                        <div className="flex justify-between text-blue-400 px-2 hover:cursor-pointer">
                            <span className='text-white'><Link to={"/connections"}>Conexões:</Link></span>
                            <span><Link to="/connections">60</Link></span>
                        </div>
                    </div>
                    <div className="hr-line w-full h-px bg-gray-600 my-2"></div>
                   
                        <div className="flex justify-center text-blue-400 mb-2 px-2 hover:cursor-pointer">
                            <span><Link to="/dashboard">Dashboard de Análise </Link></span>
                                      
                    </div>
                    <div className="flex justify-center text-white hover:cursor-pointer">
                        <Link to="/profile">Ver mais</Link>
                    </div>
                </div>
               
                <div className="home-page-col-two w-full lg:w-3/5 bg-gray-800 rounded-md">
                    <CreatePost />
                    <MainPost />
                </div>
                <div className="home-page-col-three w-full lg:w-1/5 bg-gray-800 rounded-md mt-4 lg:mt-0">
                    {/* Adicione conteúdo adicional para a terceira coluna, se necessário */}
                </div>
            </div>
        </PrincipalPage>
    );
}
