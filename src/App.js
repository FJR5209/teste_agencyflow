import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { 
  ROLES, USERS_DATA, CLIENTS_DATA, FINANCIAL_DATA, canAccessPage, ROLE_PERMISSIONS, PERMISSIONS, JOBS_DATA, CONFIGURACOES_DATA, PROJECTS_DATA, PROJECT_TYPES, CAMPAIGN_TYPES, DESIGN_JOB_TYPES, PRODUCTS_DATA, QUOTES_DATA, CONTRACTS_DATA, DEFAULT_CLAUSES 
} from './permissions';

// Função para verificar permissões
const hasPermission = (userRole, permission) => {
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  return userPermissions.includes(permission);
};

// Componentes de Ícones SVG
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const ClientsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const FinancialIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.19A2 2 0 006 3h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// Adicionar ScriptsIcon
const ScriptsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0h6m-6 0a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2m-6 0v2a2 2 0 002 2h2a2 2 0 002-2v-2" />
  </svg>
);

// Adicionar JobsIcon
const JobsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const ReportsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const QuotesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

// Componente de Login
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, password });
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPassword(true);
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">
              Nuvem<span className="text-blue-500">Branding</span>
            </h1>
            <h2 className="mt-6 text-xl font-semibold text-gray-300">Recuperar Senha</h2>
            <p className="mt-2 text-sm text-gray-400">
              Digite seu email para receber instruções de recuperação
            </p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Voltar ao login
              </button>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Enviar instruções
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">
            Nuvem<span className="text-blue-500">Branding</span>
          </h1>
          <h2 className="mt-6 text-xl font-semibold text-gray-300">Login</h2>
          <p className="mt-2 text-sm text-gray-400">
            Acesse sua conta para continuar
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-blue-500 hover:text-blue-400"
            >
              Recuperar Senha
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Sidebar adaptada para permissões e links extras
const Sidebar = ({ activePage, setActivePage, onLogout, user, sidebarOpen, setSidebarOpen }) => {
  const canViewDashboard = hasPermission(user.role, PERMISSIONS.VIEW_DASHBOARD);
  const canViewProjects = hasPermission(user.role, PERMISSIONS.VIEW_PROJECTS);
  const canViewClients = hasPermission(user.role, PERMISSIONS.VIEW_CLIENTS);
  const canViewUsers = hasPermission(user.role, PERMISSIONS.VIEW_USERS);
  const canViewReports = hasPermission(user.role, PERMISSIONS.VIEW_REPORTS);
  const canViewSettings = hasPermission(user.role, PERMISSIONS.VIEW_SETTINGS);
  const canViewJobs = hasPermission(user.role, PERMISSIONS.VIEW_JOBS);
  const canViewQuotes = hasPermission(user.role, PERMISSIONS.VIEW_QUOTES);

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: DashboardIcon, permission: canViewDashboard },
    { id: 'Projetos', label: 'Projetos', icon: ProjectsIcon, permission: canViewProjects },
    { id: 'Clientes', label: 'Clientes', icon: ClientsIcon, permission: canViewClients },
    { id: 'Orçamentos', label: 'Orçamentos', icon: QuotesIcon, permission: canViewQuotes },
    { id: 'Usuários', label: 'Usuários', icon: UsersIcon, permission: canViewUsers },
    { id: 'Relatórios', label: 'Relatórios', icon: ReportsIcon, permission: canViewReports },
    { id: 'Jobs', label: 'Jobs', icon: JobsIcon, permission: canViewJobs },
    { id: 'Configurações', label: 'Configurações', icon: SettingsIcon, permission: canViewSettings },
  ];

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed top-0 left-0 h-screen bg-gray-900 border-r border-gray-800 z-50 transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'w-64 translate-x-0' : 'w-16 -translate-x-0'
      } lg:relative lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header do Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className={`flex items-center ${sidebarOpen ? 'w-full' : 'w-full justify-center'}`}>
              {sidebarOpen && (
                <h1 className="text-xl font-bold text-white">AgencyFlow</h1>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg hover:bg-gray-800 transition-colors ${sidebarOpen ? 'ml-auto' : ''}`}
              >
                <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Items + Extras juntos */}
          <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
            {menuItems.filter(item => item.permission).map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <item.icon />
                {sidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Footer do Sidebar */}
          <div className="p-4 border-t border-gray-800 mt-auto">
            <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
              {sidebarOpen && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-gray-400 text-xs">{user.role}</div>
                  </div>
                </div>
              )}
              <button
                onClick={onLogout}
                className={`flex items-center text-gray-300 hover:text-white transition-colors ${sidebarOpen ? 'ml-2' : ''}`}
              >
                <LogoutIcon />
                {sidebarOpen && <span className="ml-2">Sair</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Componente Header
const Header = ({ activePage, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Botão de menu sanduíche para telas pequenas */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors mr-4"
          >
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h1 className="text-xl font-semibold text-white">{activePage}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <SearchIcon />
            <input
              type="text"
              placeholder="Buscar..."
              className="ml-2 px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <BellIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

// Componente StatCard
const StatCard = ({ title, value, change, changeType }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-500' : 'text-red-500'
        }`}>
          {changeType === 'positive' ? '+' : ''}{change}
        </div>
      </div>
    </div>
  );
};

