import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PrincipalPage } from '../../layout/principalPage';
import areasJSON from '../../JSON/areas.json';
import provinciasJSON from '../../JSON/provincias.json';
// Extrair os dados dos arquivos JSON
const areas = areasJSON.areas; 
const provincias = provinciasJSON.provincias;


// Exemplo de função para obter o userId
const getUserIdFromSomewhere = () => {
  // Lógica para obter o userId
  return localStorage.getItem('userId'); // Retorna o userId armazenado localmente
};

// Componente de diálogo de sucesso
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
// Componente de diálogo de erro
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
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [provincia, setProvincia] = useState('');
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [titleUser, setTitleUser] = useState('');
  const [nifEmpresa, setNifEmpresa] = useState('');
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [nomeRepresentante, setNomeRepresentante] = useState('');
  const [anoExistencia, setAnoExistencia] = useState('');
  const [bi, setBi] = useState('');
  const [nomeEmpreendedor, setNomeEmpreendedor] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [genero, setGenero] = useState('');
  const [userType, setUserType] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  // Estado para controlar a edição
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Simule ou substitua pela lógica adequada para obter userId
        const userId = getUserIdFromSomewhere(); // Implemente conforme sua lógica de autenticação
        const response = await axios.get(`http://localhost:3001/userdata?userId=${userId}`);
        const userData = response.data;

        setUserId(userId);
        setEmail(userData.email);
        setTelefone(userData.telefone);
        setProvincia(userData.provincia);
        setAreaAtuacao(userData.area_atuacao);
        setProfileImage(userData.profileImage ? userData.profileImage : null);
        setCoverImage(userData.coverImage ? userData.coverImage : null);
        setTitleUser(userData.title);
        

        if (userData.company) {
          setNifEmpresa(userData.company.nif_empresa || '');
          setNomeEmpresa(userData.company.nome_empresa || '');
          setNomeRepresentante(userData.company.nome_representante || '');
          setAnoExistencia(userData.company.ano_existencia || '');
        }

        if (userData.entrepreneur) {
          setBi(userData.entrepreneur.bi || '');
          setNomeEmpreendedor(userData.entrepreneur.nome || '');
          setDataNascimento(userData.entrepreneur.data_nascimento || '');
          setGenero(userData.entrepreneur.genero || '');
        }

        setUserType(userData.company ? 'empresa' : 'empreendedor');
      } catch (error) {
        console.error('Erro ao buscar dados do usuário: ', error);
      }
    };

    fetchUserData(); // Chamando fetchUserData aqui
  }, []); // [] para executar apenas uma vez quando o componente é montado


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let requestBody = {
        userId,
        email,
        telefone,
        provincia,
        areaAtuacao,
        profileImage: profileImage ? profileImage : null,
        coverImage: coverImage ? coverImage : null,
        title: titleUser
      };

      if (userType === 'empresa') {
        requestBody = {
          ...requestBody,
          nif_empresa: nifEmpresa,
          nome_empresa: nomeEmpresa,
          nome_representante: nomeRepresentante,
          ano_existencia: anoExistencia
        };

        await axios.put('http://localhost:3001/update/profile/empresa', requestBody);
      } else if (userType === 'empreendedor') {
        requestBody = {
          ...requestBody,
          bi: bi,
          nome: nomeEmpreendedor,
          data_nascimento: dataNascimento,
          genero: genero
        };

        await axios.put('http://localhost:3001/update/profile/empreendedor', requestBody);
      }
      setSuccessDialogOpen(true);
      setDialogMessage('Perfil atualizado com sucesso!');
      console.log('Perfil atualizado com sucesso!');
      // Volte para o modo de edição desativada após o salvamento
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

  const handleEditClick = () => {
    // Habilita a edição
    setEditing(true);
  };

  const handleCancelClick = () => {
    // Desabilita a edição e carrega os dados novamente
    setEditing(false);
  };

  return (
    <PrincipalPage>
      <section className="max-w-4xl mx-auto mt-6">
        <div className="bg-gray-900 rounded-lg shadow px-5 py-6 sm:px-6">
          <div className="space-y-8 ">
            <div className="space-y-8 ">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-100">Editar Perfil</h3>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <div className="relative h-96 rounded-b flex justify-center">
                <div className=" mb-8 relative bg-gray-900 w-full  rounded-b flex justify-center">
                    {/* Foto de Capa */}
                    <div className="relative bg-gray-700 w-full  rounded-b flex justify-center">

                      <div className="absolute bottom-4 right-4">
                        <label htmlFor="uploadCover" className="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-white bg-gray-900 rounded-full p-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14 10a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0zM10 3a7 7 0 100 14 7 7 0 000-14z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <input                              
                              type="file"
                              id="uploadCover"
                              accept="image/*"
                              disabled={!editing} // Desativa se não estiver editando
                              className="hidden"
                              onChange={(e) => setCoverImage(e.target.files[0])} // Função para lidar com o upload da capa
                            />
                            {coverImage && (
                                <img
                                  src={URL.createObjectURL(coverImage)}
                                  className="cover rounded-b object-cover center"
                                  alt="cover"
                                />
                              )}
                        </label>
                      </div>
                    </div>
                    {/* Foto de Perfil */}
                    <div className="absolute bg-gray-900  border-gray-200 rounded-full w-40 h-40 -bottom-6 sm:left-6 -bottom-16">
                    
                      <div className="absolute bottom-4 right-4">
                        <label htmlFor="uploadProfile" className="cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-gray-900 bg-gray-100 rounded-full p-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M14 10a4 4 0 11-8 0 4 4 0 018 0zm-2 0a2 2 0 11-4 0 2 2 0 014 0zM10 3a7 7 0 100 14 7 7 0 000-14z"
                              clipRule="evenodd"
                            />
                            <path
                              fillRule="evenodd"
                              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <input
                            type="file"
                            id="uploadProfile"
                            accept="image/*"                         
                            disabled={!editing} // Desativa se não estiver editando
                            className="hidden"
                            onChange={(e) => setProfileImage(e.target.files[0])} // Função para lidar com o upload do perfil
                          />
                          {profileImage && ( <img
                        src={URL.createObjectURL(profileImage)}  // Substitua pelo seu source de imagem para o logo de perfil
                        className="object-cover border-2 border-gray-200 w-40 h-40 rounded-full"
                        alt="profile"
                      />)}
                        </label>
                      </div>
                    </div>
                  </div>
                  </div>
                <div className='flex justify-end -mt-10'>
                    <h1 className='text-2xl text-blue-500'> {userType === 'empresa' ? nomeEmpresa : nomeEmpreendedor}</h1>
                </div>
                  <div> 
                      <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-100">Titúlo do Perfil</label>
                      <input type="text" 
                      name="title" 
                      id="title" 
                      placeholder=' Importação e Exportação | Front-End Developer'
                      value={titleUser} 
                      onChange={(e) => setTitleUser(e.target.value)}
                      autoComplete="organization-title" 
                      disabled={!editing} // Desativa se não estiver editando
                      className="block w-96 mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                    </div>
                {/* Campos específicos para empresa */}
                {userType === 'empresa' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                    <div>
                      <label htmlFor="nomeEmpresa" className="block text-sm font-medium leading-6 text-gray-100">Nome da Empresa</label>
                      <input type="text" 
                      name="nomeEmpresa" id="nomeEmpresa" 
                      value={nomeEmpresa} 
                      onChange={(e) => setNomeEmpresa(e.target.value)} 
                      autoComplete="organization" 
                      required
                      disabled={!editing} // Desativa se não estiver editando
                      className="capitalize block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                    </div>
                   
                    <div>
                      <label htmlFor="nomeRepresentante" className="block text-sm font-medium leading-6 text-gray-100">Nome do Representante</label>
                      <input type="text" 
                      name="nomeRepresentante" 
                      id="nomeRepresentante" 
                      required
                      value={nomeRepresentante} 
                      onChange={(e) => setNomeRepresentante(e.target.value)} 
                      autoComplete="organization" 
                      disabled={!editing} // Desativa se não estiver editando
                      className="capitalize block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                    </div>
                  
                    <div>
                      <label htmlFor="nifEmpresa" className="block text-sm font-medium leading-6 text-gray-100">NIF da Empresa</label>
                      <input type="text" capitaliza 
                      name="nifEmpresa" id="nifEmpresa" 
                      value={nifEmpresa} 
                      onChange={(e) => setNifEmpresa(e.target.value)} 
                      autoComplete="tax-id" 
                      required
                      minLength={9} 
                      maxLength={9}
                      pattern="{9}"
                      disabled={!editing} // Desativa se não estiver editando
                      className="block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                    </div>
                    <div>
                      <label htmlFor="anoExistencia" className="block text-sm font-medium leading-6 text-gray-100">Ano de Existência</label>
                      <input type="number" 
                      name="anoExistencia" 
                      id="anoExistencia" 
                      value={anoExistencia} 
                      onChange={(e) => setAnoExistencia(e.target.value)}
                      minLength={2} 
                      maxLength={2}
                      pattern="[0-9]*"
                      min={0}
                      required
                      autoComplete="organization" 
                      disabled={!editing} // Desativa se não estiver editando
                      className="block w-32 mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                    </div>
                  </div>
                )}

                {/* Campos específicos para empreendedor */}
                {userType === 'empreendedor' && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    <div>
                      <label htmlFor="nomeEmpreendedor" className="block text-sm font-medium leading-6 text-gray-100">Nome do Empreendedor</label>
                      <input type="text" 
                      name="nomeEmpreendedor" id="nomeEmpreendedor" 
                      value={nomeEmpreendedor} 
                      onChange={(e) => setNomeEmpreendedor(e.target.value)} 
                      autoComplete="organization" 
                      required
                      disabled={!editing} // Desativa se não estiver editando
                      className="capitaliza block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                    </div>

                    <div>
                      <label htmlFor="bi" className="block text-sm font-medium leading-6 text-gray-100">BI</label>
                      <input type="text" name="bi" id="bi" 
                      value={bi} 
                      onChange={(e) => setBi(e.target.value)} 
                      autoComplete="tax-id" 
                      minLength={14}
                      maxLength={14}
                      required
                      disabled={!editing} // Desativa se não estiver editando
                      className="block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent
                      text-gray-100 sm:text-sm"/>
                    </div>

                    <div>
                      <label htmlFor="dataNascimento" className="block text-sm font-medium leading-6 text-gray-100">Data de Nascimento</label>
                      <input type="date" 
                      name="dataNascimento" id="dataNascimento" 
                      value={dataNascimento} 
                      onChange={(e) => setDataNascimento(e.target.value)} 
                      autoComplete="bday" 
                      required
                      disabled={!editing} // Desativa se não estiver editando
                      className="block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                    </div>
                    <div>
                      <label htmlFor="genero" className="block text-sm font-medium leading-6 text-gray-100">Gênero</label>
                      <select type="text" 
                      name="genero" id="genero" 
                      value={genero} 
                      onChange={(e) => setGenero(e.target.value)} 
                      autoComplete="sex" 
                      required
                      disabled={!editing} // Desativa se não estiver editando
                      className="block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"
                      > 
                      <option >Selecionar</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Feminino</option></select>
                    </div>
                  </div>
                )}
                {/* Campos comuns para empresa e empreendedor */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-100">Email</label>
                    <input type="email" 
                    name="email" id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    utoComplete="email" 
                    disabled={!editing} // Desativa se não estiver editando
                    className="lowercase block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                  </div>
                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium leading-6 text-gray-100">Telefone</label>
                    <input type="text" 
                    name="telefone" id="telefone" 
                    value={telefone} 
                    onChange={(e) => setTelefone(e.target.value)}
                    minLength={9}
                    maxLength={9} 
                    required 
                    autoComplete="tel" 
                    disabled={!editing} // Desativa se não estiver editando
                    className="block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"/>
                  </div>
                  <div>
                    <label htmlFor="provincia" className="block text-sm font-medium leading-6 text-gray-100">Província</label>
                    <select type="text" 
                    name="provincia" id="provincia" 
                    value={provincia} 
                    onChange={(e) => setProvincia(e.target.value)} 
                    required 
                    autoComplete="address-level1" 
                    disabled={!editing} // Desativa se não estiver editando
                    className="block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"
                    >
                     <option value="">Selecione</option>
                      {provincias.map((provincia) => (
                        <option key={provincia} value={provincia}>{provincia}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="areaAtuacao" className="block text-sm font-medium leading-6 text-gray-100">Área de Atuação</label>
                    <select type="text" 
                    name="areaAtuacao" id="areaAtuacao" 
                    value={areaAtuacao} 
                    onChange={(e) => setAreaAtuacao(e.target.value)} 
                    required 
                    autoComplete="organization-title" 
                    disabled={!editing} // Desativa se não estiver editando
                    className="block w-full mt-1 rounded-md border-none bg-gray-800 focus:ring-transparent focus:border-transparent text-gray-100 sm:text-sm"
                    >
                        <option value="">Selecione</option>
                        {areas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                  </div>
                 
                </div>

                {/* Botões de ação */}
                <div className="flex justify-end">
                  {editing && (
                    <div>
                      <button
                        type="button"
                        onClick={handleCancelClick}
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Cancelar
                      </button>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <button
                      type={editing ? 'button' : 'submit'} // Se estiver editando, é submit
                      onClick={editing ? handleSubmit : handleEditClick} // Se estiver editando, chama handleSubmit, senão handleEditClick
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {editing ? 'Gravar' : 'Actualizar'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
       {/* Renderização dos modais de sucesso e erro */}
       {successDialogOpen && <SuccessDialog message={dialogMessage} onClose={handleCloseSuccessDialog} />}
      {errorDialogOpen && <ErrorDialog message={dialogMessage} onClose={handleCloseErrorDialog} />}
    </PrincipalPage>
  );
};