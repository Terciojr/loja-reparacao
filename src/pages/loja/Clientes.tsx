import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';
import DataTable from '../components/loja/DataTable';
import ClienteForm from '../components/loja/ClienteForm';
import type { Cliente } from '../../types';

interface ClientesProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

const Clientes: React.FC<ClientesProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nome: 'João Silva', telefone: '(11) 99999-9999', email: 'joao@email.com' },
    { id: 2, nome: 'Maria Santos', telefone: '(11) 98888-8888', email: 'maria@email.com' },
    { id: 3, nome: 'Pedro Costa', telefone: '(21) 97777-7777', email: 'pedro@email.com' },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);
  
  const columns = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Contato', accessor: 'contato' },
    { header: 'Ações', accessor: 'acoes' },
  ];

  const handleEdit = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  const handleSubmit = (cliente: Cliente) => {
    if (cliente.id) {
      setClientes(clientes.map(c => c.id === cliente.id ? cliente : c));
    } else {
      setClientes([...clientes, { ...cliente, id: Date.now() }]);
    }
    setShowForm(false);
    setClienteEditando(null);
  };

  const data = clientes.map(cliente => ({
    ...cliente,
    nome: <span className="font-semibold">{cliente.nome}</span>,
    contato: (
      <div>
        <p className="text-sm text-gray-700">{cliente.email}</p>
        <p className="text-sm text-gray-500">{cliente.telefone}</p>
      </div>
    ),
    acoes: (
      <div className="flex gap-4">
        <Link to={`/loja/clientes/${cliente.id}`} className="text-blue-600 hover:text-blue-800 font-semibold">
          Ver Detalhes
        </Link>
        <button 
          onClick={() => handleEdit(cliente)}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          Editar
        </button>
        <button 
          onClick={() => handleDelete(cliente.id)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          Excluir
        </button>
      </div>
    )
  }));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Clientes" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Gestão de Clientes</h2>
            <button 
              onClick={() => {
                setClienteEditando(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all"
            >
              Adicionar Cliente
            </button>
          </div>

          {showForm && (
            <ClienteForm 
              cliente={clienteEditando || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setClienteEditando(null);
              }}
            />
          )}

          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
};



export default Clientes;
