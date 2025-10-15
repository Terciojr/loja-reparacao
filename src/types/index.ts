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
}

export interface Avaliacao {
  id: number;
  cliente: string;
  nota: number;
  comentario: string;
  data: Date;
}

export type Cargo = 'admin' | 'tecnico' | 'atendente';

export interface Funcionario {
  id: number;
  nome: string;
  email: string;
  bi: string;
  nuit: string;
  cargo: Cargo;
  senha?: string;
}

// Tipos para o carrinho de compras
export interface Product {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
  descricao: string;
}

export interface CartItem extends Product {
  quantity: number;
}