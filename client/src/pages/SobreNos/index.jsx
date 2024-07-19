import React from 'react';
import { Header } from '../../components/Header';

const people = [
  {
    name: 'Nvuala Carvalho',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://media.licdn.com/dms/image/D4D03AQFAjv79Ir6zdA/profile-displayphoto-shrink_200_200/0/1718754759947?e=1726099200&v=beta&t=df84tdu8C8Bvcb49YaKr9JNL0slRnyiLCL9e6KoBVU4',
  },
  {
    name: 'Anderson Claúdio',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://media.licdn.com/dms/image/D4D03AQGrnbkRmvZXsA/profile-displayphoto-shrink_800_800/0/1692366030427?e=1726704000&v=beta&t=-R8FY8bszcaCGEUy3SjLxIFN8hnAfj79cZJdPX2I6Uw'
  }
];

export function SobreNos() {
  return (
    <>
      <Header />
      <section className="bg-gray-900 text-white min-h-screen pt-08 pb-10 mt-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="lg:text-lg xl:text-xl font-bold mb-4">Angola Business Connect</h1>
            <p className="lg:text-sm xl:text-center leading-7 text-gray-300">
              Bem-vindo à Angola Business Connect, uma plataforma dedicada a conectar empresas, 
              empreendedores e startups digitais em Angola e além. Fundada com a missão de impulsionar a 
              inovação, facilitar parcerias estratégicas e promover o crescimento econômico sustentável, 
              nossa plataforma é um ponto de encontro dinâmico para profissionais visionários e 
              líderes de negócios que buscam oportunidades de colaboração e desenvolvimento.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="lg:text-lg xl:text-xl font-bold mb-4">Nossa Visão e Missão</h2>
              <p className="lg:text-sm xl:text-center leading-7 text-gray-300">
                Nossa jornada começou com a visão de construir uma comunidade vibrante e inclusiva, 
                onde empreendedores e empresas podem se conectar, compartilhar conhecimentos e alcançar 
                novos patamares de sucesso. Desde o seu lançamento, Angola Business Connect tem se destacado 
                como um catalisador de transformação no cenário empresarial angolano, 
                proporcionando um ambiente digital seguro e colaborativo para o florescimento de 
                ideias inovadoras e parcerias estratégicas.
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="lg:text-lg xl:text-xl font-bold mb-4">Compromisso com a Excelência e Integridade</h2>
              <p className="lg:text-sm xl:text-center leading-7 text-gray-300">
                Nosso compromisso com a excelência e a integridade guia cada aspecto de nossa plataforma. 
                Trabalhamos incansavelmente para oferecer uma experiência excepcional aos nossos usuários, 
                fornecendo ferramentas e recursos poderosos para facilitar a comunicação, promover a colaboração 
                e impulsionar o crescimento dos negócios. Estamos empenhados em cultivar uma cultura de confiança, 
                transparência e respeito mútuo, onde todos os membros da comunidade se sintam valorizados e capacitados 
                a alcançar seu pleno potencial.
              </p>
            </div>
          </div>
          <div className="text-center mb-12">
            <h2 className="lg:text-lg xl:text-xl font-bold mb-8">Nosso Time</h2>
            <ul className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center sm:space-x-8">
              {people.map((person) => (
                <li key={person.name} className="bg-gray-800 p-6 m-4 rounded-lg shadow-lg flex flex-col items-center">
                  <img className="h-32 w-32 rounded-full mb-4" src={person.imageUrl} alt={person.name} />
                  <h3 className="lg:text-lg xl:text-sm font-semibold mb-1">{person.name}</h3>
                  <p className="lg:text-sm xl:text-center text-indigo-400">{person.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
