import React, { useState, useEffect } from 'react';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';

// --- Ícones ---
const PrinterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>;
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 0H8m11 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 11a4 4 0 110-5.292" /></svg>;
const WrenchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-4.95-4.95a2.652 2.652 0 010-3.749l5.25-5.25a2.652 2.652 0 013.749 0l4.95 4.95M11.42 15.17L5.83 21M16.5 11.42L21 15.83" /></svg>;


interface RelatoriosProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

type Periodo = '7d' | '30d' | 'mes' | 'ano';

// Função para gerar dados simulados
const generateReportData = (periodo: Periodo) => {
  const factor = { '7d': 1, '30d': 4, 'mes': 4, 'ano': 52 }[periodo];
  return {
    kpis: {
      faturamento: 1850 * factor + Math.random() * 200,
      vendas: 42 * factor + Math.random() * 10,
      novosClientes: 8 * factor + Math.random() * 5,
      reparosConcluidos: 15 * factor + Math.random() * 5,
    },
    vendasPorDia: Array.from({ length: periodo === '7d' ? 7 : 30 }, (_, i) => ({
      dia: `Dia ${i + 1}`,
      valor: 200 + Math.random() * (200 * (i / (periodo === '7d' ? 7 : 30)) + 50),
    })),
    statusReparacoes: {
      concluidas: 45 * factor,
      emCurso: 12 * factor,
      pendentes: 8 * factor,
    },
    produtosMaisVendidos: [
      { nome: 'Capinha iPhone', vendas: 32 * factor },
      { nome: 'Carregador USB-C', vendas: 28 * factor },
      { nome: 'Película Vidro', vendas: 25 * factor },
      { nome: 'Fone Bluetooth', vendas: 18 * factor },
      { nome: 'Suporte Veicular', vendas: 15 * factor },
    ].sort((a, b) => b.vendas - a.vendas),
  };
};

const Relatorios: React.FC<RelatoriosProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [periodo, setPeriodo] = useState<Periodo>('30d');
  const [reportData, setReportData] = useState(generateReportData(periodo));

  useEffect(() => {
    setReportData(generateReportData(periodo));
  }, [periodo]);

  const kpiCards = [
    { label: 'Faturamento Total', value: `R$ ${reportData.kpis.faturamento.toFixed(2)}`, icon: <CurrencyDollarIcon />, color: 'text-green-500' },
    { label: 'Vendas Realizadas', value: Math.round(reportData.kpis.vendas), icon: <ShoppingCartIcon />, color: 'text-blue-500' },
    { label: 'Novos Clientes', value: Math.round(reportData.kpis.novosClientes), icon: <UsersIcon />, color: 'text-indigo-500' },
    { label: 'Reparos Concluídos', value: Math.round(reportData.kpis.reparosConcluidos), icon: <WrenchIcon />, color: 'text-yellow-500' },
  ];

  const totalReparacoes = Object.values(reportData.statusReparacoes).reduce((a, b) => a + b, 0);

  return (
    <div className="flex h-screen bg-gray-100 print:bg-white">
      <Sidebar isOpen={isSidebarOpen} className="print:hidden" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Relatórios" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} className="print:hidden" />
        
        <main id="report-content" className="flex-1 p-6 overflow-y-auto">
          {/* --- Cabeçalho e Filtros --- */}
          <div className="flex flex-wrap justify-between items-center mb-6 print:hidden">
            <h2 className="text-3xl font-bold text-gray-800">Relatórios e Estatísticas</h2>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <div className="flex bg-white rounded-lg shadow-sm p-1">
                Object.entries({'7d': '7 Dias', '30d': '30 Dias', 'mes': 'Mês', 'ano': 'Ano'}).map(([key, label]) => (
                  <button 
                    key={key} 
                    onClick={() => setPeriodo(key as Periodo)}
                    className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${periodo === key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    {label}
                  </button>
                ))}
              </div>
              <button onClick={() => window.print()} className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-all shadow-md">
                <PrinterIcon /> Imprimir
              </button>
            </div>
          </div>

          {/* --- Flash Cards (KPIs) --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiCards.map((card, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-5">
                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${card.color.replace('text', 'bg').replace('-500', '-100')}`}>
                  {React.cloneElement(card.icon, { className: `h-8 w-8 ${card.color}` })}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{card.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* --- Gráficos e Listas --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Gráfico de Vendas */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Vendas no Período</h3>
              <div className="h-72 flex items-end gap-2">
                {reportData.vendasPorDia.map((venda, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors"
                      style={{ height: `${(venda.valor / Math.max(...reportData.vendasPorDia.map(v => v.valor))) * 100}%` }}
                    ></div>
                    <span className="text-xs mt-1 text-gray-500 group-hover:font-bold">{venda.dia}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status de Reparações */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Status de Reparações</h3>
              <div className="space-y-4 mt-6">
                {Object.entries(reportData.statusReparacoes).map(([status, qtd]) => (
                  <div key={status}>
                    <div className="flex justify-between mb-1 font-medium text-gray-600">
                      <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                      <span>{qtd}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          status === 'concluidas' ? 'bg-green-500' :
                          status === 'emCurso' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${(qtd / totalReparacoes) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Produtos Mais Vendidos */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Produtos Mais Vendidos</h3>
            <div className="space-y-3">
              {reportData.produtosMaisVendidos.map((produto, index) => (
                <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <span className="w-10 text-lg font-bold text-gray-400">{index + 1}</span>
                  <span className="flex-1 font-semibold text-gray-700">{produto.nome}</span>
                  <span className="w-20 text-right font-bold text-blue-600">{produto.vendas} <span className="text-sm font-normal text-gray-500">vendas</span></span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Relatorios;
