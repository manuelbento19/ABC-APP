import React, { useState } from "react";
import CarexLogo from "../../assets/img/carex_logo.png";
import { FaCamera, FaVideo, FaLine, FaCalendar } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function CreatePost() {
  const [postType, setPostType] = useState(null); // Estado para controlar o tipo de post
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar abertura do modal
  const [mediaFile, setMediaFile] = useState(null); // Estado para armazenar arquivo de mídia selecionado
  const [mediaPreview, setMediaPreview] = useState(null); // Estado para armazenar a pré-visualização da mídia
  const [eventDate, setEventDate] = useState(new Date()); // Estado para armazenar a data do evento
  const [description, setDescription] = useState(''); // Estado para armazenar a descrição do post

  const handlePostTypeChange = (type) => {
    setPostType(type);
    setModalOpen(true); // Abre o modal quando seleciona o tipo de post
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file)); // Criar pré-visualização da mídia
    }
  };

  const handlePost = () => {
    // Lógica para enviar o post com os dados coletados (pode ser implementada aqui)
    // Aqui você pode adicionar a lógica para enviar os dados do post para o backend, por exemplo
    // Resetar estados após a postagem
    setModalOpen(false);
    setMediaFile(null);
    setMediaPreview(null);
    setEventDate(new Date()); // Resetar a data do evento
    setDescription(''); // Limpar a descrição
  };

  const renderModalContent = () => {
    switch (postType) {
      case 'meet':
        return (
          <div className="modal-content">
            <h2 className="text-white font-bold text-xl mb-4">Criar Post Meet</h2>
            <input
              type="text"
              placeholder="Título do Meet"
              className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
            />
            <input
              type="text"
              placeholder="Link da sala"
              className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
            />
            <div>
              <label className="block text-white font-semibold mb-1">Upload de Imagem/Vídeo:</label>
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleMediaChange}
                className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
              />
              {mediaPreview && (
                <div className="mt-2">
                  {mediaFile.type.startsWith('image') ? (
                    <img src={mediaPreview} alt="Preview" className="max-w-full h-48 rounded-lg" />
                  ) : (
                    <video src={mediaPreview} controls className="max-w-full h-48 rounded-lg"></video>
                  )}
                </div>
              )}
            </div>
            <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4">
              Postar
            </button>
          </div>
        );
      case 'startup':
        return (
          <div className="modal-content">
            <h2 className="text-white font-bold text-xl mb-4">Criar Post StartUp</h2>
            <input
              type="text"
              placeholder="Nome da Startup"
              className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
            />
            <textarea
              placeholder="Descrição da Startup"
              className="w-full h-20 focus-visible:ring-transparent rounded-md pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
            />
            <div>
              <label className="block text-white font-semibold mb-1">Upload de Imagem/Vídeo:</label>
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleMediaChange}
                className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
              />
              {mediaPreview && (
                <div className="mt-2">
                  {mediaFile.type.startsWith('image') ? (
                    <img src={mediaPreview} alt="Preview" className="max-w-full h-48 rounded-lg" />
                  ) : (
                    <video src={mediaPreview} controls className="max-w-full h-48 rounded-lg"></video>
                  )}
                </div>
              )}
            </div>
            <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4">
              Postar
            </button>
          </div>
        );
      case 'evento':
        return (
          <div className="modal-content">
            <h2 className="text-white font-bold text-xl mb-4">Criar Post Evento</h2>
            <input
              type="text"
              placeholder="Nome do Evento"
              className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
            />
            <div className="mb-2">
              <label className="block text-white font-semibold mb-1">Data e Hora do Evento:</label>
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy HH:mm"
                timeFormat="HH:mm"
                timeIntervals={15}
                className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white"
              />
            </div>
            <input
              type="text"
              placeholder="Local do Evento"
              className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
            />
            <div>
              <label className="block text-white font-semibold mb-1">Upload de Imagem/Vídeo:</label>
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleMediaChange}
                className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
              />
              {mediaPreview && (
                <div className="mt-2">
                  {mediaFile.type.startsWith('image') ? (
                    <img src={mediaPreview} alt="Preview" className="max-w-full h-48 rounded-lg" />
                  ) : (
                    <video src={mediaPreview} controls className="max-w-full h-48 rounded-lg"></video>
                  )}
                </div>
              )}
            </div>
            <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4">
              Postar
            </button>
          </div>
        );
      case 'midias':
        return (
          <div className="modal-content">
            <h2 className="text-white font-bold text-xl mb-4">Criar Post Mídias</h2>
            <textarea
              placeholder="Descrição da Mídia"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-20 focus-visible:ring-transparent rounded-md pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
            />
            <div>
              <label className="block text-white font-semibold mb-1">Upload de Imagem/Vídeo:</label>
              <input
                type="file"
                accept="image/*, video/*"
                onChange={handleMediaChange}
                className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white mb-2"
              />
              {mediaPreview && (
                <div className="mt-2">
                  {mediaFile.type.startsWith('image') ? (
                    <img src={mediaPreview} alt="Preview" className="max-w-full h-48 rounded-lg" />
                  ) : (
                    <video src={mediaPreview} controls className="max-w-full h-48 rounded-lg"></video>
                  )}
                </div>
              )}
            </div>
            <button onClick={handlePost} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full mt-4">
              Postar
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-md p-4 mb-4">
      <div className="second-col-section-home flex items-center mb-4 bg-gray-900">
        <img src={CarexLogo} alt="Carex Logo" className="w-14 h-14 rounded-full mr-4" />
        <input type="text" placeholder='Cria uma publicação' className="w-full h-10 focus-visible:ring-transparent rounded-full pl-4 border border-gray-700 bg-gray-700 text-white" />
        <button onClick={() => setModalOpen(true)} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-2 rounded-full">
          Postar
        </button>
      </div>
      <div className="page-home-uploads-section justify-between">
        <ul className="flex justify-between text-white font-semibold">
          <li className="flex items-center mr-1" onClick={() => handlePostTypeChange('midias')}>
            <FaCamera className="mr-1" /> Mídias
          </li>
          <li className="flex items-center px-2" onClick={() => handlePostTypeChange('meet')}>
            <FaVideo className="mr-1" /> Meet
          </li>
          <li className="flex items-center px-2" onClick={() => handlePostTypeChange('startup')}>
            <FaLine className="mr-1" /> StartUp
          </li>
          <li className="flex items-center" onClick={() => handlePostTypeChange('evento')}>
            <FaCalendar className="mr-1" /> Evento
          </li>
        </ul>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-end">
              <button onClick={() => setModalOpen(false)} className="text-white font-bold">
                &times;
              </button>
            </div>
            {renderModalContent()}
          </div>
        </div>
      )}
    </div>
  );
}

