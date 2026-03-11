# 🚀 Guia de Deploy - Treinamento Quad Concursos

## Opções de Deploy

### 1. Vercel (Recomendado) ⭐

A Vercel é a plataforma oficial do Next.js e oferece deploy automático com zero configuração.

#### Passo a Passo:

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Fazer login
vercel login

# 3. Deploy (primeira vez)
vercel

# 4. Deploy em produção
vercel --prod
```

#### Via Interface Web:

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub/GitLab/Bitbucket
3. Clique em "Import Project"
4. Selecione o repositório
5. Configure (detecção automática do Next.js)
6. Deploy!

**URL Exemplo**: `https://treinamento-quad.vercel.app`

---

### 2. Netlify

Outra excelente opção para Next.js.

#### Passo a Passo:

```bash
# 1. Build do projeto
npm run build

# 2. Instalar Netlify CLI
npm i -g netlify-cli

# 3. Login
netlify login

# 4. Deploy
netlify deploy --prod
```

#### Via Interface Web:

1. Acesse [netlify.com](https://netlify.com)
2. Conecte com Git provider
3. Selecione o repositório
4. Configure build:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy!

---

### 3. Docker

Para deploy em servidor próprio.

#### Dockerfile:

```dockerfile
FROM node:20-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

#### docker-compose.yml:

```yaml
version: '3.8'

services:
  treinamento-quad:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Comandos:

```bash
# Build
docker build -t treinamento-quad .

# Run
docker run -p 3000:3000 treinamento-quad

# Ou com docker-compose
docker-compose up -d
```

---

### 4. Servidor Linux (Manual)

Para deploy em VPS ou servidor dedicado.

#### Preparação do Servidor:

```bash
# 1. Atualizar sistema
sudo apt update && sudo apt upgrade -y

# 2. Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 3. Instalar PM2
sudo npm install -g pm2
```

#### Deploy:

```bash
# 1. Clonar repositório
git clone <seu-repositorio>
cd treinamento-quad

# 2. Instalar dependências
npm install

# 3. Build
npm run build

# 4. Iniciar com PM2
pm2 start npm --name "treinamento-quad" -- start

# 5. Salvar configuração PM2
pm2 save
pm2 startup
```

#### Nginx como Reverse Proxy:

```nginx
server {
    listen 80;
    server_name treinamento.quadconcursos.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/treinamento /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### SSL com Let's Encrypt:

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx

# Obter certificado
sudo certbot --nginx -d treinamento.quadconcursos.com.br

# Renovação automática já configurada
```

---

## Variáveis de Ambiente

Se necessário, crie um arquivo `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://treinamento.quadconcursos.com.br
```

---

## Checklist Pré-Deploy

- [ ] Código testado localmente (`npm run dev`)
- [ ] Build funcionando sem erros (`npm run build`)
- [ ] Rotas testadas (todas funcionando)
- [ ] Componentes renderizando corretamente
- [ ] Dados atualizados em `lib/data.ts`
- [ ] README.md atualizado
- [ ] .gitignore configurado corretamente
- [ ] package.json com versão correta do Next.js (16.1.6)

---

## Comandos Úteis Pós-Deploy

### Vercel:

```bash
# Ver logs
vercel logs

# Listar deploys
vercel ls

# Remover deploy
vercel rm <deployment-url>
```

### PM2 (Servidor):

```bash
# Ver status
pm2 status

# Ver logs
pm2 logs treinamento-quad

# Restart
pm2 restart treinamento-quad

# Stop
pm2 stop treinamento-quad

# Monitoramento
pm2 monit
```

### Docker:

```bash
# Ver containers
docker ps

# Logs
docker logs treinamento-quad

# Restart
docker restart treinamento-quad

# Stop
docker stop treinamento-quad
```

---

## Monitoramento

### Vercel Analytics

Já incluído gratuitamente com deploy na Vercel.

### Google Analytics

Adicione em `app/layout.tsx`:

```typescript
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

---

## Backup e Versionamento

### Git

```bash
# Criar repositório
git init
git add .
git commit -m "Initial commit"

# Adicionar remote
git remote add origin <url-do-repositorio>
git push -u origin main
```

### Backup dos Dados

O arquivo `lib/data.ts` contém todos os dados. Faça backup regular:

```bash
# Backup manual
cp lib/data.ts lib/data.backup.ts

# Ou via Git
git add lib/data.ts
git commit -m "Update training data"
git push
```

---

## Domínio Customizado

### Vercel:

1. Vá em Project Settings > Domains
2. Adicione: `treinamento.quadconcursos.com.br`
3. Configure DNS:
   - Type: CNAME
   - Name: treinamento
   - Value: cname.vercel-dns.com

### Servidor Próprio:

Configure o DNS para apontar para o IP do servidor:

```
Type: A
Name: treinamento
Value: <IP-do-servidor>
```

---

## Troubleshooting

### Build Falha

```bash
# Limpar cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### Rotas não Funcionam

Verifique se:
- `generateStaticParams` está correto
- IDs nos dados correspondem às rotas
- Não há caracteres especiais nos IDs

### Performance Lenta

```bash
# Analisar bundle
npm run build
# Verificar output do build
```

---

## Custos Estimados

| Plataforma | Custo Mensal |
|------------|--------------|
| Vercel (Hobby) | Grátis |
| Vercel (Pro) | $20 |
| Netlify (Free) | Grátis |
| VPS básico | $5-10 |
| VPS robusto | $20-50 |

---

## Suporte

Em caso de problemas:

1. Verifique logs do deploy
2. Teste localmente primeiro
3. Consulte documentação do Next.js
4. Verifique versão do Node.js (20+)

---

**Recomendação Final**: Use Vercel para deploy rápido e fácil, ou servidor próprio para controle total.
