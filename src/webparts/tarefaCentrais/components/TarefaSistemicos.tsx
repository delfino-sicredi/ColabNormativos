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
import { ITarefaSistemicorProps } from './ITarefaSistemicos.Props';
import customStyle from '../../../style/colab.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { InsertTarefaCentrais, SelectAll } from '../../../utils/Functions';
import { UrlQueryParameterCollection } from '@microsoft/sp-core-library';
// import Toasty from '../../../components/Toast';

export interface ICentraisProps {
    Title: string;
    CodigoCentral: string
}
export interface IPeopleProps {
    id: string;
}

export default function TarefaSitemicos(props: ITarefaSistemicorProps): JSX.Element {
    const [centrais, setCentrais] = useState<ICentraisProps[]>([]);
    // const [msgSuccess, setMsgSuccess] = useState<string>('');
    //const [revisoresObrigatorios, setObrigatorios] = useState<any[]>([]); 


    let allPeople: any = [];

    const onPeoplePickerChange = async (items: any[]) => {

        let users = [];

        for (let item in items) {

            const revisores = await sp.web.siteUsers.getByEmail(items[item].secondaryText)();

            users.push(revisores.Id);
        }

        console.log(users);

        allPeople = users
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

        const queryParameters = new UrlQueryParameterCollection(window.location.href);
        const idTarefa: number = parseInt(queryParameters.getValue("tarefa"));
        console.log("Id Tarefa", idTarefa);

        SelectAll();

        sp.web.lists.getByTitle('Centrais').items.select('*,Title,CodigoCentral')()
            .then((data: ICentraisProps[]) => {
                setCentrais(data)
                console.log(data);
            });



    }, []);

    const clickHandler = (idTarefa: number) => {
        return (event: React.MouseEvent) => {
            console.log(idTarefa);
            const selectedItems = [];
            const selectedCheckboxes = document.querySelectorAll(".selected-item:checked") as NodeListOf<HTMLInputElement>;
            for (let i = 0; i < selectedCheckboxes.length; i++) {
                selectedItems.push(selectedCheckboxes[i].value);
            }
            const dataParticipacao = (document.getElementById("datePariticipacao") as HTMLInputElement).value;
            const selectedItemsString = selectedItems.join(", ");
            if (selectedItemsString == '' || dataParticipacao == '') {
                // console.log("entrei com valores vazio!")     
                alert("Por favor preencha todos os valores antes de enviar!");
                // setMsgSuccess("Por favor preencha todos os valores antes de enviar!")
            } else {
                InsertTarefaCentrais(sp, selectedItemsString, 3543, dataParticipacao, allPeople);
                //UpdateTarefaCentrais(idTarefa, sp);
            }

            event.preventDefault();
        }
    }
    return (
        <>
            <div className="row border-top" style={{ paddingTop: '1rem' }}>
                <div className="col-md-4">
                    <h4>Participações Etapa Colaborativa</h4>
                </div>
            </div>
            <div style={{ marginTop: 20 }}>
                <table className="table table-group-divide">
                    <thead className="table-light">
                        <tr>
                            <th><input type="checkbox" className="form-check-input" id='selected-all' ></input></th>
                            <th>Código</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centrais.map((central, idx) => {
                            return (
                                <>
                                    <tr>
                                        <td><input type="checkbox" className="selected-item form-check-input" value={central.CodigoCentral}></input></td>
                                        <td>{central.CodigoCentral}</td>
                                        <td>{central.Title}</td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                <h6>Revisores Obrigatórios:</h6>
                <PeoplePicker
                    context={props.context}
                    personSelectionLimit={2}
                    onChange={onPeoplePickerChange}
                    principalTypes={[
                        PrincipalType.User,
                        PrincipalType.SecurityGroup,
                        PrincipalType.DistributionList
                    ]} />
            </div>
            <div>
                <h6>Revisores Circunstanciais:</h6>
                <PeoplePicker
                    context={props.context}
                    personSelectionLimit={2}
                    principalTypes={[
                        PrincipalType.User,
                        PrincipalType.SecurityGroup,
                        PrincipalType.DistributionList
                    ]} />
            </div>
            <div style={{ marginTop: 30 }}>
                <h6>Selecione uma data para o período de colaboração:</h6>
                <div className="col-5">
                    <input type="date" className="form-control" id="datePariticipacao" />
                </div>
            </div>
            <div style={{ marginTop: 40 }}>
                <div className='col'>
                    <button className={`${customStyle['btn']} ${customStyle['btn-success']}`} style={{ marginRight: '0.8rem' }} onClick={clickHandler(allPeople)}>ENVIAR TAREFA</button>
                </div>
            </div>
            {/* <Toasty type="warning" position='top-right' mensage={msgSuccess} delay={5000} /> */}
        </>
    );
}

