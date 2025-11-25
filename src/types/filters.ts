// Tipos para os filtros

export type FilterOperator = 
  | 'equals' 
  | 'notEquals' 
  | 'contains' 
  | 'notContains' 
  | 'startsWith' 
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'between'
  | 'in'
  | 'notIn';

export type FilterType = 
  | 'text' 
  | 'number' 
  | 'select' 
  | 'multiSelect' 
  | 'date'
  | 'boolean';

export interface FilterOption {
  label: string;
  value: string | number | boolean;
}

export interface FilterColumn {
  key: string;
  label: string;
  type: FilterType;
  options?: FilterOption[]; // Para selects
  operators?: FilterOperator[]; // Operadores permitidos para esta coluna
}

export interface FilterCondition {
  id: string;
  columnKey: string;
  operator: FilterOperator;
  value: any;
  values?: any[]; // Para multiselect ou between
}

export interface FilterState {
  conditions: FilterCondition[];
  logic?: 'AND' | 'OR'; // Para futuras expansões
}

// Operadores disponíveis por tipo de campo
export const OPERATORS_BY_TYPE: Record<FilterType, FilterOperator[]> = {
  text: ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith'],
  number: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'between'],
  select: ['equals', 'notEquals', 'in', 'notIn'],
  multiSelect: ['in', 'notIn'],
  date: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'between'],
  boolean: ['equals']
};

// Labels para os operadores
export const OPERATOR_LABELS: Record<FilterOperator, string> = {
  equals: 'Igual a',
  notEquals: 'Diferente de',
  contains: 'Contém',
  notContains: 'Não contém',
  startsWith: 'Começa com',
  endsWith: 'Termina com',
  greaterThan: 'Maior que',
  lessThan: 'Menor que',
  between: 'Entre',
  in: 'Em',
  notIn: 'Não em'
};
