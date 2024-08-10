import React, { useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';
import areasJSON from '../../JSON/areas.json';
import provinciasJSON from '../../JSON/provincias.json';

const areas = areasJSON.areas; 
const provincias = provinciasJSON.provincias;

const SuccessDialog = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-10">
    <div className="bg-white p-4 shadow-lg rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-green-600">Sucesso!</h3>
      </div>
      <p className="text-gray-600">{message}</p>
      <div className='mt-2'>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1a9 9 0 110 18a9 9 0 010-18zM5.707 5.293a1 1 0 011.414 0L10 8.586l2.879-2.879a1 1 0 111.414 1.414L11.414 10l2.879 2.879a1 1 0 11-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const ErrorDialog = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-10">
    <div className="bg-white p-4 shadow-lg rounded-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-red-600">Erro!</h3>
      </div>
      <p className="text-gray-600">{message}</p>
      <div className='mt-2'>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1a9 9 0 110 18a9 9 0 010-18zM5.707 5.293a1 1 0 011.414 0L10 8.586l2.879-2.879a1 1 0 111.414 1.414L11.414 10l2.879 2.879a1 1 0 11-1.414 1.414L10 11.414l-2.879 2.879a1 1 0 01-1.414-1.414L8.586 10 5.707 7.121a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export const ProfileEdit = () => {
  // Dados simulados
  const [email, setEmail] = useState('user@example.com');
  const [telefone, setTelefone] = useState('123456789');
  const [provincia, setProvincia] = useState('Luanda');
  const [areaAtuacao, setAreaAtuacao] = useState('Tecnologia');
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [titleUser, setTitleUser] = useState('Meu Título');
  const [nifEmpresa, setNifEmpresa] = useState('123456789');
  const [nomeEmpresa, setNomeEmpresa] = useState('Minha Empresa');
  const [nomeRepresentante, setNomeRepresentante] = useState('Representante');
  const [anoExistencia, setAnoExistencia] = useState('2000');
  const [bi, setBi] = useState('BI123456');
  const [nomeEmpreendedor, setNomeEmpreendedor] = useState('Empreendedor');
  const [dataNascimento, setDataNascimento] = useState('2000-01-01');
  const [genero, setGenero] = useState('Masculino');
  const [userType, setUserType] = useState('empresa');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [editing, setEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      // Simula a atualização dos dados
      setSuccessDialogOpen(true);
      setDialogMessage('Perfil atualizado com sucesso!');
      setEditing(false);
    } catch (error) {
      setErrorDialogOpen(true);
      setDialogMessage('Erro ao atualizar perfil. Por favor, tente novamente.');
      console.error('Erro ao atualizar perfil: ', error);
    }
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  const handleCloseErrorDialog = () => {
    setErrorDialogOpen(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
    // Idealmente, você reverteria as alterações aqui se necessário
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  return (
    <PrincipalPage>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Editar Perfil</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative mb-4">
              <label htmlFor="profileImage" className="block text-sm font-medium text-white">Imagem de Perfil</label>
              {profileImage && <img src={profileImage} alt="Profile" className="w-full h-40 object-cover rounded-md" />}
              <input type="file" id="profileImage" accept="image/*" onChange={handleProfileImageChange} className="absolute bottom-2 right-2 z-10" />
            </div>
            <div className="relative mb-4">
              <label htmlFor="coverImage" className="block text-sm font-medium text-white">Imagem de Capa</label>
              {coverImage && <img src={coverImage} alt="Cover" className="w-full h-40 object-cover rounded-md" />}
              <input type="file" id="coverImage" accept="image/*" onChange={handleCoverImageChange} className="absolute bottom-2 right-2 z-10" />
            </div>
            <div className="mb-4">
              <label htmlFor="titleUser" className="block text-sm font-medium text-white">Título</label>
              <input
                type="text"
                id="titleUser"
                value={titleUser}
                onChange={(e) => setTitleUser(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded-md w-full"
                placeholder="Título"
              />
            </div>
            {userType === 'empresa' && (
              <>
                <div className="mb-4">
                  <label htmlFor="nifEmpresa" className="block text-sm font-medium text-white">NIF da Empresa</label>
                  <input
                    type="text"
                    id="nifEmpresa"
                    value={nifEmpresa}
                    onChange={(e) => setNifEmpresa(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    placeholder="NIF da Empresa"
                    pattern="[0-9]{9}"
                    title="NIF deve conter 9 dígitos numéricos"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="nomeEmpresa" className="block text-sm font-medium text-white">Nome da Empresa</label>
                  <input
                    type="text"
                    id="nomeEmpresa"
                    value={nomeEmpresa}
                    onChange={(e) => setNomeEmpresa(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    placeholder="Nome da Empresa"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="nomeRepresentante" className="block text-sm font-medium text-white">Nome do Representante</label>
                  <input
                    type="text"
                    id="nomeRepresentante"
                    value={nomeRepresentante}
                    onChange={(e) => setNomeRepresentante(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    placeholder="Nome do Representante"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="anoExistencia" className="block text-sm font-medium text-white">Ano de Existência</label>
                  <input
                    type="number"
                    id="anoExistencia"
                    value={anoExistencia}
                    onChange={(e) => setAnoExistencia(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    placeholder="Ano de Existência"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </>
            )}
            {userType === 'empreendedor' && (
              <>
                <div className="mb-4">
                  <label htmlFor="bi" className="block text-sm font-medium text-white">BI</label>
                  <input
                    type="text"
                    id="bi"
                    value={bi}
                    onChange={(e) => setBi(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    placeholder="BI"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="nomeEmpreendedor" className="block text-sm font-medium text-white">Nome do Empreendedor</label>
                  <input
                    type="text"
                    id="nomeEmpreendedor"
                    value={nomeEmpreendedor}
                    onChange={(e) => setNomeEmpreendedor(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    placeholder="Nome do Empreendedor"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="dataNascimento" className="block text-sm font-medium text-white">Data de Nascimento</label>
                  <input
                    type="date"
                    id="dataNascimento"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="genero" className="block text-sm font-medium text-white">Gênero</label>
                  <select
                    id="genero"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                    className="bg-gray-800 text-white p-2 rounded-md w-full"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </>
            )}
            <div className="flex justify-end gap-4 mb-4">
              {editing ? (
                <>
                  <button type="button" onClick={handleCancelClick} className="bg-gray-600 text-white px-4 py-2 rounded-md">Cancelar</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">Salvar</button>
                </>
              ) : (
                <button type="button" onClick={() => setEditing(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md">Editar</button>
              )}
            </div>
          </div>
        </form>
        {successDialogOpen && <SuccessDialog message={dialogMessage} onClose={handleCloseSuccessDialog} />}
        {errorDialogOpen && <ErrorDialog message={dialogMessage} onClose={handleCloseErrorDialog} />}
      </div>
    </PrincipalPage>
  );
};
