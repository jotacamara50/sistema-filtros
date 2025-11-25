// Tipos para os dados da API

export interface Transaction {
  id: string;
  cidade: string;
  regimeTributacao: string[];
  prc: 'sim' | 'nao';
  paisRemetente: string;
  cidadeRemetente: string;
  paisDestinatario: string;
  cidadeDestinatario: string;
  valor: number;
  data: string;
  descricao: string;
  status: 'ativo' | 'pendente' | 'cancelado';
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: any;
}
