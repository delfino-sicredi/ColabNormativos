import * as React from 'react';
import { useEffect, useState } from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { IColabHeaderProps, INormativos, List, webUrl } from './IColabProps';
import * as Modal from 'react-modal';
import * as queryString from 'query-string';
import {
    answerStyles, docStyles, FormatDate, GetTermValue, GetItems,
    AddComments
} from '../utils/Functions';
import { Counter } from './CountDown';
import customStyle from '../style/colab.module.scss';
import '../style/index.css';


export default function ColabHeader(props: IColabHeaderProps): JSX.Element {
    const [modalIsOpenDoc, setIsOpenDoc] = React.useState(false);
    const [modalIsOpenDocCkList, setIsOpenDocCkList] = React.useState(false);
    const [normativo, setNormativo] = useState<INormativos[]>([]);
    //const [groups, setGroups] = useState[]>([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const valueProps = queryString.parse(location.search);

    function openModalDoc() {
        setIsOpenDoc(true);
    }

    function closeModalDoc() {
        setIsOpenDoc(false);
    }

    function closeModalDocCkList() {
        setIsOpenDocCkList(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function saveCommet() {
        debugger
        const title = (document.getElementById('title') as HTMLInputElement).value;
        const comment = (document.getElementById('comment') as HTMLInputElement).value;
        AddComments(sp, List.ColabCoop.Title, valueProps.CodigoCentral, valueProps.CodigoCentral, Number(valueProps.NormativoId), title, comment)
    }

    useEffect(() => {
        sp.setup({
            sp: {
                headers: {
                    Accept: "application/json;odata=verbose",
                },
                baseUrl: webUrl
            },
        });


        GetItems(sp, List.Normativos.Title, List.Normativos.Expand, List.Normativos.Select, `Id eq '${props.idNormativo}'`)
            .then((data: INormativos[]) => {
                setNormativo(data);
                console.log(data);
            });

        console.log('values', valueProps);

    }, []);


    return (
        <>
            <div className={`${customStyle.container} ${customStyle.colabNormativos}`} style={{ paddingBottom: '0.8rem' }}>
                <div className={`${customStyle['row']} ${customStyle['d-flex']} ${customStyle['justify-content-center']}`} style={{ paddingTop: '1rem' }}>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['text-dark']}>
                            <h4 className={customStyle['mb-0']}>{normativo[0]?.Title}</h4>
                            <p className={customStyle['fw-light']}><span className={`${customStyle['badge']} ${customStyle['bg-info']}`}>{normativo[0]?.C_x00f3_digo}</span></p>
                        </div>
                    </div>
                    <div className={`${customStyle['col-md-6']} ${customStyle['d-flex']} ${customStyle['justify-content-end']}`}>
                        {props.isComments ? <Counter></Counter> : ''}
                    </div>
                </div>
                <div className={`${customStyle['row']} ${customStyle['d-flex']} ${customStyle['justify-content-center']}`}>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input id="abrangencia" value={GetTermValue(normativo[0]?.Abrang_x00ea_ncia.WssId, normativo[0])} className={`${customStyle['form-control']} ${customStyle['select-input']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Abrangência</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "69.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={GetTermValue(normativo[0]?.Tipo.WssId, normativo[0])} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Tipo</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "29.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className={`${customStyle['row']} ${customStyle['d-flex']} ${customStyle['justify-content-center']}`}>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={GetTermValue(normativo[0]?.Assunto.WssId, normativo[0])} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Assunto</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "49.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={normativo[0]?.Author.Title} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Emissor</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "49.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className={`${customStyle['row']} ${customStyle['d-flex']} ${customStyle['justify-content-center']}`}>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={normativo[0]?.Respons_x00e1_vel.Title} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Responsável</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "69.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={"Risco Socioambiental"} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Área</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "29.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className={`${customStyle['row']} ${customStyle['d-flex']} ${customStyle['justify-content-center']}`}>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={FormatDate(normativo[0]?.Data_x0020_de_x0020_Publica_x00e7__x00e3_o)} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Data Publicação</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "79.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={"CAD SicrediPar"} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Deliberação</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "69.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className={customStyle.row}>
                    <div className={customStyle['col-md-6']}>
                        <div className={customStyle['select-wrapper']}>
                            <div className={customStyle['form-outline']}>
                                <input value={"Sim"} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" readOnly={true} />
                                <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Registro Local</label>
                                <div className={customStyle['form-notch']}>
                                    <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                    <div className={customStyle['form-notch-middle']} style={{ width: "79.6px" }}></div>
                                    <div className={customStyle['form-notch-trailing']}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyle['col-md-6']}>
                        <button className={`${customStyle['btn']} ${customStyle['btn-success']}`} style={{ marginRight: '0.8rem' }} onClick={openModalDoc}>Abrir Documento</button>
                        <a className={`${customStyle['btn']} ${customStyle['btn-success']}`} style={{ marginRight: '0.8rem' }} href='https://confederacaosicredi.sharepoint.com/sites/normativosinternosdev/Lists/Contribuicoes/Attachments/1/1666277777249_Checklist_V2_Norma%20.xlsx'>Checklist</a>
                        {props.isComments ? <button className={`${customStyle['btn']} ${customStyle['btn-success']}`} onClick={openModal}>Adicionar Colaboração</button> : ''}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpenDoc}
                onRequestClose={closeModalDoc}
                style={docStyles}
                portalClassName={customStyle.colabNormativos}>
                <div style={{ textAlign: 'right' }}>
                    <button onClick={closeModalDoc} className={`${customStyle['btn']} ${customStyle['btn-success']}`} style={{ marginRight: '10px' }}>Fechar X</button>
                </div>

                <form>
                    <iframe src='https://confederacaosicredi.sharepoint.com/sites/normativosinternosdev/_layouts/15/Doc.aspx?sourcedoc={47495552-ad1c-43f0-97bc-b8649cde1367}&action=interactivepreview&force=1&wdAccPdf=1&cc=1678276524762' style={{ position: 'fixed', width: '100%', height: '600px' }} />
                </form>
            </Modal>

            <Modal
                isOpen={modalIsOpenDocCkList}
                onRequestClose={closeModalDocCkList}
                style={answerStyles}
                portalClassName={customStyle.colabNormativos}>
                <button onClick={closeModalDocCkList} className='btn btn-outline-danger' style={{ marginRight: '10px' }}>Fechar X</button>
                <form>
                    <iframe src='https://confederacaosicredi.sharepoint.com/sites/normativosinternosdev/Lists/Contribuicoes/Attachments/1/1666277777249_Checklist_V2_Norma%20.xlsx' style={{ position: 'fixed', width: '100%', height: '600px' }} />
                </form>
            </Modal>


            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={answerStyles}
                portalClassName={customStyle.colabNormativos} >

                <div className="container">
                    <h4 className={customStyle['mb-0']}>Colaboração</h4>
                    <br></br>
                    <div className={`${customStyle.row} ${customStyle['mb-4']}`}>
                        <div className={customStyle['col-md-12']}>
                            <div className={customStyle['select-wrapper']}>
                                <div className={customStyle['form-outline']}>
                                    <input className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} type="text" id="title" />
                                    <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Título</label>
                                    <div className={customStyle['form-notch']}>
                                        <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                        <div className={customStyle['form-notch-middle']} style={{ width: "39.6px" }}></div>
                                        <div className={customStyle['form-notch-trailing']}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyle.row}>
                        <div className={customStyle['col-md-12']}>
                            <div className={customStyle['select-wrapper']}>
                                <div className={customStyle['form-outline']}>
                                    <textarea name="comment" rows={10} cols={20} className={`${customStyle['form-control']} ${customStyle['select-input']} ${customStyle['active']}`} id="comment" />
                                    <label className={`${customStyle['form-label']} ${customStyle['select-label']} ${customStyle['active']}`}>Colaboração</label>
                                    <div className={customStyle['form-notch']}>
                                        <div className={customStyle['form-notch-leading']} style={{ width: "9px" }}></div>
                                        <div className={customStyle['form-notch-middle']} style={{ width: "81.6px" }}></div>
                                        <div className={customStyle['form-notch-trailing']}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={customStyle.row}>
                        <div className={`${customStyle['col-md-12']} ${customStyle['modal-btn']}`}>
                            <button onClick={closeModal} className={`${customStyle.btn} ${customStyle['btn-danger']}`} style={{ marginRight: '10px' }}>Cancelar</button>
                            <button className={`${customStyle['btn']} ${customStyle['btn-success']}`} onClick={saveCommet}>Salvar</button>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    );
}
