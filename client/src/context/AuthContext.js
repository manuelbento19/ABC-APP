import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Cria o contexto
const AuthContext = createContext();

// Componente Provedor de Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null); // Adiciona o estado para o tipo de usuário

  // Função para logar o usuário
  // AuthContext.js
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        Email: email,
        Senha: password,
      });
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);

      if (response.data.user && response.data.user.tipo) {
        // Verifica se a propriedade existe
        setUser(response.data.user); // Assumindo que a API retorna o usuário
        setUserType(response.data.user.tipo); // Define o tipo de usuário
        console.log("user: ", response.data);
        console.log("userType: ", response.data.user.tipo);
      } else {
        console.error('Propriedade "tipo" não encontrada na resposta da API');
        // Tratar o erro (exibir uma mensagem de erro)
      }
    } catch (error) {
      console.error("Erro ao logar:", error);
      window.location.reload(alert("Credênciais Invalidas"));
      // Tratar o erro (por exemplo, exibir uma mensagem de erro)
    }
  };

  // Função para sair da conta
  const logout = () => {
    setToken(null);
    setUser(null);
    setUserType(null); // Limpa o tipo de usuário
    localStorage.removeItem("token");
  };

  // Obter as informações do usuário logado
  const getUser = () => {
    return user;
  };

  // Verificar se o usuário está logado quando o componente é montado
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // Fazer uma requisição para obter as informações do usuário (verifique sua API)
      axios
        .get(`http://localhost:3001/usuarios/`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response?.data);
          setUserType(response?.data?.tipo);
        })
        .catch((error) => {
          // Tratar o erro caso a requisição falhe
          console.error("Erro ao obter informações do usuário:", error);
        });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, token, userType, setUser, login, logout, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
