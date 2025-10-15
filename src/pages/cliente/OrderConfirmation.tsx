import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';

const OrderConfirmation: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-16 sm:py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <svg className="mx-auto h-24 w-24 text-green-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Pedido Realizado com Sucesso!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Obrigado pela sua compra. Você receberá um e-mail de confirmação em breve.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/produtos"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Continuar Comprando
              </Link>
              <Link
                to="/"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Voltar para o Início
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
