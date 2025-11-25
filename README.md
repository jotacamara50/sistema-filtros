# 🎯 Sistema de Filtros Dinâmicos

Sistema profissional de filtros dinâmicos com arquitetura **Backend-Driven UI**, desenvolvido do zero sem bibliotecas externas (apenas React + TypeScript + Vite).

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-4.3.0-646CFF?style=flat&logo=vite)

## ✨ Características Principais

- 🎨 **Backend-Driven UI** - Configuração de filtros vinda da API
- 🔍 **Multi-Select Avançado** - Com chips removíveis e visual moderno
- 📊 **Múltiplos Tipos de Campo** - Text, number, date, select, multi-select
- 🎯 **Operadores Inteligentes** - Equals, contains, in, greater than, etc.
- ♿ **Acessibilidade Completa** - Navegação por teclado (TAB + Enter/Space)
- 📱 **Totalmente Responsivo** - Mobile-first design
- 🚀 **Zero Dependências Extras** - Apenas React puro
- 💪 **TypeScript** - 100% tipado
- 🎭 **API Mockada** - Simula latência de rede real, fácil migrar para API real

## 🚀 Início Rápido

### Instalação

```bash
npm install
```

### Executar em Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### Build para Produção

```bash
npm run build
npm run preview
```

## 📋 Arquitetura

### Backend-Driven UI

A configuração dos filtros é **dinâmica e vem da API**, não está hardcoded no frontend:

```typescript
// A API retorna quais colunas podem ser filtradas
const columns = await fetchFilterColumns();

// Exemplo de resposta:
[
  {
    key: 'cidade',
    label: 'Cidade',
    type: 'multiSelect',
    options: [
      { label: 'São Paulo, SP', value: 'sao-paulo' },
      { label: 'Curitiba, PR', value: 'curitiba' }
    ]
  }
]
```

### Fluxo de Dados

```
1. App carrega → fetchFilterColumns() + fetchAllTransactions()
2. Renderiza filtros baseado na config da API
3. Usuário aplica filtros → Filtra dados localmente
4. Tabela atualiza em tempo real
```

## 🎨 Tipos de Campo Suportados

| Tipo | Uso | Operadores Disponíveis |
|------|-----|------------------------|
| `text` | Campos de texto livre | equals, notEquals, contains, notContains, startsWith, endsWith |
| `number` | Valores numéricos | equals, notEquals, greaterThan, lessThan, between |
| `select` | Seleção única | equals, notEquals, in, notIn |
| `multiSelect` | Múltipla escolha | in, notIn |
| `date` | Datas | equals, notEquals, greaterThan, lessThan, between |
| `boolean` | Sim/Não | equals |

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── FilterPanel.tsx        # Painel principal de filtros
│   ├── FilterRow.tsx          # Linha individual de filtro
│   ├── Select.tsx             # Select customizado
│   ├── MultiSelect.tsx        # Multi-select com chips
│   ├── DataTable.tsx          # Tabela de resultados
│   └── *.css                  # Estilos modulares
├── hooks/
│   └── useFilteredData.ts     # Hook para gerenciar dados e filtros
├── services/
│   └── api.ts                 # Camada de API (mockada)
├── types/
│   ├── filters.ts             # Tipos dos filtros
│   └── data.ts                # Tipos dos dados
├── App.tsx                    # Aplicação principal
└── main.tsx                   # Entry point
```

## 🔧 Migração para API Real

### Passo 1: Configurar endpoint da API

Em `src/services/api.ts`, descomente e configure:

```typescript
export const fetchFilterColumns = async (): Promise<FilterColumn[]> => {
  const response = await fetch('https://sua-api.com/api/filter-config', {
    headers: {
      'Authorization': 'Bearer seu-token'
    }
  });
  return response.json();
};

export const fetchAllTransactions = async (): Promise<Transaction[]> => {
  const response = await fetch('https://sua-api.com/api/transactions');
  return response.json();
};
```

### Passo 2: Formato esperado da API

**GET /api/filter-config** - Retorna configuração dos filtros:
```json
[
  {
    "key": "cidade",
    "label": "Cidade",
    "type": "multiSelect",
    "options": [
      { "label": "São Paulo, SP", "value": "sao-paulo" }
    ]
  }
]
```

**GET /api/transactions** - Retorna os dados:
```json
[
  {
    "id": "1",
    "cidade": "sao-paulo",
    "valor": 15000.50,
    "data": "2025-01-15"
  }
]
```

## 💡 Como Usar

### Exemplo Básico

```typescript
import { FilterPanel } from './components/FilterPanel';
import { DataTable } from './components/DataTable';
import { useFilteredData } from './hooks/useFilteredData';

function App() {
  const { data, isLoading, applyFilters } = useFilteredData();
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    // Carregar configuração da API
    fetchFilterColumns().then(setColumns);
  }, []);

  return (
    <>
      <FilterPanel columns={columns} onFilter={applyFilters} />
      <DataTable data={data} isLoading={isLoading} />
    </>
  );
}
```

## ♿ Acessibilidade

- ✅ Navegação completa por teclado (TAB, Enter, Space, Escape)
- ✅ Atributos ARIA adequados
- ✅ Foco visual claro
- ✅ Labels descritivos

### Atalhos de Teclado

| Ação | Tecla |
|------|-------|
| Navegar entre filtros | `TAB` |
| Abrir/fechar dropdown | `Enter` ou `Space` |
| Fechar dropdown | `Escape` |

## 🎯 Recursos Implementados

- [x] Backend-Driven UI (configuração vinda da API)
- [x] API mockada com latência realista
- [x] Sistema de filtros complexo e dinâmico
- [x] Multi-select com chips removíveis
- [x] Tabela responsiva com formatação
- [x] Loading states e tratamento de erros
- [x] Acessibilidade completa de teclado
- [x] TypeScript com tipagem forte
- [x] Design system consistente
- [x] Zero bibliotecas externas

## 📝 Licença

MIT
