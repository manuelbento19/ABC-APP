import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Link } from 'react-router-dom';

const faqsData = [
  {
    question: 'Como posso me cadastrar?',
    answer:
      'Para se cadastrar, basta clicar no link a seguir Registrar-se. Você será direcionado para a página de registro onde poderá preencher seus dados.',
    Link: <Link to="/register">Registrar-se</Link>,
},
  {
    question: 'Preciso ter um NIF?',
    answer:
      'Sim, para cadastrar na plataforma, precisa ser um empresário ou representante de uma empresa com NIF válido.',
  },
  {
    question: 'Como funciona a plataforma?',
    answer:
      'A plataforma tem como principal objetivo conectar empresas, empreendedores e startups digitais em Angola e outras partes do mundo.',
  },
  {
    question: 'Quais são os tipos de serviços encontrados?',
    answer: 'Os tipos de negócios encontrados são: startups, empreendedores e empresas.',
  },
  {
    question: 'Preciso fazer algum pagamento para registrar-se?',
    answer:
      'Não, não precisa ser feito nenhum pagamento para poder registrar-se na plataforma, basta ser apenas um empreendedor ou representante de uma empresa com NIF válido.',
  },
];

export function Faqs() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <Header />
      <section className="bg-gray-900 text-white min-h-screen pt-20 pb-10 mt-20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center lg:text-lg xl:text-xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-center lg:text-sm xl:text-center leading-7 text-gray-300">
              Não consegue encontrar a resposta que procura? Entre em contato com nossa equipe de{' '}
              <Link to="" className="text-blue-500">
                suporte ao cliente
              </Link>
              .
            </p>
          </div>
          <div className="mt-12 space-y-4">
            {faqsData.map((faq, index) => (
              <div key={index} className="bg-gray-800 rounded-lg shadow-md">
                <div
                  className="flex justify-between items-center cursor-pointer px-6 py-4"
                  onClick={() => toggleAccordion(index)}
                >
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 transition-transform ${
                      activeIndex === index ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {activeIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-100 leading-7">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
