// AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const login = async (userData) => {
        try {
            const response = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Falha ao obter os dados do usuário');
            }

            const user = await response.json();
            setUserData(user.userData); // Define os dados do usuário no estado
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            setUserData(null); // Limpar o usuário em caso de erro
        }
    };

    const logout = () => {
        setUserData(null);
    };

    return (
        <AuthContext.Provider value={{ userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
