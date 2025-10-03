import React, { useState, useEffect } from 'react';
import type { Produto } from '../../../types';

interface ProductFormProps {
  produto?: Produto;
  categorias: string[];
  onSubmit: (produto: Produto, imagemFile?: File) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ produto, categorias, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(produto?.nome || '');
  const [categoria, setCategoria] = useState(produto?.categoria || '');
  const [preco, setPreco] = useState(produto?.preco.toString() || '');
  const [quantidade, setQuantidade] = useState(produto?.quantidade.toString() || '');
  const [imagemPreview, setImagemPreview] = useState(produto?.imagem || '');
  const [imagemFile, setImagemFile] = useState<File>();

  useEffect(() => {
    if (categorias.length > 0 && !categoria) {
      setCategoria(categorias[0]);
    }
  }, [categorias, categoria]);

  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagemFile(file);
      setImagemPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(
      {
        id: produto?.id,
        nome,
        categoria,
        preco: Number(preco),
        quantidade: Number(quantidade),
        imagem: imagemPreview
      },
      imagemFile
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-full overflow-y-auto">
        <h3 className="text-2xl font-bold mb-6">
          {produto ? 'Editar Produto' : 'Novo Produto'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coluna da Imagem */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 mb-2 font-medium">Foto do Produto</label>
              <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
                {imagemPreview ? (
                  <img src={imagemPreview} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                ) : (
                  <span className="text-gray-500">Sem imagem</span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Coluna dos Campos */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Nome do Produto</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Categoria</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  required
                >
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Preço (MT)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Quantidade</label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
