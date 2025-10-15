import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';
import { useCart } from '../../context/CartContext';

const Carrinho: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Seu Carrinho de Compras</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">Revise os itens selecionados antes de finalizar a compra.</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-700 mb-4">Seu carrinho está vazio.</p>
              <Link to="/produtos" className="text-blue-600 hover:underline font-semibold">
                Voltar para a loja
              </Link>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center border-b border-gray-200 pb-4">
                    <img src={item.imagem} alt={item.nome} className="w-24 h-24 object-cover rounded-lg mr-4" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.nome}</h3>
                      <p className="text-gray-600 text-sm">{item.descricao}</p>
                      <p className="text-blue-600 font-bold mt-1">MT {item.preco.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-20 p-2 border border-gray-300 rounded-lg text-center"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Total:</h2>
                <span className="text-3xl font-extrabold text-blue-600">MT {getCartTotal().toFixed(2)}</span>
              </div>

              <div className="mt-8 text-right">
                <Link
                  to="/checkout"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Finalizar Compra
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Carrinho;
