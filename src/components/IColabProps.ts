export interface IColabGeralNormativosProps {
  description: string;
}

export interface IColabHeaderProps {
  idNormativo: string;
}

export interface IColabCommentsProps {
  idNormativo: string;
}

export interface IFileUploadProps {
  idColab: string
}

export interface IPeopleProps {
  id: string;
}

export interface IComments {
  Aceita: String;
  CentralLookup: {
    Title: String;
  }
  CooperativaLookup: {
    Title: String;
  }
  Colaborador: {
    EMail: String;
  }
  Revisorcas: {
    EMail: String;
    Title: String;
  }
  Curtidas: string;
  NormativoRelacionado: {
    Title: String;
    __metadata: {
      id: string;
      type: string;
    }
  }
  Author: {
    Title: String;
    Email: String;
  }
  NormativoRelacionadoId: number;
  Resposta: String;
  Title: String;
  OData__Comments: String;
  Created: string;
  ID: string;
}

export interface INormativos {
  C_x00f3_digo: string;
  Vers_x00e3_o: string;
  Title: String;
  Tipo: {
    WssId: String;
  }
  Abrang_x00ea_ncia: {
    WssId: String;
  }
  Assunto: {
    WssId: String;
  }
  Author: {
    Title: string;
  }
  Respons_x00e1_vel: {
    Title: string;
  }
  Data_x0020_de_x0020_Publica_x00e7__x00e3_o: string;
}

export interface IAttach {
  idColab: string;
}

export interface IColabCoop {
  Aceita: String;
  Central: String;
  Cooperativa: String;
  Revisor: {
    EMail: String;
    Title: String;
  }
  Curtidas: string;
  NormativoRelacionado: {
    Title: String;
    __metadata: {
      id: string;
      type: string;
    }
  }
  Author: {
    Title: String;
    Email: String;
  }
  NormativoRelacionadoId: number;
  Resposta: String;
  Title: String;
  Created: string;
  ID: string;
  Colaboracao: string;
}

export interface IColabCentral {
  Aceita: String;
  Central: String;
  Cooperativa: String;
  Revisor: {
    EMail: String;
    Title: String;
  }
  Curtidas: string;
  NormativoRelacionado: {
    Title: String;
    __metadata: {
      id: string;
      type: string;
    }
  }
  Author: {
    Title: String;
    Email: String;
  }
  NormativoRelacionadoId: number;
  Resposta: String;
  Title: String;
  Created: string;
  ID: string;
  Colaboracoes: {
    results: {
      Id: string;
      Title: string;
    }
  }
}