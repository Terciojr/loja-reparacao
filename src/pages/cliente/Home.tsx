import React from 'react';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';
import ProductCard from '../components/cliente/ProductCard';
import { Link } from 'react-router-dom';

// --- Ícones SVG com tema de tecnologia ---
const DevicePhoneMobileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>;
const ComputerDesktopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></svg>;
const CpuChipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m1.5-4.5v-1.5m1.5 1.5v-1.5m3 1.5v-1.5m3 1.5v-1.5m3 1.5v-1.5m-9 1.5h1.5m3 0h1.5m3 0h1.5m-12 3.75h1.5m3 0h1.5m3 0h1.5M8.25 15v1.5M12 15v1.5m3.75-1.5v1.5M15.75 8.25v-1.5m-3.75 0v-1.5m-3.75 0v-1.5m12 3.75v-1.5m3.75 0v-1.5M4.5 15.75v-1.5m15 0v-1.5M8.25 6H6.75v1.5H8.25V6zm3.75 0H10.5v1.5h1.5V6zm3.75 0H14.25v1.5h1.5V6zM6 15.75H4.5v1.5H6v-1.5zm3.75 0H8.25v1.5h1.5v-1.5zm3.75 0H12v1.5h1.5v-1.5zm3.75 0h-1.5v1.5h1.5v-1.5zM8.25 12H6.75v1.5H8.25V12zm3.75 0H10.5v1.5h1.5V12zm3.75 0H14.25v1.5h1.5V12z" /></svg>;

const Home: React.FC = () => {
  const featuredProducts = [
    { id: 1, nome: 'Capinha iPhone 13', categoria: 'Acessórios', preco: 59.9, imagem: 'https://images.unsplash.com/photo-1598331668826-2160c9c74d1a?q=80&w=2070&auto=format&fit=crop', descricao: 'Proteção de silicone com interior de microfibra.' },
    { id: 2, nome: 'Carregador Rápido USB-C', categoria: 'Carregadores', preco: 89.9, imagem: 'https://images.unsplash.com/photo-1608221933310-d000c40f389c?q=80&w=2070&auto=format&fit=crop', descricao: 'Carregador de 20W com tecnologia Power Delivery.' },
    { id: 4, nome: 'Fone Bluetooth Pro', categoria: 'Áudio', preco: 159.9, imagem: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', descricao: 'Fones sem fio com cancelamento de ruído ativo.' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative text-white text-center py-28 md:py-40 px-4">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900"></div>
          
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Soluções para o seu Mundo Digital
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Reparos especializados, acessórios de ponta e a confiança que seu dispositivo merece.
            </p>
            <Link to="/servicos" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30">
              Conheça Nossos Serviços
            </Link>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Nossa Especialidade</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl text-center border border-gray-700 hover:border-blue-500 transition-all transform hover:-translate-y-2">
                <div className="mb-5"><DevicePhoneMobileIcon /></div>
                <h3 className="text-2xl font-bold mb-3">Reparo de Celulares</h3>
                <p className="text-gray-400">Consertos em todas as marcas, utilizando peças de alta qualidade e com garantia de serviço.</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl text-center border border-gray-700 hover:border-blue-500 transition-all transform hover:-translate-y-2">
                <div className="mb-5"><ComputerDesktopIcon /></div>
                <h3 className="text-2xl font-bold mb-3">Manutenção de PCs</h3>
                <p className="text-gray-400">Soluções completas para notebooks e desktops, de hardware a otimização de software.</p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl text-center border border-gray-700 hover:border-blue-500 transition-all transform hover:-translate-y-2">
                <div className="mb-5"><CpuChipIcon /></div>
                <h3 className="text-2xl font-bold mb-3">Venda de Acessórios</h3>
                <p className="text-gray-400">Uma curadoria dos melhores acessórios para potencializar o uso dos seus aparelhos.</p>
              </div>

            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Produtos em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-16">
              <Link to="/produtos" className="text-blue-400 font-semibold text-lg hover:text-blue-300 transition-colors">
                Ver todos os produtos &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Precisa de um Orçamento?</h2>
            <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto">Nossa equipe está pronta para avaliar seu dispositivo e oferecer a melhor solução.</p>
            <Link to="/contato" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all transform hover:scale-105">
              Fale com um Especialista
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
