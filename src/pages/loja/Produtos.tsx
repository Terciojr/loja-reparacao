import React, { useState } from 'react';
import Header from '../components/loja/Header';
import Sidebar from '../components/loja/Sidebar';
import DataTable from '../components/loja/DataTable';
import ProductForm from '../components/loja/ProductForm';
import type { Produto } from '../../types';

interface ProdutosProps {
  user: { nome: string; tipo: string };
  onLogout: () => void;
}

const Produtos: React.FC<ProdutosProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [produtos, setProdutos] = useState<Produto[]>([
    { id: 1, nome: 'Capinha iPhone 12', categoria: 'Acessórios', preco: 49.9, quantidade: 25, imagem: 'https://images.unsplash.com/photo-1598331668826-2160c9c74d1a?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, nome: 'Carregador USB-C', categoria: 'Carregadores', preco: 79.9, quantidade: 15, imagem: 'https://images.unsplash.com/photo-1608221933310-d000c40f389c?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, nome: 'Película Vidro', categoria: 'Acessórios', preco: 29.9, quantidade: 40, imagem: 'https://images.unsplash.com/photo-1598940969325-439688a40a23?q=80&w=1935&auto=format&fit=crop' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  const categorias = ['Acessórios', 'Carregadores', 'Áudio', 'Baterias', 'Cabos', 'Outros'];

  const columns = [
    { header: 'Produto', accessor: 'produto' },
    { header: 'Categoria', accessor: 'categoria' },
    { header: 'Preço (MT)', accessor: 'preco' },
    { header: 'Estoque', accessor: 'quantidade' },
    { header: 'Ações', accessor: 'acoes' },
  ];

  const handleEdit = (produto: Produto) => {
    setProdutoEditando(produto);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const handleSubmit = (produto: Produto, _imagemFile?: File) => {
    // Lógica para lidar com o upload do arquivo de imagem (imagemFile)
    // Por enquanto, apenas salvamos a URL (seja de um objeto ou string)
    if (produto.id) {
      setProdutos(produtos.map(p => p.id === produto.id ? produto : p));
    } else {
      setProdutos([...produtos, { ...produto, id: Date.now() }]);
    }
    setShowForm(false);
    setProdutoEditando(null);
  };

  const data = produtos.map(produto => ({
    ...produto,
    produto: (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-md bg-gray-200 flex-shrink-0">
          {produto.imagem && <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-contain rounded-md" />}
        </div>
        <span className="font-semibold">{produto.nome}</span>
      </div>
    ),
    preco: produto.preco.toFixed(2),
    quantidade: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        produto.quantidade < 10 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
      }`}>
        {produto.quantidade} em estoque
      </span>
    ),
    acoes: (
      <div className="flex gap-2">
        <button 
          onClick={() => handleEdit(produto)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Editar
        </button>
        <button 
          onClick={() => handleDelete(produto.id)}
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
        <Header title="Produtos" user={user} onLogout={onLogout} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Gestão de Produtos</h2>
            <button 
              onClick={() => {
                setProdutoEditando(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow-md transition-all"
            >
              Adicionar Produto
            </button>
          </div>

          {showForm && (
            <ProductForm 
              produto={produtoEditando || undefined}
              categorias={categorias}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setProdutoEditando(null);
              }}
            />
          )}

          <DataTable columns={columns} data={data} />
        </main>
      </div>
    </div>
  );
};

export default Produtos;
