export interface Video {
  id: string;
  title: string;
  duration: string;
  url: string;
  useBunny?: boolean; // Se true, usa Bunny Stream. Se false, usa servidor local
}

export interface Subnucleo {
  id: string;
  name: string;
  description: string;
  videos: Video[];
}

export interface Nucleo {
  id: string;
  name: string;
  description: string;
  subnucleos: Subnucleo[];
}

export const nucleosData: Nucleo[] = [
  {
    id: "ngg",
    name: "N.G.G - Núcleo de Gestão   Geral",
    description: "Responsável pela gestão estratégica e governança corporativa",
    subnucleos: [
      {
        id: "ngg",
        name: "N.G.G - Núcleo de Gestão   Geral",
        description:"",
        videos: [
          {
            id: "video-9",
            title: "Metodologias de Ensino para Concursos",
            duration: "28:15",
            url: "#"
          },
          {
            id: "video-10",
            title: "Planejamento de Aulas e Cronogramas",
            duration: "19:50",
            url: "#"
          },
          {
            id: "video-11",
            title: "Avaliação de Aprendizagem",
            duration: "22:30",
            url: "#"
          }
        ]
      },
      
    ]
  },
  {
    id: "nge",
    name: "N.G.E - Núcleo de Gestão Estratégica",
    description: "Responsável pela gestão pedagógica e desenvolvimento de conteúdo",
    subnucleos: [
      {
        id: "nge-coord-pedagogica",
        name: "Coordenadoria Pedagógica",
        description: "Desenvolvimento e curadoria de conteúdo educacional",
        videos: [
          {
            id: "video-9",
            title: "Metodologias de Ensino para Concursos",
            duration: "28:15",
            url: "#"
          },
          {
            id: "video-10",
            title: "Planejamento de Aulas e Cronogramas",
            duration: "19:50",
            url: "#"
          },
          {
            id: "video-11",
            title: "Avaliação de Aprendizagem",
            duration: "22:30",
            url: "#"
          }
        ]
      },
      {
        id: "nge-coord-producao",
        name: "Coordenadoria de Produção de Conteúdo",
        description: "Produção de videoaulas e materiais didáticos",
        videos: [
          {
            id: "video-12",
            title: "Técnicas de Gravação de Videoaulas",
            duration: "24:00",
            url: "#"
          },
          {
            id: "video-13",
            title: "Edição de Vídeos Educacionais",
            duration: "32:45",
            url: "#"
          },
          {
            id: "video-14",
            title: "Design de Materiais Didáticos",
            duration: "21:10",
            url: "#"
          },
          {
            id: "video-15",
            title: "Roteirização de Conteúdo",
            duration: "17:35",
            url: "#"
          }
        ]
      },
      {
        id: "nge-coord-professores",
        name: "Coordenadoria de Professores",
        description: "Gestão do corpo docente e capacitação de professores",
        videos: [
          {
            id: "video-16",
            title: "Onboarding de Novos Professores",
            duration: "26:20",
            url: "#"
          },
          {
            id: "video-17",
            title: "Boas Práticas de Ensino Online",
            duration: "23:55",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "nti",
    name: "N.T.I - Núcleo de Tecnologia e Inovação",
    description: "Gestão de infraestrutura tecnológica e desenvolvimento de sistemas",
    subnucleos: [
      {
        id: "nti-dfs",
        name: "Desenvolvedor full-stack",
        description: "Desenvolvimento e manutenção de sistemas e plataformas",
        videos: [
          {
            id: "video-18",
            title: "Arquitetura de Sistemas - Visão Geral",
            duration: "29:40",
            url: "#"
          },
          {
            id: "video-19",
            title: "Git e Versionamento de Código",
            duration: "18:15",
            url: "#"
          },
          {
            id: "video-20",
            title: "Testes Automatizados",
            duration: "25:50",
            url: "#"
          }
        ]
      },
      {
        id: "nti-asu",
        name: "Agente de Suporte e Upload",
        description: "Gestão de servidores, redes e segurança da informação",
        videos: [
          {
            id: "video-21",
            title: "Fundamentos de Redes",
            duration: "22:30",
            url: "#"
          },
          {
            id: "video-22",
            title: "Segurança da Informação - Boas Práticas",
            duration: "27:15",
            url: "#"
          },
          {
            id: "video-23",
            title: "Backup e Recuperação de Dados",
            duration: "19:45",
            url: "#"
          }
        ]
      },
      {
        id: "nti-opi",
        name: "Operador de Inovações",
        description: "Suporte técnico e atendimento aos usuários",
        videos: [
          {
            id: "video-24",
            title: "Atendimento ao Cliente Interno",
            duration: "15:20",
            url: "#"
          },
          {
            id: "video-25",
            title: "Resolução de Problemas Técnicos",
            duration: "21:00",
            url: "#"
          }
        ]
      }
    ]
  },
  
  
  
  {
    id: "nre",
    name: "N.R.E - Núcleo de Relacionamento e Expansão",
    description: "Gestão de marketing digital e comunicação institucional",
    subnucleos: [
      {
        id: "coord-gen-cult",
        name: "Coordenação de Gente e Cultura",
        description: "Estratégias de marketing digital e redes sociais",
        videos: [
          {
            id: "video-26",
            title: "Fundamentos de Marketing Digital",
            duration: "24:35",
            url: "#"
          },
          {
            id: "video-27",
            title: "Gestão de Redes Sociais",
            duration: "20:50",
            url: "#"
          },
          {
            id: "video-28",
            title: "Google Ads e Facebook Ads",
            duration: "31:15",
            url: "#"
          }
        ]
      },
      {
        id: "nmkt-coord-conteudo",
        name: "Coordenadoria de Conteúdo",
        description: "Produção de conteúdo para blog e materiais promocionais",
        videos: [
          {
            id: "video-29",
            title: "Copywriting para Conversão",
            duration: "26:40",
            url: "#"
          },
          {
            id: "video-30",
            title: "SEO - Otimização para Buscadores",
            duration: "28:20",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "nop",
    name: "N.Op - Núcleo Operacional",
    description: "Responsável pela gestão estratégica e governança corporativa",
    subnucleos: [
      {
        id: "ngg",
        name: "N.G.G - Núcleo de Gestão   Geral",
        description:"",
        videos: [
          {
            id: "video-9",
            title: "Metodologias de Ensino para Concursos",
            duration: "28:15",
            url: "#"
          },
          {
            id: "video-10",
            title: "Planejamento de Aulas e Cronogramas",
            duration: "19:50",
            url: "#"
          },
          {
            id: "video-11",
            title: "Avaliação de Aprendizagem",
            duration: "22:30",
            url: "#"
          }
        ]
      },
      
    ]
  },
  {
    id: "npp",
    name: "N.P.P - Núcleo Pédagógico e de Produto",
    description: "Responsável pela gestão estratégica e governança corporativa",
    subnucleos: [
      {
        id: "npp",
        name: "N.G.G - Núcleo de Gestão   Geral",
        description:"",
        videos: [
          {
            id: "video-9",
            title: "Metodologias de Ensino para Concursos",
            duration: "28:15",
            url: "#"
          },
          {
            id: "video-10",
            title: "Planejamento de Aulas e Cronogramas",
            duration: "19:50",
            url: "#"
          },
          {
            id: "video-11",
            title: "Avaliação de Aprendizagem",
            duration: "22:30",
            url: "#"
          }
        ]
      },
      
    ]
  },
];
