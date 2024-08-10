import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Logoform } from '../../components/logo';
import { useNavigate } from 'react-router-dom';
import provinciasJSON from '../../JSON/provincias.json';
import areasJSON from '../../JSON/areas.json';
import nifJSON from '../../JSON/nifEmpresas.json';
import biJSON from '../../JSON/bi.json';


const areas = areasJSON.areas; 
const validNifs = nifJSON.nifEmpresas; 
const provincias = provinciasJSON.provincias; 
const validBIs = biJSON.bis; 


export function Register() {
  const [tipoUsuario, setTipoUsuario] = useState(null); // Define o tipo de usuário como empresa por padrão
  const [formData, setFormData] = useState({
    // Campos para Empresa
    NomeRepresentante: '',
    NomeEmpresa: '',
    NIF: '',
    AnosDeExistencia: '',
    // Campos para Empreendedor
    Nome: '',
    Genero: '',
    DataNascimento: '',
    BI: '',
    // Campos comuns
    Email: '',
    Endereco: '',
    Telefone: '',
    AreaAtuacao: '',
    Provincia: '',
    Senha: '',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVoltar = () => {
      navigate('/')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(tipoUsuario==="empresa"){
       // Validação do NIF
      if (!validNifs.includes(formData.NIF)) {
        setMessage({ type: 'error', text: 'NIF inválido!' });
        setIsOpen(true);
        return;
        }
    } else if (tipoUsuario ==="empreendedor"){  
      // Validação do BI
       if (!validBIs.includes(formData.BI)) {
         setMessage({ type: 'error', text: 'BI inválido!' });
         setIsOpen(true);
         return; 
       }}else{
        setMessage({ type: 'error', text: 'NIF/BI inválidos' });
        setIsOpen(true);
        return; 
       }
    
    

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, tipo: tipoUsuario }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage({ type: 'success', text: 'Registro bem-sucedido!' });
        setIsOpen(true);
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: 'Registro bem-sucedido!' });
        setIsOpen(true);
      }
    } catch (error) {
        // Trata o erro da API
        if (error.response && error.response.status === 400) {
          setMessage({ type: 'error', text: error.response.data.message || 'Erro na validação dos dados.' });
        } else {
          setMessage({ type: 'error', text: 'Erro ao registrar. Tente novamente mais tarde.' });
        }
        setIsOpen(true);
    }
  };

  const handleTipoChange = (e) => {
    setTipoUsuario(e.target.value);
  };
  const closeModal = () => {
    setIsOpen(false);
    // Redireciona para a página de login apenas se o cadastro for bem-sucedido
    if (message && message.type === 'success') {
      navigate('/login');
      // Limpa os campos do formulário
      setFormData({
        Email: '',
        Senha: '',
        Telefone: '',
        Provincia: '',
        AreaAtuacao: '',
        NIF: '',
        NomeEmpresa: '',
        NomeRepresentante: '',
        AnosDeExistencia: '',
        Endereco: '' 
      });
    }
  };


  return (
    <div className="flex min-screen-full flex-1 flex-col justify-center lg:mt-28 align-middle bg-gray-900">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl m-auto mx-auto">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center ">
        <div className="flex justify-center">
             <Logoform  /> 
          </div> 
          <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                 Registra-se
          </h2>
          </div>
        <div className="flex justify-center lg: align-middle bg-gray-900 mt-8 mb-4">
        
          <button
            onClick={() => setTipoUsuario('empresa')}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${tipoUsuario === 'empresa' ? 'bg-blue-700' : ''}`}
          >
            Empresa
          </button>
          <button
            onClick={() => setTipoUsuario('empreendedor')}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2 ${tipoUsuario === 'empreendedor' ? 'bg-blue-700' : ''}`}
          >
            Empreendedor
          </button>
        </div>
        {tipoUsuario && (
          <form onSubmit={handleSubmit} className='grid grid-cols-1'>
            {/* Campos para Empresa */}
            {tipoUsuario === 'empresa' && (
              <div lassName="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <h3 className="text-xl font-bold mb-2">Registro de Empresa</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className='col-span-2'>
                    <label htmlFor="NomeRepresentante" className="block text-gray-200 text-sm font-bold mb-2">
                      Nome do Representante:
                    </label>
                    <input
                      type="text"
                      id="NomeRepresentante"
                      name="NomeRepresentante"
                      className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.NomeRepresentante}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='col-span-1'>
                    <label htmlFor="NomeEmpresa" className="block text-gray-200 text-sm font-bold mb-2">
                      Nome da Empresa:
                    </label>
                    <input
                      type="text"
                      id="NomeEmpresa"
                      name="NomeEmpresa"
                      className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.NomeEmpresa}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='col-span-1'>
                <label htmlFor="Email" className="block text-gray-200 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  className="lowercase  w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </div>
                  
              <div className='col-span-1'>
                <label htmlFor="AreaAtuacao" className="block text-gray-200 text-sm font-bold mb-2">
                  Área de Atuação:
                </label>
                <select
                  type="text"
                  id="AreaAtuacao"
                  name="AreaAtuacao"
                  className="capitalize w-full  p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.AreaAtuacao}
                  onChange={handleChange}
                  required
                >
                    <option value="">Selecione</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
              <div className='col-span-1'>
                    <label htmlFor="NIF" className="block text-gray-200 text-sm font-bold mb-2">
                      NIF:
                    </label>
                    <input
                      type="text"
                      id="NIF"
                      name="NIF"
                      className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.NIF}
                      onChange={handleChange}
                      required
                      minLength={9}
                      maxLength={9}
                      pattern="[0-9]{9}"
                    />
                  </div>
              <div className='col-span-1'>
                <label htmlFor="Telefone" className="block text-gray-200 text-sm font-bold mb-2">
                  Telefone:
                </label>
                <input
                  type="text"
                  id="Telefone"
                  name="Telefone"
                  className="capitalize p-2 w-full rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Telefone}
                  onChange={handleChange}
                  required
                  minLength={9}
                  maxLength={9}
                  pattern="[0-9]{9}"
                />
              </div>
              <div className='col-span-1'>
                <label htmlFor="Senha" className="block text-gray-200 text-sm font-bold mb-2">
                  Senha:
                </label>
                <input
                  type="password"
                  id="Senha"
                  name="Senha"
                  className=" w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Senha}
                  onChange={handleChange}
                  required
                  minLength={8}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)"
                />
              </div>
              <div className='col-span-1'>
                <label htmlFor="Provincia" className="block text-gray-200 text-sm font-bold mb-2">
                  Província:
                </label>
                <select
                  type="text"
                  id="Provincia"
                  name="Provincia"
                  className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Provincia}
                  onChange={handleChange}
                  required
                >
                <option value="">Selecione</option>
                {provincias.map((provincia) => (
                  <option key={provincia} value={provincia}>{provincia}</option>
                
                ))}
             </select>
              </div>
             
                  <div className='col-span-2'>
                <label htmlFor="Endereco" className="block text-gray-200 text-sm font-bold mb-2">
                  Endereço:
                </label>
                <input
                  type="text"
                  id="Endereco"
                  name="Endereco"
                  className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Endereco}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                    <label htmlFor="AnosDeExistencia" className="block text-gray-200 text-sm font-bold mb-2">
                      Anos de Existência:
                    </label>
                    <input
                      type="number"
                      id="AnosDeExistencia"
                      name="AnosDeExistencia"
                      className="capitalize w-24 p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.AnosDeExistencia}
                      onChange={handleChange}
                      required
                      min={0}
                      maxLength={50}
                      minLength={0}
                      pattern="[0-9]"
                    />
                  </div>
            
              </div> 
            </div>
       
            )}
            {/* Campos para Empreendedor */}
            {tipoUsuario === 'empreendedor' && (
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Registro de Empreendedor</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="Nome" className="block text-gray-200 text-sm font-bold mb-2">
                      Nome:
                    </label>
                    <input
                      type="text"
                      id="Nome"
                      name="Nome"
                      className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.Nome}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="Genero" className="block text-gray-200 text-sm font-bold mb-2">
                      Género:
                    </label>
                    <select
                      type="text"
                      id="Genero"
                      name="Genero"
                      className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.Genero}
                      onChange={handleChange}
                      required
                    >
                        <option value="">Selecione</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                  </select>
                  </div>
                  <div>
                    <label htmlFor="DataNascimento" className="block text-gray-200 text-sm font-bold mb-2">
                      Data de Nascimento:
                    </label>
                    <input
                      type="date"
                      id="DataNascimento"
                      name="DataNascimento"
                      className="lowercase w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.DataNascimento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="BI" className="block text-gray-200 text-sm font-bold mb-2">
                      BI:
                    </label>
                    <input
                      type="text"
                      id="BI"
                      name="BI"
                      className="uppercase w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                      value={formData.BI}
                      onChange={handleChange}
                      required
                      minLength={14}
                      maxLength={14}
                      pattern="^\d{9}[A-Z]{2}\d{3}$"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className='col-span-2'>
                <label htmlFor="Email" className="block text-gray-200 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  className="lowercase w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='col-span-2'>
                <label htmlFor="Endereco" className="block text-gray-200 text-sm font-bold mb-2">
                  Endereço:
                </label>
                <input
                  type="text"
                  id="Endereco"
                  name="Endereco"
                  className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Endereco}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="Telefone" className="block text-gray-200 text-sm font-bold mb-2">
                  Telefone:
                </label>
                <input
                  type="text"
                  id="Telefone"
                  name="Telefone"
                  className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Telefone}
                  onChange={handleChange}
                  required
                  minLength={9}
                  maxLength={9}
                  pattern="[0-9]{9}"
                />
              </div>
                 
              <div className='col-span-1'>
                <label htmlFor="AreaAtuacao" className="block text-gray-200 text-sm font-bold mb-2">
                  Área de Atuação:
                </label>
                <select
                  type="text"
                  id="AreaAtuacao"
                  name="AreaAtuacao"
                  className="capitalize w-full  p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.AreaAtuacao}
                  onChange={handleChange}
                >
                    <option value="">Selecione</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
              <div className='col-span-1'>
                <label htmlFor="Provincia" className="block text-gray-200 text-sm font-bold mb-2">
                  Província:
                </label>
                <select
                  type="text"
                  id="Provincia"
                  name="Provincia"
                  className="capitalize w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Provincia}
                  onChange={handleChange}
                >
                <option value="">Selecione</option>
                {provincias.map((provincia) => (
                  <option key={provincia} value={provincia}>{provincia}</option>
                
                ))}
             </select>
              </div>
              <div>
                <label htmlFor="Senha" className="block text-gray-200 text-sm font-bold mb-2">
                  Senha:
                </label>
                <input
                  type="password"
                  id="Senha"
                  name="Senha"
                  className=" w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                  value={formData.Senha}
                  onChange={handleChange}
                  required
                  minLength={8}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  title="A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)"
                />
              </div>
            </div>
              </div>
              
            )}
           
           <div className='flex justify-end'>
            <div className='mr-3'>
            <button onClick={handleVoltar} className="col-span-1 mt-4 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                     Cancelar
                    </button>
            </div>
            <div >
                    <button type="submit" className="col-span-1 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Registrar
                    </button>
            </div>
           
        </div>
          </form>

        )}
      </div>
    
      <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-900"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-900"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            ​
          </span>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-900"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-900"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">Informação</Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message ? message.text : ''}</p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Fechar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
    </div>
  );
}