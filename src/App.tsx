import React from 'react';
import { FilterPanel } from './components/FilterPanel';
import { DataTable } from './components/DataTable';
import { FilterColumn } from './types/filters';
import { useFilteredData } from './hooks/useFilteredData';
import './App.css';

// Defina suas colunas aqui - TOTALMENTE DINÂMICO
const filterColumns: FilterColumn[] = [
  {
    key: 'cidade',
    label: 'Cidade',
    type: 'multiSelect',
    options: [
      { label: 'São Paulo, SP', value: 'sao-paulo' },
      { label: 'Curitiba, PR', value: 'curitiba' },
      { label: 'Salvador, BA', value: 'salvador' },
      { label: 'Rio de Janeiro, RJ', value: 'rio' },
      { label: 'Belo Horizonte, MG', value: 'bh' },
      { label: 'Brasília, DF', value: 'brasilia' }
    ]
  },
  {
    key: 'regimeTributacao',
    label: 'Regime de Tributação',
    type: 'multiSelect',
    options: [
      { label: 'PRC', value: 'prc' },
      { label: 'Outro 1', value: 'outro1' },
      { label: 'Outro 2', value: 'outro2' },
      { label: 'Simples Nacional', value: 'simples' },
      { label: 'Lucro Presumido', value: 'lucro-presumido' }
    ]
  },
  {
    key: 'prc',
    label: 'PRC',
    type: 'select',
    options: [
      { label: 'Sim', value: 'sim' },
      { label: 'Não', value: 'nao' }
    ]
  },
  {
    key: 'paisRemetente',
    label: 'País (Remetente)',
    type: 'select',
    options: [
      { label: 'Brasil (BR)', value: 'br' },
      { label: 'Estados Unidos (US)', value: 'us' },
      { label: 'China (CN)', value: 'cn' },
      { label: 'Argentina (AR)', value: 'ar' },
      { label: 'Japão (JP)', value: 'jp' }
    ]
  },
  {
    key: 'cidadeRemetente',
    label: 'Cidade (Remetente)',
    type: 'text'
  },
  {
    key: 'paisDestinatario',
    label: 'País (Destinatário)',
    type: 'select',
    options: [
      { label: 'China (CN)', value: 'cn' },
      { label: 'Estados Unidos (US)', value: 'us' },
      { label: 'Brasil (BR)', value: 'br' },
      { label: 'Argentina (AR)', value: 'ar' },
      { label: 'Japão (JP)', value: 'jp' }
    ]
  },
  {
    key: 'cidadeDestinatario',
    label: 'Cidade (Destinatário)',
    type: 'text'
  },
  {
    key: 'valor',
    label: 'Valor',
    type: 'number'
  },
  {
    key: 'data',
    label: 'Data',
    type: 'date'
  },
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Ativo', value: 'ativo' },
      { label: 'Pendente', value: 'pendente' },
      { label: 'Cancelado', value: 'cancelado' }
    ]
  }
];

function App() {
  // Hook que gerencia dados da API e aplica filtros
  const { data, isLoading, error, applyFilters, reload } = useFilteredData();

  const handleFilter = (conditions: any[]) => {
    applyFilters(conditions);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sistema de Filtros Dinâmicos</h1>
        <p>Consumindo API mockada com filtros em tempo real</p>
      </header>

      {error && (
        <div className="error-banner">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
          </svg>
          {error}
          <button onClick={reload}>Tentar novamente</button>
        </div>
      )}

      <FilterPanel 
        columns={filterColumns}
        onFilter={handleFilter}
      />

      <DataTable data={data} isLoading={isLoading} />

      <div className="instructions">
        <h3>📡 API Mockada - Como funciona:</h3>
        <p>
          Este sistema simula uma chamada de API real com latência de rede. 
          Os dados são carregados ao iniciar e os filtros são aplicados localmente.
        </p>
        
        <h3>🔄 Para usar API real:</h3>
        <ol>
          <li>Abra o arquivo <code>src/services/api.ts</code></li>
          <li>Substitua <code>fetchAllTransactions</code> por uma chamada real com <code>fetch</code> ou <code>axios</code></li>
          <li>Ajuste a URL e headers conforme sua API</li>
        </ol>
        
        <h3>✨ Recursos implementados:</h3>
        <ul>
          <li>✅ Consumo de API simulada (fácil migrar para API real)</li>
          <li>✅ Loading state durante carregamento</li>
          <li>✅ Tratamento de erros</li>
          <li>✅ Filtros aplicados em tempo real</li>
          <li>✅ Tabela responsiva com dados formatados</li>
          <li>✅ Multi-select com chips removíveis</li>
          <li>✅ Sistema completamente tipado (TypeScript)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
