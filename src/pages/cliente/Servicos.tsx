import React from 'react';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';
import ServiceCard from '../components/cliente/ServiceCard';

const Servicos: React.FC = () => {
  const services = [
    {
      id: 1,
      nome: 'Troca de Tela',
      descricao: 'Substituição profissional da tela do seu dispositivo com peças de qualidade.',
      precoBase: 150,
      tempoEstimado: '2-3 horas'
    },
    {
      id: 2,
      nome: 'Substituição de Bateria',
      descricao: 'Troca da bateria para restaurar a autonomia do seu dispositivo.',
      precoBase: 80,
      tempoEstimado: '1-2 horas'
    },
    {
      id: 3,
      nome: 'Reparo de Conectores',
      descricao: 'Conserto de portas de carregamento e conectores danificados.',
      precoBase: 60,
      tempoEstimado: '1-2 horas'
    },
    {
      id: 4,
      nome: 'Limpeza Interna',
      descricao: 'Limpeza completa interna para melhorar o desempenho do dispositivo.',
      precoBase: 40,
      tempoEstimado: '1 hora'
    },
    {
      id: 5,
      nome: 'Recuperação de Dados',
      descricao: 'Recuperação de dados importantes de dispositivos danificados.',
      precoBase: 120,
      tempoEstimado: '24-48 horas'
    },
    {
      id: 6,
      nome: 'Atualização de Software',
      descricao: 'Instalação de atualizações e otimização do sistema.',
      precoBase: 30,
      tempoEstimado: '30-60 minutos'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-xl text-gray-600">Oferecemos serviços especializados para manter seus dispositivos em perfeito estado</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Não encontrou o que precisa?</h2>
            <p className="text-gray-600 mb-6">Entre em contato conosco para outros serviços ou orçamentos personalizados</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Entrar em Contato
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicos;