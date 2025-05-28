
export const usuarios =
  [
    {
      "id": 4,
      "nome": "Ana Costa",
      "email": "email@email.com",
      "nivel_acesso": 2,
      "id_contrato_trabalho": 4,
      "inicio_vigencia": "2025-04-01T00:00:00.000Z",
      "fim_vigencia": "2026-04-01T00:00:00.000Z",
      "status": true
    },
    {
      "id": 8,
      "nome": "Ana Costa",
      "email": "email@email.com",
      "nivel_acesso": 2,
      "id_contrato_trabalho": 4,
      "inicio_vigencia": "2025-04-01T00:00:00.000Z",
      "fim_vigencia": "2026-04-01T00:00:00.000Z",
      "status": true
    },
    {
      "id": 5,
      "nome": "Pedro Silva",
      "email": "email@email.com",
      "nivel_acesso": 1,
      "id_contrato_trabalho": 1,
      "inicio_vigencia": "2025-01-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 1,
      "nome": "Marcos Silva",
      "email": "email@email.com",
      "nivel_acesso": 1,
      "id_contrato_trabalho": 1,
      "inicio_vigencia": "2025-01-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 2,
      "nome": "Maria Pereira",
      "email": "email@email.com",
      "nivel_acesso": 2,
      "id_contrato_trabalho": 2,
      "inicio_vigencia": "2025-02-01T00:00:00.000Z",
      "fim_vigencia": "2026-02-01T00:00:00.000Z",
      "status": true
    },
    {
      "id": 6,
      "nome": "Fatima Maria Santos",
      "email": "email@email.com",
      "nivel_acesso": 2,
      "id_contrato_trabalho": 2,
      "inicio_vigencia": "2025-02-01T00:00:00.000Z",
      "fim_vigencia": "2026-02-01T00:00:00.000Z",
      "status": true
    },
    {
      "id": 7,
      "nome": "Barbara Almeida",
      "email": "email@email.com",
      "nivel_acesso": 3,
      "id_contrato_trabalho": 3,
      "inicio_vigencia": "2025-03-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 3,
      "nome": "Rodrigo Lopes",
      "email": "email@email.com",
      "nivel_acesso": 3,
      "id_contrato_trabalho": 3,
      "inicio_vigencia": "2025-03-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    }
  ]

export const tecnicos =
  [
    {
      "id": 1,
      "id_usuario": 1,
      "id_categoria": 1,
      "know_how": 1,
      "inicio_vigencia": "2025-01-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 5,
      "id_usuario": 3,
      "id_categoria": 2,
      "know_how": 1,
      "inicio_vigencia": "2025-01-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 6,
      "id_usuario": 7,
      "id_categoria": 2,
      "know_how": 1.5,
      "inicio_vigencia": "2025-02-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 2,
      "id_usuario": 2,
      "id_categoria": 2,
      "know_how": 1.5,
      "inicio_vigencia": "2025-02-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 3,
      "id_usuario": 6,
      "id_categoria": 3,
      "know_how": 0.75,
      "inicio_vigencia": "2025-03-01T00:00:00.000Z",
      "fim_vigencia": "2026-03-01T00:00:00.000Z",
      "status": true
    },
    {
      "id": 7,
      "id_usuario": 3,
      "id_categoria": 3,
      "know_how": 0.75,
      "inicio_vigencia": "2025-03-01T00:00:00.000Z",
      "fim_vigencia": "2026-03-01T00:00:00.000Z",
      "status": true
    },
    {
      "id": 4,
      "id_usuario": 4,
      "id_categoria": 4,
      "know_how": 0.5,
      "inicio_vigencia": "2025-04-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    },
    {
      "id": 8,
      "id_usuario": 5,
      "id_categoria": 4,
      "know_how": 0.5,
      "inicio_vigencia": "2025-04-01T00:00:00.000Z",
      "fim_vigencia": null,
      "status": true
    }
  ]

export const alocacao =
  [
    {
      "id": 8,
      "competencia": "2025-05-28T14:35:22.123Z",
      "id_tecnico": 1,
      "id_contrato": 1,
      "id_item_projeto_categoria": 22,
      "qtd_hrs_alocadas": 20,
      "qtd_hrs_comerciais": 15,
      "data_exclusao": null
    },
    {
      "id": 9,
      "competencia": "2025-05-28T14:35:22.123Z",
      "id_tecnico": 2,
      "id_contrato": 2,
      "id_item_projeto_categoria": 22,
      "qtd_hrs_alocadas": 30,
      "qtd_hrs_comerciais": 25,
      "data_exclusao": null
    },
    {
      "id": 10,
      "competencia": "2025-05-28T14:35:22.123Z",
      "id_tecnico": 3,
      "id_contrato": 3,
      "id_item_projeto_categoria": 23,
      "qtd_hrs_alocadas": 40,
      "qtd_hrs_comerciais": 35,
      "data_exclusao": null
    },
    {
      "id": 11,
      "competencia": "2025-05-28T14:35:22.123Z",
      "id_tecnico": 4,
      "id_contrato": 4,
      "id_item_projeto_categoria": 24,
      "qtd_hrs_alocadas": 25,
      "qtd_hrs_comerciais": 20,
      "data_exclusao": null
    }
]

export const categorias =
  [{
    "id": 1,
    "descricao": "Desenvolvimento",
    "inicio_vigencia": "2025-01-01T00:00:00.000Z",
    "fim_vigencia": null
  },
  {
    "id": 4,
    "descricao": "Desenvolvimento",
    "inicio_vigencia": "2025-01-01T00:00:00.000Z",
    "fim_vigencia": null
  },
  {
    "id": 2,
    "descricao": "Infraestrutura",
    "inicio_vigencia": "2025-01-01T00:00:00.000Z",
    "fim_vigencia": null
  },
  {
    "id": 5,
    "descricao": "Infraestrutura",
    "inicio_vigencia": "2025-01-01T00:00:00.000Z",
    "fim_vigencia": null
  },
  {
    "id": 3,
    "descricao": "Suporte",
    "inicio_vigencia": "2025-01-01T00:00:00.000Z",
    "fim_vigencia": null
  },
  {
    "id": 6,
    "descricao": "Suporte",
    "inicio_vigencia": "2025-01-01T00:00:00.000Z",
    "fim_vigencia": null
  }
]

export const contratos = [
  {
    "id": 1,
    "carga_horaria": 40,
    "id_categoria": 1,
    "id_cliente": 1,
    "presencial": false,
    "id_prioridade": 1,
    "id_atendimento": 2,
    "id_tipo_contrato": 1,
    "data_inicio": "2025-01-01T00:00:00.000Z",
    "data_fim": null
  },
  {
    "id": 2,
    "carga_horaria": 30,
    "id_categoria": 2,
    "id_cliente": 2,
    "presencial": true,
    "id_prioridade": 2,
    "id_atendimento": 1,
    "id_tipo_contrato": 2,
    "data_inicio": "2025-02-01T00:00:00.000Z",
    "data_fim": "2026-02-01T00:00:00.000Z"
  },
  {
    "id": 3,
    "carga_horaria": 20,
    "id_categoria": 3,
    "id_cliente": 3,
    "presencial": false,
    "id_prioridade": 3,
    "id_atendimento": 3,
    "id_tipo_contrato": 3,
    "data_inicio": "2025-03-01T00:00:00.000Z",
    "data_fim": null
  },
  {
    "id": 4,
    "carga_horaria": 35,
    "id_categoria": 4,
    "id_cliente": 4,
    "presencial": true,
    "id_prioridade": 2,
    "id_atendimento": 2,
    "id_tipo_contrato": 1,
    "data_inicio": "2025-04-01T00:00:00.000Z",
    "data_fim": null
  }
]