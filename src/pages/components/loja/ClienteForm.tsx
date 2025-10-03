import React, { useState } from 'react';
import type { Cliente } from '../../../types';

interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (cliente: Cliente) => void;
  onCancel: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({ cliente, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(cliente?.nome || '');
  const [telefone, setTelefone] = useState(cliente?.telefone || '');
  const [email, setEmail] = useState(cliente?.email || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: cliente?.id, nome, telefone, email });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
        <h3 className="text-2xl font-bold mb-6">
          {cliente ? 'Editar Cliente' : 'Novo Cliente'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Nome</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Telefone</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onCancel} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteForm;
