import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';
import DataTable from '../components/loja/DataTable';
import SaleForm from '../components/loja/SaleForm';
import ClienteForm from '../components/loja/ClienteForm';
import type { Venda, Cliente, Produto } from '../../types';

interface VendasProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

const Vendas: React.FC<VendasProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const [vendas, setVendas] = useState<Venda[]>([
    { id: 1, clienteId: 1, produtos: [{ produtoId: 1, quantidade: 2 }], total: 99.8, data: new Date('2023-05-15') },
    { id: 2, clienteId: 2, produtos: [{ produtoId: 2, quantidade: 1 }, { produtoId: 3, quantidade: 3 }], total: 169.6, data: new Date('2023-05-16') },
  ]);

  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nome: 'João Silva', telefone: '+258 84 123 4567', email: 'joao@email.com' },
    { id: 2, nome: 'Maria Santos', telefone: '+258 82 876 5432', email: 'maria@email.com' },
  ]);

  const [produtos] = useState<Produto[]>([
    { id: 1, nome: 'Capinha iPhone 12', categoria: 'Acessórios', preco: 49.9, quantidade: 25 },
    { id: 2, nome: 'Carregador USB-C', categoria: 'Acessórios', preco: 79.9, quantidade: 15 },
    { id: 3, nome: 'Película Vidro', categoria: 'Acessórios', preco: 29.9, quantidade: 40 },
  ]);

  const [showSaleForm, setShowSaleForm] = useState(false);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [novoClienteId, setNovoClienteId] = useState<number | null>(null);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Cliente', accessor: 'cliente' },
    { header: 'Produtos', accessor: 'produtos' },
    { header: 'Total (MT)', accessor: 'total' },
    { header: 'Data', accessor: 'data' },
  ];

  const handleSaleSubmit = (venda: Venda) => {
    setVendas([...vendas, { ...venda, id: Date.now(), data: new Date() }]);
    setShowSaleForm(false);
  };

  const handleClienteSubmit = (cliente: Cliente) => {
    const novoId = Date.now();
    setClientes([...clientes, { ...cliente, id: novoId }]);
    setNovoClienteId(novoId);
    setShowClienteForm(false);
  };

  const data = vendas.map(venda => {
    const cliente = clientes.find(c => c.id === venda.clienteId);
    const produtosVenda = venda.produtos.map(p => {
      const produto = produtos.find(prod => prod.id === p.produtoId);
      return `${produto?.nome} (x${p.quantidade})`;
    }).join(', ');

    return {
      ...venda,
      cliente: cliente ? <Link to={`/loja/clientes/${cliente.id}`} className="text-blue-600 hover:underline">{cliente.nome}</Link> : 'N/A',
      produtos: produtosVenda,
      total: `MT ${venda.total.toFixed(2)}`,
      data: venda.data.toLocaleDateString('pt-MZ'),
    };
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Vendas" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Gestão de Vendas</h2>
            <button 
              onClick={() => {
                setNovoClienteId(null);
                setShowSaleForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all"
            >
              Nova Venda
            </button>
          </div>

          {showSaleForm && (
            <SaleForm 
              clientes={clientes}
              produtos={produtos}
              onSubmit={handleSaleSubmit}
              onCancel={() => setShowSaleForm(false)}
              onAddNewCliente={() => setShowClienteForm(true)}
              novoClienteId={novoClienteId}
            />
          )}

          {showClienteForm && (
            <ClienteForm 
              onSubmit={handleClienteSubmit} 
              onCancel={() => setShowClienteForm(false)} 
            />
          )}

          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
};

export default Vendas;
