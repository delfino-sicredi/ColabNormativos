import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from '../assets/style/ColabGeralNormativos.module.scss';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faReply } from '@fortawesome/free-solid-svg-icons';
import ReadMore from 'read-more-less-react';
import 'read-more-less-react/dist/index.css';
import * as Modal from 'react-modal'
import '../assets/style/form.css';
import '../assets/style/fonts.css';
import '../assets/style/compile.css';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    color: 'black',
  },
};


interface IColabNormativo {
  Aceita: Boolean;
  CentralLookup: {
    Title: String;
  }
  CooperativaLookup: {
    Title: String;
  }
  Colaborador: {
    results: {
      EMail: String;
      Title: String;
    }
  }
  Revisorcas: {
    results: {
      EMail: String;
      Title: String;
    }
  }
  Curtidas: Number;
  NormativoRelacionado: {
    Title: String;
  }
  NormativoRelacionadoId: Number;
  Resposta: String;
  Title: String;
  OData__Comments: String
}

interface INormativos {
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


export default function ColabNormativos(): JSX.Element {
  let subtitle: any;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenDoc, setIsOpenDoc] = React.useState(false);
  const [colab, setColab] = useState<IColabNormativo[]>([]);
  const [normativo, setNormativo] = useState<INormativos[]>([]);

  function openModal() {
    setIsOpen(true);
  }
  function openModalDoc() {
    setIsOpenDoc(true);
  }
  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function getTermValue(id: String, normativo: any) {
    if (!normativo) return null;
    for (var i = 0, l = normativo.TaxCatchAll.results.length; i < l; i++)
      if (normativo.TaxCatchAll.results[i].ID === id)
        return normativo.TaxCatchAll.results[i].Term;
    return null;
  }

