// Sistema de Permissões e Regras de Negócio

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DESIGNER: 'designer',
  CLIENT: 'client',
  FINANCIAL: 'financial'
};

export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'view_dashboard',
  
  // Projetos
  VIEW_PROJECTS: 'view_projects',
  CREATE_PROJECTS: 'create_projects',
  EDIT_PROJECTS: 'edit_projects',
  DELETE_PROJECTS: 'delete_projects',
  MANAGE_PROJECTS: 'manage_projects',
  
  // Clientes
  VIEW_CLIENTS: 'view_clients',
  CREATE_CLIENTS: 'create_clients',
  EDIT_CLIENTS: 'edit_clients',
  DELETE_CLIENTS: 'delete_clients',
  
  // Financeiro
  VIEW_REPORTS: 'view_reports',
  
  // Usuários
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  
  // Configurações
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
  
  // Relatórios
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  
  // Jobs
  VIEW_JOBS: 'view_jobs',
  CREATE_JOBS: 'create_jobs',
  EDIT_JOBS: 'edit_jobs',
  DELETE_JOBS: 'delete_jobs',
  ASSIGN_JOBS: 'assign_jobs',
  SELF_ASSIGN_JOBS: 'self_assign_jobs',
  
  // Orçamentos e Contratos
  CREATE_QUOTES: 'create_quotes',
  VIEW_QUOTES: 'view_quotes',
  EDIT_QUOTES: 'edit_quotes',
  DELETE_QUOTES: 'delete_quotes',
  APPROVE_QUOTES: 'approve_quotes',
  
  CREATE_CONTRACTS: 'create_contracts',
  VIEW_CONTRACTS: 'view_contracts',
  EDIT_CONTRACTS: 'edit_contracts',
  DELETE_CONTRACTS: 'delete_contracts',
  SIGN_CONTRACTS: 'sign_contracts',
  
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_CONTRACT_TEMPLATES: 'manage_contract_templates'
};

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.DELETE_PROJECTS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.VIEW_CLIENTS,
    PERMISSIONS.CREATE_CLIENTS,
    PERMISSIONS.EDIT_CLIENTS,
    PERMISSIONS.DELETE_CLIENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.CREATE_JOBS,
    PERMISSIONS.EDIT_JOBS,
    PERMISSIONS.DELETE_JOBS,
    PERMISSIONS.ASSIGN_JOBS,
    PERMISSIONS.SELF_ASSIGN_JOBS,
    PERMISSIONS.CREATE_QUOTES,
    PERMISSIONS.VIEW_QUOTES,
    PERMISSIONS.EDIT_QUOTES,
    PERMISSIONS.DELETE_QUOTES,
    PERMISSIONS.APPROVE_QUOTES,
    PERMISSIONS.CREATE_CONTRACTS,
    PERMISSIONS.VIEW_CONTRACTS,
    PERMISSIONS.EDIT_CONTRACTS,
    PERMISSIONS.DELETE_CONTRACTS,
    PERMISSIONS.SIGN_CONTRACTS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_CONTRACT_TEMPLATES
  ],
  
  [ROLES.MANAGER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.CREATE_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.VIEW_CLIENTS,
    PERMISSIONS.CREATE_CLIENTS,
    PERMISSIONS.EDIT_CLIENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.CREATE_JOBS,
    PERMISSIONS.EDIT_JOBS,
    PERMISSIONS.ASSIGN_JOBS,
    PERMISSIONS.SELF_ASSIGN_JOBS,
    PERMISSIONS.CREATE_QUOTES,
    PERMISSIONS.VIEW_QUOTES,
    PERMISSIONS.EDIT_QUOTES,
    PERMISSIONS.DELETE_QUOTES,
    PERMISSIONS.APPROVE_QUOTES,
    PERMISSIONS.CREATE_CONTRACTS,
    PERMISSIONS.VIEW_CONTRACTS,
    PERMISSIONS.EDIT_CONTRACTS,
    PERMISSIONS.DELETE_CONTRACTS,
    PERMISSIONS.SIGN_CONTRACTS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_CONTRACT_TEMPLATES
  ],
  
  [ROLES.DESIGNER]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.EDIT_PROJECTS,
    PERMISSIONS.VIEW_CLIENTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.SELF_ASSIGN_JOBS,
    PERMISSIONS.CREATE_QUOTES,
    PERMISSIONS.VIEW_QUOTES,
    PERMISSIONS.EDIT_QUOTES,
    PERMISSIONS.DELETE_QUOTES,
    PERMISSIONS.APPROVE_QUOTES,
    PERMISSIONS.CREATE_CONTRACTS,
    PERMISSIONS.VIEW_CONTRACTS,
    PERMISSIONS.EDIT_CONTRACTS,
    PERMISSIONS.DELETE_CONTRACTS,
    PERMISSIONS.SIGN_CONTRACTS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_CONTRACT_TEMPLATES
  ],
  
  [ROLES.CLIENT]: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.CREATE_QUOTES,
    PERMISSIONS.VIEW_QUOTES,
    PERMISSIONS.EDIT_QUOTES,
    PERMISSIONS.DELETE_QUOTES,
    PERMISSIONS.APPROVE_QUOTES,
    PERMISSIONS.CREATE_CONTRACTS,
    PERMISSIONS.VIEW_CONTRACTS,
    PERMISSIONS.EDIT_CONTRACTS,
    PERMISSIONS.DELETE_CONTRACTS,
    PERMISSIONS.SIGN_CONTRACTS,
    PERMISSIONS.MANAGE_PRODUCTS,
    PERMISSIONS.MANAGE_CONTRACT_TEMPLATES
  ]
};

