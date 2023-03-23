import * as React from 'react';
import { useEffect, useState } from 'react';
import styles from '../assets/style/ColabNormativos.module.scss';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { IColabHeaderProps } from './IColabProps';
import * as Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        height: '600px',
        color: 'black',
        padding: 0,
        overflow: 'hidden',
    },
};

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


export default function ColabHeader(props: IColabHeaderProps): JSX.Element {
    const [modalIsOpenDoc, setIsOpenDoc] = React.useState(false);
    const [modalIsOpenDocCkList, setIsOpenDocCkList] = React.useState(false);
    const [normativo, setNormativo] = useState<INormativos[]>([]);
    function openModalDoc() {
        setIsOpenDoc(true);
    }

    function closeModalDoc() {
        setIsOpenDoc(false);
    }

    function closeModalDocCkList() {
        setIsOpenDocCkList(false);
    }

    function getTermValue(id: String, normativo: any) {
        if (!normativo) return null;
        for (var i = 0, l = normativo.TaxCatchAll.results.length; i < l; i++)
            if (normativo.TaxCatchAll.results[i].ID === id)
                return normativo.TaxCatchAll.results[i].Term;
        return null;
    }

    function formatDate(date: string) {
        const fullDate = new Date(date)
        const day = fullDate.getDate().toString().padStart(2, '0');
        const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
        const year = fullDate.getFullYear();
        return `${day}/${month}/${year}`;
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

        sp.web.lists.getByTitle('Normativos').items.expand('TaxCatchAll,Respons_x00e1_vel,Author')
            .select('*,Id,Title,C_x00f3_digo,Abrang_x00ea_ncia/Name,AbrangenciaLocal,Respons_x00e1_vel/Title,Author/Title,Tipo,Etapa,MicroEtapa,TaxCatchAll/ID,TaxCatchAll/Term')
            .filter(`Id eq '${props.idNormativo}'`)()
            .then((data: INormativos[]) => {
                setNormativo(data)
                console.log(data[0])
            });
    }, []);


    return (
        <>

            <div className="container" style={{ paddingBottom: '0.8rem' }}>
                <div className="row d-flex justify-content-center" style={{ paddingTop: '1rem' }}>
                    <div className="col-md-12">
                        <div className="text-dark">
                            <h4 className="mb-0">{normativo[0]?.Title}</h4>
                            <p className="fw-ligh"><span className="badge bg-info">{normativo[0]?.C_x00f3_digo}</span></p>
                        </div>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input id="abrangencia" value={getTermValue(normativo[0]?.Abrang_x00ea_ncia.WssId, normativo[0])} className="form-control select-input" type="text" readOnly={true} />
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
                    <div className="col-md-6">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={getTermValue(normativo[0]?.Tipo.WssId, normativo[0])} className="form-control select-input active" type="text" readOnly={true} />
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
                <br className={styles.colabNormativos}></br>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6  ">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={getTermValue(normativo[0]?.Assunto.WssId, normativo[0])} className="form-control select-input active" type="text" readOnly={true} />
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
                    <div className="col-md-6  ">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={normativo[0]?.Author.Title} className="form-control select-input active" type="text" readOnly={true} />
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
                <br className={styles.colabNormativos}></br>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6  ">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={normativo[0]?.Respons_x00e1_vel.Title} className="form-control select-input active" type="text" readOnly={true} />
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
                    <div className="col-md-6  ">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={"Risco Socioambiental"} className="form-control select-input active" type="text" readOnly={true} />
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
                <br className={styles.colabNormativos}></br>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6  ">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={formatDate(normativo[0]?.Data_x0020_de_x0020_Publica_x00e7__x00e3_o)} className="form-control select-input active" type="text" readOnly={true} />
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
                    <div className="col-md-6  ">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={"CAD SicrediPar"} className="form-control select-input active" type="text" readOnly={true} />
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
                <br className={styles.colabNormativos}></br>
                <div className="row">
                    <div className="col-md-6">
                        <div className="select-wrapper">
                            <div className="form-outline">
                                <input value={"Sim"} className="form-control select-input active" type="text" readOnly={true} />
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
                    <div className="col-md-6">
                        <button className='btn btn-success' style={{ marginRight: '0.8rem' }} onClick={openModalDoc}>Abrir Documento</button>
                        <a className='btn btn-success' href='https://confederacaosicredi.sharepoint.com/sites/normativosinternosdev/Lists/Contribuicoes/Attachments/1/1666277777249_Checklist_V2_Norma%20.xlsx'>Checklist</a>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpenDoc}
                onRequestClose={closeModalDoc}
                style={customStyles}>
                <div style={{ textAlign: 'right' }}>
                    <button onClick={closeModalDoc} className='btn btn-success' style={{ marginRight: '10px' }}>Fechar X</button>
                </div>

                <form>
                    <iframe src='https://confederacaosicredi.sharepoint.com/sites/normativosinternosdev/_layouts/15/Doc.aspx?sourcedoc={47495552-ad1c-43f0-97bc-b8649cde1367}&action=interactivepreview&force=1&wdAccPdf=1&cc=1678276524762' style={{ position: 'fixed', width: '100%', height: '600px' }} />
                </form>
            </Modal>

            <Modal
                isOpen={modalIsOpenDocCkList}
                onRequestClose={closeModalDocCkList}
                style={customStyles}>
                <button onClick={closeModalDocCkList} className='btn btn-outline-danger' style={{ marginRight: '10px' }}>Fechar X</button>
                <form>
                    <iframe src='https://confederacaosicredi.sharepoint.com/sites/normativosinternosdev/Lists/Contribuicoes/Attachments/1/1666277777249_Checklist_V2_Norma%20.xlsx' style={{ position: 'fixed', width: '100%', height: '600px' }} />
                </form>
            </Modal>
        </>
    );
}
