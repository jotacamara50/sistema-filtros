# Sistema de Filtros Dinâmicos

Sistema completo de filtros dinâmicos criado do zero, sem bibliotecas externas (apenas React + TypeScript).

## 🚀 Características

- ✅ **100% Dinâmico** - Sem valores mockados, totalmente configurável
- ✅ **Multi-Select** - Com chips removíveis como na imagem
- ✅ **Múltiplos Tipos de Campo** - Texto, número, data, select, multi-select, boolean
- ✅ **Operadores Diversos** - Igual, diferente, contém, começa com, termina com, etc.
- ✅ **Sem Bibliotecas Externas** - Apenas React puro
- ✅ **TypeScript** - Totalmente tipado
- ✅ **Responsivo** - Funciona em mobile e desktop

## 📦 Instalação

```bash
npm install
```

## 🏃‍♂️ Executar

```bash
npm run dev
```

## 📖 Como Usar

### 1. Definir suas colunas

Em `src/App.tsx`, configure as colunas que deseja filtrar:

```typescript
const filterColumns: FilterColumn[] = [
  {
    key: 'cidade',
    label: 'Cidade',
    type: 'multiSelect',
    options: [
      { label: 'São Paulo, SP', value: 'sao-paulo' },
      { label: 'Curitiba, PR', value: 'curitiba' },
      // ... mais opções
    ]
  },
  {
    key: 'nome',
    label: 'Nome',
    type: 'text'
  },
  {
    key: 'valor',
    label: 'Valor',
    type: 'number'
  }
  // ... mais colunas
];
```

### 2. Usar o componente

```typescript
<FilterPanel 
  columns={filterColumns}
  onFilter={(conditions) => {
    // Aplicar filtros aos seus dados
    console.log(conditions);
  }}
/>
```

### 3. Aplicar filtros aos dados

A função `applyFilters` em `App.tsx` mostra como aplicar os filtros:

```typescript
const filteredData = applyFilters(yourData, conditions);
```

## 🎨 Tipos de Campo Suportados

| Tipo | Descrição | Operadores |
|------|-----------|------------|
| `text` | Campo de texto | equals, notEquals, contains, notContains, startsWith, endsWith |
| `number` | Campo numérico | equals, notEquals, greaterThan, lessThan, between |
| `select` | Seleção única | equals, notEquals, in, notIn |
| `multiSelect` | Seleção múltipla | in, notIn |
| `date` | Data | equals, notEquals, greaterThan, lessThan, between |
| `boolean` | Sim/Não | equals |

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── FilterPanel.tsx       # Componente principal
│   ├── FilterPanel.css
│   ├── FilterRow.tsx         # Linha individual de filtro
│   ├── FilterRow.css
│   ├── Select.tsx            # Select customizado
│   ├── Select.css
│   ├── MultiSelect.tsx       # Multi-select com chips
│   └── MultiSelect.css
├── types/
│   └── filters.ts            # Definições TypeScript
├── App.tsx                   # Exemplo de uso
├── App.css
├── main.tsx
└── index.css
```

## 🔧 Customização

### Adicionar novos operadores

Edite `src/types/filters.ts`:

```typescript
export const OPERATOR_LABELS: Record<FilterOperator, string> = {
  // ... operadores existentes
  myCustomOperator: 'Meu Operador'
};
```

### Customizar cores

Edite os arquivos CSS em `src/components/` para ajustar as cores ao seu tema.

## 💡 Próximos Passos

Quando você tiver sua tabela de dados, basta:

1. Passar as colunas da tabela para o `FilterPanel`
2. Usar a função `onFilter` para receber os filtros aplicados
3. Filtrar seus dados usando a lógica em `applyFilters`

## 📝 Exemplo Completo

```typescript
import { FilterPanel } from './components/FilterPanel';

function MyApp() {
  const [data, setData] = useState(myTableData);
  
  const handleFilter = (conditions) => {
    const filtered = applyFilters(myTableData, conditions);
    setData(filtered);
  };

  return (
    <>
      <FilterPanel columns={myColumns} onFilter={handleFilter} />
      <MyTable data={data} />
    </>
  );
}
```
