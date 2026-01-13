# Funcionalidade de Reset de Senha

## 📋 O que foi implementado

A funcionalidade de "Esqueci minha senha" foi implementada usando o Better Auth. O sistema inclui:

1. ✅ Link "Esqueci minha senha" no formulário de login
2. ✅ Página de solicitação de reset (`/forgot-password`)
3. ✅ Página de redefinição de senha (`/reset-password`)
4. ✅ Configuração do Better Auth para envio de email

## 🚀 Como funciona

### Fluxo do usuário:

1. Usuário clica em "Esqueci minha senha" no login
2. Informa o email cadastrado
3. Recebe um email com link de reset (válido por tempo limitado)
4. Clica no link e é redirecionado para `/reset-password?token=...`
5. Define a nova senha
6. É redirecionado automaticamente para o login

## 📧 Configuração do Email

Atualmente, o sistema está configurado com `console.log` para desenvolvimento. Para produção, você precisa integrar um provedor de email.

### Opção 1: Resend (Recomendado)

```bash
npm install resend
```

Atualize o arquivo [src/lib/auth.ts](src/lib/auth.ts):

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
    // ... outras configurações
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: 'Seu App <noreply@seudominio.com>',
                to: user.email,
                subject: 'Redefinir sua senha',
                html: `
                    <h2>Redefinir senha</h2>
                    <p>Você solicitou a redefinição de senha.</p>
                    <p>Clique no link abaixo para definir uma nova senha:</p>
                    <a href="${url}">Redefinir minha senha</a>
                    <p>Este link expira em 1 hora.</p>
                    <p>Se você não solicitou esta alteração, ignore este email.</p>
                `,
            });
        },
    },
});
```

Configure no `.env`:
```env
RESEND_API_KEY=re_sua_chave_api
```

### Opção 2: SendGrid

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// Na configuração do auth:
sendResetPassword: async ({ user, url }) => {
    await sgMail.send({
        to: user.email,
        from: 'noreply@seudominio.com',
        subject: 'Redefinir sua senha',
        html: `<p>Clique <a href="${url}">aqui</a> para redefinir sua senha.</p>`,
    });
},
```

### Opção 3: Nodemailer (SMTP)

```bash
npm install nodemailer
```

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Na configuração do auth:
sendResetPassword: async ({ user, url }) => {
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: user.email,
        subject: 'Redefinir sua senha',
        html: `<p>Clique <a href="${url}">aqui</a> para redefinir sua senha.</p>`,
    });
},
```

## 🧪 Testando em desenvolvimento

Durante o desenvolvimento, o link de reset aparece no console do servidor. Você pode:

1. Solicitar o reset de senha
2. Copiar o link do console
3. Abrir o link no navegador
4. Definir a nova senha

## 📝 Arquivos criados/modificados

- [src/lib/auth.ts](src/lib/auth.ts) - Configuração do Better Auth
- [src/app/_components/login-form.tsx](src/app/_components/login-form.tsx) - Adicionado link "Esqueci minha senha"
- [src/app/forgot-password/page.tsx](src/app/forgot-password/page.tsx) - Página de solicitação
- [src/app/forgot-password/_components/forgot-password-form.tsx](src/app/forgot-password/_components/forgot-password-form.tsx) - Formulário de solicitação
- [src/app/reset-password/page.tsx](src/app/reset-password/page.tsx) - Página de redefinição
- [src/app/reset-password/_components/reset-password-form.tsx](src/app/reset-password/_components/reset-password-form.tsx) - Formulário de redefinição
- [model.env](model.env) - Variáveis de ambiente atualizadas

## 🔒 Segurança

- Os tokens de reset são gerados e validados pelo Better Auth
- Tokens expiram automaticamente
- Links de reset são de uso único
- Senhas são validadas (mínimo 8 caracteres)
- Confirmação de senha obrigatória

## 📚 Recursos adicionais

- [Documentação Better Auth](https://www.better-auth.com/docs)
- [Resend Docs](https://resend.com/docs)
- [SendGrid Docs](https://docs.sendgrid.com/)
