import * as React from 'react';
import '../assets/style.css';
import { IVotoNormativosProps } from './IVotoNormativosProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";

export default class VotoNormativos extends React.Component<IVotoNormativosProps, {}> {
  public render(): React.ReactElement<IVotoNormativosProps> {
    const {
    } = this.props;
    const webUrl = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2]
    sp.setup({ sp: { headers: { Accept: "application/json;odata=verbose", }, baseUrl: webUrl }, });

    CarregarDropdownComite();
    CarregarDropdownAo();

    return (
      <div>
        {/* <h3 style={{textAlign:'center'}}>Voto CAD 123-2023</h3> */}
        <section>
          <div>
            <div className="container my-5 py-5">
              <div className="row d-flex justify-content-center">
                <div className="col-md-12 col-lg-12">
                  <div className="card text-dark">
                    <div className="card-body p-4">
                      <h4 className="mb-0 text-center">Voto</h4>
                      <div className="mt-4 form-outline">
                        <label className="form-label select-label active" style={{ marginLeft: 10, marginTop: -13 }} >Ao</label>
                        <select className="form-control" id="exampleFormControlSelect2" style={{ marginTop: -10 }}></select>
                        <div className="form-notch">
                          <div className="form-notch-leading" style={{ width: "9px" }}></div>
                          <div className="form-notch-middle" style={{ width: "19.6px" }}></div>
                          <div className="form-notch-trailing"></div>
                        </div>
                      </div>
                      <div className="mt-3 form-outline">
                        <input value={"Deliberar sobre a revisão do Normativo de Gerenciamento de Risco de Crédito"} id='txtAssunto' className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={false} />
                        <label className="form-label select-label active">Assunto</label>
                        <div className="form-notch">
                          <div className="form-notch-leading" style={{ width: "9px" }}></div>
                          <div className="form-notch-middle" style={{ width: "49.6px" }}></div>
                          <div className="form-notch-trailing"></div>
                        </div>
                      </div>
                      <div className="mt-3 form-outline">
                        <textarea className='form-control select-input active' id='txtObjetivo' rows={3}></textarea>
                        <label className="form-label select-label active">Objetivo</label>
                        <div className="form-notch">
                          <div className="form-notch-leading" style={{ width: "9px" }}></div>
                          <div className="form-notch-middle" style={{ width: "49.6px" }}></div>
                          <div className="form-notch-trailing"></div>
                        </div>
                      </div>
                      <div className="mt-3 form-outline">
                        <textarea className='form-control select-input active' id='txtJustificativa' rows={3}></textarea>
                        <label className="form-label select-label active">Justificativa</label>
                        <div className="form-notch">
                          <div className="form-notch-leading" style={{ width: "9px" }}></div>
                          <div className="form-notch-middle" style={{ width: "69.6px" }}></div>
                          <div className="form-notch-trailing"></div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="form-outline">
                          <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                          <div className="form-check" style={{ marginLeft: 10, marginTop: -20 }}>
                            <input className="form-check-input" type="radio" name="rbRiscoEnvolvidos" value={"true"}></input>
                            <label className="form-check-label">
                              Sim
                            </label>
                          </div>
                          <div className="form-check" style={{ marginLeft: 10 }}>
                            <input className="form-check-input" type="radio" name="rbRiscoEnvolvidos" value={"false"} checked></input>
                            <label className="form-check-label">
                              Não
                            </label>
                          </div>

                          <label className="form-label select-label active">Riscos Envolvidos</label>
                          <div className="form-notch">
                            <div className="form-notch-leading" style={{ width: "9px" }}></div>
                            <div className="form-notch-middle" style={{ width: "89.6px" }}></div>
                            <div className="form-notch-trailing"></div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="form-outline">
                          <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                          <div className="form-check" style={{ marginLeft: 10, marginTop: -20 }}>
                            <input className="form-check-input" type="radio" name="rbCustosEnvolvidos" value={"true"}></input>
                            <label className="form-check-label">
                              Sim
                            </label>
                          </div>
                          <div className="form-check" style={{ marginLeft: 10 }}>
                            <input className="form-check-input" type="radio" name="rbCustosEnvolvidos" value={"false"} checked></input>
                            <label className="form-check-label">
                              Não
                            </label>
                          </div>

                          <label className="form-label select-label active">Custos Envolvidos</label>
                          <div className="form-notch">
                            <div className="form-notch-leading" style={{ width: "9px" }}></div>
                            <div className="form-notch-middle" style={{ width: "89.6px" }}></div>
                            <div className="form-notch-trailing"></div>
                          </div>
                        </div>
                      </div>

                      <h5 className="mt-5">Governança</h5>
                      <div className='mt-4 row align-items-start'>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbAlinhamentoCentrais" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbAlinhamentoCentrais" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">Alinhamento Centrais e Cooperativas</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "189.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-outline">
                            <textarea className='form-control select-input active' id="txtAlinhamentoCentraisJustificativa" rows={2}></textarea>
                            <label className="form-label select-label active">Comente</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "50.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 row align-items-start'>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbCienciaDiretoria" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbCienciaDiretoria" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">Ciência da Diretoria Executiva do CAS</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "189.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-outline">
                            <textarea className='form-control select-input active' id='txtCienciaDiretoriaJustificativa' rows={2}></textarea>
                            <label className="form-label select-label active">Comente</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "50.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 row align-items-start'>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbCienciaColegio" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbCienciaColegio" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">Ciência do Colégio de Diretores Executivos</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "215.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-outline">
                            <textarea className='form-control select-input active' rows={2} id="txtCienciaColegioJustificativa"></textarea>
                            <label className="form-label select-label active">Comente</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "50.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 row align-items-start'>
                        <div className='col'>
                          <div className="form-outline" >
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbCienciaComite" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbCienciaComite" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>


                            <label className="form-label select-label active">Ciência e/ou encaminhamento de Comitê</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "210.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-outline" style={{ height: 58 }}>
                            {/* <textarea className='form-control select-input active' rows={2} value={"Comitê de Riscos e Compliance da Sicredi Participações"} id="txtCienciaComiteJustificativa"></textarea>
                             */}
                            {/* <div className="form-group"> */}
                            <label className="form-label select-label active" style={{ marginLeft: 12, marginTop: -13 }} >Comitê</label>
                            <select className="form-control" id="exampleFormControlSelect1" style={{ marginTop: -10 }}></select>
                            {/* </div> */}
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "50.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                      </div>


                      <h5 className="mt-5">Registros em Ata</h5>
                      <div className='mt-4 row align-items-start'>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbSicrediParticipacoes" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbSicrediParticipacoes" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">CAD Sicredi Participações</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "129.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbBancoCoopeSicredi" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbBancoCoopeSicredi" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">CAD Banco Cooperativo Sicredi</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "159.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 row align-items-start'>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbConfederacaoSicredi" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbConfederacaoSicredi" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">CAD Confederação Sicredi</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "139.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbSicrediFundos" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbSicrediFundos" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">CAD Sicredi Fundos Garantidores</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "169.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 row align-items-start'>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbConselhoCuradorFuncacao" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbConselhoCuradorFuncacao" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">Conselho Curador da Fundação</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "159.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                        <div className='col'>
                          <div className="form-outline">
                            <input type="checkbox" className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbResgistroLocalCentralCoop" value={"true"}></input>
                              <label className="form-check-label">
                                Sim
                              </label>
                            </div>
                            <div className="form-check form-check-inline" style={{ marginLeft: 10 }}>
                              <input className="form-check-input" type="radio" name="rbResgistroLocalCentralCoop" value={"false"} checked></input>
                              <label className="form-check-label">
                                Não
                              </label>
                            </div>

                            <label className="form-label select-label active">Registro Local Centrais e Cooperativas</label>
                            <div className="form-notch">
                              <div className="form-notch-leading" style={{ width: "9px" }}></div>
                              <div className="form-notch-middle" style={{ width: "199.6px" }}></div>
                              <div className="form-notch-trailing"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='mt-3 row align-items-start'>
                        <div className='col'>
                          <button className='btn btn-success' onClick={Salvar}>Salvar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </section >
      </div >
    );
  }
}

