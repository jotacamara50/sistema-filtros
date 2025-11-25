import React from 'react';
import { Select } from './Select';
import { MultiSelect } from './MultiSelect';
import { FilterCondition, FilterColumn, OPERATORS_BY_TYPE, OPERATOR_LABELS } from '../types/filters';
import './FilterRow.css';

interface FilterRowProps {
  condition: FilterCondition;
  columns: FilterColumn[];
  onUpdate: (condition: FilterCondition) => void;
  onRemove: () => void;
}

export const FilterRow: React.FC<FilterRowProps> = ({
  condition,
  columns,
  onUpdate,
  onRemove
}) => {
  const selectedColumn = columns.find(col => col.key === condition.columnKey);
  const availableOperators = selectedColumn 
    ? (selectedColumn.operators || OPERATORS_BY_TYPE[selectedColumn.type])
    : [];

  const handleColumnChange = (columnKey: string) => {
    const newColumn = columns.find(col => col.key === columnKey);
    if (!newColumn) return;

    const defaultOperators = newColumn.operators || OPERATORS_BY_TYPE[newColumn.type];
    
    onUpdate({
      ...condition,
      columnKey,
      operator: defaultOperators[0],
      value: newColumn.type === 'multiSelect' ? [] : '',
      values: undefined
    });
  };

  const handleOperatorChange = (operator: string) => {
    onUpdate({
      ...condition,
      operator: operator as any
    });
  };

  const handleValueChange = (value: any) => {
    if (selectedColumn?.type === 'multiSelect') {
      onUpdate({
        ...condition,
        values: value,
        value: undefined
      });
    } else {
      onUpdate({
        ...condition,
        value,
        values: undefined
      });
    }
  };

  const renderValueInput = () => {
    if (!selectedColumn) return null;

    switch (selectedColumn.type) {
      case 'multiSelect':
        return (
          <MultiSelect
            value={condition.values || []}
            onChange={handleValueChange}
            options={selectedColumn.options || []}
            placeholder="Selecione valores"
          />
        );

      case 'select':
        if (condition.operator === 'in' || condition.operator === 'notIn') {
          return (
            <MultiSelect
              value={condition.values || []}
              onChange={(values) => onUpdate({ ...condition, values, value: undefined })}
              options={selectedColumn.options || []}
              placeholder="Selecione valores"
            />
          );
        }
        return (
          <Select
            value={condition.value || ''}
            onChange={handleValueChange}
            options={selectedColumn.options || []}
            placeholder="Selecione um valor"
          />
        );

      case 'text':
        return (
          <input
            type="text"
            className="filter-input"
            value={condition.value || ''}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="Digite o valor"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            className="filter-input"
            value={condition.value || ''}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="Digite o número"
          />
        );

      case 'date':
        return (
          <input
            type="date"
            className="filter-input"
            value={condition.value || ''}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        );

      case 'boolean':
        return (
          <Select
            value={condition.value?.toString() || ''}
            onChange={(val) => handleValueChange(val === 'true')}
            options={[
              { label: 'Sim', value: 'true' },
              { label: 'Não', value: 'false' }
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="filter-row">
      <div className="filter-column">
        <Select
          value={condition.columnKey}
          onChange={handleColumnChange}
          options={columns.map(col => ({ label: col.label, value: col.key }))}
          placeholder="Coluna"
        />
      </div>

      {selectedColumn && (
        <>
          <div className="filter-operator">
            <Select
              value={condition.operator}
              onChange={handleOperatorChange}
              options={availableOperators.map(op => ({
                label: OPERATOR_LABELS[op],
                value: op
              }))}
              placeholder="Operador"
            />
          </div>

          <div className="filter-value">
            {renderValueInput()}
          </div>
        </>
      )}

      <button
        className="filter-remove-btn"
        onClick={onRemove}
        aria-label="Remover filtro"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
        </svg>
      </button>
    </div>
  );
};
