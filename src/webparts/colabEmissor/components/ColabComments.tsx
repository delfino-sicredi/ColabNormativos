import * as React from 'react';
import { useEffect, useState } from 'react';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import ReadMore from 'read-more-less-react';
import { IColabCommentsProps } from './IColabProps';
import * as Modal from 'react-modal';

interface IComments {
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
    }
    Author: {
        Title: String;
        Email: String;
    }
    NormativoRelacionadoId: String;
    Resposta: String;
    Title: String;
    OData__Comments: String;
    Created: string;
    ID: string;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        color: 'black',
    },
};


export default function ColabNormativos(props: IColabCommentsProps): JSX.Element {
    const [comments, setComments] = useState<IComments[]>([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [idItem, setIdComment] = React.useState(0);
    const [countLike, setCountLike] = React.useState(0);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function formatDate(date: string) {
        const fullDate = new Date(date)
        const day = fullDate.getDate().toString().padStart(2, '0');
        const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
        const year = fullDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function answerComment(idComment: number) {
        (async () => {
            let item = sp.web.lists.getByTitle("Contribuicoes").items.getById(idComment);
            const i = await item.update({
                Resposta: 'Teste Apenas'
            });
            console.log(i);
        })().catch(console.log);

        //this.setState({ showmessageBar: true, message: "Item updated sucessfully" }); 
    }

    function countLikeById() {
        let list = sp.web.lists.getByTitle("Contribuicoes");
        list.items.filter('Id eq 1').select('Curtidas')()
            .then((data) => {
                setCountLike(data.length);
            });
    }

    // function likeComment(idComment: number) {
    //     (async () => {
    //         if (idComment != idItem) {
    //             let list = sp.web.lists.getByTitle("ContribuicoesGostei");
    //             //const items = await list.items.expand('Contribuicao').filter('Contribuicao/Id eq 1').select('*,Contribuicao/Title');
    //             const iar = await list.items.add({
    //                 Title: "Foi",
    //                 ContribuicaoId: idComment//#Primeira Colaboração`
    //             });
    //             setLike(true);
    //             setIdComment(idComment);
    //             countLikeById();
    //             console.log(countLike);
    //             console.log(iar);
    //         }
    //         else {
    //             setLike(false);
    //             setIdComment(0);
    //         }
    //         //this.setState({showmessageBar:true,message:"Item Added Sucessfully",itemID:iar.data.Id});
    //     })().catch(console.log);

    //     //this.setState({ showmessageBar: true, message: "Item updated sucessfully" }); 
    // }

    function managerLikes(idComment: number) {
        (async () => {

            if (idComment != idItem) {
                let item = sp.web.lists.getByTitle("Contribuicoes").items.getById(idComment);
                countLikeById();
                const i = await item.update({
                    Curtidas: countLike + 1
                });

                setLike(true);
                setIdComment(idComment);
                console.log(countLike);
                console.log(i);
            }
            else {
                setLike(false);
                setIdComment(0);
            }
            //this.setState({showmessageBar:true,message:"Item Added Sucessfully",itemID:iar.data.Id});
        })().catch(console.log);

        //this.setState({ showmessageBar: true, message: "Item updated sucessfully" }); 
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

        sp.web.lists.getByTitle('Contribuicoes').items.expand('Author,NormativoRelacionado,CentralLookup,CooperativaLookup,Colaborador,Revisorcas')
            .select('*,Created,Author/Title,Author/EMail,Colaborador/EMail,Revisorcas/EMail,Revisorcas/Title,NormativoRelacionado/Title,CooperativaLookup/Title,CentralLookup/Title')
            .filter("NormativoRelacionado/Id eq '935'")()
            .then((data: IComments[]) => {
                setComments(data)
                console.log(data);
            });
    }, []);
    return (
        <>
            <div className="row border-top" style={{ paddingTop: '1rem' }}>
                <div className="col-md-4">
                    <h4>Contribuições</h4>
                </div>
            </div>

            {comments.map((comment, idx) => {
                return (
                    <div className="row border-bottom" style={{ paddingTop: '0.8rem', paddingBottom: '0.8rem' }}>
                        <div className="d-flex flex-start">
                            <img className="rounded-circle shadow-1-strong me-3"
                                src={`/_layouts/15/userphoto.aspx?size=L&username=${comment.Author.Email}`} alt="avatar" width="60"
                                height="60" />
                            <div>
                                <h6 className="fw-bold">{comment.Author.Title}</h6>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="badge bg-success" style={{ marginRight: '0.8rem' }}>{formatDate(comment.Created)}</span>
                                    <span className="badge bg-success">{comment.CentralLookup.Title}</span>
                                </div>
                                <p>
                                    <ReadMore text={comment.OData__Comments} lines={2} readMoreText="Ver mais" readLessText="Ver Menos" />
                                </p>
                                <p>
                                    <button className={like && comment.ID == idItem.toString() ? "btn btn-liked" : "btn btn-success"} style={{ marginRight: '0.8rem', paddingLeft: '0.125rem' }} onClick={() => managerLikes(1)}>
                                        <span className="badge bg-info ms-2" style={{ marginRight: '0.4rem' }}>{like && comment.ID == idItem.toString() ? comment.Curtidas + 1 : comment.Curtidas}</span>
                                        <FontAwesomeIcon icon={faThumbsUp} className='me-2' color='white' />
                                        Gostei
                                    </button>
                                    {comment.Resposta?.length > 2 ? ''
                                        : (<button onClick={openModal} className="btn btn-success">
                                            <FontAwesomeIcon icon={faReply} className='me-2' color='white' />
                                            Responder
                                        </button>)}
                                </p>
                                {comment.Resposta?.length > 2 ?
                                    (<p className="mb-1 answer">
                                        <div className="d-flex flex-start">
                                            <img className="rounded-circle shadow-1-strong me-3"
                                                src={`/_layouts/15/userphoto.aspx?size=L&username=${comment.Revisorcas.EMail}`} alt="avatar" width="60"
                                                height="60" />
                                            <div>
                                                <h6 className="fw-bold mb-1">{comment.Revisorcas.Title}</h6>
                                                <div className="d-flex align-items-center mb-3">
                                                    <span className="badge bg-success" style={{ marginRight: '10px' }}>{formatDate(comment.Created)}</span>
                                                    <span className="badge bg-success">Emissor</span>
                                                </div>
                                                <p>
                                                    {comment.Resposta}
                                                </p>
                                            </div>
                                        </div>
                                    </p>)
                                    :
                                    (<p></p>)
                                }
                            </div>
                        </div>
                    </div>
                );
            })}

            <Modal
                isOpen={modalIsOpen}
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
                                        <textarea name="message" rows={10} cols={20} className="form-control select-input active" id='answer'/>
                                        <label className="form-label select-label active">Resposta</label>
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
                        <div className="row">
                            <div className="col-md-12 mb-4 mb-md-0 modal-btn">
                                <button onClick={closeModal} className='btn btn-danger' style={{ marginRight: '10px' }}>Cancelar</button>
                                <button className='btn btn-success' onClick={() => answerComment(1)}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
