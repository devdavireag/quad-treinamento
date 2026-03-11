# 🗺️ Mapeamento Visual de Rotas - Treinamento Quad Concursos

## Estrutura de Navegação Completa

```
📱 PÁGINA INICIAL (/)
│
├─ 📂 NGG - Núcleo de Gestão e Governança (/nucleo/ngg)
│  │
│  ├─ 📁 Coordenadoria Estratégica (/nucleo/ngg/ngg-coord-estrategica)
│  │  └─ 🎬 3 vídeos de treinamento
│  │
│  ├─ 📁 Coordenadoria de Qualidade (/nucleo/ngg/ngg-coord-qualidade)
│  │  └─ 🎬 2 vídeos de treinamento
│  │
│  └─ 📁 Coordenadoria de Compliance (/nucleo/ngg/ngg-coord-compliance)
│     └─ 🎬 3 vídeos de treinamento
│
├─ 📂 NGE - Núcleo de Gestão Educacional (/nucleo/nge)
│  │
│  ├─ 📁 Coordenadoria Pedagógica (/nucleo/nge/nge-coord-pedagogica)
│  │  └─ 🎬 3 vídeos de treinamento
│  │
│  ├─ 📁 Coordenadoria de Produção de Conteúdo (/nucleo/nge/nge-coord-producao)
│  │  └─ 🎬 4 vídeos de treinamento
│  │
│  └─ 📁 Coordenadoria de Professores (/nucleo/nge/nge-coord-professores)
│     └─ 🎬 2 vídeos de treinamento
│
├─ 📂 NTI - Núcleo de Tecnologia da Informação (/nucleo/nti)
│  │
│  ├─ 📁 Coordenadoria de Desenvolvimento (/nucleo/nti/nti-coord-desenvolvimento)
│  │  └─ 🎬 3 vídeos de treinamento
│  │
│  ├─ 📁 Coordenadoria de Infraestrutura (/nucleo/nti/nti-coord-infraestrutura)
│  │  └─ 🎬 3 vídeos de treinamento
│  │
│  └─ 📁 Coordenadoria de Suporte (/nucleo/nti/nti-coord-suporte)
│     └─ 🎬 2 vídeos de treinamento
│
└─ 📂 NMKT - Núcleo de Marketing (/nucleo/nmkt)
   │
   ├─ 📁 Coordenadoria de Marketing Digital (/nucleo/nmkt/nmkt-coord-digital)
   │  └─ 🎬 3 vídeos de treinamento
   │
   └─ 📁 Coordenadoria de Conteúdo (/nucleo/nmkt/nmkt-coord-conteudo)
      └─ 🎬 2 vídeos de treinamento
```

## 📊 Estatísticas do Conteúdo

### Total Geral
- **4 Núcleos**
- **11 Coordenadorias**
- **30 Vídeos de Treinamento**

### Por Núcleo

#### NGG - Núcleo de Gestão e Governança
- 3 Coordenadorias
- 8 Vídeos

#### NGE - Núcleo de Gestão Educacional
- 3 Coordenadorias
- 9 Vídeos

#### NTI - Núcleo de Tecnologia da Informação
- 3 Coordenadorias
- 8 Vídeos

#### NMKT - Núcleo de Marketing
- 2 Coordenadorias
- 5 Vídeos

## 🔗 Exemplos de URLs Funcionais

### Nível 1 - Núcleos
```
http://localhost:3000/
http://localhost:3000/nucleo/ngg
http://localhost:3000/nucleo/nge
http://localhost:3000/nucleo/nti
http://localhost:3000/nucleo/nmkt
```

### Nível 2 - Coordenadorias (Exemplos)
```
http://localhost:3000/nucleo/ngg/ngg-coord-estrategica
http://localhost:3000/nucleo/ngg/ngg-coord-qualidade
http://localhost:3000/nucleo/ngg/ngg-coord-compliance
http://localhost:3000/nucleo/nge/nge-coord-pedagogica
http://localhost:3000/nucleo/nge/nge-coord-producao
http://localhost:3000/nucleo/nti/nti-coord-desenvolvimento
http://localhost:3000/nucleo/nmkt/nmkt-coord-digital
```

## 🎯 Fluxo de Navegação do Usuário

```
1️⃣ Usuário acessa a página inicial
   └─ Vê todos os 4 núcleos do Quad Concursos

2️⃣ Usuário clica em um núcleo (ex: NGG)
   └─ Vê todas as coordenadorias daquele núcleo
   └─ Vê quantos vídeos cada coordenadoria possui

3️⃣ Usuário clica em uma coordenadoria (ex: Coordenadoria Estratégica)
   └─ Vê todos os vídeos de treinamento
   └─ Vê título e duração de cada vídeo
   └─ Pode assistir aos vídeos
```

## 🧭 Sistema de Breadcrumbs

O usuário sempre sabe onde está através do breadcrumb:

```
Nível 1: Início

Nível 2: Início > NGG - Núcleo de Gestão e Governança

Nível 3: Início > NGG - Núcleo de Gestão e Governança > Coordenadoria Estratégica
```

## ✨ Funcionalidades Implementadas

- ✅ Navegação hierárquica intuitiva
- ✅ Cards visuais com informações claras
- ✅ Contadores de conteúdo em tempo real
- ✅ Breadcrumbs para orientação
- ✅ Design responsivo para todos os dispositivos
- ✅ Hover effects nos cards
- ✅ Ícones representativos
- ✅ Página 404 customizada
- ✅ Rotas dinâmicas otimizadas

## 🎨 Componentes Visuais

### Página Inicial
- Cards de núcleos em grid 3 colunas (desktop)
- Cada card mostra nome, descrição e número de coordenadorias
- Banner informativo sobre o portal

### Página do Núcleo
- Breadcrumb de navegação
- Header com nome e descrição do núcleo
- Cards de coordenadorias em grid
- Box informativo sobre o núcleo

### Página da Coordenadoria
- Breadcrumb completo
- Header com nome e descrição
- Contador de vídeos disponíveis
- Cards de vídeos em grid
- Painel de estatísticas (total de vídeos, núcleo, tipo)

## 🚀 Como Expandir

Para adicionar novos núcleos ou coordenadorias:

1. Edite `lib/data.ts`
2. Adicione os dados seguindo a estrutura TypeScript
3. As rotas serão criadas automaticamente
4. Os componentes se adaptarão aos novos dados

Exemplo:
```typescript
{
  id: "novo-nucleo",
  name: "Novo Núcleo",
  description: "Descrição",
  subnucleos: [...]
}
```
