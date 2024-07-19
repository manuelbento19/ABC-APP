import React, { useState } from 'react';
import { PrincipalPage } from '../../layout/principalPage';

export function ServicesPage() {
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [serviceImage, setServiceImage] = useState(null);

  const handleAddService = (e) => {
    e.preventDefault();

    if (serviceName.trim() && serviceDescription.trim() && serviceImage) {
      const newService = {
        id: services.length + 1,
        name: serviceName,
        description: serviceDescription,
        image: URL.createObjectURL(serviceImage),
      };

      setServices([...services, newService]);
      setServiceName('');
      setServiceDescription('');
      setServiceImage(null);
    }
  };

  const handleImageChange = (e) => {
    setServiceImage(e.target.files[0]);
  };

  return (
    <PrincipalPage>
      <section className=" bg-gray-850 flex items-center justify-center py-12">
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="bg-gray-850 rounded-lg p-6 lg:px-12 lg:py-10">
            <h1 className="text-2xl font-semibold text-white mb-6">Serviços</h1>
            <p className="text-sm text-gray-300 mb-8">Adicione os serviços que você ou sua empresa prestam.</p>

            <form onSubmit={handleAddService} className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="serviceName" className="block text-sm font-medium leading-6 text-white mb-2">
                    Nome do Serviço
                  </label>
                  <input
                    type="text"
                    id="serviceName"
                    name="serviceName"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="serviceDescription" className="block text-sm font-medium leading-6 text-white mb-2">
                    Descrição do Serviço
                  </label>
                  <textarea
                    id="serviceDescription"
                    name="serviceDescription"
                    value={serviceDescription}
                    onChange={(e) => setServiceDescription(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-2 px-3 text-gray-850 shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="serviceImage" className="block text-sm font-medium leading-6 text-white mb-2">
                    Imagem do Serviço
                  </label>
                  <input
                    type="file"
                    id="serviceImage"
                    name="serviceImage"
                    onChange={handleImageChange}
                    required
                    className="block w-full text-gray-900"
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
                >
                  Adicionar Serviço
                </button>
              </div>
            </form>

            <div>
              <h2 className="text-xl font-semibold text-white mb-6">Serviços Adicionados</h2>
              {services.length === 0 ? (
                <p className="text-gray-400">Nenhum serviço adicionado.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service.id} className="bg-gray-700 p-6 rounded-lg shadow-md flex flex-col">
                      <img src={service.image} alt={service.name} className="w-full h-45 object-cover rounded-md mb-4" />
                      <h3 className="text-lg leading-5 font-semibold text-white text-center mb-2">{service.name}</h3>
                      <p className="text-gray-300 leading-4 flex-grow overflow-hidden text-wrap text-center">{service.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PrincipalPage>
  );
}
