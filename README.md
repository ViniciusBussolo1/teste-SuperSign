## 💻 Projeto

Teste para empresa SuperSign.

## ✨ Tecnologias

- [NextJS](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)
- [React-Signature-Canvas](https://www.npmjs.com/package/react-signature-canvas)
- [React-Toastify](https://www.npmjs.com/package/react-toastify)
- [Zod](https://zod.dev/)
- [Next-Auth-V4](https://next-auth.js.org/getting-started/introduction)
- [bcrypt-ts](https://www.npmjs.com/package/bcrypt-ts)
- [lucide-react](https://lucide.dev/)

## 🚀 Como executar

Para iniciá-lo, siga os passos abaixo:

```bash
# Clone o Repositório
$ https://github.com/ViniciusBussolo1/teste-SuperSign.git
```

```bash
# Acesse a pasta do projeto
$ cd teste-SuperSign
```

```bash
# Baixe as dependências
$ npm i
```

```bash
# Execute
$ npm run dev
```

O app estará disponível no seu browser pelo endereço http://localhost:3000.

## Crie um arquivo `.env` e um `.env.local` na raiz do projeto com o seguinte conteúdo e adicione suas credenciais:

### .env

```bash
DATABASE_URL
```

### .env.local

```bash
NEXTAUTH_URL
NEXTAUTH_SECRET
GITHUB_ID
GITHUB_SECRET
```

### Neste projeto foi implementado as funcionalidades:

1. Autenticação

- Página de login/registro
- Proteção de rotas privadas
- Logout
- Gerenciamento básico de sessão

2. Gerenciamento de Documentos

- Listagem de documentos do usuário logado
- Upload de novos documentos (PDF)
- Visualização de documento --- Esta funcionalidade não foi implementada
- Exclusão de documentos

3. Assinatura Digital (Simplificada)

- Interface para simular assinatura em documento
- Registro da assinatura com timestamp
- Status do documento (Pendente, Assinado)

## A parte mais difícil do projeto foi mexer com a parte de fazer o upload de documentos e a parte de fazer a assinatura digital, pois nunca havia mexido com isso antes. Tive que fazer muitas pesquisas e tentar entender o que estava fazendo e como fazer e utilizar de bibliotecas para facilitar o desenvolvimento.
