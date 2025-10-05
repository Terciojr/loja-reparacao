import React from 'react';

const Bars3Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

interface HeaderProps {
  title: string;
  user: { nome: string; tipo: string };
  onLogout: () => void;
  onToggleSidebar: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ title, user, onLogout, onToggleSidebar, className }) => {
  return (
    <header className={`bg-white shadow-md text-gray-800 p-4 flex justify-between items-center ${className || ''}`}>
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="text-gray-500 hover:text-gray-800">
            <Bars3Icon />
        </button>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <span>{user.nome} ({user.tipo})</span>
        <button 
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
        >
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;