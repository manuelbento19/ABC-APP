import React, { useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';

export function NotificationsPage() {
  // Estado inicial das notificações
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Nova mensagem recebida de User1' },
    { id: 2, text: 'User2 curtiu seu post' },
    { id: 3, text: 'Você foi marcado em uma foto' },
    // Adicione mais notificações conforme necessário
  ]);

  return (
    <PrincipalPage>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Notificações</h1>
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          {/* Lista de notificações */}
          <ul className="divide-y divide-gray-700">
            {notifications.map(notification => (
              <li key={notification.id} className="py-4">
                <p className="text-white">{notification.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PrincipalPage>
  );
}
