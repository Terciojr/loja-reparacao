import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';
import type { Cliente, Reparacao, Venda, Produto } from '../../types';

// --- Ícones ---
const ArrowLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

// --- Dados Simulados (Em um app real, viria de uma API/Context) ---
const allClientes: Cliente[] = [
  { id: 1, nome: 'João Silva', telefone: '+258 84 123 4567', email: 'joao@email.com' },
  { id: 2, nome: 'Maria Santos', telefone: '+258 82 876 5432', email: 'maria@email.com' },
  { id: 3, nome: 'Pedro Costa', telefone: '+258 86 987 6543', email: 'pedro@email.com' },
];

const allReparacoes: Reparacao[] = [
  { id: 1, clienteId: 1, aparelho: 'iPhone 12', problema: 'Tela quebrada', status: 'concluido', custo: 250, dataEntrada: new Date('2023-05-15'), dataConclusao: new Date('2023-05-16') },
  { id: 2, clienteId: 2, aparelho: 'Samsung S21', problema: 'Bateria não carrega', status: 'em_curso', custo: 120, dataEntrada: new Date('2023-05-16') },
  { id: 3, clienteId: 1, aparelho: 'Notebook Dell', problema: 'Não liga', status: 'pendente', custo: 350, dataEntrada: new Date('2023-05-20') },
];

const allProdutos: Produto[] = [
    { id: 1, nome: 'Capinha iPhone 12', categoria: 'Acessórios', preco: 49.9, quantidade: 25 },
    { id: 2, nome: 'Carregador USB-C', categoria: 'Acessórios', preco: 79.9, quantidade: 15 },
    { id: 3, nome: 'Película Vidro', categoria: 'Acessórios', preco: 29.9, quantidade: 40 },
];

const allVendas: Venda[] = [
  { id: 1, clienteId: 1, produtos: [{ produtoId: 1, quantidade: 2 }], total: 99.8, data: new Date('2023-05-15') },
  { id: 2, clienteId: 2, produtos: [{ produtoId: 2, quantidade: 1 }, { produtoId: 3, quantidade: 3 }], total: 169.6, data: new Date('2023-05-16') },
  { id: 3, clienteId: 1, produtos: [{ produtoId: 3, quantidade: 1 }], total: 29.9, data: new Date('2023-05-21') },
];

interface ClienteDetalhesProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

const ClienteDetalhes: React.FC<ClienteDetalhesProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { id } = useParams<{ id: string }>();
  const clienteId = Number(id);

  const cliente = allClientes.find(c => c.id === clienteId);
  const reparacoesCliente = allReparacoes.filter(r => r.clienteId === clienteId);
  const vendasCliente = allVendas.filter(v => v.clienteId === clienteId);

  if (!cliente) {
    return <div>Cliente não encontrado</div>;
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { classe: string; texto: string }> = {
      pendente: { classe: 'bg-yellow-100 text-yellow-800', texto: 'Pendente' },
      em_curso: { classe: 'bg-blue-100 text-blue-800', texto: 'Em Curso' },
      concluido: { classe: 'bg-green-100 text-green-800', texto: 'Concluído' },
    };
    const config = statusConfig[status] || { classe: 'bg-gray-100 text-gray-800', texto: status };
    return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${config.classe}`}>{config.texto}</span>;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={`Detalhes de ${cliente.nome}`} user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <Link to="/loja/clientes" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
              <ArrowLeftIcon />
              Voltar para Clientes
            </Link>
          </div>

          {/* --- Informações do Cliente --- */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><p className="text-sm text-gray-500">Nome</p><p className="font-semibold text-lg">{cliente.nome}</p></div>
              <div><p className="text-sm text-gray-500">Email</p><p className="font-semibold text-lg">{cliente.email}</p></div>
              <div><p className="text-sm text-gray-500">Telefone</p><p className="font-semibold text-lg">{cliente.telefone}</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* --- Histórico de Reparos --- */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Reparos</h3>
              <div className="space-y-4">
                {reparacoesCliente.length > 0 ? reparacoesCliente.map(reparo => (
                  <div key={reparo.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-gray-800">{reparo.aparelho}</p>
                        <p className="text-sm text-gray-600">{reparo.problema}</p>
                      </div>
                      {getStatusBadge(reparo.status)}
                    </div>
                    <div className="flex justify-between items-end mt-2 text-sm">
                      <p className="text-gray-500">Entrada: {reparo.dataEntrada.toLocaleDateString('pt-MZ')}</p>
                      <p className="font-semibold text-lg">MT {reparo.custo.toFixed(2)}</p>
                    </div>
                  </div>
                )) : <p className="text-gray-500">Nenhum reparo encontrado.</p>}
              </div>
            </div>

            {/* --- Histórico de Vendas --- */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Histórico de Vendas</h3>
              <div className="space-y-4">
                {vendasCliente.length > 0 ? vendasCliente.map(venda => (
                  <div key={venda.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-800">Venda #{venda.id}</p>
                        <p className="text-sm text-gray-500">Data: {venda.data.toLocaleDateString('pt-MZ')}</p>
                      </div>
                      <p className="font-semibold text-lg">MT {venda.total.toFixed(2)}</p>
                    </div>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {venda.produtos.map(item => {
                        const produto = allProdutos.find(p => p.id === item.produtoId);
                        return <li key={item.produtoId}>{produto?.nome} (x{item.quantidade})</li>;
                      })}
                    </ul>
                  </div>
                )) : <p className="text-gray-500">Nenhuma venda encontrada.</p>}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ClienteDetalhes;
