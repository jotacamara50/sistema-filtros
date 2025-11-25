import React from 'react';
import { Transaction } from '../types/data';
import './DataTable.css';

interface DataTableProps {
  data: Transaction[];
  isLoading: boolean;
}

export const DataTable: React.FC<DataTableProps> = ({ data, isLoading }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    const statusClass = `status-badge status-${status}`;
    const statusText = {
      ativo: 'Ativo',
      pendente: 'Pendente',
      cancelado: 'Cancelado'
    }[status] || status;

    return <span className={statusClass}>{statusText}</span>;
  };

  const getCityLabel = (cityKey: string) => {
    const cities: Record<string, string> = {
      'sao-paulo': 'São Paulo, SP',
      'curitiba': 'Curitiba, PR',
      'salvador': 'Salvador, BA',
      'rio': 'Rio de Janeiro, RJ',
      'bh': 'Belo Horizonte, MG',
      'brasilia': 'Brasília, DF'
    };
    return cities[cityKey] || cityKey;
  };

  const getCountryLabel = (countryKey: string) => {
    const countries: Record<string, string> = {
      'br': 'Brasil',
      'us': 'EUA',
      'cn': 'China',
      'ar': 'Argentina',
      'jp': 'Japão'
    };
    return countries[countryKey] || countryKey;
  };

  if (isLoading) {
    return (
      <div className="table-loading">
        <div className="spinner"></div>
        <p>Carregando dados...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="table-empty">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2"/>
          <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2"/>
        </svg>
        <h3>Nenhum resultado encontrado</h3>
        <p>Tente ajustar os filtros ou limpar todos os filtros.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Resultados</h3>
        <span className="result-count">{data.length} registro(s) encontrado(s)</span>
      </div>
      
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cidade</th>
              <th>Regime Tributação</th>
              <th>PRC</th>
              <th>Remetente</th>
              <th>Destinatário</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction) => (
              <tr key={transaction.id}>
                <td className="td-id">#{transaction.id}</td>
                <td>{getCityLabel(transaction.cidade)}</td>
                <td>
                  <div className="regime-tags">
                    {transaction.regimeTributacao.map((regime, idx) => (
                      <span key={idx} className="regime-tag">
                        {regime.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <span className={`prc-badge prc-${transaction.prc}`}>
                    {transaction.prc === 'sim' ? 'Sim' : 'Não'}
                  </span>
                </td>
                <td>
                  <div className="location">
                    <div className="location-city">{transaction.cidadeRemetente}</div>
                    <div className="location-country">{getCountryLabel(transaction.paisRemetente)}</div>
                  </div>
                </td>
                <td>
                  <div className="location">
                    <div className="location-city">{transaction.cidadeDestinatario}</div>
                    <div className="location-country">{getCountryLabel(transaction.paisDestinatario)}</div>
                  </div>
                </td>
                <td className="td-valor">{formatCurrency(transaction.valor)}</td>
                <td>{formatDate(transaction.data)}</td>
                <td>{getStatusBadge(transaction.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
