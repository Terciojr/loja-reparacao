import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';

// --- Ícones ---
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 0H8m11 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292" /></svg>;
const WrenchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-4.95-4.95a2.652 2.652 0 010-3.749l5.25-5.25a2.652 2.652 0 013.749 0l4.95 4.95M11.42 15.17L5.83 21M16.5 11.42L21 15.83" /></svg>;
const ArchiveBoxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>;
const PlusCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


interface DashboardProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // --- Dados Simulados ---
  const stats = [
    { label: 'Faturamento do Mês', value: 'R$ 12.580', icon: <CurrencyDollarIcon />, color: 'from-green-500 to-green-400' },
    { label: 'Total de Clientes', value: '152', icon: <UsersIcon />, color: 'from-blue-500 to-blue-400' },
    { label: 'Reparações em Curso', value: '8', icon: <WrenchIcon />, color: 'from-yellow-500 to-yellow-400' },
    { label: 'Produtos com Estoque Baixo', value: '3', icon: <ArchiveBoxIcon />, color: 'from-red-500 to-red-400' },
  ];

  const reparosStatus = {
    concluidos: 45,
    emCurso: 8,
    pendentes: 5,
    total: 58
  };

  const atividadesRecentes = [
    { tipo: 'venda', descricao: 'Venda #1024 para João Silva', valor: 'R$ 129,90' },
    { tipo: 'reparo', descricao: 'Reparo de iPhone 13 (tela) concluído', status: 'Concluído' },
    { tipo: 'cliente', descricao: 'Novo cliente cadastrado: Ana Oliveira' },
    { tipo: 'reparo', descricao: 'Novo reparo: Samsung S22 (bateria)', status: 'Pendente' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Dashboard" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Visão Geral</h2>
            <div className="flex gap-2">
              <Link to="/loja/reparacoes" className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md">
                <PlusCircleIcon /> Nova Reparação
              </Link>
              <Link to="/loja/vendas" className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md">
                <PlusCircleIcon /> Nova Venda
              </Link>
            </div>
          </div>
          
          {/* --- KPIs --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between`}>
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{stat.label}</h3>
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold mt-4">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* --- Status de Reparos --- */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Status de Reparos</h3>
              <div className="flex justify-center items-center my-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-gray-200" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-green-500" strokeWidth="3" fill="none" strokeDasharray={`${(reparosStatus.concluidos / reparosStatus.total) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-blue-500" strokeWidth="3" fill="none" strokeDasharray={`${(reparosStatus.emCurso / reparosStatus.total) * 100}, 100`} strokeDashoffset={`-${(reparosStatus.concluidos / reparosStatus.total) * 100}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-yellow-500" strokeWidth="3" fill="none" strokeDasharray={`${(reparosStatus.pendentes / reparosStatus.total) * 100}, 100`} strokeDashoffset={`-${((reparosStatus.concluidos + reparosStatus.emCurso) / reparosStatus.total) * 100}`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">{reparosStatus.total}</span>
                    <span className="text-sm text-gray-500">Total</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between"><span className="flex items-center"><span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>Concluídos</span> <strong>{reparosStatus.concluidos}</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Em Curso</span> <strong>{reparosStatus.emCurso}</strong></div>
                <div className="flex items-center justify-between"><span className="flex items-center"><span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>Pendentes</span> <strong>{reparosStatus.pendentes}</strong></div>
              </div>
            </div>

            {/* --- Atividade Recente --- */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Atividade Recente</h3>
              <ul className="space-y-3">
                {atividadesRecentes.map((item, index) => (
                  <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <p className="font-semibold text-gray-700">{item.descricao}</p>
                    </div>
                    {item.valor && <span className="text-green-600 font-bold">{item.valor}</span>}
                    {item.status && (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        item.status === 'Concluído' ? 'bg-green-100 text-green-800' :
                        item.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>{item.status}</span>
                    )}
                    {item.tipo === 'cliente' && <span className="text-sm text-gray-500">Novo Cadastro</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
