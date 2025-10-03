import React from 'react';

interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
        
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            R$ {product.preco.toFixed(2)}
          </span>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-600/30">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
