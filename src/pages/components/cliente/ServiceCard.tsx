import React from 'react';
import { Link } from 'react-router-dom';

interface Service {
  id: number;
  nome: string;
  descricao: string;
  precoBase: number;
  tempoEstimado: string;
}

interface ServiceCardProps {
  service: Service;
}

const WrenchScrewdriverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2 inline-block text-blue-500">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-4.95-4.95a2.652 2.652 0 010-3.749l5.25-5.25a2.652 2.652 0 013.749 0l4.95 4.95M11.42 15.17L5.83 21M16.5 11.42L21 15.83" />
    </svg>
);


const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-gray-900 flex items-center">
            <WrenchScrewdriverIcon />
            {service.nome}
        </h3>
        <p className="text-gray-600 mb-6">{service.descricao}</p>
        
        <div className="flex justify-between items-center mb-6">
          <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {service.precoBase.toFixed(2)} MT
          </span>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
            ⏱️ {service.tempoEstimado}
          </span>
        </div>

        <Link
          to="/contato"
          className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-bold hover:shadow-lg transition-shadow"
        >
          Solicitar Orçamento
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;