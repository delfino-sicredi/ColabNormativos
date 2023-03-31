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
import { faReply, faThumbsUp, faPaperclip, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import ReadMore from 'read-more-less-react';
import { IColabCommentsProps, IColabCoop } from './IColabProps';
import * as Modal from 'react-modal';
import { answerStyles, FormatDate } from '../utils/Functions';
import Upload from './FileUpload';


export default function ColabNormativos(props: IColabCommentsProps): JSX.Element {
    const [comments, setComments] = useState<IColabCoop[]>([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [modalEdit, setEdit] = React.useState(false);
    const [endColab, setEndColab] = React.useState(false);
    const [like, setLike] = React.useState(false);
    const [idItem, setIdComment] = React.useState(0);
    const [countLike, setCountLike] = React.useState(0);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function openModalEdit() {
        setEdit(true);
    }

    function closeModalEdit() {
        setEdit(false);
    }

    function answerComment(idComment: number) {
        (async () => {
            let item = sp.web.lists.getByTitle("ColaboracaoCooperativas").items.getById(idComment);
            const i = await item.update({
                Resposta: 'Teste Apenas'
            });
            console.log(i);
        })().catch(console.log);

        //this.setState({ showmessageBar: true, message: "Item updated sucessfully" }); 
    }

    function countLikeById() {
        let list = sp.web.lists.getByTitle("ColaboracaoCooperativas");
        list.items.filter('Id eq 1').select('Curtidas')()
            .then((data) => {
                setCountLike(data.length);
            });
    }

    function managerLikes(idComment: number) {
        (async () => {

            if (idComment != idItem) {
                let item = sp.web.lists.getByTitle("ColaboracaoCooperativas").items.getById(idComment);
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
        setEndColab(true);
        sp.web.lists.getByTitle('ColaboracaoCooperativas').items.expand('Author,NormativoRelacionado,Revisor')
            .select('*,Created,Author/Title,Author/EMail,Revisor/EMail,Revisor/Title,NormativoRelacionado/Title')
            .filter("NormativoRelacionado/Id eq '3324'")()
            .then((data: IColabCoop[]) => {
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
                        <div className="col-md-12 d-flex flex-start">
                            <div style={endColab === true ? { display: 'block' } : { display: 'none' }}>
                                <div style={{ paddingTop: '7rem' }}>
                                    <input className="form-check-input" type="checkbox" id="checkboxNoLabel" value="" aria-label="..." />
                                </div>
                            </div>
                            <img className="rounded-circle shadow-1-strong me-3"
                                src={`/_layouts/15/userphoto.aspx?size=L&username=${comment.Author.Email}`} alt="avatar" width="60"
                                height="60" />
                            <div>
                                <h6 className="fw-bold">{comment.Author.Title}</h6>
                                <div className="d-flex align-items-center mb-3">
                                    <span className="badge bg-success" style={{ marginRight: '0.8rem' }}>{FormatDate(comment.Created)}</span>
                                    <span className="badge bg-success">{comment.Central}</span>
                                    <span><FontAwesomeIcon icon={faPaperclip} className='me-2' color='#3FA110' /> Arquivo 1</span>
                                </div>
                                <p>
                                    <ReadMore text={comment.Colaboracao} lines={2} readMoreText="Ver mais" readLessText="Ver Menos" />
                                </p>
                                <p>
                                    <button className={like && comment.ID == idItem.toString() ? "btn btn-liked" : "btn btn-success"} style={{ marginRight: '0.8rem', paddingLeft: '0.125rem' }} onClick={() => managerLikes(1)}>
                                        <span className="badge bg-info ms-2" style={{ marginRight: '0.4rem' }}>{like && comment.ID == idItem.toString() ? comment.Curtidas + 1 : comment.Curtidas}</span>
                                        <FontAwesomeIcon icon={faThumbsUp} className='me-2' color='white' />
                                        Gostei
                                    </button>
                                    {comment.Resposta?.length > 2 ? ''
                                        : (<button onClick={openModal} className="btn btn-success" style={{ marginRight: '0.8rem' }}>
                                            <FontAwesomeIcon icon={faReply} className='me-2' color='white' />
                                            Responder
                                        </button>)}

                                    <Upload idColab='1'></Upload>

                                    <button onClick={openModalEdit} className="btn btn-success" style={{ marginLeft: '0.8rem' }}>
                                        <FontAwesomeIcon icon={faPenToSquare} className='me-2' color='white' />
                                        Editar
                                    </button>
                                </p>
                                {comment.Resposta?.length > 2 ?
                                    (<p className="mb-1 answer">
                                        <div className="d-flex flex-start">
                                            <img className="rounded-circle shadow-1-strong me-3"
                                                src={`/_layouts/15/userphoto.aspx?size=L&username=${comment.Revisor.EMail}`} alt="avatar" width="60"
                                                height="60" />
                                            <div>
                                                <h6 className="fw-bold mb-1">{comment.Revisor.Title}</h6>
                                                <div className="d-flex align-items-center mb-3">
                                                    <span className="badge bg-success" style={{ marginRight: '10px' }}>{FormatDate(comment.Created)}</span>
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
                style={answerStyles} >
                <h4 className="mb-0">Colaboração</h4>
                <br></br>
                <form>
                    <div className="container">
                        <div className="row mb-4">
                            <div className="col-md-12">
                                <div className="select-wrapper">
                                    <div className="form-outline">
                                        <textarea name="answer" rows={10} cols={20} className="form-control select-input active" id='answer' />
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


            <Modal
                isOpen={modalEdit}
                onRequestClose={closeModalEdit}
                style={answerStyles} >
                <h4 className="mb-0">Colaboração</h4>
                <br></br>
                <form>
                    <div className="container">
                    <div className="row mb-4">
                            <div className="col-md-12">
                                <div className="select-wrapper">
                                    <div className="form-outline">
                                        <input type="text" name="title" className="form-control select-input active" id='title' />
                                        <label className="form-label select-label active">Título</label>
                                        <div className="form-notch">
                                            <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                            <div className="form-notch-middle" style={{ width: "39.6px" }}></div>
                                            <div className="form-notch-trailing">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="select-wrapper">
                                    <div className="form-outline">
                                        <textarea name="answer" rows={10} cols={20} className="form-control select-input active" id='answer' />
                                        <label className="form-label select-label active">Colaboração</label>
                                        <div className="form-notch">
                                            <div className="form-notch-leading" style={{ width: "9px" }}></div>
                                            <div className="form-notch-middle" style={{ width: "81.6px" }}></div>
                                            <div className="form-notch-trailing">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 modal-btn">
                                <button onClick={closeModalEdit} className='btn btn-danger' style={{ marginRight: '10px' }}>Cancelar</button>
                                <button className='btn btn-success' >Salvar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>




        </>
    );
}
