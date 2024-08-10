import{ React, useState} from 'react';
import TimelineHeader from "../../components/TimelineHeader/TimelineHeader";
import { PrincipalPage } from '../../layout/principalPage';
import { Intro } from '../../components/Intro/intro';
import { CreatePost } from '../../components/CreatePost/CreatePost';
import { MainPost } from '../../components/MainPost/MainPost';
import { ConnectionsPage } from "../../pages/ConnectioPage";
import { ServicesPage } from "../../pages/ServicePage";
import { UserDashboard } from '../UserDashboard';
import { FaCaretDown } from 'react-icons/fa'; // Importe o ícone de seta

export function UserProfile() {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [showDropdown, setShowDropdown] = useState(false); // Estado para o dropdown

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setShowDropdown(false); // Fecha o dropdown
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <PrincipalPage>
      <TimelineHeader />
      <div className="grid grid-cols-1 lg:grid-cols-12 pt-4 gap-4 z-0 pb-56">
        <div className="col-span-1 lg:col-span-4 lg:col-start-1 space-y-4">
          <Intro />
        </div>
        <div className="col-span-1 lg:col-span-8 lg:col-start-5 space-y-4">
          {/* Renderizar os componentes de acordo com a URL */}
          <CreatePost /> 
     
      <div className='border border-gray-700 flex justify-between'>
      <div className="relative inline-block ">
      <button
        className="bg-gray-700 text-white px-4 py-2  hover:bg-gray-600 justify-items-end"
        onClick={toggleDropdown}
      >
        {activeFilter} <FaCaretDown className="ml-2 m-auto" /> 
      </button>
      {showDropdown && ( // Renderiza o dropdown se showDropdown for true
        <div className="absolute z-10 mt-2 rounded-md shadow-lg bg-gray-800">
          <ul className="p-2">
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${activeFilter === 'todos' ? 'bg-blue-500' : ''}`}
              onClick={() => handleFilterClick('todos')}
            >
              Todos
            </li>
           
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${activeFilter === 'startup' ? 'bg-blue-500' : ''}`}
              onClick={() => handleFilterClick('startup')}
            >
              Startup
            </li>
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${activeFilter === 'eventos' ? 'bg-blue-500' : ''}`}
              onClick={() => handleFilterClick('eventos')}
            >
              Eventos
            </li>
            <li
              className={`px-4 py-2 rounded-md hover:bg-gray-700 ${activeFilter === 'salas De Negocios' ? 'bg-blue-500' : ''}`}
              onClick={() => handleFilterClick('salasDeNegocios')}
            >
              salas De Negocios
            </li>
          </ul>
        </div>
      )}
    </div>
    </div> 
          {window.location.pathname === '/connections' && <ConnectionsPage />}
          {window.location.pathname === '/views' && <UserDashboard />}
          {window.location.pathname === '/services' && <ServicesPage />}

          <MainPost filter={activeFilter} /> 
        </div>
      </div>
    </PrincipalPage>
  );
}