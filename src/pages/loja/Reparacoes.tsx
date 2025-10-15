import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';
import DataTable from '../components/loja/DataTable';
import RepairForm from '../components/loja/RepairForm';
import ClienteForm from '../components/loja/ClienteForm';
import type { Reparacao, Cliente } from '../../types';

interface ReparacoesProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

const Reparacoes: React.FC<ReparacoesProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const [reparacoes, setReparacoes] = useState<Reparacao[]>([
    { id: 1, clienteId: 1, aparelho: 'iPhone 12', problema: 'Tela quebrada', status: 'pendente', custo: 250, dataEntrada: new Date('2023-05-15') },
    { id: 2, clienteId: 2, aparelho: 'Samsung S21', problema: 'Bateria não carrega', status: 'em_curso', custo: 120, dataEntrada: new Date('2023-05-16') },
  ]);

  const [clientes, setClientes] = useState<Cliente[]>([
    { id: 1, nome: 'João Silva', telefone: '+258 84 123 4567', email: 'joao@email.com' },
    { id: 2, nome: 'Maria Santos', telefone: '+258 82 876 5432', email: 'maria@email.com' },
  ]);

  const [showRepairForm, setShowRepairForm] = useState(false);
  const [showClienteForm, setShowClienteForm] = useState(false);
  const [reparacaoEditando, setReparacaoEditando] = useState<Reparacao | null>(null);
  const [novoClienteId, setNovoClienteId] = useState<number | null>(null);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Cliente', accessor: 'cliente' },
    { header: 'Aparelho', accessor: 'aparelho' },
    { header: 'Status', accessor: 'status' },
    { header: 'Custo (MT)', accessor: 'custo' },
    { header: 'Data Entrada', accessor: 'dataEntrada' },
    { header: 'Ações', accessor: 'acoes' },
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { classe: string; texto: string }> = {
      pendente: { classe: 'bg-yellow-100 text-yellow-800', texto: 'Pendente' },
      em_curso: { classe: 'bg-blue-100 text-blue-800', texto: 'Em Curso' },
      concluido: { classe: 'bg-green-100 text-green-800', texto: 'Concluído' },
    };
    const config = statusConfig[status] || { classe: 'bg-gray-100 text-gray-800', texto: status };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.classe}`}>{config.texto}</span>;
  };

  const handleEdit = (reparacao: Reparacao) => {
    setReparacaoEditando(reparacao);
    setShowRepairForm(true);
  };

  const handleUpdateStatus = (id: number, status: Reparacao['status']) => {
    setReparacoes(reparacoes.map(r => 
      r.id === id ? { ...r, status, dataConclusao: status === 'concluido' ? new Date() : r.dataConclusao } : r
    ));
  };

  const handleRepairSubmit = (reparacao: Reparacao) => {
    if (reparacao.id) {
      setReparacoes(reparacoes.map(r => r.id === reparacao.id ? reparacao : r));
    } else {
      setReparacoes([...reparacoes, { ...reparacao, id: Date.now(), dataEntrada: new Date() }]);
    }
    setShowRepairForm(false);
    setReparacaoEditando(null);
  };

  const handleClienteSubmit = (cliente: Cliente) => {
    const novoId = Date.now();
    setClientes([...clientes, { ...cliente, id: novoId }]);
    setNovoClienteId(novoId); // Guarda o ID do novo cliente para selecionar no formulário de reparo
    setShowClienteForm(false);
  };

  const data = reparacoes.map(reparacao => {
    const cliente = clientes.find(c => c.id === reparacao.clienteId);
    return {
      ...reparacao,
      cliente: cliente ? <Link to={`/loja/clientes/${cliente.id}`} className="text-blue-600 hover:underline">{cliente.nome}</Link> : 'N/A',
      status: getStatusBadge(reparacao.status),
      custo: `MT ${reparacao.custo.toFixed(2)}`,
      dataEntrada: reparacao.dataEntrada.toLocaleDateString('pt-MZ'),
      acoes: (
        <div className="flex gap-4">
          <button onClick={() => handleEdit(reparacao)} className="text-blue-600 hover:text-blue-800 font-medium">Editar</button>
          {reparacao.status !== 'concluido' && (
            <button onClick={() => handleUpdateStatus(reparacao.id, 'concluido')} className="text-green-600 hover:text-green-800 font-medium">Concluir</button>
          )}
        </div>
      )
    };
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Reparações" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Gestão de Reparações</h2>
            <button 
              onClick={() => {
                setReparacaoEditando(null);
                setNovoClienteId(null); // Limpa o ID do novo cliente
                setShowRepairForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all"
            >
              Nova Reparação
            </button>
          </div>

          {showRepairForm && (
            <RepairForm 
              reparacao={reparacaoEditando || undefined}
              clientes={clientes}
              onSubmit={handleRepairSubmit}
              onCancel={() => {
                setShowRepairForm(false);
                setReparacaoEditando(null);
              }}
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

export default Reparacoes;