async function Salvar() {

  var _aoVoto = (document.getElementById('txtAo') as HTMLInputElement).value;
  var _assunto = (document.getElementById('txtAssunto') as HTMLInputElement).value;
  var _objetivo = (document.getElementById('txtObjetivo') as HTMLInputElement).value;
  var _justificativa = (document.getElementById('txtJustificativa') as HTMLInputElement).value;

  var _riscosEnvolvidos = (document.querySelector('input[name="rbRiscoEnvolvidos"]:checked') as HTMLInputElement).value;
  var _custosEnvolvidos = (document.querySelector('input[name="rbCustosEnvolvidos"]:checked') as HTMLInputElement).value;

  //Governanca
  var _alinhamentoCentrais = (document.querySelector('input[name="rbAlinhamentoCentrais"]:checked') as HTMLInputElement).value;
  var _alinhamentoCentraisJustificativa = (document.getElementById('txtAlinhamentoCentraisJustificativa') as HTMLInputElement).value;
  var _cienciaDiretoria = (document.querySelector('input[name="rbCienciaDiretoria"]:checked') as HTMLInputElement).value;
  var _cienciaDiretoriaJustificativa = (document.getElementById('txtCienciaDiretoriaJustificativa') as HTMLInputElement).value;
  var _cienciaColegio = (document.querySelector('input[name="rbCienciaColegio"]:checked') as HTMLInputElement).value;
  var _cienciaColegioJustificativa = (document.getElementById('txtCienciaColegioJustificativa') as HTMLInputElement).value;
  var _cienciaComite = (document.querySelector('input[name="rbCienciaComite"]:checked') as HTMLInputElement).value;
  var _comite = (document.getElementById('txtCienciaComiteJustificativa') as HTMLInputElement).value;

  //Registro
  var _sicrediParticipacoes = (document.querySelector('input[name="rbSicrediParticipacoes"]:checked') as HTMLInputElement).value;
  var _bancoCoopSicredi = (document.querySelector('input[name="rbBancoCoopeSicredi"]:checked') as HTMLInputElement).value;
  var _confederacaoSicredi = (document.querySelector('input[name="rbConfederacaoSicredi"]:checked') as HTMLInputElement).value;
  var _sicrediFundos = (document.querySelector('input[name="rbSicrediFundos"]:checked') as HTMLInputElement).value;
  var _conselhoCuradorFundacao = (document.querySelector('input[name="rbConselhoCuradorFuncacao"]:checked') as HTMLInputElement).value;
  var _registroCentralCoop = (document.querySelector('input[name="rbResgistroLocalCentralCoop"]:checked') as HTMLInputElement).value;


  const iar: IItemAddResult = await sp.web.lists.getByTitle("Voto").items.add({
    Title: _aoVoto,
    Assunto: _assunto,
    Objetivos: _objetivo,
    Justificativa: _justificativa,
    RiscosEnvolvidos: _riscosEnvolvidos,
    CustosEnvolvidos: _custosEnvolvidos,
    AlinhamentoCentraiseCooperativas: _alinhamentoCentrais,
    ComentarioAlinhamentoCentrais: _alinhamentoCentraisJustificativa,
    CienciaDiretoriaCAS: _cienciaDiretoria,
    ComentarioCienciaDiretoriaCAS: _cienciaDiretoriaJustificativa,
    CienciaColegioDiretores: _cienciaColegio,
    ComentarioCienciaColegioDiretore: _cienciaColegioJustificativa,
    CienciaEncaminhamentoComite: _cienciaComite,
    Comite: _comite,
    CADSicrediParticipacoes: _sicrediParticipacoes,
    CADBancoCooperativoSicred: _bancoCoopSicredi,
    CADConfederacaoSicredi: _confederacaoSicredi,
    CADSicrediFundos: _sicrediFundos,
    ConselhoCuradorFundacao: _conselhoCuradorFundacao,
    RegistroLocalCentraisCooperativa: _registroCentralCoop,
    NormativoId: 935

  });
  console.log(iar);

}

async function CarregarDropdownComite() {
  sp.web.lists.getByTitle("Comite").items.select("Title").orderBy("Title").get().then(items => {
    // Success callback function
    const selectElement = document.getElementById("exampleFormControlSelect1");
    selectElement.innerHTML = "";


    // Loop through each item and add an option element to the select element
    items.forEach(item => {
      const optionElement = document.createElement("option");
      optionElement.text = item.Title;
      optionElement.value = item.Title;
      selectElement.appendChild(optionElement);

    });
  }).catch(error => {
    // Error callback function
    console.log("Error: " + error);
  });
}

async function CarregarDropdownAo() {
  sp.web.lists.getByTitle("AoVoto").items.select("Title").orderBy("Title").get().then(items => {
    // Success callback function
    const selectElement = document.getElementById("exampleFormControlSelect2");
    selectElement.innerHTML = "";


    // Loop through each item and add an option element to the select element
    items.forEach(item => {
      const optionElement = document.createElement("option");
      optionElement.text = item.Title;
      optionElement.value = item.Title;
      selectElement.appendChild(optionElement);

    });
  }).catch(error => {
    // Error callback function
    console.log("Error: " + error);
  });
}