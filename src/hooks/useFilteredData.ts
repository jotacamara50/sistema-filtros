import { useState, useEffect } from 'react';
import { Transaction } from '../types/data';
import { FilterCondition } from '../types/filters';
import { fetchAllTransactions } from '../services/api';

export const useFilteredData = () => {
  const [allData, setAllData] = useState<Transaction[]>([]);
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados da API ao montar o componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAllTransactions();
      setAllData(data);
      setFilteredData(data);
    } catch (err) {
      setError('Erro ao carregar dados da API');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Aplicar filtros aos dados
  const applyFilters = (conditions: FilterCondition[]) => {
    if (conditions.length === 0) {
      setFilteredData(allData);
      return;
    }

    const filtered = allData.filter(item => {
      return conditions.every(condition => {
        const itemValue = item[condition.columnKey as keyof Transaction];
        
        switch (condition.operator) {
          case 'equals':
            return itemValue === condition.value;
          
          case 'notEquals':
            return itemValue !== condition.value;
          
          case 'contains':
            return String(itemValue).toLowerCase().includes(String(condition.value).toLowerCase());
          
          case 'notContains':
            return !String(itemValue).toLowerCase().includes(String(condition.value).toLowerCase());
          
          case 'startsWith':
            return String(itemValue).toLowerCase().startsWith(String(condition.value).toLowerCase());
          
          case 'endsWith':
            return String(itemValue).toLowerCase().endsWith(String(condition.value).toLowerCase());
          
          case 'in':
            // Para multi-select e arrays
            if (Array.isArray(itemValue)) {
              // Se o valor do item é um array, verifica se algum dos valores filtrados está no array
              return condition.values?.some(val => itemValue.includes(val));
            }
            // Se não for array, verifica se o valor está na lista de filtros
            return condition.values?.includes(itemValue);
          
          case 'notIn':
            if (Array.isArray(itemValue)) {
              return !condition.values?.some(val => itemValue.includes(val));
            }
            return !condition.values?.includes(itemValue);
          
          case 'greaterThan':
            return Number(itemValue) > Number(condition.value);
          
          case 'lessThan':
            return Number(itemValue) < Number(condition.value);
          
          case 'between':
            // Para implementar "between" seria necessário dois valores
            const num = Number(itemValue);
            const min = Number(condition.value);
            const max = Number(condition.values?.[0]);
            return num >= min && num <= max;
          
          default:
            return true;
        }
      });
    });

    setFilteredData(filtered);
  };

  return {
    data: filteredData,
    allData,
    isLoading,
    error,
    applyFilters,
    reload: loadData
  };
};
