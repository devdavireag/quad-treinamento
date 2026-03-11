# 📝 Guia: Como Adicionar Conteúdo ao Portal

## 1. Adicionar um Novo Núcleo

Abra o arquivo `lib/data.ts` e adicione um novo objeto no array `nucleosData`:

```typescript
{
  id: "nrh",  // ID único em minúsculas
  name: "NRH - Núcleo de Recursos Humanos",  // Nome completo
  description: "Gestão de pessoas, recrutamento e desenvolvimento",  // Descrição
  subnucleos: [
    // Suas coordenadorias aqui
  ]
}
```

### ⚠️ Regras Importantes:
- O `id` deve ser único e em minúsculas
- O `id` não deve conter espaços (use hífen: `nucleo-exemplo`)
- O `name` pode ter qualquer formatação
- Sempre inicie com um array vazio de `subnucleos` se ainda não tiver coordenadorias

## 2. Adicionar uma Nova Coordenadoria

Dentro do núcleo desejado, adicione no array `subnucleos`:

```typescript
{
  id: "nrh-coord-recrutamento",  // formato: nucleo-coord-nome
  name: "Coordenadoria de Recrutamento e Seleção",
  description: "Processos seletivos e atração de talentos",
  videos: [
    // Seus vídeos aqui
  ]
}
```

### ⚠️ Regras Importantes:
- O `id` deve seguir o padrão: `[nucleo-id]-coord-[nome]`
- Exemplo: `ngg-coord-estrategica`, `nti-coord-desenvolvimento`
- Sempre inicie com um array vazio de `videos` se ainda não tiver conteúdo

## 3. Adicionar um Novo Vídeo

Dentro da coordenadoria desejada, adicione no array `videos`:

```typescript
{
  id: "video-31",  // ID único sequencial
  title: "Como Realizar Entrevistas Eficazes",
  duration: "18:45",  // Formato: "MM:SS"
  url: "#"  // URL do vídeo ou "#" temporariamente
}
```

### ⚠️ Regras Importantes:
- O `id` deve ser único (use sequência numérica)
- A `duration` deve estar no formato "MM:SS" ou "HH:MM:SS"
- A `url` pode ser "#" temporariamente ou a URL real do vídeo

## 4. Exemplo Completo

```typescript
// Adicionando um núcleo completo com coordenadoria e vídeos
{
  id: "nrh",
  name: "NRH - Núcleo de Recursos Humanos",
  description: "Gestão de pessoas, recrutamento e desenvolvimento de talentos",
  subnucleos: [
    {
      id: "nrh-coord-recrutamento",
      name: "Coordenadoria de Recrutamento",
      description: "Processos seletivos e captação de talentos",
      videos: [
        {
          id: "video-31",
          title: "Introdução ao Recrutamento e Seleção",
          duration: "15:30",
          url: "#"
        },
        {
          id: "video-32",
          title: "Técnicas de Entrevista Comportamental",
          duration: "22:15",
          url: "#"
        },
        {
          id: "video-33",
          title: "Avaliação de Competências",
          duration: "18:40",
          url: "#"
        }
      ]
    },
    {
      id: "nrh-coord-desenvolvimento",
      name: "Coordenadoria de Desenvolvimento",
      description: "Treinamento e capacitação de colaboradores",
      videos: [
        {
          id: "video-34",
          title: "Planejamento de Treinamentos",
          duration: "20:00",
          url: "#"
        },
        {
          id: "video-35",
          title: "Avaliação de Desempenho",
          duration: "25:30",
          url: "#"
        }
      ]
    }
  ]
}
```

## 5. Estrutura do Arquivo data.ts

```typescript
export interface Video {
  id: string;
  title: string;
  duration: string;
  url: string;
}

export interface Subnucleo {
  id: string;
  name: string;
  description: string;
  videos: Video[];
}

export interface Nucleo {
  id: string;
  name: string;
  description: string;
  subnucleos: Subnucleo[];
}

export const nucleosData: Nucleo[] = [
  // Seus núcleos aqui
  {
    id: "ngg",
    name: "NGG - Núcleo de Gestão e Governança",
    description: "Responsável pela gestão estratégica e governança corporativa",
    subnucleos: [...]
  },
  // Adicione novos núcleos aqui
];
```

## 6. Verificação Após Adicionar Conteúdo

Após adicionar novos dados, execute:

```bash
npm run dev
```

E verifique:

1. ✅ O novo núcleo aparece na página inicial?
2. ✅ Ao clicar no núcleo, as coordenadorias aparecem?
3. ✅ Ao clicar na coordenadoria, os vídeos aparecem?
4. ✅ Os contadores estão corretos?
5. ✅ O breadcrumb está funcionando?

## 7. Checklist de Qualidade

Antes de adicionar conteúdo, verifique:

- [ ] Todos os IDs são únicos
- [ ] Os IDs seguem o padrão correto
- [ ] Não há espaços nos IDs
- [ ] As descrições são claras e objetivas
- [ ] A duração dos vídeos está no formato correto
- [ ] Os títulos dos vídeos são descritivos
- [ ] Há pelo menos um vídeo em cada coordenadoria
- [ ] Há pelo menos uma coordenadoria em cada núcleo

## 8. Dicas de Organização

### Nomenclatura de IDs
```
Núcleo:         ngg, nge, nti, nmkt, nrh
Coordenadoria:  ngg-coord-estrategica, nge-coord-pedagogica
Vídeo:          video-1, video-2, video-3...
```

### Descrições Eficazes
- ✅ "Gestão de pessoas, recrutamento e desenvolvimento de talentos"
- ❌ "Coordenadoria"

### Títulos de Vídeos
- ✅ "Introdução ao Planejamento Estratégico"
- ❌ "Vídeo 1"

## 9. Erros Comuns e Como Evitar

### ❌ ERRO: IDs Duplicados
```typescript
// ERRADO
{ id: "video-1", ... },
{ id: "video-1", ... },  // ❌ ID duplicado
```

```typescript
// CORRETO
{ id: "video-1", ... },
{ id: "video-2", ... },  // ✅ ID único
```

### ❌ ERRO: ID com Espaços
```typescript
// ERRADO
{ id: "novo nucleo", ... }  // ❌ Espaços no ID

// CORRETO
{ id: "novo-nucleo", ... }  // ✅ Use hífen
```

### ❌ ERRO: Duração no Formato Errado
```typescript
// ERRADO
{ duration: "15 minutos", ... }  // ❌
{ duration: "15.5", ... }        // ❌

// CORRETO
{ duration: "15:30", ... }       // ✅ MM:SS
{ duration: "1:15:30", ... }     // ✅ HH:MM:SS
```

## 10. Suporte

Se tiver dúvidas ou encontrar problemas:

1. Verifique se seguiu todas as regras acima
2. Execute `npm run dev` e veja o console para erros
3. Verifique o arquivo `lib/data.ts` para exemplos
4. Consulte o arquivo `ROTAS.md` para ver a estrutura completa

---

**Lembre-se**: Sempre teste após adicionar novo conteúdo!
