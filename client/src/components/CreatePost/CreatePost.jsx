import React, { useState, useContext } from 'react';
import CarexLogo from "../../assets/img/carex_logo.png";
import { FaImage, FaCalendarAlt, FaRocket, FaUsers } from 'react-icons/fa'; 
import { AuthContext } from '../../context/AuthContext'; 
import ProfileDefault from "../../assets/img//profileDefoult.png";
import axios from 'axios'; 

export function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('post'); 
  const [postContent, setPostContent] = useState('');
  const [postMedia, setPostMedia] = useState(null);
  const [isPublishButtonDisabled, setIsPublishButtonDisabled] = useState(true);
  const [startupName, setStartupName] = useState('');
  const [startupDescription, setStartupDescription] = useState('');
  const [startupMedia, setStartupMedia] = useState(null); 
  const [zoomLink, setZoomLink] = useState('');
  const [businessRoomTitle, setBusinessRoomTitle] = useState('');
  const [businessRoomDescription, setBusinessRoomDescription] = useState('');
  const [businessRoomMedia, setBusinessRoomMedia] = useState(null); 
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventMedia, setEventMedia] = useState(null); 
  const { user, token } = useContext(AuthContext); 

  const handleChangeContent = (event) => {
    setPostContent(event.target.value);
    setIsPublishButtonDisabled(!(postContent.trim() || postMedia));
  };

  const handleChangeMedia = (event) => {
    setPostMedia(event.target.files[0]);
    setIsPublishButtonDisabled(!(postContent.trim() || postMedia));
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let formData;

    // Define os dados a serem enviados para a API de acordo com a aba ativa
    if (activeTab === 'post') {
      formData = new FormData();
      formData.append('Conteudo', postContent); // Use 'Conteudo' como no banco de dados
      if (postMedia) {
        formData.append('Foto', postMedia); // Use 'Foto' como no banco de dados
      }
      formData.append('UsuarioID', user.id); // Use 'UsuarioID' como no banco de dados
      console.log("FormData antes de enviar:", formData); // Verifique o conteúdo do FormData
         // Imprime o conteúdo do FormData corretamente
    for (let [key, value] of formData.entries()) {
      console.log("Key:", key, "Value:", value);}

    } else if (activeTab === 'startup') {
      formData = new FormData();
      formData.append('Nome', startupName); // Use 'Nome' como no banco de dados
      formData.append('Descricao', startupDescription); // Use 'Descricao' como no banco de dados
      if (startupMedia) {
        formData.append('Foto', startupMedia); // Use 'Foto' como no banco de dados
      }
      formData.append('UsuarioID', user.id); // Use 'UsuarioID' como no banco de dados

    } else if (activeTab === 'businessRoom') {
      formData = new FormData();
      formData.append('Titulo', businessRoomTitle); // Use 'Titulo' como no banco de dados
      formData.append('Descricao', businessRoomDescription); // Use 'Descricao' como no banco de dados
      if (businessRoomMedia) {
        formData.append('Foto', businessRoomMedia); // Use 'Foto' como no banco de dados
      }
      formData.append('UsuarioID', user.id); // Use 'UsuarioID' como no banco de dados

    } else if (activeTab === 'event') {
      formData = new FormData();
      formData.append('Nome', eventName); // Use 'Nome' como no banco de dados
      formData.append('Data', eventDate); // Use 'Data' como no banco de dados
      formData.append('Hora', eventTime); // Use 'Hora' como no banco de dados
      formData.append('Local', eventLocation); // Use 'Local' como no banco de dados
      formData.append('Descricao', eventDescription); // Use 'Descricao' como no banco de dados
      if (eventMedia) {
        formData.append('Foto', eventMedia); // Use 'Foto' como no banco de dados
      }
      formData.append('UsuarioID', user.id); // Use 'UsuarioID' como no banco de dados
    }

    try {
      const response = await axios.post('http://localhost:3001/postagens', formData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      if (response.status === 201) {
        setPostContent('');
        setPostMedia(null);
        setStartupName('');
        setStartupDescription('');
        setStartupMedia(null);
        setZoomLink('');
        setBusinessRoomTitle('');
        setBusinessRoomDescription('');
        setBusinessRoomMedia(null);
        setEventName('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
        setEventDescription('');
        setEventMedia(null);
        handleCloseModal(); 
      } else {
        
        console.error('Erro ao criar post:', response.data);
        alert('Erro ao publicar o post. Tente novamente mais tarde.');
      }
      
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  };

  const handleClickOutside = (event) => {
    if (showModal && !event.target.closest('.modal-container')) {
      handleCloseModal();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderPostTab = () => {
    return (
      <div>
        <div className="mt-3">
          <textarea
            rows={4}
            placeholder="Sobre o que você quer falar?"
            className="w-full resize-none rounded-lg border text-gray-700 border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            value={postContent}
            onChange={handleChangeContent}
          />
        </div>
        <div className="flex mt-4 gap-4">
          <div>
            <label htmlFor="postMedia" className="text-gray-600 block mb-1 font-medium">Imagem/Vídeo:</label>
            <input
              type="file"
              id="postMedia"
              accept="image/*, video/*"
              onChange={handleChangeMedia}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 "
            />
            {postMedia && (
              <div className="mt-2">
                {postMedia.type.startsWith('image/') ? (
                  <img src={URL.createObjectURL(postMedia)} alt="Preview da imagem" className="w-auto h-auto mt-2 rounded-lg" />
                ) : (
                  <video src={URL.createObjectURL(postMedia)} controls className="w-auto h-auto mt-2 rounded-lg" />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStartupTab = () => {
    return (
      <div>
        <div className="mt-3">
          <label htmlFor="startupName" className="block mb-2 text-gray-700 text-sm font-bold">Nome da Startup:</label>
          <input
            type="text"
            id="startupName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={startupName}
            onChange={(e) => setStartupName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="startupDescription" className="block mb-2 text-gray-700 text-sm font-bold">Descrição:</label>
          <textarea
            id="startupDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={startupDescription}
            onChange={(e) => setStartupDescription(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="startupMedia" className="text-gray-600 block mb-1 font-medium">Imagem/Vídeo:</label>
          <input
            type="file"
            id="startupMedia"
            accept="image/*, video/*"
            onChange={(e) => setStartupMedia(e.target.files[0])}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {startupMedia && (
            <div className="mt-2">
              {startupMedia.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(startupMedia)} alt="Preview da imagem" className="w-auto h-auto mt-2 rounded-lg" />
              ) : (
                <video src={URL.createObjectURL(startupMedia)} controls className="w-auto h-auto mt-2 rounded-lg" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBusinessRoomTab = () => {
    return (
      <div>
        <div className="mt-3">
          <label htmlFor="businessRoomTitle" className="block mb-2 text-gray-700 text-sm font-bold">Título da Sala:</label>
          <input
            type="text"
            id="businessRoomTitle"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={businessRoomTitle}
            onChange={(e) => setBusinessRoomTitle(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="zoomLink" className="block mb-2 text-gray-700 text-sm font-bold">Link da Sala no Zoom:</label>
          <input
            type="text"
            id="zoomLink"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="businessRoomDescription" className="block mb-2 text-gray-700 text-sm font-bold">Descrição:</label>
          <textarea
            id="businessRoomDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={businessRoomDescription}
            onChange={(e) => setBusinessRoomDescription(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="businessRoomMedia" className="text-gray-600 block mb-1 font-medium">Imagem/Vídeo:</label>
          <input
            type="file"
            id="businessRoomMedia"
            accept="image/*, video/*"
            onChange={(e) => setBusinessRoomMedia(e.target.files[0])}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {businessRoomMedia && (
            <div className="mt-2">
              {businessRoomMedia.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(businessRoomMedia)} alt="Preview da imagem" className="w-auto h-auto mt-2 rounded-lg" />
              ) : (
                <video src={URL.createObjectURL(businessRoomMedia)} controls className="w-auto h-auto mt-2 rounded-lg" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEventTab = () => {
    return (
      <div>
        <div className="mt-3">
          <label htmlFor="eventName" className="block mb-2 text-gray-700 text-sm font-bold">Nome do Evento:</label>
          <input
            type="text"
            id="eventName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="eventDate" className="block mb-2 text-gray-700 text-sm font-bold">Data do Evento:</label>
          <input
            type="date"
            id="eventDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="eventTime" className="block mb-2 text-gray-700 text-sm font-bold">Hora do Evento:</label>
          <input
            type="time"
            id="eventTime"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="eventLocation" className="block mb-2 text-gray-700 text-sm font-bold">Local do Evento:</label>
          <input
            type="text"
            id="eventLocation"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="eventDescription" className="block mb-2 text-gray-700 text-sm font-bold">Descrição do Evento:</label>
          <textarea
            id="eventDescription"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <div className="mt-3">
          <label htmlFor="eventMedia" className="text-gray-600 block mb-1 font-medium">Imagem/Vídeo:</label>
          <input
            type="file"
            id="eventMedia"
            accept="image/*, video/*"
            onChange={(e) => setEventMedia(e.target.files[0])}
            className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 "
          />
          {eventMedia && (
            <div className="mt-2">
              {eventMedia.type.startsWith('image/') ? (
                <img src={URL.createObjectURL(eventMedia)} alt="Preview da imagem" className="w-auto h-auto mt-2 rounded-lg" />
              ) : (
                <video src={URL.createObjectURL(eventMedia)} controls className="w-auto h-auto mt-2 rounded-lg" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="containerPost bg-gray-900 border border-gray-700 rounded-md p-4">
      <div>
        <div className="userPostDetails flex items-center mb-1">
          <img src={user.FotoPerfil ? user.FotoPerfil : ProfileDefault} alt="" className="w-12 h-12 rounded-full mr-4" />
          <div className="flex items-center gap-2 w-full">
            <input
              className="bg-gray-200 text-xs hover:border-spacing-1 text-black w-full h-10 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleOpenModal('post')} 
              placeholder='O que estás a pensar?'
            />
          </div>
        </div>
        <div className='flex items-center justify-between  gap-1  sm:ml-16 gap2 '>
          <div 
            className="bg-blue-500 hover:bg-blue-600 text-white w-auto h-8 rounded flex items-center justify-center focus:outline-none focus:shadow-outline" 
            onClick={() => handleOpenModal('post')}
          >
            <FaImage className="text-white ml-2" />
            <span className='ml-1 mr-1 text-xs '>Foto/Vídeo</span>
          </div>
          <div 
            className="bg-green-500 hover:bg-green-600 text-white w-auto h-8 rounded flex items-center justify-center focus:outline-none focus:shadow-outline" 
            onClick={() => handleOpenModal('startup')}
          >
            <FaRocket className="text-white ml-2" />
            <span className='ml-1 mr-1 text-xs '>StarUp</span>
          </div>
          <div 
            className="bg-purple-500 hover:bg-purple-600 text-white w-auto h-8 rounded flex items-center justify-center focus:outline-none focus:shadow-outline" 
            onClick={() => handleOpenModal('businessRoom')}
          >
            <FaUsers className="text-white ml-2" />
            <span className='ml-1 mr-1 text-xs '>Meet</span>
          </div>
          <div 
            className="bg-orange-500 hover:bg-orange-600 text-white w-auto h-8 rounded flex items-center justify-center focus:outline-none focus:shadow-outline" 
            onClick={() => handleOpenModal('event')}
          >
            <FaCalendarAlt className="text-white ml-2" />
            <span className='ml-1 mr-1 text-xs '>Evento</span>
          </div>
        </div>      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center modal-container">
          <div className="bg-gray-100 rounded-lg shadow-md w-11/12 max-w-lg px-4 pt-5 pb-4 text-left overflow-hidden sm:p-6 sm:w-10/12 lg:w-8/12">
            <div className="flex items-center gap-2 mb-4">
              <img src={CarexLogo} alt="User avatar" className="w-10 h-10 rounded-full" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  Carex Angola
                </h3>
                <span className="text-gray-500 text-xs">
                  Publicar em Todos
                </span>
              </div>
            </div>
            {/* Abas de Conteúdo */}
            <div className="flex mb-4">
              <button
                className={`px-1 py-2 rounded-t-lg sm:px-4 ${
                  activeTab === 'post' ? 'bg-blue-500 text-gray-900' : 'bg-gray-200 text-gray-900'
                }`}
                onClick={() => handleTabChange('post')}
              >
                Postagem
              </button>
              <button
                className={`px-1 py-2 rounded-t-lg sm:px-4 ${
                  activeTab === 'startup' ? 'bg-blue-500 text-gray-900' : 'bg-gray-200 text-gray-900'
                }`}
                onClick={() => handleTabChange('startup')}
              >
                Startup
              </button>
              <button
                className={`px-4 py-2 rounded-t-lg ${
                  activeTab === 'businessRoom' ? 'bg-blue-500 text-gray-900' : 'bg-gray-200 text-gray-900'
                }`}
                onClick={() => handleTabChange('businessRoom')}
              >
                Sala de Negócios
              </button>
              <button
                className={`px-2 py-2 rounded-t-lg sm:px-4 ${
                  activeTab === 'event' ? 'bg-blue-500 text-gray-900' : 'bg-gray-200 text-gray-900'
                }`}
                onClick={() => handleTabChange('event')}
              >
                Evento
              </button>
            </div>
            {/* Conteúdo da Aba Ativa */}
            {activeTab === 'post' && renderPostTab()}
            {activeTab === 'startup' && renderStartupTab()}
            {activeTab === 'businessRoom' && renderBusinessRoomTab()}
            {activeTab === 'event' && renderEventTab()}
            <form onSubmit={handleSubmit} className="flex justify-between mt-4">
              <button type="button" className="bg-red-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-red-600 " onClick={handleCloseModal}>
                Cancelar
              </button>
              <button type="submit" className="bg-blue-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-blue-600" disabled={isPublishButtonDisabled}>
                Publicar
              </button>
            </form>
          </div>
        </div>
    
    )}
    </div>
    </div>
    );
}