import React from 'react';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';
import { Link } from 'react-router-dom';

// --- Ícones SVG ---
const CheckBadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const LightningBoltIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);


const Sobre: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Sobre o Nosso Projeto</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">Conheça a equipe por trás da TechRepair.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quem Somos</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  A TechRepair é um projeto acadêmico desenvolvido por um grupo de estudantes apaixonados por tecnologia da Universidade Eduardo Mondlane.
                </p>
                <p>
                  Somos <strong>Tercio Alfredo Manjate Jr</strong>, <strong>Enia Boavida Sitoe</strong> e <strong>Edson Eugenio Chichava</strong>, estudantes do curso de Licenciatura em Informática na Faculdade de Ciências.
                </p>
                <p>
                  Este projeto foi desenvolvido como parte de uma das nossas avaliações semestrais, com o objetivo de aplicar os conhecimentos adquiridos para criar uma solução prática e funcional.
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2 h-80 lg:h-96 bg-gray-200 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
              {/* Imagem da loja ou equipe */}
              <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1964&auto=format&fit=crop" alt="Equipe da loja" className="w-full h-full object-cover"/>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-10 md:p-16 mb-20">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
              <p className="text-xl text-gray-700">
                "Proporcionar soluções tecnológicas de excelência, através de serviços de reparo especializados e uma curadoria de acessórios de alta qualidade, sempre com agilidade, integridade e um preço justo."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <CheckBadgeIcon />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Qualidade</h3>
              <p className="text-gray-600 max-w-xs">Utilizamos apenas peças e materiais de primeira linha em todos os nossos serviços e produtos.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <LightningBoltIcon />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Agilidade</h3>
              <p className="text-gray-600 max-w-xs">Otimizamos nossos processos para entregar diagnósticos e reparos no menor tempo possível.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <HeartIcon />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Confiança</h3>
              <p className="text-gray-600 max-w-xs">Construímos relações duradouras baseadas na transparência, honestidade e garantia de um bom serviço.</p>
            </div>
          </div>

          <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Venha nos Visitar</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Estamos localizados no coração da cidade, prontos para atendê-lo com a atenção que você merece.
            </p>
            <Link to="/contato#mapa" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105">
              Ver Localização no Mapa
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
