import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlugCircleXmark } from '@fortawesome/free-solid-svg-icons';

export function PageNotFound() {
  return (
    <>
      <Header />
      <section className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-3xl font-semibold text-indigo-400">404</p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-bold tracking-tight sm:text-5xl">
            Página não encontrada
          </h1>
          <p className="mt-6 text-lg leading-7 text-gray-300">
            Desculpe, não conseguimos encontrar a página que você está procurando.
          </p>

            <div>      
                <FontAwesomeIcon icon={faPlugCircleXmark} fade size="8x" className='mb-2 mt-9'/>
            </div>
   
       
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300"
            >
              Voltar para página inicial
            </Link>
            <Link
              to="/"
              className="text-sm font-semibold text-gray-400 hover:text-gray-200 transition-colors duration-300"
            >
              Contate o suporte <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
