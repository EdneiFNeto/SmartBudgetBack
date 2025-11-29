# SmartBudgetBack

API backend construída integralmente com auxílio de IA (100% gerada por inteligência artificial) para suportar o SmartBudget.

## Requisitos
- Node.js 20+
- npm 10+
- Banco PostgreSQL disponível e string de conexão via `DATABASE_URL`

## Configuração
1. Instale dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` na raiz com pelo menos:
   ```
   DATABASE_URL="postgresql://usuario:senha@host:5432/smartbudget"
   PORT=3000
   HOST=127.0.0.1
   ```

## Migrations e Prisma
- Gerar cliente Prisma:
  ```bash
  npm run prisma:generate
  ```
- Criar/atualizar migrações com base no schema:
  ```bash
  npm run prisma:migrate
  ```
  O comando usa `prisma migrate dev`, então também atualiza o banco configurado em `DATABASE_URL`.

## Seeder
Para popular o banco com usuários de exemplo, execute:
```bash
npm run prisma:seed
```
O script limpa a tabela `User` e insere registros fictícios.

## Como rodar o projeto
- Ambiente de desenvolvimento com hot-reload:
  ```bash
  npm run dev
  ```
- Execução direta em TypeScript (sem ts-node-dev):
  ```bash
  npm start
  ```
- Build para gerar arquivos transpilados em `dist/`:
  ```bash
  npm run build
  ```

Após subir o servidor, ele escutará em `http://HOST:PORT` (padrão `http://127.0.0.1:3000`). O endpoint `/status` confirma se a API está ativa e registra logs na tabela `StatusLog`.

## Observações
- Toda a base de código foi criada 100% com IA, mantendo as melhores práticas sugeridas pelas ferramentas automáticas.
- Ajuste scripts ou variáveis conforme o ambiente (produção, homologação, etc.).