export interface IColabGeralNormativosProps {
  description: string;
}

export interface IColabHeaderProps {
  idNormativo: string;
  isComments: boolean;
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

export interface IAttach {
  FileRef: string;
  FileLeafRef: string;
  LinkFilename: string;
  ColaboracaoCentralTitle: string;
  ColaboracaoCentralId: string;
  ColaboracaoCooperativaTitle: string;
  ColaboracaoCooperativaId: string;
}

export const List = {
  Central: 'Central',
  Cooperativas: 'Cooperativa',
  ColabCentrais: {
    Title: 'ColaboracaoCentrais',
    Expand: 'Author,NormativoRelacionado,Revisor,Colaboracoes',
    Select: '*,Colaboracoes/Title,Colaboracoes/Id,Created,Author/Title,Author/EMail,Revisor/EMail,Revisor/Title,NormativoRelacionado/Title'
  },

  ColabCoop: {
    Title: 'ColaboracaoCooperativas',
    Expand: 'Author,NormativoRelacionado,Revisor',
    Select: '*,Created,Author/Title,Author/EMail,Revisor/EMail,Revisor/Title,NormativoRelacionado/Title'
  },
  ColacCurtidas: {
    Title: 'CurtidasColaboracao',
    Expand: 'ColaboracaoCooperativa,ColaboracaoCentral',
    Select: '*,Id,ColaboracaoCooperativa/Title,ColaboracaoCooperativa/Id,ColaboracaoCentral/Title,ColaboracaoCentral/Id'
  },
  Normativos: {
    Title: 'Normativos',
    Expand: 'TaxCatchAll,Respons_x00e1_vel,Author',
    Select: '*,Id,Title,C_x00f3_digo,Abrang_x00ea_ncia/Name,AbrangenciaLocal,Respons_x00e1_vel/Title,Author/Title,Tipo,Etapa,MicroEtapa,TaxCatchAll/ID,TaxCatchAll/Term'
  },
  Attach: {
    Title: 'AnexoColaboracao',
    Expand: 'ColaboracaoCentral,ColaboracaoCooperativa',
    Select: '*,FileRef,FileLeafRef,LinkFilename,ColaboracaoCentral/Title,ColaboracaoCentral/Id,ColaboracaoCooperativa/Title,ColaboracaoCooperativa/Id'
  }
}

export const webUrl = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2];