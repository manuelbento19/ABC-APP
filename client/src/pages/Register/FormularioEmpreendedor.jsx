import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import {  useNavigate} from 'react-router-dom';
import areasJSON from '../../JSON/areas.json';
import provinciasJSON from '../../JSON/provincias.json';
import biJSON from '../../JSON/bi.json';
import "./Register.css";



// Extrair os dados dos arquivos JSON
const areas = areasJSON.areas; // Assumindo que areasJSON tem a estrutura { areas: ['Saude', ...]}
const provincias = provinciasJSON.provincias; // Assumindo que provinciasJSON tem a estrutura { provincias: ['Bengo', ...]}
const validBIs = biJSON.bis; // Assumindo que biJSON tem a estrutura { bis: ['12345678901234', ...]}

export function FormularioEmpreendedor() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    telefone: '',
    provincia: '',
    area_atuacao: '',
    bi: '',
    nome: '',
    data_nascimento: '',
    genero: ''
  });

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); 
  
  const handleVoltar = () => {
    window.history.back(); // Isso volta para a página anterior no histórico de navegação
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validação do BI
    if (!validBIs.includes(formData.bi)) {
      setMessage({ type: 'error', text: 'BI inválido!' });
      setIsOpen(true);
      return; 
    }
   
    try {
      const response = await axios.post('http://localhost:3001/register/empreendedor', formData);
      setMessage({ type: 'success', text: response.data.message });
      setIsOpen(true);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao registrar empreendedor' });
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
     // Redireciona para a página de login apenas se o cadastro for bem-sucedido
    if (message && message.type === 'success') {
      navigate('/login');

     // Limpa os campos do formulário
     setFormData({
       email: '',
       password: '',
       telefone: '',
       provincia: '',
       area_atuacao: '',
       bi: '',
       nome: '',
       data_nascimento: '',
       genero: ''
     });
    }
  };
  
  return (
    <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-white mb-3">Registro de Empreendedor</h2>
      <form onSubmit={handleSubmit} className='grid-cols-1'>
      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className='col-span-2'>
          <label className="block text-gray-400 mb-2">Nome</label>
          <input
            type="text"
            name="nome"
            className="capitalize w-full p-2 rounded bg-gray-700 text-white border-b-2 focus:ring-transparent"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="lowercase w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.email}
            onChange={handleChange}
            required
            
          />
        </div>
        <div >
          <label className="block text-gray-400 mb-2">Senha</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
            title="Sua senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Telefone</label>
          <input
            type="text"
            name="telefone"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.telefone}
            onChange={handleChange}
            required
            minLength={9}
            maxLength={9}
            pattern="[0-9]{9}"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Província</label>
          <select
            name="provincia"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.provincia}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {provincias.map((provincia) => (
              <option key={provincia} value={provincia}>{provincia}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Área de Atuação</label>
          <select
            name="area_atuacao"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.area_atuacao}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-2">BI</label>
          <input
            type="text"
            name="bi"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.bi}
            onChange={handleChange}
            required
            minLength={14}
            maxLength={14}
            pattern="^\d{9}[A-Z]{2}\d{3}$"
            
          />
        </div>
       
        <div>
          <label className="block text-gray-400 mb-2">Data de Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.data_nascimento}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-2">Gênero</label>
          <select
            name="genero"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
     

        </div>
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