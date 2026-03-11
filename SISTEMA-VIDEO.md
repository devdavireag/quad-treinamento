# 🎥 Sistema de Vídeo Protegido - Guia de Uso

## 📋 O que foi implementado

Este sistema foi criado para proteger seus vídeos de curso online contra download e compartilhamento não autorizado. Implementamos:

### ✅ Proteções de Segurança

1. **Autenticação via Token**: Cada visualização gera um token único que expira em 1 hora
2. **Streaming Protegido**: Vídeos não ficam em pasta pública
3. **Bloqueio de Download**: Desabilita opções de download do navegador
4. **Bloqueio de Clique Direito**: Previne download via menu de contexto
5. **Watermark com Email**: Email do usuário aparece no vídeo
6. **Detecção de Saída da Página**: Pausa o vídeo quando o usuário sai da aba
7. **Monitoramento de Atividade**: Registra quando o usuário sai da página
8. **Registro de Progresso**: Salva quanto do vídeo foi assistido
9. **Bloqueio de Screenshots**: Alerta quando tenta dar print screen

### 📁 Estrutura Criada

```
treinamento-quad/
├── app/
│   ├── api/
│   │   └── video/
│   │       ├── stream/[videoId]/route.ts    # Gera URL autenticada
│   │       ├── play/route.ts                # Serve o vídeo com streaming
│   │       ├── activity/route.ts            # Registra atividades
│   │       └── progress/route.ts            # Salva progresso
│   └── video/
│       └── [videoId]/page.tsx               # Página de visualização
├── components/
│   ├── VideoPlayer.tsx                       # Player protegido
│   └── VideoCard.tsx                         # Card atualizado
└── private/
    └── videos/                               # COLOQUE SEUS VÍDEOS AQUI
        ├── video-1.mp4
        ├── video-2.mp4
        └── ...
```

## 🚀 Como Usar

### 1. Adicionar seus vídeos

Coloque seus arquivos `.mp4` na pasta `private/videos/`:

```
private/videos/
├── video-1.mp4
├── video-2.mp4
├── video-3.mp4
└── ...
```

**IMPORTANTE**: 
- Os nomes dos arquivos devem corresponder aos IDs dos vídeos em `lib/data.ts`
- Exemplo: se o vídeo tem `id: "video-1"`, o arquivo deve ser `video-1.mp4`

### 2. Testar localmente

```bash
npm run dev
```

Acesse: `http://localhost:3000`

### 3. Fluxo de Uso

1. Usuário acessa lista de vídeos em `/nucleo/[nucleoId]/[subnucleoId]`
2. Clica em um vídeo
3. É redirecionado para `/video/[videoId]?nucleoId=X&subnucleoId=Y`
4. Sistema gera token autenticado
5. Vídeo é carregado de forma protegida
6. Atividades são monitoradas em tempo real

## 🔐 Recursos de Proteção

### O que o sistema faz:

✅ **Impede download direto** - Vídeo não fica em pasta pública
✅ **Token temporário** - URLs expiram em 1 hora
✅ **Watermark visível** - Email do usuário aparece no vídeo
✅ **Pausa automática** - Se o usuário sai da aba
✅ **Registra atividades** - Saídas da página são logadas
✅ **Salva progresso** - Tempo assistido é registrado
✅ **Bloqueia print screen** - Alerta ao tentar screenshot

### O que NÃO impede 100%:

⚠️ **Gravação de tela** - Usuários podem usar softwares como OBS
⚠️ **Foto/vídeo da tela** - Podem filmar com celular
⚠️ **Ferramentas avançadas** - DevTools experientes podem burlar

### Proteção Máxima (Recomendado para produção):

Para proteção profissional, use serviços especializados:

1. **Bunny Stream** (~$5-10/mês)
   - DRM opcional
   - Token authentication
   - CDN global
   - Analytics incluído

2. **Vimeo PRO** ($20/mês)
   - Interface simples
   - Domain whitelist
   - Proteção de domínio

3. **Cloudflare Stream** ($1 por 1000 minutos)
   - Infraestrutura robusta
   - DRM incluído
   - Alta disponibilidade

## 📊 Monitoramento

### Logs disponíveis:

O sistema registra automaticamente:

```javascript
// Atividades (saídas da página)
[ATIVIDADE] Vídeo: video-1 | Ação: saiu_da_pagina | Timestamp: 2024-01-01...

// Progresso (a cada 30 segundos)
[PROGRESSO] Vídeo: video-1 | Tempo: 150s | Timestamp: 2024-01-01...
```

### Para salvar no banco de dados:

Edite os arquivos em `app/api/video/`:
- `activity/route.ts` - Descomente as linhas de Prisma
- `progress/route.ts` - Descomente as linhas de Prisma

## 🔧 Integrando com Autenticação

### Usando NextAuth:

```typescript
// app/api/video/stream/[videoId]/route.ts
import { getServerSession } from 'next-auth'

export async function POST(request: NextRequest, ...) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  
  // Verifica se o usuário tem acesso
  const hasAccess = await checkUserAccess(session.user.id, videoId)
  if (!hasAccess) {
    return NextResponse.json({ error: 'Acesso negado' }, { status: 403 })
  }
  
  // ... resto do código
}
```

### Passando email do usuário:

```tsx
// app/video/[videoId]/page.tsx
<VideoPlayer
  videoId={video.id}
  userEmail={session?.user?.email || 'anonimo@exemplo.com'}
  // ... outros props
/>
```

## 🎨 Customizações

### Mudar tempo de expiração do token:

```typescript
// app/api/video/stream/[videoId]/route.ts
expires: Date.now() + 7200000 // 2 horas (em milissegundos)
```

### Mudar intervalo de salvamento de progresso:

```typescript
// components/VideoPlayer.tsx
if (newTime % 60 === 0) { // Salvar a cada 60 segundos ao invés de 30
```

### Remover watermark:

```tsx
// components/VideoPlayer.tsx
// Comente ou remova as linhas:
<div className="absolute bottom-16 right-4...">
  {userEmail}
</div>
```

## 📦 Deploy

### Vercel / Netlify:

1. A pasta `private/` não vai para o Git (adicione ao `.gitignore`)
2. Você precisa fazer upload dos vídeos manualmente no servidor
3. Alternativa: Use serviço de streaming (Bunny, Vimeo, Cloudflare)

### Com Bunny Stream:

```tsx
// components/VideoPlayer.tsx
const embedUrl = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${videoId}?token=${token}`

<iframe src={embedUrl} ... />
```

## ❓ FAQ

**P: Os vídeos ficam seguros na pasta private/?**
R: Mais seguros que em public/, mas o servidor Next.js tem acesso. Para máxima segurança, use serviço externo com DRM.

**P: Como impedir 100% o download?**
R: Não é possível. Usuários sempre podem gravar a tela. Use watermark com dados do usuário para desencorajar pirataria.

**P: Posso usar vídeos do YouTube?**
R: Sim, mas eles ficam no YouTube. Para vídeos privados dentro do seu site, use esta implementação ou serviços de streaming.

**P: Funciona em mobile?**
R: Sim! Todas as proteções funcionam em navegadores mobile.

## 🆘 Suporte

Se tiver dúvidas sobre a implementação, verifique:

1. Console do navegador (F12) para erros
2. Terminal do Next.js para logs da API
3. Arquivos de rota em `app/api/video/`
4. Componente VideoPlayer em `components/VideoPlayer.tsx`

---

**Desenvolvido para máxima proteção de conteúdo educacional** 🎓
