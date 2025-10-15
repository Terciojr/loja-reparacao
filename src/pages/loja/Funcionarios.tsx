import React, { useState } from 'react';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';
import DataTable from '../components/loja/DataTable';
import FuncionarioForm from '../components/loja/FuncionarioForm';
import type { Funcionario, Cargo } from '../../types';

interface FuncionariosProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

const Funcionarios: React.FC<FuncionariosProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([
    { id: 1, nome: 'Admin User', email: 'admin@loja.com', bi: '123456789', nuit: '987654321', cargo: 'admin' },
    { id: 2, nome: 'Técnico Principal', email: 'tecnico@loja.com', bi: '111222333', nuit: '333222111', cargo: 'tecnico' },
    { id: 3, nome: 'Atendente de Balcão', email: 'atendente@loja.com', bi: '444555666', nuit: '666555444', cargo: 'atendente' },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [funcionarioEditando, setFuncionarioEditando] = useState<Funcionario | null>(null);
  
  const columns = [
    { header: 'Nome', accessor: 'nome' },
    { header: 'Cargo', accessor: 'cargo' },
    { header: 'Contato', accessor: 'contato' },
    { header: 'Ações', accessor: 'acoes' },
  ];

  const handleEdit = (funcionario: Funcionario) => {
    setFuncionarioEditando(funcionario);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (id === 1) {
      alert("Não é possível excluir o usuário administrador principal.");
      return;
    }
    setFuncionarios(funcionarios.filter(f => f.id !== id));
  };

  const handleSubmit = (funcionario: Funcionario) => {
    if (funcionarios.some(f => f.id === funcionario.id)) {
      setFuncionarios(funcionarios.map(f => f.id === funcionario.id ? { ...f, ...funcionario, senha: f.senha } : f)); // Don't overwrite password if not provided
    } else {
      setFuncionarios([...funcionarios, funcionario]);
    }
    setShowForm(false);
    setFuncionarioEditando(null);
  };

  const data = funcionarios.map(func => ({
    ...func,
    nome: <span className="font-semibold">{func.nome}</span>,
    cargo: <span className="font-medium text-gray-700">{func.cargo.charAt(0).toUpperCase() + func.cargo.slice(1)}</span>,
    contato: (
      <div>
        <p className="text-sm text-gray-700">{func.email}</p>
      </div>
    ),
    acoes: (
      <div className="flex gap-4">
        <button 
          onClick={() => handleEdit(func)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Editar
        </button>
        <button 
          onClick={() => handleDelete(func.id)}
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
        <Header title="Funcionários" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Gestão de Funcionários</h2>
            <button 
              onClick={() => {
                setFuncionarioEditando(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all"
            >
              Adicionar Funcionário
            </button>
          </div>

          {showForm && (
            <FuncionarioForm 
              funcionario={funcionarioEditando || undefined}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setFuncionarioEditando(null);
              }}
            />
          )}

          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
};

export default Funcionarios;
