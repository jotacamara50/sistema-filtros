import React from 'react';
import { FilterPanel } from './components/FilterPanel';
import { DataTable } from './components/DataTable';
import { FilterColumn } from './types/filters';
import { useFilteredData } from './hooks/useFilteredData';
import { fetchFilterColumns } from './services/api';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [filterColumns, setFilterColumns] = useState<FilterColumn[]>([]);
  const [isLoadingColumns, setIsLoadingColumns] = useState(true);
  
  // Hook que gerencia dados da API e aplica filtros
  const { data, isLoading, error, applyFilters, reload } = useFilteredData();

  // Buscar configuração de colunas da API
  useEffect(() => {
    const loadColumns = async () => {
      try {
        setIsLoadingColumns(true);
        const columns = await fetchFilterColumns();
        setFilterColumns(columns);
      } catch (err) {
        console.error('Erro ao carregar colunas:', err);
      } finally {
        setIsLoadingColumns(false);
      }
    };
    
    loadColumns();
  }, []);

  const handleFilter = (conditions: any[]) => {
    applyFilters(conditions);
  };

  if (isLoadingColumns) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Carregando configuração...</p>
        </div>
      </div>
    );
  }

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
          Este sistema simula chamadas de API reais com latência de rede. 
          Tanto os dados quanto a <strong>configuração de filtros</strong> vêm da API (mockada).
        </p>
        
        <h3>🔄 Para usar API real:</h3>
        <ol>
          <li>Abra o arquivo <code>src/services/api.ts</code></li>
          <li>Substitua <code>fetchAllTransactions</code> e <code>fetchFilterColumns</code> por chamadas reais</li>
          <li>Ajuste a URL e headers conforme sua API</li>
          <li>O backend deve retornar as colunas disponíveis no formato <code>FilterColumn[]</code></li>
        </ol>
        
        <h3>✨ Recursos implementados:</h3>
        <ul>
          <li>✅ Consumo de API simulada (fácil migrar para API real)</li>
          <li>✅ <strong>Configuração de filtros vinda da API (Backend-Driven UI)</strong></li>
          <li>✅ Loading state durante carregamento</li>
          <li>✅ Tratamento de erros</li>
          <li>✅ Filtros aplicados em tempo real</li>
          <li>✅ Tabela responsiva com dados formatados</li>
          <li>✅ Multi-select com chips removíveis</li>
          <li>✅ Acessibilidade de teclado (TAB + Enter/Espaço)</li>
          <li>✅ Sistema completamente tipado (TypeScript)</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
