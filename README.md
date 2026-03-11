# Treinamento Quad Concursos

Portal de capacitação e treinamento interno do Quad Concursos, organizado por núcleos, coordenadorias e conteúdos.

## 🚀 Tecnologias

- **Next.js 16.1.6** - Framework React
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Componentes de UI
- **Lucide React** - Ícones

## 📁 Estrutura do Projeto

```
treinamento-quad/
├── app/
│   ├── layout.tsx              # Layout principal
│   ├── page.tsx                # Página inicial (lista de núcleos)
│   ├── globals.css             # Estilos globais
│   ├── not-found.tsx           # Página 404
│   └── nucleo/
│       └── [nucleoId]/
│           ├── page.tsx        # Página do núcleo (lista de coordenadorias)
│           └── [subnucleoId]/
│               └── page.tsx    # Página da coordenadoria (lista de vídeos)
├── components/
│   ├── Header.tsx              # Cabeçalho do site
│   ├── Footer.tsx              # Rodapé do site
│   ├── Breadcrumb.tsx          # Navegação breadcrumb
│   ├── NucleoCard.tsx          # Card de núcleo
│   ├── SubnucleoCard.tsx       # Card de coordenadoria
│   ├── VideoCard.tsx           # Card de vídeo
│   └── ui/
│       └── card.tsx            # Componente Card (shadcn)
├── lib/
│   ├── data.ts                 # Dados da estrutura organizacional
│   └── utils.ts                # Utilitários (cn function)
└── ...
```

## 🏗️ Arquitetura da Informação

### Nível 1: Página Inicial
- Lista todos os **Núcleos** do Quad Concursos
- Exemplo: NGG, NGE, NTI, NMKT

### Nível 2: Página do Núcleo
- Mostra as **Coordenadorias e Setores** de cada núcleo
- Exemplo: Coordenadoria Pedagógica, Coordenadoria de Desenvolvimento

### Nível 3: Página da Coordenadoria
- Lista os **Vídeos de Treinamento** específicos
- Mostra quantidade total de conteúdos
- Informações detalhadas sobre cada vídeo (título, duração)

## 🎯 Rotas

- `/` - Página inicial com todos os núcleos
- `/nucleo/[nucleoId]` - Página de um núcleo específico
- `/nucleo/[nucleoId]/[subnucleoId]` - Página de uma coordenadoria com vídeos

### Exemplos de rotas funcionais:

- `/nucleo/ngg` - Núcleo de Gestão e Governança
- `/nucleo/ngg/ngg-coord-estrategica` - Coordenadoria Estratégica
- `/nucleo/nge` - Núcleo de Gestão Educacional
- `/nucleo/nge/nge-coord-pedagogica` - Coordenadoria Pedagógica
- `/nucleo/nti` - Núcleo de Tecnologia da Informação
- `/nucleo/nti/nti-coord-desenvolvimento` - Coordenadoria de Desenvolvimento

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📝 Como Adicionar Novos Conteúdos

### Adicionar um novo núcleo:

Edite o arquivo `lib/data.ts` e adicione um novo objeto no array `nucleosData`:

```typescript
{
  id: "novo-nucleo",
  name: "Novo Núcleo",
  description: "Descrição do novo núcleo",
  subnucleos: [
    // ... coordenadorias
  ]
}
```

### Adicionar uma nova coordenadoria:

Dentro do núcleo desejado, adicione um novo objeto no array `subnucleos`:

```typescript
{
  id: "nova-coord",
  name: "Nova Coordenadoria",
  description: "Descrição da coordenadoria",
  videos: [
    // ... vídeos
  ]
}
```

### Adicionar um novo vídeo:

Dentro da coordenadoria desejada, adicione um novo objeto no array `videos`:

```typescript
{
  id: "video-novo",
  title: "Título do Vídeo",
  duration: "20:30",
  url: "#"
}
```

## 🎨 Componentes

### Header
Cabeçalho fixo com logo e título do portal

### Footer
Rodapé com informações de copyright

### NucleoCard
Card clicável que exibe informações do núcleo

### SubnucleoCard
Card clicável que exibe informações da coordenadoria

### VideoCard
Card que exibe informações do vídeo de treinamento

### Breadcrumb
Navegação hierárquica para melhor UX

## 🔄 Funcionalidades

- ✅ Navegação hierárquica por núcleos → coordenadorias → vídeos
- ✅ Breadcrumbs para fácil navegação
- ✅ Cards interativos com hover effects
- ✅ Contadores de conteúdo (coordenadorias, vídeos)
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Rotas dinâmicas com geração estática
- ✅ Página 404 customizada
- ✅ Componentes reutilizáveis
- ✅ TypeScript para type safety

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- Mobile: < 768px (1 coluna)
- Tablet: 768px - 1024px (2 colunas)
- Desktop: > 1024px (3 colunas)

## 🎨 Tema e Cores

O projeto usa o sistema de design do shadcn/ui com variáveis CSS customizáveis no arquivo `globals.css`.

Cores principais:
- Primary: Azul (hsl(221.2 83.2% 53.3%))
- Background: Branco
- Foreground: Cinza escuro
- Muted: Cinza claro

## 📄 Licença

Este projeto é propriedade do Quad Concursos. Todos os direitos reservados.

---

Desenvolvido para o Quad Concursos - Portal de Treinamento Interno
