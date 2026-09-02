# E-commerce Frontend

Interface web da loja, construída com Next.js e React. O projeto reúne as páginas de catálogo, produto, coleções, carrinho, checkout, pedidos, conta, favoritos e serviços.

## Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

## Desenvolvimento

Na pasta `frontend`, instale as dependências e inicie o servidor:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Como o frontend usa dados locais neste momento, não é necessário configurar variáveis de ambiente para executar a interface básica. O catálogo inicial está em [`lib/products.ts`](lib/products.ts).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com atualização automática |
| `npm run build` | Gera a build de produção |
| `npm start` | Executa a build de produção |
| `npm run lint` | Executa o ESLint |

## Estrutura

```text
app/          Rotas e páginas do App Router
components/   Componentes compartilhados de layout e interface
features/     Componentes e lógica agrupados por domínio
lib/          Dados locais e utilitários
providers/    Contextos de autenticação, carrinho e favoritos
public/       Imagens e outros arquivos estáticos
```

Principais rotas:

- `/` - página inicial
- `/collections` - coleções e catálogo
- `/product/[slug]` - detalhes do produto
- `/cart` e `/checkout` - compra
- `/account`, `/orders` e `/wishlist` - área do cliente

## Qualidade

Antes de abrir uma alteração, execute:

```bash
npm run lint
npm run build
```

## Tecnologias

- [Next.js](https://nextjs.org/) 16 com App Router
- [React](https://react.dev/) 19
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) para ícones
- [Framer Motion](https://motion.dev/) para animações
