# AgencyFlow - Painel Administrativo

Uma aplicação de página única (SPA) em React para um protótipo de painel administrativo com tema escuro, inspirada no [SiGA da Nuvem Branding](https://nuvembranding.sigasw.com.br/).

## 🚀 Características

- **Sistema de Permissões**: Controle de acesso baseado em roles (Admin, Manager, Designer, Financial, Client)
- **Sistema de Autenticação**: Login e recuperação de senha
- **Design Moderno**: Interface escura com Tailwind CSS
- **SPA Completa**: Navegação sem recarregamento de página
- **Componentes Reutilizáveis**: Ícones SVG e componentes modulares
- **Responsivo**: Layout adaptável para diferentes tamanhos de tela
- **Dados de Exemplo**: Mock data para demonstração
- **Funcionalidades SiGA**: Sistema similar ao painel da Nuvem Branding

## 📁 Estrutura do Projeto

```
agencyflow/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Componente principal com toda a aplicação
│   ├── permissions.js  # Sistema de permissões e dados fictícios
│   ├── index.js        # Ponto de entrada do React
│   └── index.css       # Estilos globais e Tailwind CSS
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Componentes Principais

### Sistema de Autenticação
- **LoginPage**: Tela de login com email e senha
- **Recuperação de Senha**: Formulário para recuperar acesso
- **Logout**: Botão de sair no perfil do usuário

### Sistema de Permissões
- **Roles**: Admin, Manager, Designer, Financial, Client
- **Permissões Granulares**: Controle de acesso por funcionalidade
- **Menu Dinâmico**: Exibe apenas páginas permitidas
- **Ações Condicionais**: Botões aparecem conforme permissões

### Sidebar
- Logo "AgencyFlow" com "Flow" em azul
- Menu de navegação com ícones SVG (baseado em permissões)
- Perfil do usuário na base com botão de logout

### Header
- Título dinâmico baseado na página ativa
- Barra de busca funcional
- Ícone de notificações
- Perfil do usuário com avatar e nome

### Páginas Implementadas
- **Dashboard**: Cards de estatísticas, gráfico e projetos ativos
- **Projetos**: Tabela com lista de projetos e status
- **Clientes**: Lista completa de clientes com dados fictícios
- **Financeiro**: Faturas, receitas e despesas
- **Usuários**: Gestão de usuários e permissões
- **Relatórios**: Múltiplos tipos de relatórios
- **Configurações**: Configurações da empresa

## 🛠️ Tecnologias Utilizadas

- **React 18** com Hooks (useState)
- **Tailwind CSS** para estilização
- **SVG Icons** embutidos como componentes React

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento**:
   ```bash
   npm start
   ```

3. **Abrir no navegador**:
   ```
   http://localhost:3000
   ```

## 🎯 Funcionalidades

### Sistema de Permissões
- ✅ **Roles Definidos**: Admin, Manager, Designer, Financial, Client
- ✅ **Permissões Granulares**: Controle por funcionalidade
- ✅ **Menu Dinâmico**: Apenas páginas permitidas
- ✅ **Ações Condicionais**: Botões baseados em permissões
- ✅ **Proteção de Rotas**: Acesso restrito por role

### Sistema de Autenticação
- ✅ Tela de login com validação
- ✅ Recuperação de senha
- ✅ Logout funcional
- ✅ Proteção de rotas

### Páginas e Funcionalidades
- ✅ **Dashboard**: Métricas e estatísticas
- ✅ **Projetos**: Tabela com status coloridos
- ✅ **Clientes**: Lista completa com dados fictícios
- ✅ **Financeiro**: Faturas, receitas e despesas
- ✅ **Usuários**: Gestão de usuários e permissões
- ✅ **Relatórios**: Múltiplos tipos de relatórios
- ✅ **Configurações**: Configurações da empresa

### Navegação e Interface
- ✅ Navegação entre páginas sem recarregamento
- ✅ Menu lateral com estado ativo
- ✅ Design responsivo
- ✅ Tema escuro consistente

## 🔐 Sistema de Permissões

### Roles Disponíveis:
- **Admin**: Acesso total ao sistema
- **Manager**: Gestão de projetos e clientes
- **Designer**: Visualização e edição de projetos
- **Financial**: Gestão financeira e relatórios
- **Client**: Visualização limitada

### Permissões por Funcionalidade:
- **Dashboard**: Visualização de métricas
- **Projetos**: Visualizar, criar, editar, excluir
- **Clientes**: Visualizar, criar, editar, excluir
- **Financeiro**: Visualizar, criar faturas, relatórios
- **Usuários**: Gestão de usuários (apenas Admin)
- **Relatórios**: Visualizar e exportar
- **Configurações**: Visualizar e editar

## 📊 Dados Fictícios

### Usuários:
- Ana Souza (Admin/CEO)
- João Silva (Manager/Gerente de Projetos)
- Maria Santos (Designer/Designer Senior)
- Pedro Costa (Financial/Analista Financeiro)
- Carlos Lima (Designer/Designer Pleno)

### Clientes:
- TechCorp, StartupXYZ, DesignStudio, MarketingPro, ShopOnline

### Financeiro:
- Faturas com diferentes status (Pago, Pendente, Vencido)
- Receitas e despesas mensais
- Métricas de crescimento

## 🎨 Paleta de Cores

- **Fundo principal**: `#0a0a0a` (gray-950)
- **Cards**: `bg-gray-900` com bordas `border-gray-800`
- **Destaque**: Azul vibrante (`bg-blue-600`, `text-blue-500`)
- **Texto**: Branco (`text-white`) e cinza claro (`text-gray-300`)
- **Status**: Verde (ativo), Vermelho (inativo), Amarelo (pendente)

## 📱 Responsividade

A aplicação é totalmente responsiva e se adapta a diferentes tamanhos de tela:
- Desktop: Layout completo com sidebar fixa
- Tablet: Layout adaptado
- Mobile: Layout otimizado para telas menores

## 🔧 Personalização

Para personalizar a aplicação:
1. Modifique os dados de exemplo no arquivo `permissions.js`
2. Ajuste as cores no arquivo `tailwind.config.js`
3. Adicione novas páginas seguindo o padrão existente
4. Personalize os ícones SVG conforme necessário
5. Implemente autenticação real conectando a uma API
6. Adicione novas permissões no sistema de roles

## 🎯 Próximos Passos

Para tornar o sistema ainda mais completo:
1. Implementar autenticação real com backend
2. Adicionar mais páginas (Relatórios Avançados, etc.)
3. Implementar gráficos reais com bibliotecas como Chart.js
4. Adicionar funcionalidades de CRUD completas
5. Implementar notificações em tempo real
6. Adicionar upload de arquivos
7. Implementar sistema de logs de atividades 