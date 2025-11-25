import { Transaction, ApiResponse } from '../types/data';

// Dados mockados que simulam resposta da API
const mockTransactions: Transaction[] = [
  {
    id: '1',
    cidade: 'sao-paulo',
    regimeTributacao: ['prc', 'simples'],
    prc: 'sim',
    paisRemetente: 'br',
    cidadeRemetente: 'São Paulo',
    paisDestinatario: 'cn',
    cidadeDestinatario: 'Datang',
    valor: 15000.50,
    data: '2025-01-15',
    descricao: 'Exportação de equipamentos',
    status: 'ativo'
  },
  {
    id: '2',
    cidade: 'curitiba',
    regimeTributacao: ['outro1'],
    prc: 'nao',
    paisRemetente: 'br',
    cidadeRemetente: 'Curitiba',
    paisDestinatario: 'us',
    cidadeDestinatario: 'New York',
    valor: 25000.00,
    data: '2025-02-20',
    descricao: 'Importação de matéria-prima',
    status: 'pendente'
  },
  {
    id: '3',
    cidade: 'salvador',
    regimeTributacao: ['prc'],
    prc: 'sim',
    paisRemetente: 'br',
    cidadeRemetente: 'Salvador',
    paisDestinatario: 'cn',
    cidadeDestinatario: 'Shanghai',
    valor: 8500.75,
    data: '2025-03-10',
    descricao: 'Transação comercial',
    status: 'ativo'
  },
  {
    id: '4',
    cidade: 'rio',
    regimeTributacao: ['lucro-presumido'],
    prc: 'nao',
    paisRemetente: 'br',
    cidadeRemetente: 'Rio de Janeiro',
    paisDestinatario: 'ar',
    cidadeDestinatario: 'Buenos Aires',
    valor: 12300.00,
    data: '2025-01-25',
    descricao: 'Serviços técnicos',
    status: 'ativo'
  },
  {
    id: '5',
    cidade: 'sao-paulo',
    regimeTributacao: ['prc', 'outro2'],
    prc: 'sim',
    paisRemetente: 'br',
    cidadeRemetente: 'São Paulo',
    paisDestinatario: 'us',
    cidadeDestinatario: 'Los Angeles',
    valor: 45000.00,
    data: '2025-02-05',
    descricao: 'Consultoria internacional',
    status: 'ativo'
  },
  {
    id: '6',
    cidade: 'bh',
    regimeTributacao: ['simples'],
    prc: 'nao',
    paisRemetente: 'br',
    cidadeRemetente: 'Belo Horizonte',
    paisDestinatario: 'jp',
    cidadeDestinatario: 'Tokyo',
    valor: 33000.25,
    data: '2025-03-15',
    descricao: 'Venda de software',
    status: 'pendente'
  },
  {
    id: '7',
    cidade: 'brasilia',
    regimeTributacao: ['prc'],
    prc: 'sim',
    paisRemetente: 'br',
    cidadeRemetente: 'Brasília',
    paisDestinatario: 'cn',
    cidadeDestinatario: 'Beijing',
    valor: 18750.00,
    data: '2025-01-30',
    descricao: 'Projeto de engenharia',
    status: 'ativo'
  },
  {
    id: '8',
    cidade: 'curitiba',
    regimeTributacao: ['outro1', 'outro2'],
    prc: 'nao',
    paisRemetente: 'br',
    cidadeRemetente: 'Curitiba',
    paisDestinatario: 'cn',
    cidadeDestinatario: 'Shenzhen',
    valor: 9800.50,
    data: '2025-02-28',
    descricao: 'Importação eletrônicos',
    status: 'cancelado'
  },
  {
    id: '9',
    cidade: 'sao-paulo',
    regimeTributacao: ['simples'],
    prc: 'nao',
    paisRemetente: 'br',
    cidadeRemetente: 'São Paulo',
    paisDestinatario: 'us',
    cidadeDestinatario: 'Miami',
    valor: 27500.00,
    data: '2025-03-20',
    descricao: 'Exportação agrícola',
    status: 'ativo'
  },
  {
    id: '10',
    cidade: 'salvador',
    regimeTributacao: ['prc', 'lucro-presumido'],
    prc: 'sim',
    paisRemetente: 'br',
    cidadeRemetente: 'Salvador',
    paisDestinatario: 'ar',
    cidadeDestinatario: 'Córdoba',
    valor: 14200.00,
    data: '2025-02-12',
    descricao: 'Prestação de serviços',
    status: 'pendente'
  }
];

// Simula latência de rede
const simulateNetworkDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Simula uma chamada de API para buscar transações
 * Esta função pode ser facilmente substituída por uma chamada real usando fetch ou axios
 */
export const fetchTransactions = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiResponse<Transaction>> => {
  // Simula latência de rede
  await simulateNetworkDelay(800);

  // Simula paginação
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = mockTransactions.slice(start, end);

  return {
    data: paginatedData,
    total: mockTransactions.length,
    page,
    pageSize
  };
};

/**
 * Simula buscar TODAS as transações (para filtrar localmente)
 * Em produção, você passaria os filtros para a API
 */
export const fetchAllTransactions = async (): Promise<Transaction[]> => {
  // Simula latência de rede
  await simulateNetworkDelay(600);

  // Em uma API real, aqui você faria:
  // const response = await fetch('/api/transactions');
  // return response.json();

  return mockTransactions;
};

/**
 * Simula buscar transação por ID
 */
export const fetchTransactionById = async (id: string): Promise<Transaction | null> => {
  await simulateNetworkDelay(300);
  
  const transaction = mockTransactions.find(t => t.id === id);
  return transaction || null;
};

/**
 * Função para converter para API real
 * Basta descomentar e configurar a URL da sua API
 */
/*
export const fetchTransactionsFromRealAPI = async (
  page: number = 1,
  pageSize: number = 10
): Promise<ApiResponse<Transaction>> => {
  try {
    const response = await fetch(
      `https://sua-api.com/transactions?page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer seu-token-aqui'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw error;
  }
};
*/
