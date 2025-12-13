# 🔐 Better Auth - Sistema de Autenticação

Um projeto de estudo completo sobre autenticação utilizando **Better Auth** com Next.js 15, Prisma, PostgreSQL e integração de login social (Google).

## 📋 Sobre o Projeto

Este projeto demonstra a implementação de um sistema de autenticação robusto e moderno, incluindo:

- ✅ Autenticação com credenciais (Email e Senha)
- ✅ Login Social com Google OAuth
- ✅ Gerenciamento de sessões
- ✅ Banco de dados PostgreSQL com Prisma ORM
- ✅ Interface responsiva com TailwindCSS
- ✅ Formulários com validação (React Hook Form + Zod)
- ✅ Componentes UI reutilizáveis

## 🚀 Tecnologias Utilizadas

- **[Next.js 15](https://nextjs.org/)** - Framework React com App Router
- **[Better Auth](https://www.better-auth.com/)** - Biblioteca de autenticação moderna
- **[Prisma](https://www.prisma.io/)** - ORM para TypeScript e Node.js
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional (Neon)
- **[TailwindCSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de schemas

## 📁 Estrutura do Projeto

```
better-auth/
├── prisma/
│   ├── schema.prisma          # Schema do banco de dados
│   └── migrations/            # Histórico de migrações
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...all]/ # Rotas da API de autenticação
│   │   ├── dashboard/         # Área protegida
│   │   ├── signup/            # Página de cadastro
│   │   └── _components/       # Componentes de autenticação
│   ├── components/ui/         # Componentes UI reutilizáveis
│   └── lib/
│       ├── auth.ts            # Configuração Better Auth (servidor)
│       ├── auth-client.ts     # Cliente de autenticação
│       └── prisma.ts          # Instância do Prisma Client
├── .env                       # Variáveis de ambiente
└── package.json
```

## 🛠️ Pré-requisitos

- Node.js 20 ou superior
- PostgreSQL (ou conta no [Neon](https://neon.tech/))
- Conta no [Google Cloud Console](https://console.cloud.google.com/) para OAuth

## ⚙️ Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/better-auth.git
cd better-auth
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados PostgreSQL
DATABASE_URL="postgresql://usuario:senha@localhost:5432/mydb?schema=public"

# Better Auth
BETTER_AUTH_SECRET=sua-chave-secreta-super-segura
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000

# Google OAuth
AUTH_GOOGLE_ID="seu-google-client-id.apps.googleusercontent.com"
AUTH_GOOGLE_SECRET="seu-google-client-secret"
```

#### 📝 Como obter as credenciais do Google OAuth:

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá para **APIs e Serviços** > **Credenciais**
4. Clique em **Criar Credenciais** > **ID do Cliente OAuth 2.0**
5. Configure a tela de consentimento OAuth
6. Adicione as URIs autorizadas:
   - Origens JavaScript autorizadas: `http://localhost:3000`
   - URIs de redirecionamento autorizados: `http://localhost:3000/api/auth/callback/google`
7. Copie o **ID do cliente** e o **Segredo do cliente**

### 4. Configure o banco de dados

Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

Visualize os dados (opcional):

```bash
npx prisma studio
```

## 🎯 Como Executar

### Modo de Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build de Produção

```bash
npm run build
npm start
```

## 📖 Funcionalidades Implementadas

### Autenticação com Credenciais

- **Cadastro de usuário**: Formulário com validação (email, nome, senha)
- **Login**: Autenticação com email e senha armazenados no PostgreSQL
- **Hash de senha**: Segurança implementada automaticamente pelo Better Auth

### Login Social

- **Google OAuth**: Integração completa com autenticação Google
- **Gerenciamento de contas**: Vinculação de contas sociais ao perfil do usuário

### Gerenciamento de Sessões

- **Sessões persistentes**: Armazenadas no banco de dados
- **Informações de sessão**: IP e User Agent
- **Expiração automática**: Controle de validade das sessões

### Proteção de Rotas

- **Middleware de autenticação**: Proteção de páginas restritas
- **Redirecionamento**: Usuários não autenticados são redirecionados para login
- **Dashboard**: Área protegida acessível apenas após login

## 🗄️ Modelo do Banco de Dados

### User (Usuário)
```prisma
- id: String (UUID)
- name: String
- email: String (único)
- emailVerified: Boolean
- image: String (opcional)
- createdAt: DateTime
- updatedAt: DateTime
```

### Session (Sessão)
```prisma
- id: String (UUID)
- expiresAt: DateTime
- token: String (único)
- ipAddress: String (opcional)
- userAgent: String (opcional)
- userId: String (FK)
```

### Account (Conta/Provider)
```prisma
- id: String (UUID)
- accountId: String
- providerId: String (email-password, google, etc.)
- userId: String (FK)
- accessToken: String (opcional)
- refreshToken: String (opcional)
- password: String (hash - para credenciais)
```

### Verification (Verificação)
```prisma
- id: String (UUID)
- identifier: String
- value: String
- expiresAt: DateTime
```

## 🔒 Segurança

- ✅ Senhas hasheadas automaticamente
- ✅ Proteção CSRF
- ✅ Validação de dados com Zod
- ✅ Variáveis de ambiente para credenciais sensíveis
- ✅ Tokens de sessão seguros
- ✅ OAuth 2.0 para login social

## 📚 Recursos Adicionais

### Documentação Oficial

- [Better Auth Docs](https://www.better-auth.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Conceitos Aprendidos

- Autenticação baseada em sessão vs JWT
- Integração de OAuth 2.0
- ORM e migrações de banco de dados
- Validação de formulários client-side e server-side
- Proteção de rotas em Next.js App Router
- Gerenciamento de estado de autenticação

## 🤝 Contribuindo

Este é um projeto de estudo, mas contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como projeto de estudo sobre autenticação moderna em aplicações web.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
