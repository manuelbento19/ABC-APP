import React, { useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';
import { FaCommentDots } from 'react-icons/fa';

export function ChatsPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]); // Inicialmente vazio
  const [newMessage, setNewMessage] = useState('');

  const users = [
    { id: 1, name: 'Nvuala Carvalho', photo: 'https://media.licdn.com/dms/image/D4D03AQFAjv79Ir6zdA/profile-displayphoto-shrink_200_200/0/1718754759947?e=1728518400&v=beta&t=ndt-xkmPCBT-Oq9XeI0QTBSH3Z8Ms-z0NbmJF4Xxeho', businessTitle: 'Analista de Dados' },
    { id: 2, name: 'Anderson Cláudio', photo: 'https://media.licdn.com/dms/image/v2/D4D03AQGrnbkRmvZXsA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692366030427?e=1728518400&v=beta&t=l2qBgkpUf-B6cm7jAMWavTyE4pHGaAHBBh9NXquxf20', businessTitle: 'Desenvolvedor' },
    { id: 3, name: 'Antónia Correia', photo: 'https://scontent.flad5-1.fna.fbcdn.net/v/t39.30808-1/451817154_2634452000095432_3332108836201296239_n.jpg?stp=c0.0.200.200a_dst-jpg_p200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH5ciJkGtawThqV1fl-g2Xotsih7pqTuYu2yKHumpO5i1n7XvXnT65_4ZTTMqR_45kbSM5JfRlPMOnROE5sqPYO&_nc_ohc=wAuHoW6LTzUQ7kNvgGlBI57&_nc_ht=scontent.flad5-1.fna&oh=00_AYDZeFNEYKXUStXrR4JaGTHFSImJlDfyoHsFGME5aGs3Fg&oe=66B894DC', businessTitle: 'Engenheira de Redes' },

    // Empresas
    { id: 4, name: 'NK Studios', photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/386714669_736538265154826_624115839537383763_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHQp6wprYeOzw33SHC6UOas588j2CvngDrnzyPYK-eAOuCy_sQTT5wc7l2ZcOJz3pKP_1L86Utd4CMyX3byd9WI&_nc_ohc=-TAxeAsxoGgQ7kNvgFMvqjp&_nc_ht=scontent-cpt1-1.xx&oh=00_AYC2Lnjq-U1x9fw2DPcCeAulnA2G64JIORcu3SIqqXrNmA&oe=66B88951', businessTitle: 'Fotografia' },
    { id: 5, name: 'Dulce Essência', photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-1/420533027_395159103075800_1923544649295569843_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeEGMdrPSvxncpfIjv2FBZtUBdM3oRi_YbMF0zehGL9hsyqeqsXo-zX_uctQIA2qlhSuDEP0zXmbotGvVxpa9PPO&_nc_ohc=vfgnSeu9IHsQ7kNvgFQdXcS&_nc_ht=scontent-cpt1-1.xx&oh=00_AYAjidp49j1uWWVKZZfH3AzwPAH2TZ1Tq6vTQvdXN7oKsw&oe=66B8B4AF', businessTitle: 'Beleza e Cosméticos' },
    { id: 6, name: 'HakyOff', photo: 'https://media.licdn.com/dms/image/D4D0BAQExvMmxdJTddw/company-logo_200_200/0/1718787464485?e=1730937600&v=beta&t=5ejZ4rxSAO9KqrupS-uhmQEpOxwQe4c0oY7Z6xHME6w', businessTitle: 'Cibersegurança' },
    { id: 7, name: 'Henriques Monachina', photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-1/449434613_3711299895811176_7556353327586688586_n.jpg?stp=c0.6.200.200a_dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=50d2ac&_nc_eui2=AeGSX0fqwdH0QDBCziU9xyyEeQZo3eojVz15Bmjd6iNXPW1EjLl_BJbvdxnsfv8BlErv0Tb36kqhNp-XQwAJl4Lh&_nc_ohc=A9gErqCBCTkQ7kNvgG3E0Ba&_nc_ht=scontent-cpt1-1.xx&oh=00_AYBsWU6y--o_-DskiyJSEJisYBMTIijPGaNMf3Qu8e-nJA&oe=66B8BA9F', businessTitle: 'Engenheiro Informático' },
    { id: 8, name: 'Josué Pedro', photo: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-1/432671586_3601623260051284_7420052142528031816_n.jpg?stp=dst-jpg_p200x200&_nc_cat=101&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFdZTlIG89egglRELveNpMs95251iZQYhr3nbnWJlBiGmhANKFGU1dzx9j8k-6XrrZdWMb5e-yenVRLng6prNlX&_nc_ohc=NrXPx1vRn6sQ7kNvgER9E1l&_nc_ht=scontent-cpt1-1.xx&oh=00_AYAia4xLSB8__cInepjE6F8MbeETxAPbJcIS2asM3zDkWw&oe=66B8A9D7', businessTitle: 'Desenvolvedor PHP' },
  ];

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages([
      { sender: 'Você', message: 'Olá!', timestamp: 'Agora' },
      { sender: user.name, message: 'Oi! Tudo bem?', timestamp: 'Agora' },
    ]); // Inicialize as mensagens quando o usuário é selecionado
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([
        ...messages,
        { sender: 'Você', message: newMessage, timestamp: 'Agora' },
      ]);
      setNewMessage('');
    }
  };

  return (
    <PrincipalPage>
      <div className="bg-gray-800 min-h-screen p-4 rounded-md">
        <h2 className="text-white text-2xl font-bold mb-4">Mensagens</h2>

        <div className="flex mb-4">
          <div className="flex flex-col w-1/3">
            <h3 className="text-white text-lg font-bold mb-2">Contatos</h3>
            <ul className="list-none p-0">
              {users.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center py-2 px-3 rounded-md hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleUserSelect(user)}
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-white hidden sm:block">{user.name}</span>
                </li>
              ))}
            </ul>
          </div>
             <div className='border-l-2 border-gray-700'> </div> 
          <div className="w-2/3 ml-4 mt-11">
            {selectedUser ? (
              <>
                <div className="flex items-center mb-2">
                  <img
                    src={selectedUser.photo}
                    alt={selectedUser.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <h3 className="text-white text-lg font-bold ">{selectedUser.name}</h3>
                </div>

                <div className="messages-container overflow-y-auto max-h-96">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message-item flex items-center mb-2 ${
                      message.sender === 'Você' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`message-bubble bg-gray-700 text-white p-3 rounded-md ${
                          message.sender === 'Você'
                          ? 'bg-blue-500 text-white ml-auto'
                          : 'bg-gray-700 text-white'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="input-container flex flex-col mt-4 sm:flex-row">
                  <input
                    type="text"
                    className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 flex-grow mb-2 sm:mb-0"
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    className="bg-blue-500 text-white w-24 py-2 mt-2 rounded-md ml-2 hover:bg-blue-600 sm:px-4"
                    onClick={handleSendMessage}
                  >
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <FaCommentDots className="text-white text-4xl" />
                <p className="text-white text-lg ml-4">Selecione um contato para iniciar uma conversa</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </PrincipalPage>
  );
}