// Componente ProgressBar
const ProgressBar = ({ progress, color }) => {
  return (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full ${color}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

// Página Dashboard sem financeiro
const DashboardPage = () => {
  const stats = [
    { title: 'Novos Clientes', value: '23', change: '8.2%', changeType: 'positive' },
    { title: 'Projetos Ativos', value: '12', change: '3.1%', changeType: 'positive' },
    { title: 'Tarefas Concluídas', value: '89', change: '2.4%', changeType: 'negative' }
  ];

  // Agrupar jobs por cliente
  const jobsByClient = CLIENTS_DATA.map(client => {
    const jobs = JOBS_DATA.filter(job => job.project === client.name);
    return {
      client: client.name,
      jobsConcluidos: jobs.filter(j => j.status === 'Concluído').length,
      jobsProducao: jobs.filter(j => j.status === 'Em andamento').length,
      jobsAProduzir: jobs.filter(j => j.status === 'Novo').length
    };
  });

  return (
    <div className="p-6 space-y-6">
      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Projetos Ativos por Empresa */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsByClient.map((item, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-2">{item.client}</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Concluídos</span>
                <span className="font-bold text-green-400">{item.jobsConcluidos}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Em produção</span>
                <span className="font-bold text-blue-400">{item.jobsProducao}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">A produzir</span>
                <span className="font-bold text-yellow-400">{item.jobsAProduzir}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Página Projetos melhorada com formulários específicos
const ProjectsPage = ({ user }) => {
  const VIDEO_TYPES = [
    'VT', 'Cobertura', 'Institucional', 'Reels', 'Depoimento', 'Tutorial', 'Making of', 'Chamada/Teaser', 'Bastidores', 'Outro'
  ];
  const PHOTO_TYPES = [
    'Still', 'Produto', 'Ambiente', 'Evento', 'Retrato/Equipe', 'Editorial', 'Making of', 'Cobertura', 'Social Media', 'Outro'
  ];
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedType, setSelectedType] = useState('');
  const [form, setForm] = useState({
    title: '',
    type: '',
    client: '',
    campaignType: '',
    responsible: '',
    dueDate: '',
    briefing: '',
    campaignBriefing: '',
    specs: [],
    // Campos específicos para Logo
    brandGuidelines: '',
    colorPalette: '',
    stylePreferences: '',
    // Campos específicos para Event Coverage
    eventDetails: '',
    coverageType: ''
  });

  const canCreate = hasPermission(user.role, PERMISSIONS.CREATE_PROJECTS);
  const canEdit = hasPermission(user.role, PERMISSIONS.EDIT_PROJECTS);
  const canDelete = hasPermission(user.role, PERMISSIONS.DELETE_PROJECTS);

  const handleOpenForm = (project = null) => {
    setEditingProject(project);
    if (project) {
      setForm({ ...project });
      setSelectedType(project.type);
    } else {
      setForm({
        title: '',
        type: '',
        client: '',
        campaignType: '',
        responsible: '',
        dueDate: '',
        briefing: '',
        campaignBriefing: '',
        specs: [],
        brandGuidelines: '',
        colorPalette: '',
        stylePreferences: '',
        eventDetails: '',
        coverageType: ''
      });
      setSelectedType('');
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProject(null);
    setSelectedType('');
    setForm({
      title: '',
      type: '',
      client: '',
      campaignType: '',
      responsible: '',
      dueDate: '',
      briefing: '',
      campaignBriefing: '',
      specs: [],
      brandGuidelines: '',
      colorPalette: '',
      stylePreferences: '',
      eventDetails: '',
      coverageType: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setForm(prev => ({ 
      ...prev, 
      type,
      specs: [],
      brandGuidelines: '',
      colorPalette: '',
      stylePreferences: '',
      eventDetails: '',
      coverageType: ''
    }));
  };

  const handleSpecsChange = (spec) => {
    setForm(prev => ({
      ...prev,
      specs: prev.specs.includes(spec)
        ? prev.specs.filter(s => s !== spec)
        : [...prev.specs, spec]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...form,
      id: editingProject ? editingProject.id : Date.now(),
      status: editingProject ? editingProject.status : 'Novo',
      progress: editingProject ? editingProject.progress : 0,
      createdAt: editingProject ? editingProject.createdAt : new Date().toISOString().split('T')[0]
    };

    if (editingProject) {
      setProjects(projects.map(p => p.id === editingProject.id ? projectData : p));
    } else {
      setProjects([...projects, projectData]);
    }
    handleCloseForm();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Novo': return 'bg-gray-600 text-white';
      case 'Em andamento': return 'bg-blue-600 text-white';
      case 'Finalizado': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getTypeLabel = (type) => {
    return Object.values(PROJECT_TYPES).find(t => t.id === type)?.label || type;
  };

  const typeOptions = Object.values(PROJECT_TYPES);

  const renderTypeSpecificFields = () => {
    if (!selectedType) return null;
    const projectType = Object.values(PROJECT_TYPES).find(t => t.id === selectedType);
    if (!projectType) return null;

    // Vídeo e Foto: roteiro (texto e PDF), anexar referências
    if (selectedType === PROJECT_TYPES.VIDEO.id || selectedType === PROJECT_TYPES.PHOTO.id) {
      return (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Roteiro (texto)</label>
            <textarea
              name="script_text"
              value={form.script_text || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Cole aqui o roteiro do projeto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Roteiro (PDF)</label>
            <input
              type="file"
              name="script_pdf"
              accept="application/pdf"
              onChange={e => setForm(prev => ({ ...prev, script_pdf: e.target.files[0] }))}
              className="block w-full text-gray-300"
            />
            {form.script_pdf && (
              <div className="mt-2 text-gray-400 text-sm">Arquivo selecionado: {form.script_pdf.name}</div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Referências (opcional)</label>
            <input
              type="file"
              name="references"
              multiple
              onChange={e => setForm(prev => ({ ...prev, references: Array.from(e.target.files) }))}
              className="block w-full text-gray-300"
            />
            {form.references && form.references.length > 0 && (
              <ul className="mt-2 text-gray-400 text-sm">
                {form.references.map((f, i) => <li key={i}>{f.name}</li>)}
              </ul>
            )}
          </div>
        </>
      );
    }

    // Demais tipos: descrição e anexar referências
    return (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
          <textarea
            name="description"
            value={form.description || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Descreva o projeto"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Referências (opcional)</label>
          <input
            type="file"
            name="references"
            multiple
            onChange={e => setForm(prev => ({ ...prev, references: Array.from(e.target.files) }))}
            className="block w-full text-gray-300"
          />
          {form.references && form.references.length > 0 && (
            <ul className="mt-2 text-gray-400 text-sm">
              {form.references.map((f, i) => <li key={i}>{f.name}</li>)}
            </ul>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Projetos</h2>
        {canCreate && (
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={() => handleOpenForm()}
          >
            + Novo Projeto
          </button>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="w-full">
          <table className="w-full min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Projeto</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Campanha</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Responsável</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Progresso</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data Entrega</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-800">
                  <td className="px-3 py-4">
                    <div>
                      <div className="text-white font-medium">{project.title}</div>
                      <div className="text-gray-400 text-sm">{project.createdAt}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-gray-300">{getTypeLabel(project.type)}</td>
                  <td className="px-3 py-4 text-gray-300">{project.client}</td>
                  <td className="px-3 py-4 text-gray-300">{project.campaignType}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-gray-300">{project.responsible}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                      </div>
                      <span className="text-gray-300 text-sm">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-gray-300">{project.dueDate}</td>
                  <td className="px-3 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {canEdit && (
                        <button className="text-blue-500 hover:text-blue-400" onClick={() => handleOpenForm(project)}>
                          Editar
                        </button>
                      )}
                      {canDelete && (
                        <button className="text-red-500 hover:text-red-400" onClick={() => setProjects(projects.filter(p => p.id !== project.id))}>
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de criação/edição */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
              </h3>
              <button className="text-gray-400 hover:text-white text-2xl" onClick={handleCloseForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Título do Projeto</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Projeto</label>
                  <select
                    name="type"
                    value={selectedType}
                    onChange={handleTypeChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione o tipo</option>
                    {typeOptions.map(type => (
                      <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cliente</label>
                  <select
                    name="client"
                    value={form.client}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione o cliente</option>
                    {CLIENTS_DATA.map(cliente => (
                      <option key={cliente.id} value={cliente.name}>{cliente.name}</option>
                    ))}
                  </select>
                </div>

                {selectedType === PROJECT_TYPES.VIDEO.id && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Vídeo</label>
                    <select
                      name="videoType"
                      value={form.videoType || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione o tipo de vídeo</option>
                      {VIDEO_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedType === PROJECT_TYPES.PHOTO.id && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Foto</label>
                    <select
                      name="photoType"
                      value={form.photoType || ''}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione o tipo de foto</option>
                      {PHOTO_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}
                {selectedType !== PROJECT_TYPES.VIDEO.id && selectedType !== PROJECT_TYPES.PHOTO.id && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Campanha</label>
                    <select
                      name="campaignType"
                      value={form.campaignType || ''}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione o tipo</option>
                      {CAMPAIGN_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Responsável</label>
                  <select
                    name="responsible"
                    value={form.responsible}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione o usuário</option>
                    {USERS_DATA.map(user => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Data de Entrega</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Briefing</label>
                <textarea
                  name="briefing"
                  value={form.briefing}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Descreva o briefing do projeto..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Briefing da Campanha</label>
                <textarea
                  name="campaignBriefing"
                  value={form.campaignBriefing}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Descreva o briefing da campanha..."
                />
              </div>

              {renderTypeSpecificFields()}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingProject ? 'Atualizar' : 'Criar'} Projeto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Página Usuários
const UsersPage = ({ user }) => {
  const canCreateUsers = hasPermission(user.role, PERMISSIONS.CREATE_USERS);
  const canEditUsers = hasPermission(user.role, PERMISSIONS.EDIT_USERS);
  const canDeleteUsers = hasPermission(user.role, PERMISSIONS.DELETE_USERS);

  const getRoleLabel = (role) => {
    const roleLabels = {
      [ROLES.ADMIN]: 'Administrador',
      [ROLES.MANAGER]: 'Gerente',
      [ROLES.DESIGNER]: 'Designer',
      [ROLES.FINANCIAL]: 'Financeiro',
      [ROLES.CLIENT]: 'Cliente'
    };
    return roleLabels[role] || role;
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Usuários</h2>
        {canCreateUsers && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Novo Usuário
          </button>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="w-full">
          <table className="w-full min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Usuário</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cargo</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Papel</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Último Login</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {USERS_DATA.map((userItem) => (
                <tr key={userItem.id} className="hover:bg-gray-800">
                  <td className="px-3 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white text-sm font-semibold">{userItem.avatar}</span>
                      </div>
                      <span className="text-white font-medium">{userItem.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-300">{userItem.email}</td>
                  <td className="px-3 py-4 text-sm text-gray-300">{userItem.position}</td>
                  <td className="px-3 py-4 text-sm text-gray-300">{getRoleLabel(userItem.role)}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(userItem.status)}`}>
                      {userItem.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-300">{userItem.lastLogin}</td>
                  <td className="px-3 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {canEditUsers && (
                        <button className="text-blue-500 hover:text-blue-400">Editar</button>
                      )}
                      {canDeleteUsers && (
                        <button className="text-red-500 hover:text-red-400">Excluir</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Página Clientes melhorada
const ClientsPage = ({ user }) => {
  const canCreateClients = hasPermission(user.role, PERMISSIONS.CREATE_CLIENTS);
  const canEditClients = hasPermission(user.role, PERMISSIONS.EDIT_CLIENTS);
  const canDeleteClients = hasPermission(user.role, PERMISSIONS.DELETE_CLIENTS);

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-600 text-white' : 'bg-gray-600 text-white';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Clientes</h2>
        {canCreateClients && (
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            + Novo Cliente
          </button>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="w-full">
          <table className="w-full min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Contato</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Projetos</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Receita Total</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Último Contato</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Gerente</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {CLIENTS_DATA.map((client) => (
                <tr key={client.id} className="hover:bg-gray-800">
                  <td className="px-3 py-4 text-sm text-white font-medium">{client.name}</td>
                  <td className="px-3 py-4">
                    <div>
                      <div className="text-sm text-gray-300">{client.email}</div>
                      <div className="text-sm text-gray-400">{client.phone}</div>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(client.status)}`}>
                      {client.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-300">{client.projects}</td>
                  <td className="px-3 py-4 text-sm text-green-400 font-medium">
                    R$ {client.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-300">{client.lastContact}</td>
                  <td className="px-3 py-4 text-sm text-gray-300">{client.manager}</td>
                  <td className="px-3 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {canEditClients && (
                        <button className="text-blue-500 hover:text-blue-400">Editar</button>
                      )}
                      {canDeleteClients && (
                        <button className="text-red-500 hover:text-red-400">Excluir</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Página Relatórios
const ReportsPage = ({ user }) => {
  const canExportReports = hasPermission(user.role, PERMISSIONS.EXPORT_REPORTS);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Relatórios</h2>
        {canExportReports && (
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Exportar Relatórios
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Relatório de Projetos</h3>
          <p className="text-gray-400 mb-4">Análise detalhada de todos os projetos ativos e concluídos</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
            Gerar Relatório
          </button>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Relatório de Clientes</h3>
          <p className="text-gray-400 mb-4">Análise de clientes, projetos e receita por cliente</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
            Gerar Relatório
          </button>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Relatório de Usuários</h3>
          <p className="text-gray-400 mb-4">Atividade dos usuários e acessos ao sistema</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
            Gerar Relatório
          </button>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Relatório de Produtividade</h3>
          <p className="text-gray-400 mb-4">Métricas de produtividade da equipe</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
            Gerar Relatório
          </button>
        </div>
      </div>
    </div>
  );
};

// Página Configurações melhorada
const SettingsPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    timezone: 'America/Sao_Paulo',
    language: 'pt-BR'
  });

  const canManageProducts = hasPermission(user.role, PERMISSIONS.MANAGE_PRODUCTS);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e) => {
    setForm(prev => ({ ...prev, role: e.target.value }));
  };

  const handleFusoChange = (e) => {
    setForm(prev => ({ ...prev, timezone: e.target.value }));
  };

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: '👤' },
    { id: 'security', label: 'Segurança', icon: '🔒' },
    { id: 'notifications', label: 'Notificações', icon: '🔔' },
    { id: 'system', label: 'Sistema', icon: '⚙️' }
  ];

  if (canManageProducts) {
    tabs.push({ id: 'products', label: 'Produtos', icon: '📦' });
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
      
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="border-b border-gray-800">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Informações do Perfil</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cargo</label>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleRoleChange}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {Object.entries(ROLES).map(([key, value]) => (
                      <option key={key} value={key}>{value}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Fuso Horário</label>
                  <select
                    name="timezone"
                    value={form.timezone}
                    onChange={handleFusoChange}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="America/Sao_Paulo">São Paulo (GMT-3)</option>
                    <option value="America/Manaus">Manaus (GMT-4)</option>
                    <option value="America/Belem">Belém (GMT-3)</option>
                    <option value="America/Fortaleza">Fortaleza (GMT-3)</option>
                    <option value="America/Recife">Recife (GMT-3)</option>
                    <option value="America/Salvador">Salvador (GMT-3)</option>
                    <option value="America/Brasilia">Brasília (GMT-3)</option>
                    <option value="America/Cuiaba">Cuiabá (GMT-4)</option>
                    <option value="America/Campo_Grande">Campo Grande (GMT-4)</option>
                    <option value="America/Porto_Velho">Porto Velho (GMT-4)</option>
                    <option value="America/Rio_Branco">Rio Branco (GMT-5)</option>
                    <option value="America/Maceio">Maceió (GMT-3)</option>
                    <option value="America/Aracaju">Aracaju (GMT-3)</option>
                    <option value="America/Joao_Pessoa">João Pessoa (GMT-3)</option>
                    <option value="America/Natal">Natal (GMT-3)</option>
                    <option value="America/Teresina">Teresina (GMT-3)</option>
                    <option value="America/Sao_Luis">São Luís (GMT-3)</option>
                    <option value="America/Boa_Vista">Boa Vista (GMT-4)</option>
                    <option value="America/Palmas">Palmas (GMT-3)</option>
                    <option value="America/Porto_Alegre">Porto Alegre (GMT-3)</option>
                    <option value="America/Curitiba">Curitiba (GMT-3)</option>
                    <option value="America/Florianopolis">Florianópolis (GMT-3)</option>
                    <option value="America/Vitoria">Vitória (GMT-3)</option>
                    <option value="America/Belo_Horizonte">Belo Horizonte (GMT-3)</option>
                    <option value="America/Goiania">Goiânia (GMT-3)</option>
                    <option value="America/Rio_de_Janeiro">Rio de Janeiro (GMT-3)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Salvar Alterações
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Segurança</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Senha Atual</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nova Senha</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirmar Nova Senha</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Alterar Senha
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Notificações</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Notificações por Email</h4>
                    <p className="text-gray-400 text-sm">Receber notificações por email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Notificações Push</h4>
                    <p className="text-gray-400 text-sm">Receber notificações no navegador</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white">Configurações do Sistema</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Idioma</label>
                  <select className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500">
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Modo Escuro</h4>
                    <p className="text-gray-400 text-sm">Usar tema escuro</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && canManageProducts && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Gerenciamento de Produtos</h3>
                <button 
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Gerenciar Produtos
                </button>
              </div>
              <p className="text-gray-400">
                Gerencie os produtos e serviços oferecidos, incluindo preços personalizados por cliente.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// JobsPage
const JobsPage = ({ user }) => {
  const [jobs, setJobs] = useState(JOBS_DATA);
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', type: '', designSubtype: '', status: 'Novo', dueDate: '', responsible: '', team: [], attachments: [] });

  const canCreate = hasPermission(user.role, PERMISSIONS.CREATE_JOBS);
  const canEdit = hasPermission(user.role, PERMISSIONS.EDIT_JOBS);
  const canDelete = hasPermission(user.role, PERMISSIONS.DELETE_JOBS);
  const canAssign = hasPermission(user.role, PERMISSIONS.ASSIGN_JOBS);
  const canSelfAssign = hasPermission(user.role, PERMISSIONS.SELF_ASSIGN_JOBS);

  const jobTypes = ['Design', 'Motion', 'Vídeo', 'Foto'];
  const jobStatus = ['Novo', 'Em andamento', 'Pausado', 'Concluído', 'Atrasado'];

  const handleOpenForm = (job = null) => {
    setEditingJob(job);
    setForm(job ? { ...job } : { title: '', description: '', type: '', designSubtype: '', status: 'Novo', dueDate: '', responsible: '', team: [], attachments: [] });
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingJob(null);
    setForm({ title: '', description: '', type: '', designSubtype: '', status: 'Novo', dueDate: '', responsible: '', team: [], attachments: [] });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map(o => o.value);
    setForm((prev) => ({ ...prev, team: options }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...files.map(f => ({ name: f.name, url: URL.createObjectURL(f) }))] }));
  };

  const handleRemoveAttachment = (name) => {
    setForm((prev) => ({ ...prev, attachments: prev.attachments.filter(a => a.name !== name) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobData = {
      ...form,
      id: editingJob ? editingJob.id : Date.now(),
      creator: editingJob ? editingJob.creator : user.name
    };
    if (editingJob) {
      setJobs(jobs.map(j => j.id === editingJob.id ? jobData : j));
    } else {
      setJobs([...jobs, jobData]);
    }
    handleCloseForm();
  };

  const handleAssign = (jobId, responsible) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, responsible } : j));
  };

  const handleSelfAssign = (jobId) => {
    setJobs(jobs.map(j => j.id === jobId ? { ...j, responsible: user.name } : j));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Jobs</h2>
        {canCreate && (
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={() => handleOpenForm()}
          >
            + Novo Job
          </button>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="w-full">
          <table className="w-full min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subtipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data de Entrega</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Criador</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Responsável</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Equipe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-white font-medium">{job.title}</div>
                      <div className="text-gray-400 text-sm">{job.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{job.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-300">{job.type === 'Design' ? job.designSubtype : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      job.status === 'Novo' ? 'bg-gray-600 text-white' :
                      job.status === 'Em andamento' ? 'bg-blue-600 text-white' :
                      job.status === 'Pausado' ? 'bg-yellow-600 text-white' :
                      job.status === 'Concluído' ? 'bg-green-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{job.dueDate}</td>
                  <td className="px-6 py-4 text-gray-300">{job.creator}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {job.responsible || (
                      canAssign ? (
                        <select
                          onChange={(e) => handleAssign(job.id, e.target.value)}
                          className="bg-gray-700 text-white text-sm rounded px-2 py-1"
                        >
                          <option value="">Atribuir</option>
                          {USERS_DATA.map(user => (
                            <option key={user.id} value={user.name}>{user.name}</option>
                          ))}
                        </select>
                      ) : canSelfAssign ? (
                        <button
                          onClick={() => handleSelfAssign(job.id)}
                          className="text-blue-500 hover:text-blue-400 text-sm"
                        >
                          Auto-atribuir
                        </button>
                      ) : (
                        <span className="text-gray-500">Não atribuído</span>
                      )
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {job.team && job.team.length > 0 ? job.team.join(', ') : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      {canEdit && (
                        <button className="text-blue-500 hover:text-blue-400" onClick={() => handleOpenForm(job)}>
                          Editar
                        </button>
                      )}
                      {canDelete && (
                        <button className="text-red-500 hover:text-red-400" onClick={() => setJobs(jobs.filter(j => j.id !== job.id))}>
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de criação/edição */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingJob ? 'Editar Job' : 'Novo Job'}
              </h3>
              <button className="text-gray-400 hover:text-white text-2xl" onClick={handleCloseForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {form.type === 'Design' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Peça de Design</label>
                    <select
                      name="designSubtype"
                      value={form.designSubtype}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione a peça</option>
                      <optgroup label="PEÇAS OFF">
                        {DESIGN_JOB_TYPES.OFF.map(opt => (
                          <option key={opt.value} value={opt.label}>{opt.label}</option>
                        ))}
                      </optgroup>
                      <optgroup label="PEÇAS ON">
                        {DESIGN_JOB_TYPES.ON.map(opt => (
                          <option key={opt.value} value={opt.label}>{opt.label}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {jobStatus.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Data de Entrega</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={form.dueDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Responsável</label>
                  <input
                    type="text"
                    name="responsible"
                    value={form.responsible}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Equipe</label>
                  <select
                    multiple
                    name="team"
                    value={form.team}
                    onChange={handleTeamChange}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    {USERS_DATA.map(user => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Anexos</label>
                <input type="file" multiple onChange={handleFileChange} className="block w-full text-gray-300" />
                {form.attachments.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {form.attachments.map((a, i) => (
                      <li key={i} className="flex items-center justify-between text-gray-300 text-sm">
                        <span>{a.name}</span>
                        <button type="button" className="ml-2 text-red-500 hover:text-red-400" onClick={() => handleRemoveAttachment(a.name)}>Remover</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingJob ? 'Atualizar' : 'Criar'} Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Página Orçamentos
const QuotesPage = ({ user }) => {
  const [quotes, setQuotes] = useState(QUOTES_DATA);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showContractForm, setShowContractForm] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [selectedClient, setSelectedClient] = useState('');
  const [quoteForm, setQuoteForm] = useState({
    clientId: '',
    validUntil: '',
    notes: '',
    items: []
  });

  const canCreate = hasPermission(user.role, PERMISSIONS.CREATE_QUOTES);
  const canEdit = hasPermission(user.role, PERMISSIONS.EDIT_QUOTES);
  const canDelete = hasPermission(user.role, PERMISSIONS.DELETE_QUOTES);
  const canApprove = hasPermission(user.role, PERMISSIONS.APPROVE_QUOTES);
  const canCreateContracts = hasPermission(user.role, PERMISSIONS.CREATE_CONTRACTS);

  const handleOpenQuoteForm = (quote = null) => {
    setEditingQuote(quote);
    if (quote) {
      setQuoteForm({
        clientId: quote.clientId,
        validUntil: quote.validUntil,
        notes: quote.notes,
        items: quote.items
      });
      setSelectedClient(quote.clientId);
    } else {
      setQuoteForm({
        clientId: '',
        validUntil: '',
        notes: '',
        items: []
      });
      setSelectedClient('');
    }
    setShowQuoteForm(true);
  };

  const handleCloseQuoteForm = () => {
    setShowQuoteForm(false);
    setEditingQuote(null);
    setSelectedClient('');
    setQuoteForm({
      clientId: '',
      validUntil: '',
      notes: '',
      items: []
    });
  };

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
    setQuoteForm(prev => ({ ...prev, clientId }));
    // Atualizar preços dos itens baseado no cliente
    setQuoteForm(prev => ({
      ...prev,
      items: prev.items.map(item => ({
        ...item,
        unitPrice: PRODUCTS_DATA.find(p => p.id === item.productId)?.clientPrices[clientId] || item.unitPrice,
        total: (PRODUCTS_DATA.find(p => p.id === item.productId)?.clientPrices[clientId] || item.unitPrice) * item.quantity
      }))
    }));
  };

  const handleAddItem = () => {
    const newItem = {
      productId: '',
      productName: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    };
    setQuoteForm(prev => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleRemoveItem = (index) => {
    setQuoteForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const handleItemChange = (index, field, value) => {
    setQuoteForm(prev => {
      const newItems = [...prev.items];
      newItems[index] = { ...newItems[index], [field]: value };
      
      if (field === 'productId') {
        const product = PRODUCTS_DATA.find(p => p.id === parseInt(value));
        newItems[index].productName = product?.name || '';
        newItems[index].unitPrice = selectedClient ? (product?.clientPrices[selectedClient] || product?.basePrice || 0) : (product?.basePrice || 0);
      }
      
      if (field === 'quantity' || field === 'unitPrice') {
        newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
      }
      
      return { ...prev, items: newItems };
    });
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    const total = quoteForm.items.reduce((sum, item) => sum + item.total, 0);
    const client = CLIENTS_DATA.find(c => c.id === parseInt(quoteForm.clientId));
    
    const quoteData = {
      id: editingQuote ? editingQuote.id : Date.now(),
      clientId: parseInt(quoteForm.clientId),
      clientName: client?.name || '',
      number: editingQuote ? editingQuote.number : `ORC-${new Date().getFullYear()}-${String(quotes.length + 1).padStart(3, '0')}`,
      date: editingQuote ? editingQuote.date : new Date().toISOString().split('T')[0],
      validUntil: quoteForm.validUntil,
      status: editingQuote ? editingQuote.status : 'Pendente',
      total,
      items: quoteForm.items,
      notes: quoteForm.notes,
      createdBy: user.name,
      approvedBy: editingQuote ? editingQuote.approvedBy : null,
      approvedAt: editingQuote ? editingQuote.approvedAt : null
    };

    if (editingQuote) {
      setQuotes(quotes.map(q => q.id === editingQuote.id ? quoteData : q));
    } else {
      setQuotes([...quotes, quoteData]);
    }
    handleCloseQuoteForm();
  };

  const handleApproveQuote = (quoteId) => {
    setQuotes(quotes.map(q => 
      q.id === quoteId 
        ? { ...q, status: 'Aprovado', approvedBy: user.name, approvedAt: new Date().toISOString().split('T')[0] }
        : q
    ));
  };

  const handleOpenContractForm = (quote) => {
    setSelectedQuote(quote);
    setShowContractForm(true);
  };

  const handleCloseContractForm = () => {
    setShowContractForm(false);
    setSelectedQuote(null);
  };

  const handleCreateContract = (contractData) => {
    // Aqui você implementaria a lógica para criar o contrato
    console.log('Criando contrato:', contractData);
    handleCloseContractForm();
  };

  const handleExportPDF = (quote) => {
    // Criar novo documento PDF
    const doc = new jsPDF();
    
    // Configurar fonte e tamanho
    doc.setFont('helvetica');
    doc.setFontSize(20);
    
    // Título
    doc.text('ORÇAMENTO', 105, 20, { align: 'center' });
    
    // Informações do orçamento
    doc.setFontSize(12);
    doc.text(`Número: ${quote.number}`, 20, 40);
    doc.text(`Data: ${quote.date}`, 20, 50);
    doc.text(`Validade: ${quote.validUntil}`, 20, 60);
    doc.text(`Cliente: ${quote.clientName}`, 20, 70);
    
    // Linha separadora
    doc.line(20, 80, 190, 80);
    
    // Título da tabela
    doc.setFontSize(14);
    doc.text('ITENS DO ORÇAMENTO', 20, 95);
    
    // Cabeçalho da tabela
    doc.setFontSize(10);
    doc.text('Produto', 20, 110);
    doc.text('Qtd', 120, 110);
    doc.text('Preço Unit.', 140, 110);
    doc.text('Total', 170, 110);
    
    // Linha do cabeçalho
    doc.line(20, 115, 190, 115);
    
    // Itens do orçamento
    let yPosition = 125;
    quote.items.forEach((item, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(item.productName, 20, yPosition);
      doc.text(item.quantity.toString(), 120, yPosition);
      doc.text(`R$ ${item.unitPrice.toFixed(2)}`, 140, yPosition);
      doc.text(`R$ ${item.total.toFixed(2)}`, 170, yPosition);
      
      yPosition += 10;
    });
    
    // Linha separadora
    doc.line(20, yPosition + 5, 190, yPosition + 5);
    
    // Total
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`TOTAL: R$ ${quote.total.toFixed(2)}`, 170, yPosition + 15, { align: 'right' });
    
    // Observações
    if (quote.notes) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('OBSERVAÇÕES:', 20, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Quebrar texto em linhas
      const splitNotes = doc.splitTextToSize(quote.notes, 170);
      doc.text(splitNotes, 20, 35);
    }
    
    // Informações da empresa
    doc.addPage();
    doc.setFontSize(10);
    doc.text('AgencyFlow - Marketing e Publicidade', 20, 20);
    doc.text('Email: contato@agencyflow.com', 20, 30);
    doc.text('Telefone: (11) 99999-9999', 20, 40);
    doc.text('Endereço: Rua Example, 123 - São Paulo/SP', 20, 50);
    
    // Salvar o PDF
    doc.save(`orcamento-${quote.number}.pdf`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pendente': return 'bg-yellow-600 text-white';
      case 'Aprovado': return 'bg-green-600 text-white';
      case 'Rejeitado': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Orçamentos</h2>
        {canCreate && (
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            onClick={() => handleOpenQuoteForm()}
          >
            + Novo Orçamento
          </button>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="w-full">
          <table className="w-full min-w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Número</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Validade</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-800">
                  <td className="px-3 py-4">
                    <div className="text-white font-medium">{quote.number}</div>
                  </td>
                  <td className="px-3 py-4 text-gray-300">{quote.clientName}</td>
                  <td className="px-3 py-4 text-gray-300">{quote.date}</td>
                  <td className="px-3 py-4 text-gray-300">{quote.validUntil}</td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-gray-300">R$ {quote.total.toFixed(2)}</td>
                  <td className="px-3 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        className="text-blue-500 hover:text-blue-400" 
                        onClick={() => handleExportPDF(quote)}
                      >
                        PDF
                      </button>
                      {quote.status === 'Aprovado' && canCreateContracts && (
                        <button 
                          className="text-green-500 hover:text-green-400" 
                          onClick={() => handleOpenContractForm(quote)}
                        >
                          Contrato
                        </button>
                      )}
                      {quote.status === 'Pendente' && canApprove && (
                        <button 
                          className="text-green-500 hover:text-green-400" 
                          onClick={() => handleApproveQuote(quote.id)}
                        >
                          Aprovar
                        </button>
                      )}
                      {canEdit && (
                        <button 
                          className="text-blue-500 hover:text-blue-400" 
                          onClick={() => handleOpenQuoteForm(quote)}
                        >
                          Editar
                        </button>
                      )}
                      {canDelete && (
                        <button 
                          className="text-red-500 hover:text-red-400" 
                          onClick={() => setQuotes(quotes.filter(q => q.id !== quote.id))}
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de criação/edição de orçamento */}
      {showQuoteForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingQuote ? 'Editar Orçamento' : 'Novo Orçamento'}
              </h3>
              <button className="text-gray-400 hover:text-white text-2xl" onClick={handleCloseQuoteForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmitQuote} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cliente</label>
                  <select
                    name="clientId"
                    value={selectedClient}
                    onChange={(e) => handleClientChange(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Selecione o cliente</option>
                    {CLIENTS_DATA.map(cliente => (
                      <option key={cliente.id} value={cliente.id}>{cliente.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Validade</label>
                  <input
                    type="date"
                    name="validUntil"
                    value={quoteForm.validUntil}
                    onChange={(e) => setQuoteForm(prev => ({ ...prev, validUntil: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Observações</label>
                <textarea
                  name="notes"
                  value={quoteForm.notes}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                  placeholder="Observações sobre o orçamento..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">Itens do Orçamento</h4>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
                  >
                    + Adicionar Item
                  </button>
                </div>

                <div className="space-y-4">
                  {quoteForm.items.map((item, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-800 rounded-lg">
                      <div className="col-span-4">
                        <select
                          value={item.productId}
                          onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Selecione o produto</option>
                          {PRODUCTS_DATA.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                          min="1"
                          required
                          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                          step="0.01"
                          required
                          className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="col-span-2 text-gray-300">
                        R$ {item.total.toFixed(2)}
                      </div>
                      <div className="col-span-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-right text-xl font-bold text-white">
                  Total: R$ {quoteForm.items.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseQuoteForm}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingQuote ? 'Atualizar' : 'Criar'} Orçamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de criação de contrato */}
      {showContractForm && selectedQuote && (
        <ContractForm 
          quote={selectedQuote} 
          onClose={handleCloseContractForm} 
          onSubmit={handleCreateContract}
          user={user}
        />
      )}
    </div>
  );
};

// Componente de Formulário de Contrato
const ContractForm = ({ quote, onClose, onSubmit, user }) => {
  const [contractForm, setContractForm] = useState({
    type: 'Serviço Único',
    startDate: '',
    endDate: '',
    clauses: [...DEFAULT_CLAUSES],
    customClauses: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContractForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClause = () => {
    const newClause = {
      id: Date.now(),
      title: '',
      content: '',
      order: contractForm.clauses.length + contractForm.customClauses.length + 1
    };
    setContractForm(prev => ({ ...prev, customClauses: [...prev.customClauses, newClause] }));
  };

  const handleRemoveClause = (clauseId, isCustom = false) => {
    if (isCustom) {
      setContractForm(prev => ({ 
        ...prev, 
        customClauses: prev.customClauses.filter(c => c.id !== clauseId) 
      }));
    } else {
      setContractForm(prev => ({ 
        ...prev, 
        clauses: prev.clauses.filter(c => c.id !== clauseId) 
      }));
    }
  };

  const handleClauseChange = (clauseId, field, value, isCustom = false) => {
    if (isCustom) {
      setContractForm(prev => ({
        ...prev,
        customClauses: prev.customClauses.map(c => 
          c.id === clauseId ? { ...c, [field]: value } : c
        )
      }));
    } else {
      setContractForm(prev => ({
        ...prev,
        clauses: prev.clauses.map(c => 
          c.id === clauseId ? { ...c, [field]: value } : c
        )
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allClauses = [...contractForm.clauses, ...contractForm.customClauses];
    const contractData = {
      quoteId: quote.id,
      clientId: quote.clientId,
      clientName: quote.clientName,
      number: `CON-${new Date().getFullYear()}-${String(CONTRACTS_DATA.length + 1).padStart(3, '0')}`,
      type: contractForm.type,
      startDate: contractForm.startDate,
      endDate: contractForm.endDate,
      total: quote.total,
      clauses: allClauses,
      createdBy: user.name
    };
    onSubmit(contractData);
  };

  const handleExportContractPDF = () => {
    const allClauses = [...contractForm.clauses, ...contractForm.customClauses];
    
    // Criar novo documento PDF
    const doc = new jsPDF();
    
    // Configurar fonte e tamanho
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    
    // Título
    doc.text('CONTRATO DE PRESTAÇÃO DE SERVIÇOS', 105, 20, { align: 'center' });
    
    // Informações do contrato
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Número: ${contractForm.number || 'CON-2024-001'}`, 20, 40);
    doc.text(`Cliente: ${quote.clientName}`, 20, 50);
    doc.text(`Tipo: ${contractForm.type}`, 20, 60);
    doc.text(`Data Início: ${contractForm.startDate}`, 20, 70);
    doc.text(`Data Fim: ${contractForm.endDate}`, 20, 80);
    doc.text(`Valor Total: R$ ${quote.total.toFixed(2)}`, 20, 90);
    
    // Linha separadora
    doc.line(20, 100, 190, 100);
    
    // Título das cláusulas
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('CLÁUSULAS DO CONTRATO', 20, 115);
    
    // Cláusulas
    let yPosition = 130;
    allClauses.forEach((clause, index) => {
      // Verificar se precisa de nova página
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Número e título da cláusula
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${clause.title}`, 20, yPosition);
      
      yPosition += 8;
      
      // Conteúdo da cláusula
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      
      // Quebrar texto em linhas
      const splitContent = doc.splitTextToSize(clause.content, 170);
      doc.text(splitContent, 20, yPosition);
      
      yPosition += (splitContent.length * 5) + 10;
    });
    
    // Assinaturas
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ASSINATURAS', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Prestador de Serviços:', 20, 50);
    doc.text('AgencyFlow - Marketing e Publicidade', 20, 60);
    doc.text('CNPJ: 00.000.000/0001-00', 20, 70);
    doc.text('Assinado por: Ana Souza', 20, 80);
    doc.text('Data: ' + new Date().toLocaleDateString('pt-BR'), 20, 90);
    
    doc.text('Cliente:', 20, 120);
    doc.text(quote.clientName, 20, 130);
    doc.text('Assinado por: _________________', 20, 140);
    doc.text('Data: _________________', 20, 150);
    
    // Informações da empresa
    doc.setFontSize(10);
    doc.text('AgencyFlow - Marketing e Publicidade', 20, 200);
    doc.text('Email: contato@agencyflow.com', 20, 210);
    doc.text('Telefone: (11) 99999-9999', 20, 220);
    doc.text('Endereço: Rua Example, 123 - São Paulo/SP', 20, 230);
    
    // Salvar o PDF
    doc.save(`contrato-${quote.number}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Criar Contrato - {quote.number}</h3>
          <button className="text-gray-400 hover:text-white text-2xl" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Contrato</label>
              <select
                name="type"
                value={contractForm.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="Serviço Único">Serviço Único</option>
                <option value="Contrato por Período">Contrato por Período</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data de Início</label>
              <input
                type="date"
                name="startDate"
                value={contractForm.startDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Data de Fim</label>
              <input
                type="date"
                name="endDate"
                value={contractForm.endDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-white">Cláusulas do Contrato</h4>
              <button
                type="button"
                onClick={handleAddClause}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm"
              >
                + Adicionar Cláusula
              </button>
            </div>

            <div className="space-y-4">
              {/* Cláusulas padrão */}
              {contractForm.clauses.map((clause, index) => (
                <div key={clause.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <input
                      type="text"
                      value={clause.title}
                      onChange={(e) => handleClauseChange(clause.id, 'title', e.target.value)}
                      className="text-lg font-medium text-white bg-transparent border-b border-gray-600 focus:border-blue-500 focus:outline-none flex-1 mr-4"
                      placeholder="Título da cláusula"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveClause(clause.id)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                    >
                      Remover
                    </button>
                  </div>
                  <textarea
                    value={clause.content}
                    onChange={(e) => handleClauseChange(clause.id, 'content', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    rows="3"
                    placeholder="Conteúdo da cláusula"
                  />
                </div>
              ))}

              {/* Cláusulas customizadas */}
              {contractForm.customClauses.map((clause, index) => (
                <div key={clause.id} className="p-4 bg-blue-900 border border-blue-700 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <input
                      type="text"
                      value={clause.title}
                      onChange={(e) => handleClauseChange(clause.id, 'title', e.target.value, true)}
                      className="text-lg font-medium text-white bg-transparent border-b border-blue-600 focus:border-blue-400 focus:outline-none flex-1 mr-4"
                      placeholder="Título da cláusula customizada"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveClause(clause.id, true)}
                      className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                    >
                      Remover
                    </button>
                  </div>
                  <textarea
                    value={clause.content}
                    onChange={(e) => handleClauseChange(clause.id, 'content', e.target.value, true)}
                    className="w-full px-3 py-2 border border-blue-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-400"
                    rows="3"
                    placeholder="Conteúdo da cláusula customizada"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleExportContractPDF}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              Exportar PDF
            </button>
            
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Criar Contrato
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

// Página de Gerenciamento de Produtos
const ProductsPage = ({ user }) => {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    description: '',
    basePrice: 0,
    unit: '',
    clientPrices: {}
  });

  const canManage = hasPermission(user.role, PERMISSIONS.MANAGE_PRODUCTS);

  const handleOpenForm = (product = null) => {
    setEditingProduct(product);
    if (product) {
      setProductForm({ ...product });
    } else {
      setProductForm({
        name: '',
        category: '',
        description: '',
        basePrice: 0,
        unit: '',
        clientPrices: {}
      });
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: '',
      description: '',
      basePrice: 0,
      unit: '',
      clientPrices: {}
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClientPriceChange = (clientId, price) => {
    setProductForm(prev => ({
      ...prev,
      clientPrices: {
        ...prev.clientPrices,
        [clientId]: parseFloat(price) || 0
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      id: editingProduct ? editingProduct.id : Date.now(),
      basePrice: parseFloat(productForm.basePrice)
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
    } else {
      setProducts([...products, productData]);
    }
    handleCloseForm();
  };

  const getClientPrice = (product, clientId) => {
    return product.clientPrices[clientId] || product.basePrice;
  };

  if (!canManage) {
    return (
      <div className="p-6">
        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
          <p className="text-red-200">Você não tem permissão para gerenciar produtos.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Gerenciamento de Produtos</h2>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          onClick={() => handleOpenForm()}
        >
          + Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full mb-2">
                  {product.category}
                </span>
              </div>
              <button
                onClick={() => handleOpenForm(product)}
                className="text-blue-500 hover:text-blue-400"
              >
                Editar
              </button>
            </div>
            
            <p className="text-gray-400 text-sm mb-4">{product.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Preço Base:</span>
                <span className="text-white">R$ {product.basePrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Unidade:</span>
                <span className="text-white">{product.unit}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Preços por Cliente:</h4>
              <div className="space-y-1">
                {CLIENTS_DATA.map(client => (
                  <div key={client.id} className="flex justify-between text-xs">
                    <span className="text-gray-400">{client.name}:</span>
                    <span className="text-white">R$ {getClientPrice(product, client.id).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de criação/edição de produto */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? 'Editar Produto' : 'Novo Produto'}
              </h3>
              <button className="text-gray-400 hover:text-white text-2xl" onClick={handleCloseForm}>×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nome do Produto</label>
                  <input
                    type="text"
                    name="name"
                    value={productForm.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                  <input
                    type="text"
                    name="category"
                    value={productForm.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Preço Base</label>
                  <input
                    type="number"
                    name="basePrice"
                    value={productForm.basePrice}
                    onChange={handleChange}
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Unidade</label>
                  <input
                    type="text"
                    name="unit"
                    value={productForm.unit}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="ex: projeto, mês, sessão"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                  rows="3"
                />
              </div>

              <div>
                <h4 className="text-lg font-medium text-white mb-4">Preços por Cliente</h4>
                <div className="space-y-3">
                  {CLIENTS_DATA.map(client => (
                    <div key={client.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <span className="text-gray-300">{client.name}</span>
                      <input
                        type="number"
                        value={productForm.clientPrices[client.id] || productForm.basePrice}
                        onChange={(e) => handleClientPriceChange(client.id, e.target.value)}
                        step="0.01"
                        className="w-32 px-3 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  {editingProduct ? 'Atualizar' : 'Criar'} Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activePage, setActivePage] = useState('Dashboard');
  const [user, setUser] = useState(USERS_DATA[0]);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024); // Aberto em telas grandes, fechado em pequenas

  const handleLogin = (credentials) => {
    setUser(USERS_DATA[0]); // Sempre Ana Souza (admin)
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActivePage('Dashboard');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Projetos':
        return <ProjectsPage user={user} />;
      case 'Clientes':
        return <ClientsPage user={user} />;
      case 'Orçamentos':
        return <QuotesPage user={user} />;
      case 'Usuários':
        return <UsersPage user={user} />;
      case 'Relatórios':
        return <ReportsPage user={user} />;
      case 'Jobs':
        return <JobsPage user={user} />;
      case 'Configurações':
        return <SettingsPage user={user} />;
      case 'Produtos':
        return <ProductsPage user={user} />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
        user={user}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <Header activePage={activePage} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Renderizar o app normalmente se não estiver visualizando HTML externo */}
        {view === null && (
          <main className="h-full overflow-auto">
            {renderPage()}
          </main>
        )}
      </div>
    </div>
  );
}

export default App; 