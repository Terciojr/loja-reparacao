import React from 'react';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';
import ProductCard from '../components/cliente/ProductCard';

const Produtos: React.FC = () => {
  const products = [
    {
      id: 1,
      nome: 'Capinha iPhone 13',
      categoria: 'Acessórios',
      preco: 59.9,
      imagem: '/placeholder-case.jpg',
      descricao: 'Capinha protetora de alta qualidade para iPhone 13'
    },
    {
      id: 2,
      nome: 'Carregador Rápido USB-C',
      categoria: 'Carregadores',
      preco: 89.9,
      imagem: '/placeholder-charger.jpg',
      descricao: 'Carregador rápido de 20W com tecnologia PD'
    },
    {
      id: 3,
      nome: 'Película de Vidro Temperado',
      categoria: 'Acessórios',
      preco: 29.9,
      imagem: '/placeholder-glass.jpg',
      descricao: 'Proteção premium para a tela do seu dispositivo'
    },
    {
      id: 4,
      nome: 'Fone Bluetooth',
      categoria: 'Áudio',
      preco: 159.9,
      imagem: '/placeholder-headphones.jpg',
      descricao: 'Fones sem fio com cancelamento de ruído'
    },
    {
      id: 5,
      nome: 'Suporte Veicular',
      categoria: 'Acessórios',
      preco: 49.9,
      imagem: '/placeholder-holder.jpg',
      descricao: 'Suporte ajustável para carro com base magnética'
    },
    {
      id: 6,
      nome: 'Power Bank 10000mAh',
      categoria: 'Baterias',
      preco: 119.9,
      imagem: '/placeholder-powerbank.jpg',
      descricao: 'Bateria portátil com carga rápida e múltiplas portas'
    },
  ];

  const categories = ['Todos', 'Acessórios', 'Carregadores', 'Áudio', 'Baterias'];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nossos Produtos</h1>
            <p className="text-xl text-gray-600">Acessórios de qualidade para seus dispositivos</p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Produtos;