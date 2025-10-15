import React, { useState, useEffect } from 'react';
import type { Venda, Cliente, Produto } from '../../../types';

interface SaleFormProps {
  clientes: Cliente[];
  produtos: Produto[];
  onSubmit: (venda: Venda) => void;
  onCancel: () => void;
  onAddNewCliente: () => void;
  novoClienteId?: number | null;
}

const SaleForm: React.FC<SaleFormProps> = ({ clientes, produtos, onSubmit, onCancel, onAddNewCliente, novoClienteId }) => {
  const [clienteId, setClienteId] = useState('');
  const [itens, setItens] = useState<{ produtoId: string; quantidade: string }[]>([
    { produtoId: '', quantidade: '1' }
  ]);

  useEffect(() => {
    if (novoClienteId) {
      setClienteId(novoClienteId.toString());
    }
  }, [novoClienteId]);

  const handleAddItem = () => {
    setItens([...itens, { produtoId: '', quantidade: '1' }]);
  };

  const handleRemoveItem = (index: number) => {
    if (itens.length > 1) {
      setItens(itens.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: 'produtoId' | 'quantidade', value: string) => {
    const newItens = [...itens];
    newItens[index] = { ...newItens[index], [field]: value };
    setItens(newItens);
  };

  const calculateTotal = () => {
    return itens.reduce((total, item) => {
      const produto = produtos.find(p => p.id === Number(item.produtoId));
      if (produto && item.quantidade) {
        return total + (produto.preco * Number(item.quantidade));
      }
      return total;
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const vendaItens = itens
      .filter(item => item.produtoId && item.quantidade)
      .map(item => ({
        produtoId: Number(item.produtoId),
        quantidade: Number(item.quantidade)
      }));

    if (vendaItens.length > 0 && clienteId) {
      onSubmit({
        clienteId: Number(clienteId),
        produtos: vendaItens,
        total: calculateTotal(),
      } as Venda);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-2xl max-h-full overflow-y-auto shadow-xl">
        <h3 className="text-2xl font-bold mb-6">Nova Venda</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Cliente</label>
            <div className="flex gap-2">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
              <button 
                type="button"
                onClick={onAddNewCliente}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors flex-shrink-0"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-700 font-medium">Itens da Venda</label>
              <button type="button" onClick={handleAddItem} className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                + Adicionar Item
              </button>
            </div>

            <div className="space-y-2">
              {itens.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <select className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white" value={item.produtoId} onChange={(e) => handleItemChange(index, 'produtoId', e.target.value)} required>
                    <option value="">Selecione um produto</option>
                    {produtos.map(produto => (
                      <option key={produto.id} value={produto.id}>
                        {produto.nome} - MT {produto.preco.toFixed(2)}
                      </option>
                    ))}
                  </select>

                  <input type="number" min="1" className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={item.quantidade} onChange={(e) => handleItemChange(index, 'quantidade', e.target.value)} required />

                  {itens.length > 1 && (
                    <button type="button" onClick={() => handleRemoveItem(index)} className="px-3 py-1 text-red-600 hover:text-red-800">
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center text-2xl font-bold text-gray-800">
              <span>Total:</span>
              <span>MT {calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">
              Finalizar Venda
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;
