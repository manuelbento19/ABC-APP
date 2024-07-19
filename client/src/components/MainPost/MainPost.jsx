
import React  , { useEffect, useState } from 'react';
import CarexLogo from "../../assets/img/carex_logo.png";
import {FaThumbsUp, FaShare, FaChevronCircleRight } from 'react-icons/fa';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';
import axios from 'axios';

export function MainPost() {
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
        <div className="containerPost bg-gray-900 border border-gray-700 rounded-md p-4">
                        <div className="whoViewdPost flex justify-between text-gray-400 ">
                            <span className='whoViewdPostName cursor-pointer'><span className="text-white font-semibold">Nvuala Carvalho</span> comentou isto</span>
                            <span className='whoViewdPostDots text-white cursor-pointer'>...</span>
                        </div>
                        <div className="hr-line w-full h-px bg-gray-600 my-1"></div>
                        <div className="userPostDetails flex items-center mb-1">
                            <img src={CarexLogo} alt="" className="w-12 h-12 rounded-full"/>
                            <div className="userPostMainDetails ml-4">
                                <span className="userDetailsNamePost text-white font-semibold cursor-pointer">{displayName}</span>
                                <span className="userDetails-about text-gray-400 text-sm">{userData.title}</span>
                            </div>
                        </div>
                        <div className="mainFeedPost text-white mb-2 text-justify">
                            <p className="mb-4">A empresa em si é uma empresa de muito sucesso. 
                            Você nos deve isso, quão maior é essa grande escolha para nós? 
                            E quando com o presente acusamos o exercício da mais digna distinção, 
                            o prazer da flexibilidade de algo cego?</p>
                            <img src={CarexLogo} alt="" className="w-full"/>
                        </div>
                        <div className="flex justify-evenly items-center mb-4">
                            <button className="flex items-center text-blue-400"><FaThumbsUp className="mr-2"/> Curtir</button>
                            <button className="flex items-center text-blue-400"><FaShare className="mr-2"/> Compartilhar</button>
                        </div>
                        <div className="bg-gray-800 rounded-md p-2 mb-2 flex justify-between">
                            <input type="text" placeholder='Comentar...' className="w-full h-10 rounded-full pl-4 border border-gray-600 bg-gray-600 text-white"/>
                            <button className='text-blue-400 text-3xl ml-2'><FaChevronCircleRight/></button>
                        </div>
                        <div className="bg-gray-800 rounded-md p-2 mb-2">
                            <div className="flex justify-between text-gray-400 mb-2 text-sm">
                                <span className="text-white font-bold">Nvuala Carvalho</span>
                                <button className="text-blue-400"><FaThumbsUp className="mr-2"/></button>
                            </div>
                            <p className="text-white text-sm"> Já aderi muitos dos serviços da Carex, e são excelentes.</p>
                        </div>
                        <div className="bg-gray-800 rounded-md p-2">
                            <div className="flex justify-between text-gray-400 mb-2 text-sm">
                                <span className="text-white font-bold">Anderson Cláudio</span>
                                <button className="text-blue-400"><FaThumbsUp className="mr-2"/></button>
                            </div>
                            <p className="text-white text-sm">Serviço de excelência</p>
                        </div>
                    </div>
    );
}