export const hasPermission = (userRole, permission) => {
  const userPermissions = ROLE_PERMISSIONS[userRole] || [];
  return userPermissions.includes(permission);
};

export const canAccessPage = (userRole, page) => {
  const pagePermissions = {
    'Dashboard': PERMISSIONS.VIEW_DASHBOARD,
    'Projetos': PERMISSIONS.VIEW_PROJECTS,
    'Clientes': PERMISSIONS.VIEW_CLIENTS,
    'Usuários': PERMISSIONS.VIEW_USERS,
    'Relatórios': PERMISSIONS.VIEW_REPORTS,
    'Configurações': PERMISSIONS.VIEW_SETTINGS
  };
  
  return hasPermission(userRole, pagePermissions[page]);
};

// Dados fictícios de usuários
export const USERS_DATA = [
  {
    id: 1,
    name: 'Ana Souza',
    email: 'ana.souza@agencyflow.com',
    role: ROLES.ADMIN,
    avatar: 'AS',
    position: 'CEO',
    status: 'active',
    lastLogin: '2024-12-10 14:30'
  },
  {
    id: 2,
    name: 'João Silva',
    email: 'joao.silva@agencyflow.com',
    role: ROLES.MANAGER,
    avatar: 'JS',
    position: 'Gerente de Projetos',
    status: 'active',
    lastLogin: '2024-12-10 13:45'
  },
  {
    id: 3,
    name: 'Maria Santos',
    email: 'maria.santos@agencyflow.com',
    role: ROLES.DESIGNER,
    avatar: 'MS',
    position: 'Designer Senior',
    status: 'active',
    lastLogin: '2024-12-10 12:20'
  },
  {
    id: 4,
    name: 'Pedro Costa',
    email: 'pedro.costa@agencyflow.com',
    role: ROLES.FINANCIAL,
    avatar: 'PC',
    position: 'Analista Financeiro',
    status: 'active',
    lastLogin: '2024-12-10 11:15'
  },
  {
    id: 5,
    name: 'Carlos Lima',
    email: 'carlos.lima@agencyflow.com',
    role: ROLES.DESIGNER,
    avatar: 'CL',
    position: 'Designer Pleno',
    status: 'inactive',
    lastLogin: '2024-12-09 16:30'
  }
];

