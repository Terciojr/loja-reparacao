import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

// Páginas da Loja (Sistema Interno)
import Login from './pages/loja/Login'
import Dashboard from './pages/loja/Dashboard'
import Clientes from './pages/loja/Clientes'
import ClienteDetalhes from './pages/loja/ClienteDetalhes'
import Reparacoes from './pages/loja/Reparacoes'
import Produtos from './pages/loja/Produtos'
import Vendas from './pages/loja/Vendas'
import Relatorios from './pages/loja/Relatorios'

// Páginas do Cliente (Site Público)
import Home from './pages/cliente/Home'
import Servicos from './pages/cliente/Servicos'
import ProdutosCliente from './pages/cliente/Produtos'
import Contato from './pages/cliente/Contato'
import Avaliacoes from './pages/cliente/Avaliacoes'
import Sobre from './pages/cliente/Sobre'

function App() {
  const [user, setUser] = useState<{ nome: string; tipo: string } | null>(null)

  const handleLogin = (userData: { nome: string; tipo: string }) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ===== ROTAS DA LOJA (Sistema Interno) ===== */}
          <Route path="/loja/login" element={
            user ? <Navigate to="/loja/dashboard" /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/loja/dashboard" element={
            user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/loja/login" />
          } />
          
          <Route path="/loja/clientes" element={
            user ? <Clientes user={user} onLogout={handleLogout} /> : <Navigate to="/loja/login" />
          } />

          <Route path="/loja/clientes/:id" element={
            user ? <ClienteDetalhes user={user} onLogout={handleLogout} /> : <Navigate to="/loja/login" />
          } />
          
          <Route path="/loja/reparacoes" element={
            user ? <Reparacoes user={user} onLogout={handleLogout} /> : <Navigate to="/loja/login" />
          } />
          
          <Route path="/loja/produtos" element={
            user ? <Produtos user={user} onLogout={handleLogout} /> : <Navigate to="/loja/login" />
          } />
          
          <Route path="/loja/vendas" element={
            user ? <Vendas user={user} onLogout={handleLogout} /> : <Navigate to="/loja/login" />
          } />
          
          <Route path="/loja/relatorios" element={
            user ? <Relatorios user={user} onLogout={handleLogout} /> : <Navigate to="/loja/login" />
          } />
          
          <Route path="/loja" element={<Navigate to="/loja/dashboard" />} />

          {/* ===== ROTAS DO CLIENTE (Site Público) ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/produtos" element={<ProdutosCliente />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/avaliacoes" element={<Avaliacoes />} />
          <Route path="/sobre" element={<Sobre />} />

          {/* Rota fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App