  useEffect(() => {
    const webUrl = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2]
    sp.setup({
      sp: {
        headers: {
          Accept: "application/json;odata=verbose",
        },
        baseUrl: webUrl
      },
    });

    sp.web.lists.getByTitle('Contribuicoes').items.expand('NormativoRelacionado,CentralLookup,CooperativaLookup,Colaborador,Revisorcas')
      .select('*,Colaborador/EMail,Colaborador/Title,Revisorcas/Title,Revisorcas/EMail,NormativoRelacionado/Title,CooperativaLookup/Title,CentralLookup/Title')
      .filter("NormativoRelacionado/Id eq '935'")()
      .then((data: IColabNormativo[]) => {
        setColab(data)
        colab;
      });

    sp.web.lists.getByTitle('Normativos').items.expand('TaxCatchAll,Respons_x00e1_vel,Author')
      .select('*,Id,Title,C_x00f3_digo,Abrang_x00ea_ncia/Name,AbrangenciaLocal,Respons_x00e1_vel/Title,Author/Title,Tipo,Etapa,MicroEtapa,TaxCatchAll/ID,TaxCatchAll/Term')
      .filter("Id eq '935'")()
      .then((data: INormativos[]) => {
        setNormativo(data)
        console.log(data[0])
      });

  }, []);

  return (
    <>

      <section>
        <div>
          <div className="container my-5 py-5">
            <div className="row d-flex justify-content-center">
              <div className="col-md-12 col-lg-10">
                <div className="card text-dark">

                  <div className="card-body p-4">
                    <h4 className="mb-0">{normativo[0]?.Title}</h4>
                    <p className="fw-light mb-4 pb-2"><span className="badge bg-info">{normativo[0]?.C_x00f3_digo}</span></p>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={getTermValue(normativo[0]?.Abrang_x00ea_ncia.WssId, normativo[0])} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Abrangência</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "69.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={getTermValue(normativo[0]?.Tipo.WssId, normativo[0])} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Tipo</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "29.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br className={styles.colabGeralNormativos}></br>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={getTermValue(normativo[0]?.Assunto.WssId, normativo[0])} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Assunto</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "49.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={normativo[0]?.Author.Title} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Emissor</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "49.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={normativo[0]?.Respons_x00e1_vel.Title} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Responsável</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "69.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={"Risco Socioambiental"} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Área</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "29.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={normativo[0]?.Data_x0020_de_x0020_Publica_x00e7__x00e3_o} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Data Publicação</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "79.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={"CAD SicrediPar"} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Deliberação</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "69.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                          <div className="select-wrapper">
                            <div className="form-outline">
                              <input value={"Sim"} className="form-control select-input active" type="text" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                              <label className="form-label select-label active">Registro Local</label>
                              <div className="form-notch">
                                <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                <div className="form-notch-middle" style={{ width: "79.6px" }}></div>
                                <div className="form-notch-trailing">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 mb-md-0">
                          <button className='btn btn-outline-info' onClick={openModalDoc}>Visualizar Documento</button>
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <hr className="my-0" />
                    <br></br>
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4 mb-4 mb-md-0">
                          <h4 className="mb-0">Contribuições</h4>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">

                        </div>
                        <div className="col-md-4 mb-4 mb-md-0" style={{ textAlign: "right" }}>
                          <button className='btn btn-outline-success' onClick={openModal}>Adicionar Contribuição</button>
                        </div>
                      </div>
                    </div>

                    <br></br>
                    <div className="d-flex flex-start">
                      <img className="rounded-circle shadow-1-strong me-3"
                        src="/_layouts/15/userphoto.aspx?size=L&username=ronaldo_cruz@sicredi.com.br" alt="avatar" width="60"
                        height="60" />
                      <div>
                        <h6 className="fw-bold mb-1">Ronaldo Cruz</h6>
                        <div className="d-flex align-items-center mb-3">
                          <p className="mb-0">
                            <span className="badge bg-success">Central do Brasil</span>
                          </p>
                        </div>
                        <p className="mb-0">
                          Lorem Ipsum is simply dummy text of the printing and typesetting
                          industry. Lorem Ipsum has been the industry's standard dummy text ever
                          since the 1500s, when an unknown printer took a galley of type and
                          scrambled it.
                        </p>
                        <p>
                          <a href="#!"><FontAwesomeIcon icon={faReply} className='fas fa-reply me-1' />Responder</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-0" />
                  <div className="card-body p-4">
                    <div className="d-flex flex-start">
                      <img className="rounded-circle shadow-1-strong me-3"
                        src="/_layouts/15/userphoto.aspx?size=L&username=kleber_silva@sicredi.com.br" alt="avatar" width="60"
                        height="60" />
                      <div>
                        <h6 className="fw-bold mb-1">Kleber Silva</h6>
                        <div className="d-flex align-items-center mb-3">
                          <p className="mb-0">
                            <span className="badge bg-success">Central do Brasil</span>
                          </p>
                        </div>
                        <p className="mb-0">
                          <ReadMore text={`Contrary to popular belief, Lorem Ipsum is not simply random text. It
                          has roots in a piece of classNameical Latin literature from 45 BC, making it
                          over 2000 years old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of the more obscure
                          Latin words, consectetur, from a Lorem Ipsum passage, and going through
                          the cites. Contrary to popular belief, Lorem Ipsum is not simply random text. It
                          has roots in a piece of classNameical Latin literature from 45 BC, making it
                          over 2000 years old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of the more obscure
                          Latin words, consectetur, from a Lorem Ipsum passage, and going through
                          the cites.`}
                            lines={2} readMoreText="Ver mais" readLessText="Ver Menos"
                          />
                        </p>
                        <p>
                          <button type="button" className="ms-Button ms-Button--commandBar ms-Button--hasMenu btn-like" aria-label="Like Intranet Servico's message" data-is-focusable="false">
                            <span className="ms-Button-flexContainer flexContainer-573" data-automationid="splitbuttonprimary">
                              <i data-icon-name="Like" aria-hidden="true" className="ms-Icon root-99 css-471 ms-Button-icon icon-574">
                                <span className="ms-Button-label label-575" id="id__36">Gostei</span>
                                <svg className="y-fluent-icon fluentUISystemIcon-473 ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.05 2.3c.34-.98 1.63-1.43 2.43-.6.17.17.33.36.44.52.32.48.45 1.12.5 1.73.05.63.02 1.3-.05 1.91-.06.62-.16 1.18-.24 1.59v.05H14a3 3 0 0 1 2.95 3.54l-.69 3.76a4.5 4.5 0 0 1-5.6 3.53l-5.6-1.52a2.5 2.5 0 0 1-1.8-1.92l-.35-1.77c-.28-1.39.78-2.56 1.9-3 .33-.13.62-.3.85-.5 1.7-1.5 2.32-2.72 3.38-4.84.36-.71.72-1.68 1-2.49Zm1.97 5.58v-.04a13.7 13.7 0 0 0 .13-.58c.08-.4.17-.93.23-1.5.06-.58.09-1.18.04-1.73a2.73 2.73 0 0 0-.33-1.25 3.26 3.26 0 0 0-.33-.39c-.2-.2-.63-.16-.76.23-.29.82-.67 1.83-1.05 2.6-1.07 2.14-1.76 3.5-3.62 5.15-.34.3-.74.52-1.13.68-.88.34-1.45 1.14-1.3 1.87l.35 1.77c.11.56.53 1 1.08 1.15l5.6 1.53c1.98.54 4-.73 4.36-2.75l.68-3.76a2 2 0 0 0-1.96-2.36h-1.5a.5.5 0 0 1-.5-.62Z" fill="currentColor"></path></svg></i><span className="ms-Button-textContainer textContainer-563">

                              </span>
                            </span>
                          </button>
                        </p>
                        <p className="mb-1 answer">
                          Contrary to popular belief, Lorem Ipsum is not simply random text. It
                          has roots in a piece of classNameical Latin literature from 45 BC, making it
                          over 2000 years old. Richard McClintock, a Latin professor at
                          Hampden-Sydney College in Virginia, looked up one of the more obscure
                          Latin words, consectetur, from a Lorem Ipsum passage, and going through
                          the cites.
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-0" />

                  <div className="card-body p-4">
                    <div className="d-flex flex-start">
                      <img className="rounded-circle shadow-1-strong me-3"
                        src="/_layouts/15/userphoto.aspx?size=L&username=tamara_duarte@sicredi.com.br" alt="avatar" width="60"
                        height="60" />
                      <div>
                        <h6 className="fw-bold mb-1">Tamara Duarte</h6>
                        <div className="d-flex align-items-center mb-3">
                          <p className="mb-0">
                            <span className="badge bg-success">Central do Brasil</span>
                          </p>
                        </div>
                        <p className="mb-0">
                          There are many variations of passages of Lorem Ipsum available, but the
                          majority have suffered alteration in some form, by injected humour, or
                          randomised words which don't look even slightly believable. If you are
                          going to use a passage of Lorem Ipsum, you need to be sure.<a href="#!" className="link-muted"><FontAwesomeIcon icon={faPencilAlt} className="fas fa-pencil-alt ms-2"></FontAwesomeIcon></a>
                        </p>
                        <p>
                          <button type="button" className="ms-Button ms-Button--commandBar ms-Button--hasMenu btn-like" aria-label="Like Intranet Servico's message" data-is-focusable="false"><span className="ms-Button-flexContainer flexContainer-573" data-automationid="splitbuttonprimary"><i data-icon-name="Like" aria-hidden="true" className="ms-Icon root-99 css-471 ms-Button-icon icon-574"><svg className="y-fluent-icon fluentUISystemIcon-473 ___12fm75w f1w7gpdv fez10in fg4l7m0" fill="currentColor" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.05 2.3c.34-.98 1.63-1.43 2.43-.6.17.17.33.36.44.52.32.48.45 1.12.5 1.73.05.63.02 1.3-.05 1.91-.06.62-.16 1.18-.24 1.59v.05H14a3 3 0 0 1 2.95 3.54l-.69 3.76a4.5 4.5 0 0 1-5.6 3.53l-5.6-1.52a2.5 2.5 0 0 1-1.8-1.92l-.35-1.77c-.28-1.39.78-2.56 1.9-3 .33-.13.62-.3.85-.5 1.7-1.5 2.32-2.72 3.38-4.84.36-.71.72-1.68 1-2.49Zm1.97 5.58v-.04a13.7 13.7 0 0 0 .13-.58c.08-.4.17-.93.23-1.5.06-.58.09-1.18.04-1.73a2.73 2.73 0 0 0-.33-1.25 3.26 3.26 0 0 0-.33-.39c-.2-.2-.63-.16-.76.23-.29.82-.67 1.83-1.05 2.6-1.07 2.14-1.76 3.5-3.62 5.15-.34.3-.74.52-1.13.68-.88.34-1.45 1.14-1.3 1.87l.35 1.77c.11.56.53 1 1.08 1.15l5.6 1.53c1.98.54 4-.73 4.36-2.75l.68-3.76a2 2 0 0 0-1.96-2.36h-1.5a.5.5 0 0 1-.5-.62Z" fill="currentColor"></path></svg></i><span className="ms-Button-textContainer textContainer-563"><span className="ms-Button-label label-575" id="id__36">Gostei</span></span></span></button>
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-0" />
                  <div className="card-body p-4">
                    <div className="d-flex flex-start">
                      <img className="rounded-circle shadow-1-strong me-3"
                        src="/_layouts/15/userphoto.aspx?size=L&username=ronaldo_cruz@sicredi.com.br" alt="avatar" width="60"
                        height="60" />
                      <div>
                        <h6 className="fw-bold mb-1">Ronaldo Cruz</h6>
                        <div className="d-flex align-items-center mb-3">
                          <p className="mb-0">
                            <span className="badge bg-success">Central do Brasil</span>
                          </p>
                        </div>
                        <p className="mb-0">
                          It uses a dictionary of over 200 Latin words, combined with a handful of
                          model sentence structures, to generate Lorem Ipsum which looks
                          reasonable. The generated Lorem Ipsum is therefore always free from
                          repetition, injected humour, or non-characteristic words etc.
                        </p>
                        <p>
                          <a href="#!"><FontAwesomeIcon icon={faReply} className='fas fa-reply me-1' />Responder</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}        >
          <h4 className="mb-0">Colaboração</h4>
          <br></br>
          <form>
            <div className="container">
              <div className="row">
                <div className="col-md-12 mb-4 mb-md-0">
                  <div className="select-wrapper">
                    <div className="form-outline">
                      <textarea name="message" rows={10} cols={30} className="form-control select-input active" role="listbox" aria-multiselectable="false" aria-disabled="false" aria-haspopup="true" aria-expanded="false" readOnly={true} />
                      <label className="form-label select-label active">Comentário</label>
                      <div className="form-notch">
                        <div className="form-notch-leading" style={{ width: "9px" }}></div>
                        <div className="form-notch-middle" style={{ width: "79.6px" }}></div>
                        <div className="form-notch-trailing">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-4 mb-md-0 modal-btn">
                  <button onClick={closeModal} className='btn btn-outline-danger' style={{ marginRight: '10px' }}>Cancelar</button>
                  <button className='btn btn-outline-success'>Salvar</button>
                </div>
              </div>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={modalIsOpenDoc}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}>
            <h1>Close</h1>
            <button onClick={closeModal} className='btn btn-outline-danger' style={{ marginRight: '10px' }}>Cancelar</button>
          <form>
            <iframe src='https://confederacaosicredi.sharepoint.com/sites/normativosinternosdev/_layouts/15/Doc.aspx?sourcedoc={47495552-ad1c-43f0-97bc-b8649cde1367}&action=interactivepreview&force=1&wdAccPdf=1&cc=1678276524762' style={{ position: 'fixed', width: '100%', height: '600px' }} />
          </form>
        </Modal>
        
      </div>
    </>
  );
}
