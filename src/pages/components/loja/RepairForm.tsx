import React, { useState, useEffect } from 'react';
import type { Reparacao, Cliente } from '../../../types';

interface RepairFormProps {
  reparacao?: Reparacao;
  clientes: Cliente[];
  onSubmit: (reparacao: Reparacao) => void;
  onCancel: () => void;
  onAddNewCliente: () => void;
  novoClienteId?: number | null;
}

const RepairForm: React.FC<RepairFormProps> = ({ reparacao, clientes, onSubmit, onCancel, onAddNewCliente, novoClienteId }) => {
  const [clienteId, setClienteId] = useState(reparacao?.clienteId || '');
  const [aparelho, setAparelho] = useState(reparacao?.aparelho || '');
  const [problema, setProblema] = useState(reparacao?.problema || '');
  const [status, setStatus] = useState<Reparacao['status']>(reparacao?.status || 'pendente');
  const [custo, setCusto] = useState(reparacao?.custo.toString() || '');

  useEffect(() => {
    if (novoClienteId) {
      setClienteId(novoClienteId);
    }
  }, [novoClienteId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: reparacao?.id,
      clienteId: Number(clienteId),
      aparelho,
      problema,
      status,
      custo: Number(custo),
      dataEntrada: reparacao?.dataEntrada || new Date(),
      dataConclusao: status === 'concluido' ? new Date() : reparacao?.dataConclusao
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-xl">
        <h3 className="text-2xl font-bold mb-6">
          {reparacao ? 'Editar Reparação' : 'Nova Reparação'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Cliente</label>
            <div className="flex gap-2">
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map(cliente => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
              <button 
                type="button"
                onClick={onAddNewCliente}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors flex-shrink-0"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Aparelho</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={aparelho} onChange={(e) => setAparelho(e.target.value)} required />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Problema</label>
            <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={problema} onChange={(e) => setProblema(e.target.value)} rows={3} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Status</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white" value={status} onChange={(e) => setStatus(e.target.value as Reparacao['status'])} required>
                <option value="pendente">Pendente</option>
                <option value="em_curso">Em Curso</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Custo (MT)</label>
              <input type="number" step="0.01" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" value={custo} onChange={(e) => setCusto(e.target.value)} required />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <button type="button" onClick={onCancel} className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-semibold transition-colors">
              Cancelar
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors">
              Salvar Reparação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RepairForm;