// Dados fictícios de clientes
export const CLIENTS_DATA = [
  {
    id: 1,
    name: 'TechCorp',
    email: 'contato@techcorp.com',
    phone: '(11) 99999-9999',
    status: 'active',
    projects: 3,
    totalRevenue: 45000,
    lastContact: '2024-12-10',
    manager: 'João Silva'
  },
  {
    id: 2,
    name: 'StartupXYZ',
    email: 'hello@startupxyz.com',
    phone: '(11) 88888-8888',
    status: 'active',
    projects: 2,
    totalRevenue: 28000,
    lastContact: '2024-12-09',
    manager: 'Ana Souza'
  },
  {
    id: 3,
    name: 'DesignStudio',
    email: 'info@designstudio.com',
    phone: '(11) 77777-7777',
    status: 'inactive',
    projects: 1,
    totalRevenue: 15000,
    lastContact: '2024-12-08',
    manager: 'Maria Santos'
  },
  {
    id: 4,
    name: 'MarketingPro',
    email: 'contato@marketingpro.com',
    phone: '(11) 66666-6666',
    status: 'active',
    projects: 4,
    totalRevenue: 62000,
    lastContact: '2024-12-10',
    manager: 'João Silva'
  },
  {
    id: 5,
    name: 'ShopOnline',
    email: 'suporte@shoponline.com',
    phone: '(11) 55555-5555',
    status: 'active',
    projects: 2,
    totalRevenue: 35000,
    lastContact: '2024-12-07',
    manager: 'Ana Souza'
  }
];

// Mock data de jobs
export const JOBS_DATA = [
  {
    id: 1,
    title: 'Vídeo institucional para Cliente X',
    description: 'Gravar e editar vídeo institucional para campanha de lançamento.',
    type: 'Vídeo',
    status: 'Novo',
    dueDate: '2024-07-10',
    creator: 'Ana Souza',
    responsible: 'João Silva',
    team: ['Maria Santos', 'Pedro Costa'],
    attachments: [
      { name: 'briefing.pdf', url: '#' }
    ]
  },
  {
    id: 2,
    title: 'Post para Instagram',
    description: 'Criar arte para post de lançamento.',
    type: 'Design',
    status: 'Em andamento',
    dueDate: '2024-07-05',
    creator: 'João Silva',
    responsible: '',
    team: [],
    attachments: []
  }
];

// Mock de configuração global
export const CONFIGURACOES_DATA = {
  nomeEmpresa: 'AgencyFlow',
  emailContato: 'contato@agencyflow.com',
  telefoneContato: '(11) 99999-9999',
  nivelAcessoPadrao: 'designer', // role padrão para novos usuários
  fusoHorarioPadrao: 'America/Sao_Paulo',
  preferenciasGerais: {}
};

// Tipos de projeto e suas especificações
export const PROJECT_TYPES = {
  VIDEO: {
    id: 'video',
    label: 'Vídeo',
    requires: ['briefing', 'campaign_briefing', 'client', 'campaign_type', 'responsible', 'dueDate', 'script_text', 'script_pdf', 'references']
  },
  PHOTO: {
    id: 'photo',
    label: 'Foto',
    requires: ['briefing', 'campaign_briefing', 'client', 'campaign_type', 'responsible', 'dueDate', 'script_text', 'script_pdf', 'references']
  },
  DESIGN: {
    id: 'design',
    label: 'Design',
    requires: ['briefing', 'campaign_briefing', 'client', 'campaign_type', 'responsible', 'dueDate', 'description', 'references']
  },
  CAMPAIGN: {
    id: 'campaign',
    label: 'Campanha',
    requires: ['briefing', 'campaign_briefing', 'client', 'campaign_type', 'responsible', 'dueDate', 'description', 'references']
  },
  OTHER: {
    id: 'other',
    label: 'Outro',
    requires: ['briefing', 'campaign_briefing', 'client', 'campaign_type', 'responsible', 'dueDate', 'description', 'references']
  }
};

