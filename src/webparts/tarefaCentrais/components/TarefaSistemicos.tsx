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

export interface ICentraisProps {
    Title: string;
    CodigoCentral: string
}

export default function TarefaSitemicos(props: ITarefaSistemicorProps): JSX.Element {
    const [centrais, setCentrais] = useState<ICentraisProps[]>([]);
    

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

        sp.web.lists.getByTitle('Centrais').items.select('*,Title,CodigoCentral')()
            .then((data: ICentraisProps[]) => {
                setCentrais(data)
                console.log(data);
            });

            SelectAll();
    }, []);
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
            <div style={{ marginTop: 30 }}>
                <h6>Selecione uma data para o período de colaboração:</h6>
                <div className="col-5">
                    <input type="date" className="form-control" id="date" />
                </div>
            </div>
            <div style={{ marginTop: 40 }}>
                <div className='col'>
                    <button className={`${customStyle['btn']} ${customStyle['btn-success']}`} style={{ marginRight: '0.8rem' }} onClick={SalvarTarefa}>ENVIAR TAREFA</button>
                </div>
            </div>

        </>
    );
}


function SelectAll(){

    const selectAllCheckBox = document.getElementById("selected-all") as HTMLInputElement;

    selectAllCheckBox.addEventListener('click', function(){
        console.log("entrei aqui");
        const selectItemCheckBox = document.querySelectorAll(".selected-item") as NodeListOf<HTMLInputElement>;      

        for(let i=0; i < selectItemCheckBox.length; i++){
            selectItemCheckBox[i].checked = this.checked;
        }
    });

    const selectItemCheckBox = document.querySelectorAll(".select-item");
    for (let i = 0; i < selectItemCheckBox.length; i++) {
        selectItemCheckBox[i].addEventListener("click", function() {
      if (!this.checked) {
        selectAllCheckBox.checked = false;
      } else {
        const checkedCount = document.querySelectorAll(".select-item:checked").length;
        console.log(checkedCount);
        selectAllCheckBox.checked = checkedCount === selectItemCheckBox.length;
      }
    });
}

}

function SalvarTarefa(){

    // const getSelectedItemsButton = document.getElementById("get-selected-items");
    // getSelectedItemsButton.addEventListener("click", function() {
    const selectedItems = [];
    const selectedCheckboxes = document.querySelectorAll(".selected-item:checked") as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < selectedCheckboxes.length; i++) {
      selectedItems.push(selectedCheckboxes[i].value);
    }
    const selectedItemsString = selectedItems.join(", ");
    alert("Itens selecionados: " + selectedItemsString);
//   });

}
