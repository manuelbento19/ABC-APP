import React, { useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';

export function ConnectionsPage() {
  // Estado inicial das conexões
  const [connections, setConnections] = useState([
    { id: 1, name: 'User1', photo: 'https://via.placeholder.com/50', businessTitle: 'Desenvolvedor Web' },
    { id: 2, name: 'User2', photo: 'https://via.placeholder.com/50', businessTitle: 'Designer Gráfico' },
    { id: 3, name: 'User3', photo: 'https://via.placeholder.com/50', businessTitle: 'Consultor de Marketing' },
    // Adicione mais conexões conforme necessário
  ]);

  return (
    <PrincipalPage>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Conexões</h1>
        {/* Grid responsivo para exibição das conexões */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {connections.map(connection => (
            <div key={connection.id} className="bg-gray-800 p-4 rounded-md shadow-md flex items-center">
              <img src={connection.photo} alt={connection.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-white font-bold">{connection.name}</p>
                <p className="text-gray-400 text-sm">{connection.businessTitle}</p>
                <button className="mt-2 bg-blue-500 text-white py-1 px-3 rounded-md">Ver Perfil</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PrincipalPage>
  );
}
