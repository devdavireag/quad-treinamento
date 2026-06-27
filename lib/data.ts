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
    name: "N.G.G - Núcleo de Gestão Geral",
    description:
      "Responsável pela visão, decisões estratégicas e liderança global da empresa. Inclui o CEO, o Fundador (mentor estratégico) e o Conselho Interno, que juntos aprovam metas, lideranças e projetos de expansão.",
    subnucleos: [
      {
        id: "ngg-fundador-mentor",
        name: "Fundador e Mentor Estratégico",
        description: "Visão de longo prazo e orientação estratégica da empresa.",
        videos: [
          {
            id: "video-3",
            title: "Visão e Propósito da Quad Concursos",
            duration: "22:10",
            url: "#"
          },
          {
            id: "video-4",
            title: "Mentoria Estratégica para Lideranças",
            duration: "19:35",
            url: "#"
          }
        ]
      },
      {
        id: "ngg-ceo",
        name: "CEO - Executor da Estratégia Geral",
        description: "Execução da estratégia geral e liderança global da empresa.",
        videos: [
          {
            id: "video-5",
            title: "Execução da Estratégia Geral",
            duration: "24:50",
            url: "#"
          },
          {
            id: "video-6",
            title: "Liderança Global e Tomada de Decisão",
            duration: "20:15",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "nge",
    name: "N.G.E - Núcleo de Gestão Estratégica",
    description:
      "Planeja e garante a execução eficiente dos processos administrativos e estratégicos. Reúne coordenações responsáveis por finanças, cultura organizacional, projetos e processos internos.",
    subnucleos: [
      {
        id: "nge-coord-financeiro",
        name: "Coordenação Financeira",
        description: "Gestão financeira e planejamento orçamentário da empresa.",
        videos: [
          {
            id: "video-7",
            title: "Gestão Financeira e Fluxo de Caixa",
            duration: "26:00",
            url: "#"
          },
          {
            id: "video-8",
            title: "Planejamento Orçamentário",
            duration: "18:45",
            url: "#"
          }
        ]
      },
      {
        id: "nge-coord-gente-cultura",
        name: "Coordenação de Gente e Cultura",
        description: "Cultura organizacional, gestão de pessoas e onboarding.",
        videos: [
          {
            id: "video-9",
            title: "Cultura Organizacional na Quad",
            duration: "21:30",
            url: "#"
          },
          {
            id: "video-10",
            title: "Gestão de Pessoas e Onboarding",
            duration: "19:10",
            url: "#"
          }
        ]
      },
      {
        id: "nge-coord-projetos-processos",
        name: "Coordenação de Projetos e Processos",
        description: "Gestão de projetos internos e otimização de processos.",
        videos: [
          {
            id: "video-11",
            title: "Gestão de Projetos Internos",
            duration: "23:15",
            url: "#"
          },
          {
            id: "video-12",
            title: "Mapeamento e Otimização de Processos",
            duration: "20:40",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "npp",
    name: "N.P.P - Núcleo Pedagógico e de Produto",
    description:
      "Foco total na qualidade dos cursos e materiais oferecidos. Coordena professores, cronogramas, simulados, PDFs, cursos online e operadores que garantem a entrega pedagógica de excelência.",
    subnucleos: [
      {
        id: "npp-coord-pedagogica",
        name: "Coordenação Pedagógica",
        description: "Coordena professores e apoio pedagógico.",
        videos: [
          {
            id: "video-13",
            title: "Metodologias de Ensino para Concursos",
            duration: "28:15",
            url: "#"
          },
          {
            id: "video-14",
            title: "Planejamento de Aulas e Cronogramas",
            duration: "19:50",
            url: "#"
          },
          {
            id: "video-15",
            title: "Avaliação de Aprendizagem",
            duration: "22:30",
            url: "#"
          }
        ]
      },
      {
        id: "npp-coord-producao-materiais",
        name: "Coordenação de Produção de Materiais",
        description: "Design pedagógico, simulados, indicadores, revisão de conteúdo e slides.",
        videos: [
          {
            id: "video-16",
            title: "Técnicas de Gravação de Videoaulas",
            duration: "24:00",
            url: "#"
          },
          {
            id: "video-17",
            title: "Edição de Vídeos Educacionais",
            duration: "32:45",
            url: "#"
          },
          {
            id: "video-18",
            title: "Design de Materiais Didáticos",
            duration: "21:10",
            url: "#"
          },
          {
            id: "video-19",
            title: "Roteirização de Conteúdo",
            duration: "17:35",
            url: "#"
          }
        ]
      },
      {
        id: "npp-coord-curso-online",
        name: "Coordenação de Curso Online",
        description: "Edição pedagógica e audiovisual, gestão de plataforma EAD e suporte ao aluno digital.",
        videos: [
          {
            id: "video-20",
            title: "Edição Pedagógica e Audiovisual",
            duration: "25:10",
            url: "#"
          },
          {
            id: "video-21",
            title: "Gestão de Plataforma EAD",
            duration: "22:00",
            url: "#"
          },
          {
            id: "video-22",
            title: "Suporte ao Aluno Digital",
            duration: "18:30",
            url: "#"
          }
        ]
      },
      {
        id: "npp-coord-mentorias",
        name: "Coordenação de Mentorias",
        description: "Auxiliar de mentorias e mentores.",
        videos: [
          {
            id: "video-23",
            title: "Estrutura do Programa de Mentorias",
            duration: "20:00",
            url: "#"
          },
          {
            id: "video-24",
            title: "Boas Práticas para Mentores",
            duration: "17:45",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "nop",
    name: "N.Op - Núcleo Operacional",
    description:
      "Responsável pelo funcionamento operacional, gráfico e estrutural da empresa. Coordena as atividades do Setor Gráfico, da Infraestrutura e da Manutenção, garantindo o suporte necessário às operações da unidade.",
    subnucleos: [
      {
        id: "nop-setor-grafico",
        name: "Setor Gráfico",
        description: "Produção gráfica e identidade visual dos materiais.",
        videos: [
          {
            id: "video-25",
            title: "Produção Gráfica para Materiais Didáticos",
            duration: "19:20",
            url: "#"
          },
          {
            id: "video-26",
            title: "Identidade Visual da Quad Concursos",
            duration: "16:50",
            url: "#"
          }
        ]
      },
      {
        id: "nop-coord-infraestrutura",
        name: "Coordenação de Infraestrutura",
        description: "Gestão da infraestrutura física e operacional.",
        videos: [
          {
            id: "video-27",
            title: "Gestão de Infraestrutura Física",
            duration: "18:10",
            url: "#"
          },
          {
            id: "video-28",
            title: "Logística e Suprimentos",
            duration: "15:35",
            url: "#"
          }
        ]
      },
      {
        id: "nop-coord-manutencao",
        name: "Coordenação de Manutenção",
        description: "Manutenção predial, preventiva e de equipamentos.",
        videos: [
          {
            id: "video-29",
            title: "Manutenção Predial e Preventiva",
            duration: "17:00",
            url: "#"
          },
          {
            id: "video-30",
            title: "Gestão de Equipamentos",
            duration: "14:25",
            url: "#"
          }
        ]
      }
    ]
  },
  {
    id: "nti",
    name: "N.T.I - Núcleo de Tecnologia e Informação",
    description:
      "Garante o suporte tecnológico, automações e soluções digitais da empresa. Gerencia plataformas, site, gravações e sistemas internos, com foco em inovação constante.",
    subnucleos: [
      {
        id: "nti-coord-tecnica",
        name: "Coordenação Técnica",
        description: "Gestão de plataformas, site e sistemas internos.",
        videos: [
          {
            id: "video-31",
            title: "Gestão de Plataformas e Sistemas Internos",
            duration: "23:00",
            url: "#"
          },
          {
            id: "video-32",
            title: "Inovação Tecnológica na Quad",
            duration: "20:30",
            url: "#"
          }
        ]
      },
      {
        id: "nti-programador-fullstack",
        name: "Programador Full-Stack",
        description: "Desenvolvimento e manutenção de sistemas e plataformas.",
        videos: [
          {
            id: "video-33",
            title: "Arquitetura de Sistemas - Visão Geral",
            duration: "29:40",
            url: "#"
          },
          {
            id: "video-34",
            title: "Git e Versionamento de Código",
            duration: "18:15",
            url: "#"
          },
          {
            id: "video-35",
            title: "Testes Automatizados",
            duration: "25:50",
            url: "#"
          }
        ]
      },
      {
        id: "nti-suporte-upload",
        name: "Suporte e Upload",
        description: "Suporte técnico e upload de conteúdos nas plataformas.",
        videos: [
          {
            id: "video-36",
            title: "Fundamentos de Redes",
            duration: "22:30",
            url: "#"
          },
          {
            id: "video-37",
            title: "Segurança da Informação - Boas Práticas",
            duration: "27:15",
            url: "#"
          },
          {
            id: "video-38",
            title: "Backup e Recuperação de Dados",
            duration: "19:45",
            url: "#"
          }
        ]
      },
      {
        id: "nti-operador-solucoes-automacoes",
        name: "Operador de Soluções e Automações",
        description: "Automação de processos e soluções digitais.",
        videos: [
          {
            id: "video-39",
            title: "Atendimento ao Cliente Interno",
            duration: "15:20",
            url: "#"
          },
          {
            id: "video-40",
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
    description:
      "Fortalece a presença da marca, atrai e fideliza alunos. Engloba marketing, vendas e mentorias, com foco em campanhas, prospecção e acompanhamento estratégico de clientes.",
    subnucleos: [
      {
        id: "nre-lider-marketing-vendas",
        name: "Líder de Marketing e Vendas",
        description: "Liderança das estratégias de marketing e vendas.",
        videos: [
          {
            id: "video-41",
            title: "Estratégia de Marketing e Vendas",
            duration: "24:00",
            url: "#"
          },
          {
            id: "video-42",
            title: "Liderança Comercial",
            duration: "18:20",
            url: "#"
          }
        ]
      },
      {
        id: "nre-coord-marketing",
        name: "Coordenação de Marketing",
        description: "Editor de vídeos e social media.",
        videos: [
          {
            id: "video-43",
            title: "Fundamentos de Marketing Digital",
            duration: "24:35",
            url: "#"
          },
          {
            id: "video-44",
            title: "Gestão de Redes Sociais",
            duration: "20:50",
            url: "#"
          },
          {
            id: "video-45",
            title: "Google Ads e Facebook Ads",
            duration: "31:15",
            url: "#"
          }
        ]
      },
      {
        id: "nre-coord-time-comercial",
        name: "Coordenação do Time Comercial",
        description: "C.A.C., vendas, growth, back office e sucesso do cliente.",
        videos: [
          {
            id: "video-46",
            title: "Copywriting para Conversão",
            duration: "26:40",
            url: "#"
          },
          {
            id: "video-47",
            title: "SEO - Otimização para Buscadores",
            duration: "28:20",
            url: "#"
          },
          {
            id: "video-48",
            title: "Prospecção e C.A.C.",
            duration: "19:40",
            url: "#"
          },
          {
            id: "video-49",
            title: "Sucesso do Cliente e Retenção",
            duration: "21:15",
            url: "#"
          }
        ]
      }
    ]
  }
];
