import React, { useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';

export function NotificationsPage() {


  // Estado inicial das notificações
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: {
        name: 'Nvuala Carvalho',
        photo: 'https://media.licdn.com/dms/image/D4D03AQFAjv79Ir6zdA/profile-displayphoto-shrink_200_200/0/1718754759947?e=1728518400&v=beta&t=ndt-xkmPCBT-Oq9XeI0QTBSH3Z8Ms-z0NbmJF4Xxeho',
      },
      action: 'enviou uma mensagem para você.',
      timestamp: 'Há 5 minutos'
    },
    {
      id: 2,
      user: {
        name: 'Anderson Cláudio',
        photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGrnbkRmvZXsA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692366030427?e=1728518400&v=beta&t=l2qBgkpUf-B6cm7jAMWavTyE4pHGaAHBBh9NXquxf20',
      },
      action: 'curtiu seu post.',
      timestamp: 'Há 1 hora'
    },
    {
      id: 3,
      user: {
        name: 'Antónia Correia',
        photo: 'https://scontent.flad5-1.fna.fbcdn.net/v/t39.30808-1/451817154_2634452000095432_3332108836201296239_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH5ciJkGtawThqV1fl-g2Xotsih7pqTuYu2yKHumpO5i1n7XvXnT65_4ZTTMqR_45kbSM5JfRlPMOnROE5sqPYO&_nc_ohc=wAuHoW6LTzUQ7kNvgGlBI57&_nc_ht=scontent.flad5-1.fna&oh=00_AYDZeFNEYKXUStXrR4JaGTHFSImJlDfyoHsFGME5aGs3Fg&oe=66B894DC',
      },
      action: 'colaborou em seu projeto.',
      timestamp: 'Ontem'
    },
    {
      id: 4,
      user: {
        name: 'NK Studios',
        photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/386714669_736538265154826_624115839537383763_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQp6wprYeOzw33SHC6UOas588j2CvngDrnzyPYK-eAOuCy_sQTT5wc7l2ZcOJz3pKP_1L86Utd4CMyX3byd9WI&_nc_ohc=-TAxeAsxoGgQ7kNvgFMvqjp&_nc_ht=scontent-cpt1-1.xx&oh=00_AYC2Lnjq-U1x9fw2DPcCeAulnA2G64JIORcu3SIqqXrNmA&oe=66B88951',
      },
      action: 'solicitou uma conexão com você.',
      timestamp: 'Ontem'
    },
    {
      id: 5,
      user: {
        name: 'Dulce Essência',
        photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-1/420533027_395159103075800_1923544649295569843_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeEGMdrPSvxncpfIjv2FBZtUBdM3oRi_YbMF0zehGL9hsyqeqsXo-zX_uctQIA2qlhSuDEP0zXmbotGvVxpa9PPO&_nc_ohc=vfgnSeu9IHsQ7kNvgFQdXcS&_nc_ht=scontent-cpt1-1.xx&oh=00_AYAjidp49j1uWWVKZZfH3AzwPAH2TZ1Tq6vTQvdXN7oKsw&oe=66B8B4AF',
      },
      action: 'comentou em seu post.',
      timestamp: 'Há 2 dias'
    },
    {
      id: 6,
      user: {
        name: 'HakyOff',
        photo: 'https://media.licdn.com/dms/image/D4D0BAQExvMmxdJTddw/company-logo_200_200/0/1718787464485?e=1730937600&v=beta&t=5ejZ4rxSAO9KqrupS-uhmQEpOxwQe4c0oY7Z6xHME6w',
      },
      action: 'compartilhou seu post.',
      timestamp: 'Há 3 dias'
    },
    {
      id: 7,
      user: {
        name: 'Henriques Monachina',
        photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-1/449434613_3711299895811176_7556353327586688586_n.jpg?stp=c0.6.200.200a_dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeGSX0fqwdH0QDBCziU9xyyEeQZo3eojVz15Bmjd6iNXPW1EjLl_BJbvdxnsfv8BlErv0Tb36kqhNp-XQwAJl4Lh&_nc_ohc=A9gErqCBCTkQ7kNvgG3E0Ba&_nc_ht=scontent-cpt1-1.xx&oh=00_AYBsWU6y--o_-DskiyJSEJisYBMTIijPGaNMf3Qu8e-nJA&oe=66B8BA9F',
      },
      action: 'visualizou seu perfil.',
      timestamp: 'Há 4 dias'
    },
    {
      id: 8,
      user: {
        name: 'Josué Pedro',
        photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-1/432671586_3601623260051284_7420052142528031816_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFdZTlIG89egglRELveNpMs95251iZQYhr3nbnWJlBiGmhANKFGU1dzx9j8k-6XrrZdWMb5e-yenVRLng6prNlX&_nc_ohc=NrXPx1vRn6sQ7kNvgER9E1l&_nc_ht=scontent-cpt1-1.xx&oh=00_AYAia4xLSB8__cInepjE6F8MbeETxAPbJcIS2asM3zDkWw&oe=66B8A9D7',
      },
      action: 'colaborou em um projeto em comum.',
      timestamp: 'Há 5 dias'
    },
  ]);

  return (
    <PrincipalPage>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Notificações</h1>
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
          {/* Lista de notificações */}
          <ul className="divide-y divide-gray-700">
            {notifications.map(notification => (
              <li key={notification.id} className="py-4 flex items-center">
                <img 
                  src={notification.user.photo} 
                  alt={notification.user.name} 
                  className="w-10 h-10 rounded-full mr-3" 
                />
                <div>
                  <p className="text-white font-medium">{notification.user.name}</p>
                  <p className="text-gray-400">{notification.action}</p>
                </div>
                <span className="text-gray-400 ml-auto">{notification.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PrincipalPage>
  );
}