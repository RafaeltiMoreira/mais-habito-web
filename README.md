# 🌟 Mais Hábito — Web

> Uma aplicação web gamificada para organizar sua vida através de desafios, tarefas e sistema de pontos.

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple)](https://vitejs.dev/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-6-pink)](https://styled-components.com/)

---

## 📋 Sobre o Projeto

O Mais Hábito é uma aplicação frontend focada em produtividade pessoal ("single-player"). Ele permite que o usuário crie tarefas do dia a dia ou assuma modelos de desafios de longo prazo, construindo um histórico de compromissos que geram pontos e incentivam uma rotina consistente (streaks). 
O projeto consome a [Mais Hábito API](https://github.com/RafaeltiMoreira/mais-habito-api).

### ✨ Funcionalidades Principais

- 🔐 **Autenticação** - Login, cadastro e gestão de sessão
- 👤 **Dashboard Gamificada** - Acompanhe seu nível, pontos de experiência (XP) acumulados e dias seguidos ("Sequência")
- 🎯 **Catálogo de Desafios** - Crie modelos de desafios e aceite trilhas que exigem consistência (ex: "Academia 30 Dias")
- 📝 **Diário de Bordo** - Adicione anotações de progresso ("Notes") aos seus desafios ativos
- ✅ **Tarefas e Agenda** - CRUD completo de tarefas isoladas para organizar seu dia
- 📱 **Responsividade** - Interface fluída e amigável em dispositivos móveis e desktops

---

## 🛠️ Tecnologias

### Core
- **React 19** - Framework principal
- **TypeScript 5** - Tipagem segura e intellisense
- **Vite 6** - Empacotador/Bundle super rápido

### Estilização & UI
- **Styled Components 6** - CSS-in-JS permitindo encapsulamento perfeito
- **lucide-react** - Ícones limpos e flexíveis
- **Suporte Theme** - Variáveis de cores mapeadas para fácil alteração de estilos (Dark & Light)

### Estado global e Server State
- **Zustand 5** - Store minimalista e direto
- **Axios** - Interceptors configurados para JWT e recusa 401 unificada

### Validações & Formulários
- **React Hook Form 7** - Formulários performáticos sem re-renderizações excessivas
- **Zod 3** - Schema dinâmico conectado diretamente às interfaces TypeScript

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/RafaeltiMoreira/mais-habito-web.git

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
```

Configure o `.env` na raiz do projeto conforme a URL de sua API:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
# Inicie o servidor em modo dev
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

---

## 🏗️ Arquitetura e Organização de Pastas

```
src/
├── components/          # Botões comuns, Inputs, Layout Principal, Sidebar, MobileNav
├── pages/
│   ├── auth/            # LoginPage, SignupPage
│   ├── challenges/      # Navegação do Catálogo e Desafios Ativos (ActiveChallengeCard, Modais)
│   ├── tasks/           # CRUD Agenda / Lista de Tarefas (TaskItem)
│   ├── dashboard/       # Visão geral de Progresso e Recompensas (ProgressBar)
│   └── profile/         # ProfilePage e troca de senhas
├── services/            # Camada de comunicação REST (challenge.service.ts, auth.service.ts...)
├── store/               # Zustand hooks (useAuthStore.ts, useThemeStore.ts)
├── styles/              # GlobalStyles.ts, theme.ts e tokens
├── types/               # Tipagem DTOs
└── routes/              # AppRoutes.tsx e PrivateRoutes wrappers
```

O Frontend segue design atômico e delegação de funções: as páginas ("Pages") puxam os dados dos serviços correspondentes e gerenciam o esqueleto visual, utilizando Componentes menores contidos nela mesma para lidar com modais (Ex: `DeleteTaskModal`, `AbandonChallengeModal`) ou itens de loop.

---

## 👨‍💻 Autor

**Rafael Moreira**

- GitHub: [@RafaeltiMoreira](https://github.com/RafaeltiMoreira)