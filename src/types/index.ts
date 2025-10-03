export interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  email: string;
}

export interface Reparacao {
  id: number;
  clienteId: number;
  aparelho: string;
  problema: string;
  status: 'pendente' | 'em_curso' | 'concluido';
  custo: number;
  dataEntrada: Date;
  dataConclusao?: Date;
}

export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

export interface Venda {
  id: number;
  clienteId: number;
  produtos: { produtoId: number; quantidade: number }[];
  total: number;
  data: Date;
}

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  precoBase: number;
}

export interface Avaliacao {
  id: number;
  cliente: string;
  nota: number;
  comentario: string;
  data: Date;
}