# 🐰 Guia Completo - Bunny Stream

## 📋 O que é Bunny Stream?

Bunny Stream é uma plataforma de streaming de vídeo profissional com:
- ✅ CDN global ultra-rápido
- ✅ Proteção DRM (Digital Rights Management)
- ✅ Tokens de autenticação
- ✅ Streaming adaptativo (HD automático)
- ✅ Analytics detalhado
- ✅ Custo muito baixo (~$5-10/mês)

## 🚀 Passo 1: Criar Conta no Bunny

### 1. Acesse: https://bunny.net
### 2. Clique em "Sign Up"
### 3. Preencha seus dados e crie a conta

## 📹 Passo 2: Criar Video Library

### 1. No dashboard, vá em "Stream"
### 2. Clique em "Add Video Library"
### 3. Dê um nome (ex: "Curso QUAD")
### 4. Escolha a região (ex: "Europe" ou "US")
### 5. Clique em "Create"

## 🔑 Passo 3: Obter Credenciais

### LIBRARY ID:
1. Vá em: Stream > Video Libraries
2. Clique na sua biblioteca
3. Copie o **Library ID** (número grande)
4. Exemplo: `123456`

### TOKEN KEY (Chave de Segurança):
1. Na mesma página, vá em "Security"
2. Ative "Token Authentication"
3. Copie a **Security Key**
4. Exemplo: `abc123def456ghi789`

## 📤 Passo 4: Fazer Upload dos Vídeos

### Opção A - Upload Manual:
1. Vá em Stream > Video Libraries > Sua Biblioteca
2. Clique em "Upload Video"
3. Selecione o arquivo .mp4
4. Aguarde o processamento
5. Copie o **Video ID** (GUID)

### Opção B - Upload via API (múltiplos vídeos):
```bash
curl -X POST "https://video.bunnycdn.com/library/{LIBRARY_ID}/videos" \
  -H "AccessKey: {YOUR_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nome do Vídeo"
  }'
```

## ⚙️ Passo 5: Configurar no Projeto

### 1. Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```

### 2. Edite o arquivo `.env`:
```bash
# Suas credenciais do Bunny
BUNNY_LIBRARY_ID=123456
BUNNY_TOKEN_KEY=abc123def456ghi789

# Mapeamento dos vídeos
BUNNY_VIDEO_VIDEO-1=guid-do-video-1-no-bunny
BUNNY_VIDEO_VIDEO-2=guid-do-video-2-no-bunny
BUNNY_VIDEO_VIDEO-3=guid-do-video-3-no-bunny
# ... e assim por diante
```

### 3. Como mapear os vídeos:

Para cada vídeo em `lib/data.ts` que tem `id: "video-1"`:
1. Faça upload no Bunny
2. Copie o GUID do vídeo (ex: `abc-123-def-456`)
3. Adicione no `.env`: `BUNNY_VIDEO_VIDEO-1=abc-123-def-456`

**IMPORTANTE**: 
- O ID no .env deve ser em MAIÚSCULAS
- Se em `data.ts` é `"video-1"`, no .env é `BUNNY_VIDEO_VIDEO-1`

## 🔗 Passo 6: Atualizar o VideoCard

### Opção A - Usar APENAS Bunny (recomendado):

Edite `components/VideoCard.tsx`:

```tsx
// Mude a rota de /video/ para /video-bunny/
<Link href={`/video-bunny/${videoId}?nucleoId=${nucleoId}&subnucleoId=${subnucleoId}`}>
```

### Opção B - Oferecer escolha ao usuário:

Crie um botão que permite escolher entre local ou Bunny.

## 🧪 Passo 7: Testar

```bash
npm run dev
```

### Checklist:
1. [ ] Navegue até um vídeo
2. [ ] Vídeo carrega do Bunny?
3. [ ] Aparece "Protegido por Bunny Stream"?
4. [ ] Qualidade adaptativa funciona?
5. [ ] Não consegue fazer download?

## 📊 Exemplo Completo de Configuração

### Estrutura dos seus vídeos em `lib/data.ts`:
```typescript
videos: [
  {
    id: "video-1",
    title: "Introdução ao Planejamento Estratégico",
    duration: "15:30",
    url: "#"
  },
  {
    id: "video-2",
    title: "Gestão de Projetos",
    duration: "22:45",
    url: "#"
  }
]
```

### Configuração no `.env`:
```bash
BUNNY_LIBRARY_ID=123456
BUNNY_TOKEN_KEY=abc123xyz789

# Vídeo 1 no Bunny tem ID: aaa-111-bbb-222
BUNNY_VIDEO_VIDEO-1=aaa-111-bbb-222

# Vídeo 2 no Bunny tem ID: ccc-333-ddd-444
BUNNY_VIDEO_VIDEO-2=ccc-333-ddd-444
```