// Tipos de campanha
export const CAMPAIGN_TYPES = [
  'Branding',
  'Marketing Digital',
  'Evento',
  'Produto',
  'Institucional',
  'Promocional',
  'Educacional',
  'Social Media'
];

// Mock de projetos atualizado
export const PROJECTS_DATA = [
  {
    id: 1,
    title: 'Vídeo Institucional Casa Nobre',
    type: 'video',
    client: 'Casa Nobre',
    campaignType: 'Institucional',
    status: 'Em andamento',
    responsible: 'Maria Santos',
    dueDate: '2024-12-20',
    progress: 75,
    briefing: 'Produção de vídeo institucional para apresentação da Casa Nobre.',
    campaignBriefing: 'Campanha institucional para reforço de marca.',
    script_text: 'CENA 1\nTexto: Eu achava que só via um painel assim nas casa de novela, sabe?...',
    script_pdf: null,
    references: [],
    createdAt: '2024-12-01'
  },
  {
    id: 2,
    title: 'Ensaio Fotográfico Produto ABC',
    type: 'photo',
    client: 'Empresa ABC',
    campaignType: 'Produto',
    status: 'Novo',
    responsible: 'João Silva',
    dueDate: '2024-12-25',
    progress: 0,
    briefing: 'Ensaio fotográfico para lançamento do Produto ABC.',
    campaignBriefing: 'Campanha de lançamento de produto.',
    script_text: '',
    script_pdf: null,
    references: [],
    createdAt: '2024-12-10'
  },
  {
    id: 3,
    title: 'Criação de Identidade Visual',
    type: 'design',
    client: 'Tech Startup',
    campaignType: 'Branding',
    status: 'Finalizado',
    responsible: 'Ana Souza',
    dueDate: '2024-11-30',
    progress: 100,
    briefing: 'Desenvolvimento de identidade visual completa.',
    campaignBriefing: 'Campanha de branding para nova startup.',
    description: 'Criação de logo, paleta de cores, tipografia e manual de marca.',
    references: [],
    createdAt: '2024-11-15'
  },
  {
    id: 4,
    title: 'Campanha Black Friday',
    type: 'campaign',
    client: 'Restaurante Gourmet',
    campaignType: 'Promocional',
    status: 'Em andamento',
    responsible: 'Pedro Costa',
    dueDate: '2024-12-15',
    progress: 30,
    briefing: 'Campanha promocional para Black Friday.',
    campaignBriefing: 'Promoção de pratos especiais para a data.',
    description: 'Ações de marketing digital, banners e posts.',
    references: [],
    createdAt: '2024-12-05'
  },
  {
    id: 5,
    title: 'Projeto Especial',
    type: 'other',
    client: 'Marca Esportiva XYZ',
    campaignType: 'Social Media',
    status: 'Novo',
    responsible: 'Carlos Lima',
    dueDate: '2024-12-22',
    progress: 0,
    briefing: 'Projeto especial para ação de engajamento.',
    campaignBriefing: 'Campanha de engajamento para redes sociais.',
    description: 'Ativação com influenciadores e sorteios.',
    references: [],
    createdAt: '2024-12-12'
  }
];

