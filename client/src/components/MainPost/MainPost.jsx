import React, { useEffect, useState, useContext } from 'react';
import CarexLogo from "../../assets/img/carex_logo.png";
import { FaThumbsUp, FaShare, FaChevronCircleRight } from 'react-icons/fa';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';
import ProfileDefault from "../../assets/img//profileDefoult.png";
import { AuthContext } from '../../context/AuthContext'; 
import axios from 'axios'; 

export function MainPost({ filter, token }) { 
    const { user, userType, setUser, setUserType } = useContext(AuthContext); 
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Se o token mudou, atualiza o estado do contexto
        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('http://localhost:3001/usuarios/', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                    // Verifique se o response.data é válido e se a propriedade 'tipo' existe
                    if (response.data && response.data.tipo) { 
                        setUser(response.data);
                        setUserType(response.data.tipo); // Use response.data.tipo
                    } else {
                        console.error('Dados do usuário inválidos ou propriedade "tipo" ausente');
                        // Trate o erro (ex: mostre uma mensagem de erro ao usuário)
                    }

                } catch (error) {
                    console.error('Erro ao obter dados do usuário:', error);
                    console.log('Token do localStorage:', localStorage.getItem('token'));
                    // Trate o erro (ex: mostre uma mensagem de erro ao usuário)
                }
            };
            fetchUserData();
        }

        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3001/postagens', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setPosts(response.data.map(post => ({
                    ...post,
                    author: {
                        // ...post.author, 
                        name: post.author ? post.author.name : 'Nome do Autor', // Verifica se post.author existe
                        tipo: post.author ? post.author.tipo : 'Tipo Desconhecido' // Verifica se post.author existe
                    }
                })));
            } catch (error) {
                console.error('Erro ao obter posts:', error);
                // Trate o erro (ex: mostre uma mensagem de erro ao usuário)
            } finally {
                setIsLoading(false); 
            }
        };

        fetchPosts(); 
    }, [token]); // Adiciona o token JWT como dependência para refazer a requisição se o token mudar
    // Filtrar os posts
    const filteredPosts = filter === 'todos'
        ? posts
        : posts.filter((post) => post.type === filter);

    if (isLoading) {
        return (
            <div className="loading-container flex justify-center items-center h-screen">
                <img src={aguardar} alt="Loading..." className="loading-gif" />
            </div>
        );
    }

    return (
        <div className="containerPost bg-gray-900 border border-gray-700 rounded-md p-4">
            {filteredPosts.map((post) => (
                <div key={post.id}>
                    <div className="whoViewdPost flex justify-between text-gray-400 ">
                        <span className='whoViewdPostName cursor-pointer'><span className="text-white font-semibold">{post.author.name}</span> comentou isto</span>
                        <span className='whoViewdPostDots text-white cursor-pointer'>...</span>
                    </div>
                    <div className="hr-line w-full h-px bg-gray-600 my-1"></div>
                    <div className="userPostDetails flex items-center mb-1">
                        <img src={post.author.FotoPerfil ? post.author.FotoPerfil : ProfileDefault} alt="" className="w-12 h-12 rounded-full" />
                        <div className="userPostMainDetails ml-4">
                            <span className="userDetailsNamePost text-white font-semibold cursor-pointer">{post.author.name}</span>
                            <span className="userDetails-about text-gray-400 text-sm">{post.author.tipo}</span>
                        </div>
                    </div>
                    {post.type === 'post' && (
                        <div className="mainFeedPost text-white mb-2 text-justify">
                            <p className="mb-4">{post.content}</p>
                            {post.image && <img src={post.image} alt="" className="w-full" />}
                        </div>
                    )}
                    {post.type === 'eventos' && (
                        <div className="mainFeedPost text-white mb-2">
                            <h4 className="text-white font-bold mb-2">{post.title}</h4>
                            <p className="mb-2">{post.description}</p>
                            <p className="mb-2">Data: {post.date}</p>
                            <p className="mb-2">Hora: {post.time}</p>
                            <p className="mb-2">Local: {post.location}</p>
                            {post.image && <img src={post.image} alt="" className="w-full" />}
                        </div>
                    )}
                    {post.type === 'startup' && (
                        <div className="mainFeedPost text-white mb-2">
                            <h4 className="text-white font-bold mb-2">{post.title}</h4>
                            <p className="mb-2">{post.description}</p>
                            {post.image && <img src={post.image} alt="" className="w-full" />}
                        </div>
                    )}
                    {post.type === 'salaDeNegocios' && (
                        <div className="mainFeedPost text-white mb-2">
                            <h4 className="text-white font-bold mb-2">{post.title}</h4>
                            <p className="mb-2">{post.description}</p>
                            <p className="mb-2">Link do Zoom: <a href={post.zoomLink} target="_blank" rel="noopener noreferrer">{post.zoomLink}</a></p>
                            {post.image && <img src={post.image} alt="" className="w-full" />}
                        </div>
                    )}
                    <div className="flex justify-evenly items-center mb-4">
                        <button className="flex items-center text-blue-400"><FaThumbsUp className="mr-2" /> Curtir</button>
                        <button className="flex items-center text-blue-400"><FaShare className="mr-2" /> Compartilhar</button>
                    </div>
                    <div className="bg-gray-800 rounded-md p-2 mb-2 flex justify-between">
                        <input type="text" placeholder='Comentar...' className="w-full h-10 rounded-full pl-4 border border-gray-600 bg-gray-600 text-white" />
                        <button className='text-blue-400 text-3xl ml-2'><FaChevronCircleRight /></button>
                    </div>
                    {post.comments.map((comment, index) => (
                        <div key={index} className="bg-gray-800 rounded-md p-2 mb-2">
                            <div className="flex justify-between text-gray-400 mb-2 text-sm">
                                <span className="text-white font-bold">{comment.author}</span>
                                <button className="text-blue-400"><FaThumbsUp className="mr-2" /></button>
                            </div>
                            <p className="text-white text-sm">{comment.content}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}