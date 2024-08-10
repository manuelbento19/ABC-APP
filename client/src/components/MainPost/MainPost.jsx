import React, { useEffect, useState } from 'react';
import CarexLogo from "../../assets/img/carex_logo.png";
import { FaThumbsUp, FaShare, FaChevronCircleRight } from 'react-icons/fa';
import aguardar from '../../assets/img/Spin@1x-1.0s-200px-200px (1).gif';

export function MainPost({ filter }) { // Recebe o filtro como prop
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = () => {
            setTimeout(() => {
                const dummyData = {
                    company: {
                        nome_empresa: 'Nome da Empresa',
                    },
                    entrepreneur: {
                        nome: 'Nome do Empreendedor',
                    },
                    title: 'Título do Usuário',
                };
                setUserData(dummyData);
            }, 1000);
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <div className="loading-container flex justify-center items-center h-screen">
                <img src={aguardar} alt="Loading..." className="loading-gif" />
            </div>
        );
    }

    const { company, entrepreneur } = userData;
    const displayName = company ? company.nome_empresa : (entrepreneur ? entrepreneur.nome : 'Nome não disponível');

    // Dados de posts (simulando)
    const posts = [
        {
            id: 1,
            type: 'post',
            content: 'A empresa em si é uma empresa de muito sucesso. Você nos deve isso, quão maior é essa grande escolha para nós? E quando com o presente acusamos o exercício da mais digna distinção, o prazer da flexibilidade de algo cego?',
            image: CarexLogo,
            author: {
                name: 'Carex Angola',
                title: 'Despachante',
            },
            comments: [
                {
                    author: 'Nvuala Carvalho',
                    content: 'Já aderi muitos dos serviços da Carex, e são excelentes.',
                },
                {
                    author: 'Anderson Cláudio',
                    content: 'Serviço de excelência',
                },
            ],
        },
        {
            id: 2,
            type: 'eventos',
            title: 'Evento Teste',
            description: 'Descrição do evento teste',
            image: CarexLogo,
            date: '2024-03-15',
            time: '10:00',
            location: 'Local do evento',
            author: {
                name: 'Nome do Autor',
                title: 'Título do Autor',
            },
            comments: [],
        },
        {
            id: 3,
            type: 'startup',
            title: 'Startup Inc.',
            description: 'Descrição da Startup Inc.',
            image: CarexLogo,
            author: {
                name: 'Nome do Autor',
                title: 'Título do Autor',
            },
            comments: [],
        },
        {
            id: 4,
            type: 'salasDeNegocios',
            title: 'Sala de Reunião',
            description: 'Descrição da Sala de Reunião',
            zoomLink: 'https://zoom.us/mymeeting',
            image: CarexLogo,
            author: {
                name: 'Nome do Autor',
                title: 'Título do Autor',
            },
            comments: [],
        },
        // ... mais posts
    ];

    // Filtrar os posts
    const filteredPosts = filter === 'todos'
        ? posts
        : posts.filter((post) => post.type === filter);

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
                        <img src={CarexLogo} alt="" className="w-12 h-12 rounded-full" />
                        <div className="userPostMainDetails ml-4">
                            <span className="userDetailsNamePost text-white font-semibold cursor-pointer">{post.author.name}</span>
                            <span className="userDetails-about text-gray-400 text-sm">{post.author.title}</span>
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