import "@pnp/polyfill-ie11";
import { sp } from '@pnp/sp';
import * as React from "react";
import { IFileUploadProps, IColabCoop } from './IColabProps';
import Toasty from '../components/Toast';
import { useEffect, useState } from "react";
import * as Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { uploadStyles } from '../utils/Functions';
import customStyle from '../style/colab.module.scss';

export default function PnpFileUpload(props: IFileUploadProps): JSX.Element {
    const [modalUploadIsOpen, setUploadIsOpen] = useState(false);
    const [msgSuccess, setMsgSuccess] = useState<string>('');
    const [comments, setComments] = useState<IColabCoop[]>([]);

    function openUploadModal() {
        setUploadIsOpen(true);
    }

    function closeUploadModal() {
        setUploadIsOpen(false);
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

        filesave = filesave.bind(this);

        sp.web.lists.getByTitle('ColaboracaoCooperativas').items.expand('Author,NormativoRelacionado,Revisor')
            .select('*,Created,Author/Title,Author/EMail,Revisor/EMail,Revisor/Title,NormativoRelacionado/Title')
            .filter("NormativoRelacionado/Id eq '3324'")()
            .then((data: IColabCoop[]) => {
                setComments(data)
                console.log(data);
            });

    }, []);

    let filesave = () => {
        let myfile = (document.querySelector("#newfile") as HTMLInputElement).files[0];
        console.log(myfile);
        if (myfile.size <= 10485760) {
            sp.web.getFolderByServerRelativeUrl("/sites/normativosinternosdev/Normativos/").files.add(myfile.name, myfile, true).then(f => {
                console.log("File Uploaded");
                setMsgSuccess("File Uploaded");
                console.log(comments[0].NormativoRelacionado);
                f.file.getItem().then(item => {
                    item.update({
                        Title: "Metadata Updated",
                        Substitui_x0020_ou_x0020_RevogaId: { results: [461] },
                    }).then((myupdate) => {
                        console.log(myupdate);
                        console.log("Metadata Updated");
                    });
                });
            });
        }
        else {
            sp.web.getFolderByServerRelativeUrl("/sites/normativosinternosdev/Normativos/")
                .files.addChunked(myfile.name, myfile)
                .then(({ file }) => file.getItem()).then((item: any) => {
                    console.log("File Uploaded");
                    return item.update({
                        Title: 'Metadata Updated'
                    }).then((myupdate: any) => {
                        console.log(myupdate);
                        console.log("Metadata Updated");
                    });
                }).catch(console.log);
        }
    }

    return (
        <>

            <button className={`${customStyle['btn']} ${customStyle['btn-success']}`} onClick={openUploadModal}>
                <FontAwesomeIcon icon={faPaperclip} className={`${customStyle['me-2']}`} color='white' />
                Anexar Arquivo
            </button>
            {!msgSuccess ?
                <Modal
                    isOpen={modalUploadIsOpen}
                    onRequestClose={closeUploadModal}
                    style={uploadStyles} 
                    portalClassName={customStyle.colabNormativos}>
                    <div className={`${customStyle['container']}`}>
                        <div className={`${customStyle['row']} ${customStyle['p-3']}`}>
                            <div className={`${customStyle['col-md-12']}`}>
                                <h4>Upload File</h4>
                            </div>
                        </div>
                        <div className={`${customStyle['row']}`}>
                            <div className={`${customStyle['col-md-12']}`} style={{ display: 'flex', justifyContent: 'center' }}>
                                <input type="file" name="myFile" id="newfile" className={`${customStyle['form-control']}`} style={{ width: '70%' }}></input>
                            </div>
                        </div>
                        <div className={`${customStyle['row']}`}>
                            <div className={`${customStyle['col-md-12']} ${customStyle['mb-4']} ${customStyle['mb-md-0']} ${customStyle['modal-btn']}`}>
                                <button className={`${customStyle['btn']} ${customStyle['btn-danger']}`} style={{ marginRight: '10px' }} onClick={closeUploadModal}>
                                    Cancelar
                                </button>
                                <button onClick={filesave} className={`${customStyle['btn']} ${customStyle['btn-success']}`}>
                                    Upload File
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
                :
                <Toasty type="success" position='top-right' mensage={msgSuccess} delay={5000} />
            }
        </>
    );
}