## 💡 Dicas Importantes

### Compressão de Vídeos:
- Bunny aceita qualquer formato (MP4, MOV, AVI)
- Ele converte automaticamente
- Recomendado: H.264, 720p ou 1080p

### Limite de Tamanho:
- Bunny: até 500GB por vídeo
- Upload: 20GB via interface web
- Maior que isso: use API

### Custos Estimados:
- Armazenamento: $0.005/GB/mês
- Streaming: $0.01/GB transferido
- Exemplo: 100 vídeos de 500MB = ~$2.50/mês

### Regiões:
- **US East**: Mais rápido para Brasil
- **Europe**: Backup
- **Asia**: Se tiver alunos na Ásia

## 🔒 Configurações de Segurança Recomendadas

No Dashboard do Bunny > Security:

### 1. Token Authentication:
- [x] Ativar
- Expiration: 3600 segundos (1 hora)

### 2. Geo-Blocking (opcional):
- Ative se quiser restringir países
- Ex: Apenas Brasil, Portugal

### 3. Referer Protection:
- Adicione seu domínio: `seusite.com.br`
- Isso impede embed em outros sites

### 4. IP Blocking (opcional):
- Bloqueie IPs suspeitos manualmente

## 🚨 Troubleshooting

### Vídeo não carrega:
1. Verifique o LIBRARY_ID no .env
2. Verifique o TOKEN_KEY no .env
3. Veja o console do navegador (F12)
4. Veja o terminal do Next.js

### Token inválido:
- Verifique se a TOKEN_KEY está correta
- Verifique se o vídeo foi processado no Bunny

### Vídeo processa para sempre:
- Vídeos grandes (>2GB) podem levar 30+ minutos
- Verifique status no Dashboard

### Erro 403:
- Token expirado (normal após 1 hora)
- Recarregue a página

### Erro 404:
- Video ID incorreto no .env
- Vídeo foi deletado no Bunny

## 📈 Próximos Passos

### Analytics:
- Dashboard do Bunny mostra:
  - Visualizações totais
  - Tempo médio assistido
  - Países dos espectadores
  - Dispositivos usados

### Subtitles (Legendas):
1. Vá no vídeo no Dashboard
2. Upload arquivo .srt ou .vtt
3. Legendas aparecem automaticamente

### Thumbnails Customizados:
1. Vá no vídeo no Dashboard
2. Upload uma imagem (1280x720)
3. Define como thumbnail

### Chapters (Capítulos):
- Adicione timestamps no Dashboard
- Permite pular para seções específicas

## 🔄 Migração: Local → Bunny

Se você já tem vídeos locais e quer migrar:

### 1. Mantenha ambos sistemas:
```tsx
// Crie uma flag no data.ts
videos: [
  {
    id: "video-1",
    title: "Aula 1",
    useBunny: true // ou false para usar local
  }
]
```

### 2. Migre aos poucos:
- Faça upload de 5 vídeos/dia no Bunny
- Teste cada um
- Troque a flag `useBunny: true`

### 3. Quando todos migrarem:
- Delete pasta `private/videos/`
- Use apenas Bunny

## 💰 Calculadora de Custos

### Exemplo: Curso com 50 vídeos
- Média de 500MB por vídeo = 25GB total
- 100 alunos assistindo por mês
- Cada aluno assiste 70% do conteúdo

**Cálculo:**
- Armazenamento: 25GB × $0.005 = $0.13/mês
- Streaming: 100 alunos × 17.5GB × $0.01 = $17.50/mês
- **Total: ~$17.63/mês**

### Comparação:
- Hospedar no seu servidor: CPU + Banda ≈ $50-100/mês
- Vimeo PRO: $20/mês (mas limitado a 5TB/ano)
- **Bunny: $17/mês (ilimitado de uploads)**

## 📞 Suporte

### Bunny Support:
- Email: support@bunny.net
- Discord: https://bunny.net/discord
- Docs: https://docs.bunny.net

### Problemas no código:
- Veja comentários nos arquivos da API
- Console do navegador (F12)
- Terminal do Next.js

---

## ✅ Checklist Final

Antes de ir para produção:

- [ ] Conta Bunny criada
- [ ] Library criada
- [ ] Todos vídeos uploadados
- [ ] .env configurado corretamente
- [ ] Tokens testados
- [ ] Vídeos carregam rápido
- [ ] Proteções funcionando
- [ ] Analytics ativo
- [ ] Backup dos vídeos originais
- [ ] Domínio whitelist configurado

---

**Pronto! Seu sistema agora usa Bunny Stream profissional!** 🎉
