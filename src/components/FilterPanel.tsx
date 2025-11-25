import React, { useState } from 'react';
import { FilterRow } from './FilterRow';
import { FilterCondition, FilterColumn } from '../types/filters';
import './FilterPanel.css';

interface FilterPanelProps {
  columns: FilterColumn[];
  onFilter: (conditions: FilterCondition[]) => void;
  initialConditions?: FilterCondition[];
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  columns,
  onFilter,
  initialConditions = []
}) => {
  const [conditions, setConditions] = useState<FilterCondition[]>(initialConditions);

  const generateId = () => {
    return `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: generateId(),
      columnKey: columns[0]?.key || '',
      operator: 'equals',
      value: ''
    };
    setConditions([...conditions, newCondition]);
  };

  const updateCondition = (id: string, updated: FilterCondition) => {
    setConditions(conditions.map(c => c.id === id ? updated : c));
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const clearAllConditions = () => {
    setConditions([]);
  };

  const handleApplyFilters = () => {
    onFilter(conditions);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filtros</h3>
      </div>

      <div className="filter-conditions">
        {conditions.map((condition) => (
          <FilterRow
            key={condition.id}
            condition={condition}
            columns={columns}
            onUpdate={(updated) => updateCondition(condition.id, updated)}
            onRemove={() => removeCondition(condition.id)}
          />
        ))}
      </div>

      <button className="add-filter-btn" onClick={addCondition}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 3a1 1 0 011 1v3h3a1 1 0 110 2H9v3a1 1 0 11-2 0V9H4a1 1 0 110-2h3V4a1 1 0 011-1z" />
        </svg>
        Adicionar Filtro
      </button>

      <div className="filter-actions">
        <button className="clear-filters-btn" onClick={clearAllConditions}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3a1 1 0 00-.894.553L3.382 5H1a1 1 0 000 2v7a2 2 0 002 2h10a2 2 0 002-2V7a1 1 0 100-2h-2.382l-.724-1.447A1 1 0 0011 3H5zM4 8a1 1 0 012 0v5a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v5a1 1 0 102 0V8a1 1 0 00-1-1zm3 1a1 1 0 112 0v5a1 1 0 11-2 0V8z" />
          </svg>
          Limpar filtros
        </button>

        <button className="apply-filters-btn" onClick={handleApplyFilters}>
          Filtrar
        </button>
      </div>
    </div>
  );
};
