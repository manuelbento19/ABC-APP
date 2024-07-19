// App.js
import React from 'react';
import AppRoutes from './routes';
import { AuthProvider } from '../src/pages/Contexts/AuthContext';

function App() {
  return (
  
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
   
  );
}

export default App;
