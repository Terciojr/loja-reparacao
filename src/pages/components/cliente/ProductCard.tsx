import React, { useState } from 'react';
import { useCart } from '../../../context/CartContext';
import type { Product } from '../../../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity}x ${product.nome} adicionado(s) ao carrinho!`);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all group transform hover:-translate-y-1">
      <div className="h-56 bg-gray-900 flex items-center justify-center overflow-hidden">
        <img src={product.imagem} alt={product.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      
      <div className="p-6">
        <span className="text-sm text-blue-400 bg-blue-900/50 px-3 py-1 rounded-full mb-3 inline-block font-medium">
          {product.categoria}
        </span>
        
        <h3 className="text-xl font-bold mb-2 text-white">{product.nome}</h3>
        <p className="text-gray-400 text-sm mb-4 h-10">{product.descricao}</p>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            MT {product.preco.toFixed(2)}
          </span>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-16 p-2 border border-gray-600 rounded-lg bg-gray-700 text-white text-center"
            />
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30"
            >
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;