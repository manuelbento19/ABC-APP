import React, { useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';
import { FaUserCircle, FaCommentDots } from 'react-icons/fa';

export function ChatsPage() {
  // Estado inicial das conversas

  return (
    <PrincipalPage>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Chats</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {chats.map(chat => (
            <div
              key={chat.id}
              className="bg-gray-800 p-4 rounded-md shadow-md flex items-center transform transition-transform duration-300 hover:scale-105"
            >
              <FaUserCircle className="text-4xl text-blue-500 mr-4" />
              <div>
                <p className="text-white font-bold">{chat.user}</p>
                <div className="flex items-center">
                  <FaCommentDots className="text-gray-400 mr-2" />
                  <p className="text-gray-400">{chat.messages[chat.messages.length - 1]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PrincipalPage>
  );
}
