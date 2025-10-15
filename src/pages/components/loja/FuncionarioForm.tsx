import React, { useState } from 'react';
import type { Funcionario, Cargo } from '../../../types';

interface FuncionarioFormProps {
  funcionario?: Funcionario;
  onSubmit: (funcionario: Funcionario) => void;
  onCancel: () => void;
}

const cargos: Cargo[] = ['admin', 'tecnico', 'atendente'];

const FuncionarioForm: React.FC<FuncionarioFormProps> = ({ funcionario, onSubmit, onCancel }) => {
  const [nome, setNome] = useState(funcionario?.nome || '');
  const [email, setEmail] = useState(funcionario?.email || '');
  const [bi, setBi] = useState(funcionario?.bi || '');
  const [nuit, setNuit] = useState(funcionario?.nuit || '');
  const [cargo, setCargo] = useState<Cargo>(funcionario?.cargo || 'atendente');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: funcionario?.id || Date.now(),
      nome,
      email,
      bi,
      nuit,
      cargo,
      senha,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-lg shadow-xl">
        <h3 className="text-2xl font-bold mb-6">
          {funcionario ? 'Editar Funcionário' : 'Novo Funcionário'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Nome Completo</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">BI (Nº de Identidade)</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={bi} onChange={(e) => setBi(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">NUIT</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={nuit} onChange={(e) => setNuit(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Cargo</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white" value={cargo} onChange={(e) => setCargo(e.target.value as Cargo)} required>
                {cargos.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Senha</label>
              <input type="password" placeholder={funcionario ? 'Deixar em branco para não alterar' : ''} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={senha} onChange={(e) => setSenha(e.target.value)} required={!funcionario} />
            </div>
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

export default FuncionarioForm;