// Tipos de job para designers
export const DESIGN_JOB_TYPES = {
  OFF: [
    { value: 'outdoor', label: 'OUTDOOR' },
    { value: 'faixa_gradil', label: 'FAIXA DE GRADIL' },
    { value: 'faixa', label: 'FAIXA' },
    { value: 'mega_banner', label: 'MEGA BANNER' },
    { value: 'totem', label: 'TOTEM' },
    { value: 'cubos', label: 'CUBOS' },
    { value: 'totem_exposicao', label: 'TOTEM DE EXPOSIÇÃO' },
    { value: 'wobbler', label: 'WOBBLER' },
    { value: 'flyer', label: 'FLYER' },
    { value: 'tabloide', label: 'TABLOIDE' },
    { value: 'adesivo', label: 'ADESIVO' },
    { value: 'lona', label: 'LONA' },
    { value: 'backdrop', label: 'BACKDROP' },
    { value: 'banner', label: 'BANNER' },
    { value: 'convite_a4', label: 'CONVITE A4' },
    { value: 'folder', label: 'FOLDER' },
    { value: 'windbanner', label: 'WINDBANNER' },
    { value: 'estande', label: 'ESTANDE' }
  ],
  ON: [
    { value: 'avatar', label: 'AVATAR' },
    { value: 'banner_site', label: 'BANNER DE SITE - 1903x705' },
    { value: 'google_my_business', label: 'GOOGLE MY BUSINESS - 1024x768' },
    { value: 'assinatura_email', label: 'ASSINATURA DE E-MAIL - 592x199' },
    { value: 'email_marketing', label: 'EMAIL MARKETING' },
    { value: 'trinca', label: 'TRINCA' },
    { value: 'feed', label: 'FEED - 1080x1440' },
    { value: 'carrossel', label: 'CARROSSEL' },
    { value: 'story', label: 'STORY - 1080x1920' },
    { value: 'story_animado', label: 'STORY ANIMADO - 1080x1920' },
    { value: 'tabloide_digital', label: 'TABLOIDE DIGITAL - 1080x1920' },
    { value: 'books', label: 'BOOKS' },
    { value: 'wallpaper', label: 'WALLPAPER' },
    { value: 'painel_led', label: 'PAINEL DE LED' },
    { value: 'totem_estacionamento', label: 'TOTEM ESTACIONAMENTO' }
  ]
};

// Mock de produtos de marketing e publicidade
export const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'Identidade Visual Completa',
    category: 'Branding',
    description: 'Logo, cores, tipografia e aplicações',
    basePrice: 2500,
    unit: 'projeto',
    clientPrices: {
      1: 2500, // Cliente 1
      2: 2800, // Cliente 2
      3: 2200  // Cliente 3
    }
  },
  {
    id: 2,
    name: 'Campanha Digital',
    category: 'Marketing Digital',
    description: 'Gestão de redes sociais por 30 dias',
    basePrice: 1500,
    unit: 'mês',
    clientPrices: {
      1: 1500,
      2: 1800,
      3: 1200
    }
  },
  {
    id: 3,
    name: 'Vídeo Institucional',
    category: 'Audiovisual',
    description: 'Vídeo de 2-3 minutos com roteiro e produção',
    basePrice: 8000,
    unit: 'projeto',
    clientPrices: {
      1: 8000,
      2: 9500,
      3: 7000
    }
  },
  {
    id: 4,
    name: 'Fotografia de Produto',
    category: 'Fotografia',
    description: 'Sessão fotográfica com 20 fotos editadas',
    basePrice: 1200,
    unit: 'sessão',
    clientPrices: {
      1: 1200,
      2: 1400,
      3: 1000
    }
  },
  {
    id: 5,
    name: 'Site Institucional',
    category: 'Web',
    description: 'Site responsivo com até 10 páginas',
    basePrice: 5000,
    unit: 'projeto',
    clientPrices: {
      1: 5000,
      2: 6000,
      3: 4500
    }
  },
  {
    id: 6,
    name: 'Gestão de Google Ads',
    category: 'Marketing Digital',
    description: 'Campanha Google Ads com relatórios mensais',
    basePrice: 2000,
    unit: 'mês',
    clientPrices: {
      1: 2000,
      2: 2500,
      3: 1800
    }
  }
];

