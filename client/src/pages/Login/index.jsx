import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Importação dos estilos específicos
import { Logoform } from '../../components/logo';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/Login', {
        email,
        password,
      });

      setLoading(false);
      setSuccess(true);
      console.log('Login bem sucedido:', response.data);
       // Armazena o userId no localStorage
       localStorage.setItem('userId', response.data.userId);
      navigate('/userpage');
    } catch (error) {
      setLoading(false);
      setError('Credenciais inválidas');
      console.error('Erro ao realizar login:', error);
    }
  };

  return (
    <>
      {/* Seção de login */}
      <section className="flex min-screen-full flex-1 flex-col justify-center lg:mt-28 align-middle bg-gray-900 ">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 opacity-90">
          <div className="max-w-3xl mx-auto px-4">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
               <div className="flex justify-center">
                <Logoform  /> 
                </div> 
                <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                  login
                </h2>
              </div>

              <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* Formulário de login - centralizado horizontalmente */}
                <form onSubmit={handleLogin} className="space-y-4" style={{ maxWidth: '400px', margin: '0 auto' }}> 
                  {/* Campo de email */}
                  <div>
                    <label htmlFor="email" className="block outline-0 focus:outline-0 text-sm font-medium leading-6 text-white">Endereço Email</label>
                    <div>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Campo de senha */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">Palavra-passe</label>
                    <div>
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full p-2 rounded bg-gray-700 text-white focus:ring-transparent"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white"><Link to="/forgotpassword">Esqueceu a palavra-passe?</Link></span>
                  </div>
                  {/* Botão de login */}
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={loading}
                    >
                      {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                  </div>
                  {/* Exibição de erro */}
                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      <p>{error}</p>
                    </div>
                  )}
                  {/* Link para registro */}
                  <p className="mt-10 text-center text-sm text-white">
                    Não tens uma conta?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-blue-500 hover:text-blue-600">Faça o seu Registro</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
