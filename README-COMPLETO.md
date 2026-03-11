# 🎓 Plataforma de Treinamento QUAD - Sistema de Vídeo Protegido

Sistema completo de e-learning com proteção profissional de vídeos, suportando tanto **vídeos locais** quanto **Bunny Stream CDN**.

## ✨ Recursos Principais

### 🎬 Sistema de Vídeo Dual
- ✅ **Vídeo Local**: Para desenvolvimento e testes
- ✅ **Bunny Stream**: Para produção com CDN global
- ✅ **Híbrido**: Escolha qual usar por vídeo

### 🔒 Proteções de Segurança
- ✅ Tokens temporários (expiram em 1 hora)
- ✅ Watermark com email do usuário
- ✅ Bloqueio de download e clique direito
- ✅ Detecção de saída da página
- ✅ Pausa automática ao trocar de aba
- ✅ Monitoramento de atividades suspeitas
- ✅ DRM profissional (com Bunny Stream)

### 📊 Monitoramento
- ✅ Tempo assistido por vídeo
- ✅ Registro de saídas da página
- ✅ Logs de tentativas de download
- ✅ Analytics completo (com Bunny)

## 🚀 Início Rápido

### 1. Instalação
```bash
npm install
```

### 2. Escolha sua configuração:

#### Opção A - Vídeo Local (para testes):
```bash
# 1. Adicione vídeos em private/videos/
cp seu-video.mp4 private/videos/video-1.mp4

# 2. Rode o projeto
npm run dev
```

#### Opção B - Bunny Stream (para produção):
```bash
# 1. Configure o .env
cp .env.example .env
# Edite .env com suas credenciais do Bunny

# 2. Rode o projeto
npm run dev
```

### 3. Acesse
```
http://localhost:3000
```

## 📚 Documentação Completa

### 🎯 Guias de Início
- **[COMECE-AQUI.md](COMECE-AQUI.md)** - Início rápido em 5 minutos
- **[INSTALACAO-RAPIDA.md](INSTALACAO-RAPIDA.md)** - Guia passo a passo

### 🎬 Sistema de Vídeo
- **[SISTEMA-VIDEO.md](SISTEMA-VIDEO.md)** - Vídeo local completo
- **[BUNNY-STREAM-GUIA.md](BUNNY-STREAM-GUIA.md)** - Bunny Stream completo
- **[LOCAL-VS-BUNNY.md](LOCAL-VS-BUNNY.md)** - Comparação e decisão

### 📝 Outras Documentações
- **[MUDANCAS.md](MUDANCAS.md)** - Resumo de alterações
- **[ROTAS.md](ROTAS.md)** - Estrutura de rotas
- **[VISAO-GERAL.md](VISAO-GERAL.md)** - Visão geral do projeto

## 🏗️ Estrutura do Projeto

```
treinamento-quad/
├── app/
│   ├── api/
│   │   ├── video/           # API para vídeo local
│   │   │   ├── stream/      # Gera tokens
│   │   │   ├── play/        # Serve vídeos
│   │   │   ├── activity/    # Registra atividades
│   │   │   └── progress/    # Salva progresso
│   │   └── bunny/           # API para Bunny Stream
│   │       └── token/       # Gera tokens do Bunny
│   ├── video/[videoId]/     # Página vídeo local
│   ├── video-bunny/[videoId]/ # Página Bunny Stream
│   └── nucleo/              # Páginas de conteúdo
├── components/
│   ├── VideoPlayer.tsx      # Player local
│   ├── VideoPlayerBunny.tsx # Player Bunny
│   ├── VideoCard.tsx        # Card de vídeo
│   └── VideoCardWithOptions.tsx # Card híbrido
├── private/
│   └── videos/              # Seus vídeos locais
└── lib/
    └── data.ts              # Dados dos cursos
```

## 🎯 Como Funciona

### Vídeo Local
```
1. Aluno clica em vídeo
   ↓
2. Sistema gera token único
   ↓
3. Token válido por 1 hora
   ↓
4. Vídeo servido via API Next.js
   ↓
5. Proteções ativas + monitoramento
```

