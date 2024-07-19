import React from 'react';
import { Header } from '../../components/Header';

export function Beneficios() {
    return (
        <>
            <Header />
            <section className="bg-gray-900 text-white min-h-screen pt-20 pb-10 mt-20">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-center lg:text-lg xl:text-xl font-bold mb-4">Benefícios da ABC</h2>
                        <p className="text-center lg:text-sm xl:text-center leading-7 text-gray-300">
                            Descubra os benefícios de se conectar com a Angola Business Connect. Nossa plataforma oferece uma variedade de vantagens para empresas, empreendedores e startups digitais em Angola e além.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                        <div>
                            <div className="bg-gray-800 rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold mb-2">Conexões Estratégicas</h3>
                                <p className="text-sm text-gray-100 leading-7">
                                    Facilitamos conexões estratégicas entre empresas e empreendedores, promovendo colaborações que impulsionam o crescimento e a inovação.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-800 rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold mb-2">Acesso a Recursos Premium</h3>
                                <p className="text-sm text-gray-100 leading-7">
                                    Proporcionamos acesso a recursos premium, incluindo serviços de marketing, tecnologia avançada, consultoria jurídica e contábil para suportar seu negócio.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-800 rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold mb-2">Suporte Personalizado</h3>
                                <p className="text-sm text-gray-100 leading-7">
                                    Oferecemos suporte personalizado para ajudar empresas a enfrentar desafios específicos e alcançar seus objetivos estratégicos com sucesso.
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="bg-gray-800 rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold mb-2">Inovação e Desenvolvimento</h3>
                                <p className="text-sm text-gray-100 leading-7">
                                    Fomentamos a inovação e o desenvolvimento de novas ideias, proporcionando um ambiente propício para o crescimento contínuo dos negócios.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
