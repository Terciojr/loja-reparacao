import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/cliente/Navbar';
import Footer from '../components/cliente/Footer';
import { useCart } from '../../context/CartContext';

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }

    setIsLoading(true);
    // Simulate API call for placing an order
    setTimeout(() => {
      alert(`Pedido realizado com sucesso! Total: MT ${getCartTotal().toFixed(2)} via ${paymentMethod}.`);
      clearCart();
      setIsLoading(false);
      navigate('/confirmacao-pedido'); // Redirect to an order confirmation page
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Seu carrinho está vazio!</h1>
          <p className="text-lg text-gray-600 mb-8">Não há itens para finalizar a compra.</p>
          <Link to="/produtos" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Voltar para a Loja
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Finalizar Compra</h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">Confirme seu pedido e escolha a forma de pagamento.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <div className="flex items-center">
                      <img src={item.imagem} alt={item.nome} className="w-16 h-16 object-cover rounded-md mr-3" />
                      <div>
                        <p className="font-semibold text-gray-800">{item.nome}</p>
                        <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800">MT {(item.preco * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-6 mt-6 flex justify-between items-center">
                <p className="text-xl font-bold text-gray-900">Total a Pagar:</p>
                <span className="text-4xl font-extrabold text-blue-600">MT {getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Forma de Pagamento</h2>
              <div className="space-y-4">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="Cartão de Crédito"
                    checked={paymentMethod === 'Cartão de Crédito'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-800">Cartão de Crédito</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="M-Pesa"
                    checked={paymentMethod === 'M-Pesa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-800">M-Pesa</span>
                </label>
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="E-Mola"
                    checked={paymentMethod === 'E-Mola'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-3 text-lg font-medium text-gray-800">E-Mola</span>
                </label>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isLoading || !paymentMethod}
                className={`w-full mt-8 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg ${
                  isLoading || !paymentMethod
                    ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isLoading ? 'Processando...' : 'Confirmar Pedido e Pagar'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
