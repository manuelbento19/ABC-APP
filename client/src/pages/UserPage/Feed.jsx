import React, { useEffect, useState } from 'react';
import {MainPost} from '../../components/MainPost/MainPost';

export function Feed() {
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    const fetchPostagens = async () => {
      try {
        const response = await fetch('http://localhost:3001/postagens'); // URL da sua API
        const data = await response.json();
        setPostagens(data);
      } catch (error) {
        console.error('Erro ao obter as postagens:', error);
      }
    };

    fetchPostagens();
  }, []); 

  return (
    <div className="feed">
      <h1>Feed de Notícias</h1>
      {postagens.map((postagem) => (
        <MainPost key={postagem.id} postagem={postagem} /> 
      ))}
    </div>
  );
}

export default Feed;