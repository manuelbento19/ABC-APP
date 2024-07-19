import React , { useEffect, useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';
import { Bar, Line } from 'react-chartjs-2';
import CarexLogo from '../../assets/img/carex_logo.png';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function UserDashboard() {


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

  // Dados de exemplo para gráficos
  const viewsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Visualizações',
        data: [30, 45, 60, 40, 70, 80, 90, 100, 110, 120, 130, 140],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const connectionsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Conexões',
        data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Engajamento',
        data: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const likesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Curtidas',
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <PrincipalPage>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-white">Dashboard de Análise do Usuário</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <p className="text-white text-2xl font-bold">140</p>
            <p className="text-gray-400">Visualizações</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <p className="text-white text-2xl font-bold">60</p>
            <p className="text-gray-400">Conexões</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <p className="text-white text-2xl font-bold">1300</p>
            <p className="text-gray-400">Engajamento</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-md text-center transform transition-transform duration-300 hover:scale-105">
            <p className="text-white text-2xl font-bold">120</p>
            <p className="text-gray-400">Curtidas</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-bold mb-4 text-white">Visualizações ao longo do ano</h2>
            <div className="h-48 w-full">
              <Bar data={viewsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-bold mb-4 text-white">Conexões ao longo do ano</h2>
            <div className="h-48 w-full">
              <Line data={connectionsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-bold mb-4 text-white">Engajamento ao longo do ano</h2>
            <div className="h-48 w-full">
              <Line data={engagementData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-md shadow-md transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-xl font-bold mb-4 text-white">Curtidas ao longo do ano</h2>
            <div className="h-48 w-full">
              <Line data={likesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center mt-2">
          <div className="bg-gray-800 p-4 rounded-md shadow-md flex items-center transform transition-transform duration-300 hover:scale-105">
            <img src={CarexLogo} alt="User" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="text-white font-bold">{displayName}</p>
              <p className="text-gray-400">{userData.title}</p>
            </div>
          </div>
        </div>
      </div>
    </PrincipalPage>
  );
}
