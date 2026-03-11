# 🚀 Instalação Rápida - Sistema de Vídeo Protegido

## Passo 1: Instalar dependências

```bash
npm install
```

## Passo 2: Adicionar seus vídeos

Coloque seus arquivos `.mp4` na pasta `private/videos/`:

```
private/videos/
├── video-1.mp4
├── video-2.mp4
├── video-3.mp4
└── ... (todos os IDs de lib/data.ts)
```

⚠️ **IMPORTANTE**: Os nomes dos arquivos devem corresponder aos IDs em `lib/data.ts`

Por exemplo:
- Se em `lib/data.ts` você tem `id: "video-1"` 
- O arquivo deve ser: `private/videos/video-1.mp4`

## Passo 3: Rodar o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

## Passo 4: Testar

1. Navegue até um núcleo
2. Clique em uma coordenadoria
3. Clique em um vídeo
4. O vídeo deve carregar na página dedicada com todas as proteções ativas

## ✅ Checklist de Funcionamento

- [ ] Vídeo carrega sem erros
- [ ] Não é possível clicar com botão direito
- [ ] Watermark com email aparece no vídeo
- [ ] Ao trocar de aba, vídeo pausa e mostra aviso
- [ ] Console mostra logs de atividade e progresso
- [ ] Barra de progresso funciona
- [ ] Não tem opção de download no player

## 🔧 Próximos Passos (Opcional)

### Integrar com autenticação:

1. Instale NextAuth ou seu sistema de auth preferido
2. Edite `app/api/video/stream/[videoId]/route.ts`
3. Adicione verificação de sessão
4. Passe email real do usuário para o VideoPlayer

### Salvar dados no banco:

1. Configure Prisma (ou seu ORM)
2. Descomente as linhas em:
   - `app/api/video/activity/route.ts`
   - `app/api/video/progress/route.ts`
   - `app/api/video/stream/[videoId]/route.ts`

### Deploy em produção:

Para produção real, recomendamos usar:
- **Bunny Stream** (mais barato e fácil)
- **Vimeo PRO** (mais simples de configurar)
- **Cloudflare Stream** (mais robusto)

Veja detalhes em `SISTEMA-VIDEO.md`

## ❓ Problemas Comuns

### Vídeo não carrega:

1. Verifique se o arquivo existe em `private/videos/`
2. Verifique se o nome do arquivo corresponde ao ID
3. Veja o console do navegador (F12) para erros
4. Veja o terminal do Next.js para erros de API

### Token expirado:

- Isso é normal! Tokens duram 1 hora
- Recarregue a página para gerar novo token

### Vídeo não pausa ao trocar de aba:

- Isso é uma proteção! Funciona apenas em navegadores modernos
- Teste em Chrome/Firefox/Edge atualizados

## 📚 Documentação Completa

Para mais detalhes, veja:
- `SISTEMA-VIDEO.md` - Documentação completa
- `ROTAS.md` - Estrutura de rotas
- `README.md` - Visão geral do projeto

---

**Pronto para começar!** 🎉