### Bunny Stream
```
1. Aluno clica em vídeo
   ↓
2. Sistema gera token Bunny
   ↓
3. Token válido por 1 hora
   ↓
4. Vídeo servido via CDN Bunny
   ↓
5. DRM + Proteções + Analytics
```

## 🔧 Configuração

### Para Vídeo Local:
1. Adicione vídeos em `private/videos/`
2. Nomeie como: `video-1.mp4`, `video-2.mp4`, etc
3. Correspondente aos IDs em `lib/data.ts`

### Para Bunny Stream:
1. Crie conta em [bunny.net](https://bunny.net)
2. Crie Video Library
3. Faça upload dos vídeos
4. Configure `.env` com credenciais
5. Veja: [BUNNY-STREAM-GUIA.md](BUNNY-STREAM-GUIA.md)

## 🎨 Customização

### Mudar para usar apenas Bunny:
```tsx
// components/VideoCard.tsx
<Link href={`/video-bunny/${videoId}?...`}>
```

### Usar sistema híbrido:
```tsx
// lib/data.ts
videos: [
  {
    id: "video-1",
    useBunny: false // Local
  },
  {
    id: "video-2",
    useBunny: true // Bunny
  }
]

// Depois use: VideoCardWithOptions
```

## 💰 Custos

### Vídeo Local
- Custo: **$0/mês**
- Ideal para: Testes, MVP, <50 alunos

### Bunny Stream
- Custo: **~$5-30/mês**
- Ideal para: Produção, 50+ alunos, profissional

Veja comparação completa: [LOCAL-VS-BUNNY.md](LOCAL-VS-BUNNY.md)

## 🚦 Quando usar cada um?

### Use Vídeo Local:
- ✅ Desenvolvimento e testes
- ✅ Menos de 50 alunos
- ✅ Budget zero
- ✅ Servidor potente

### Use Bunny Stream:
- ✅ Produção
- ✅ 50+ alunos
- ✅ CDN global necessário
- ✅ Quer analytics profissional
- ✅ Máxima segurança (DRM)

## 📊 Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização
- **Bunny Stream** - CDN de vídeo (opcional)
- **shadcn/ui** - Componentes UI

## 🔐 Segurança

### Proteções Implementadas:
- ✅ Autenticação via token
- ✅ Tokens temporários (1 hora)
- ✅ Vídeos fora da pasta pública
- ✅ Bloqueio de clique direito
- ✅ Bloqueio de download
- ✅ Bloqueio de picture-in-picture
- ✅ Watermark com identificação
- ✅ Monitoramento de atividades
- ✅ Detecção de saída da página

### Com Bunny Stream:
- ✅ Todas as acima +
- ✅ DRM profissional
- ✅ Geo-blocking
- ✅ IP blocking
- ✅ Referer protection
- ✅ CDN seguro

## 🆘 Troubleshooting

### Vídeo não carrega:
1. Verifique se o arquivo existe
2. Veja console do navegador (F12)
3. Veja terminal do Next.js
4. Verifique .env (se Bunny)

### Token expirado:
- Normal após 1 hora
- Recarregue a página

### Veja mais em:
- [SISTEMA-VIDEO.md](SISTEMA-VIDEO.md) - FAQ local
- [BUNNY-STREAM-GUIA.md](BUNNY-STREAM-GUIA.md) - FAQ Bunny

## 🚀 Deploy

### Vercel / Netlify:
```bash
npm run build
```

**Importante:**
- Vídeos locais: Não sobem para Git
- Bunny Stream: Tudo na nuvem do Bunny
- Configure variáveis de ambiente no dashboard

## 📞 Suporte

### Código:
- Abra issue no GitHub
- Veja documentação na pasta do projeto

### Bunny Stream:
- Email: support@bunny.net
- Discord: https://bunny.net/discord
- Docs: https://docs.bunny.net

## 📄 Licença

MIT License - Livre para uso comercial

## 🙏 Créditos

Sistema desenvolvido com Next.js e Bunny Stream.

---

**Desenvolvido para máxima proteção de conteúdo educacional** 🎓

Para começar agora: leia [COMECE-AQUI.md](COMECE-AQUI.md)
