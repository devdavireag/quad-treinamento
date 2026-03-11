# 🎯 GUIA RÁPIDO - Começar em 5 Minutos

## ⚡ Instalação Express

### 1️⃣ Extrair e instalar
```bash
# Extraia o ZIP
# Entre na pasta
cd treinamento-quad

# Instale as dependências
npm install
```

### 2️⃣ Adicionar vídeos de teste
```bash
# Você precisa adicionar pelo menos 1 vídeo para testar
# Baixe um vídeo de teste de: https://sample-videos.com/

# Coloque em: private/videos/video-1.mp4
# (Renomeie o vídeo baixado para video-1.mp4)
```

### 3️⃣ Rodar o projeto
```bash
npm run dev
```

### 4️⃣ Testar no navegador
```
1. Abra: http://localhost:3000
2. Clique em qualquer núcleo (ex: NGG)
3. Clique em uma coordenadoria
4. Clique no primeiro vídeo
5. O vídeo deve carregar protegido! ✅
```

## ✅ Checklist de Teste

Ao abrir o vídeo, verifique:

- [ ] **Vídeo carrega** → OK
- [ ] **Tem watermark** com email → OK
- [ ] **Não pode clicar direito** → OK
- [ ] **Ao trocar de aba** → Pausa e mostra aviso
- [ ] **Console do navegador** → Mostra logs
- [ ] **Tempo assistido** → Contador funciona
- [ ] **Não tem botão download** → OK

## 🎬 Estrutura de Vídeos

Os vídeos precisam estar nomeados exatamente como os IDs em `lib/data.ts`:

```
private/videos/
├── video-1.mp4   ← Para o vídeo com id: "video-1"
├── video-2.mp4   ← Para o vídeo com id: "video-2"
├── video-3.mp4   ← E assim por diante...
└── ...
```

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar produção
npm start

# Verificar erros
npm run lint
```

## 🚨 Problemas Comuns

### Vídeo não carrega?
1. Verifique se existe `private/videos/video-1.mp4`
2. Veja o console do navegador (F12)
3. Veja o terminal do Next.js

### Erro "Token expirado"?
- Isso é normal! Recarregue a página

### Vídeo muito grande?
- Comprima usando: https://www.freeconvert.com/video-compressor
- Tamanho ideal: menos de 100MB

## 📚 Próximos Passos

Depois que tudo estiver funcionando:

1. ✅ Adicione todos os seus vídeos
2. ✅ Leia `SISTEMA-VIDEO.md` para detalhes completos
3. ✅ Configure autenticação (NextAuth)
4. ✅ Adicione banco de dados (Prisma)
5. ✅ Faça deploy (Vercel)

## 💡 Dica Importante

Para **produção real**, use serviço de streaming:
- **Bunny Stream** → ~$5-10/mês
- **Vimeo PRO** → ~$20/mês
- **Cloudflare Stream** → ~$1/1000 min

Isso dá **proteção profissional com DRM**!

---

**Tudo pronto!** Se funcionar, você já tem um sistema de vídeo protegido! 🎉

Qualquer dúvida, veja a documentação completa em `SISTEMA-VIDEO.md`
