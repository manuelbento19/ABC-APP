import React, { useState } from 'react';
import { FormularioEmpresa } from './FormularioEmpresa';
import { FormularioEmpreendedor } from './FormularioEmpreendedor';
import { Logoform } from '../../components/logo';

export const Register = () => {
  const [showEmpresaForm, setShowEmpresaForm] = useState(false);
  const [showEmpreendedorForm, setShowEmpreendedorForm] = useState(false);

  const handleShowEmpresaForm = () => {
    setShowEmpresaForm(true);
    setShowEmpreendedorForm(false);
  };

  const handleShowEmpreendedorForm = () => {
    setShowEmpreendedorForm(true);
    setShowEmpresaForm(false);
  };

  const handleCancel = () => {
    setShowEmpresaForm(false);
    setShowEmpreendedorForm(false);
  };

  return (
    <>
     
      <section className='mt-8  md:min-h-screen lg:min-h-screen'>
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
          <div className="flex justify-end mb-8">
            <Logoform className="w-10 h-10" /> 
          </div> 
          <h2 className="text-2xl font-bold text-white mb-6">Registro de Usuário</h2>

          {!showEmpresaForm && !showEmpreendedorForm && (
            <div className="flex gap-4 mb-4">
              <button
                onClick={handleShowEmpresaForm}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                Empresa
              </button>
              <button
                onClick={handleShowEmpreendedorForm}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              >
                Empreendedor
              </button>           
            </div>
          )}

          {showEmpresaForm && <FormularioEmpresa />}
          {showEmpreendedorForm && <FormularioEmpreendedor />}

         

        </div>
      </section>
    </>
  );
};