// Mock de orçamentos
export const QUOTES_DATA = [
  {
    id: 1,
    clientId: 1,
    clientName: 'TechCorp',
    number: 'ORC-2024-001',
    date: '2024-01-15',
    validUntil: '2024-02-15',
    status: 'Aprovado',
    total: 12500,
    items: [
      {
        productId: 1,
        productName: 'Identidade Visual Completa',
        quantity: 1,
        unitPrice: 2500,
        total: 2500
      },
      {
        productId: 2,
        productName: 'Campanha Digital',
        quantity: 3,
        unitPrice: 1500,
        total: 4500
      },
      {
        productId: 5,
        productName: 'Site Institucional',
        quantity: 1,
        unitPrice: 5000,
        total: 5000
      }
    ],
    notes: 'Orçamento para rebranding completo da empresa',
    createdBy: 'Ana Souza',
    approvedBy: 'João Silva',
    approvedAt: '2024-01-20'
  },
  {
    id: 2,
    clientId: 2,
    clientName: 'FashionStore',
    number: 'ORC-2024-002',
    date: '2024-01-20',
    validUntil: '2024-02-20',
    status: 'Pendente',
    total: 6800,
    items: [
      {
        productId: 4,
        productName: 'Fotografia de Produto',
        quantity: 2,
        unitPrice: 1400,
        total: 2800
      },
      {
        productId: 6,
        productName: 'Gestão de Google Ads',
        quantity: 2,
        unitPrice: 2500,
        total: 5000
      }
    ],
    notes: 'Campanha de lançamento da nova coleção',
    createdBy: 'Ana Souza',
    approvedBy: null,
    approvedAt: null
  }
];

// Mock de contratos
export const CONTRACTS_DATA = [
  {
    id: 1,
    quoteId: 1,
    clientId: 1,
    clientName: 'TechCorp',
    number: 'CON-2024-001',
    type: 'Serviço Único',
    status: 'Assinado',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    total: 12500,
    clauses: [
      {
        id: 1,
        title: 'Objeto do Contrato',
        content: 'Prestação de serviços de identidade visual, campanha digital e desenvolvimento de site institucional.',
        order: 1
      },
      {
        id: 2,
        title: 'Prazo de Execução',
        content: 'O prazo total para execução dos serviços será de 90 dias, contados a partir da assinatura do contrato.',
        order: 2
      },
      {
        id: 3,
        title: 'Forma de Pagamento',
        content: '50% na assinatura do contrato e 50% na entrega final dos serviços.',
        order: 3
      },
      {
        id: 4,
        title: 'Revisões',
        content: 'Estão incluídas 2 revisões por item entregue. Revisões adicionais serão cobradas conforme tabela de preços.',
        order: 4
      }
    ],
    signedBy: 'Maria Santos',
    signedAt: '2024-01-25',
    createdBy: 'Ana Souza'
  }
];

// Templates de cláusulas padrão
export const DEFAULT_CLAUSES = [
  {
    id: 'obj_contrato',
    title: 'Objeto do Contrato',
    content: 'Prestação de serviços de marketing e publicidade conforme especificado no orçamento anexo.',
    category: 'Geral'
  },
  {
    id: 'prazo_execucao',
    title: 'Prazo de Execução',
    content: 'O prazo total para execução dos serviços será de [PRAZO] dias, contados a partir da assinatura do contrato.',
    category: 'Prazo'
  },
  {
    id: 'forma_pagamento',
    title: 'Forma de Pagamento',
    content: '[PERCENTUAL]% na assinatura do contrato e [PERCENTUAL]% na entrega final dos serviços.',
    category: 'Pagamento'
  },
  {
    id: 'revisoes',
    title: 'Revisões',
    content: 'Estão incluídas [NUMERO] revisões por item entregue. Revisões adicionais serão cobradas conforme tabela de preços.',
    category: 'Qualidade'
  },
  {
    id: 'confidencialidade',
    title: 'Confidencialidade',
    content: 'As partes se comprometem a manter sigilo sobre informações confidenciais trocadas durante a execução do contrato.',
    category: 'Legal'
  },
  {
    id: 'rescisao',
    title: 'Rescisão',
    content: 'O contrato poderá ser rescindido por qualquer das partes mediante aviso prévio de 30 dias.',
    category: 'Legal'
  },
  {
    id: 'foro',
    title: 'Foro',
    content: 'As partes elegem o foro da comarca de [CIDADE] para dirimir quaisquer dúvidas ou litígios.',
    category: 'Legal'
  }
]; 