import { SPRest } from "@pnp/sp";
//import { List } from "semantic-ui-react";
//import { List } from '../components/IColabProps'

//import { IPeopleProps } from '../components/IColabProps';

export const answerStyles = {
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
}

export const docStyles = {
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

export const uploadStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        color: 'black',
        padding: 0,
        overflow: 'hidden',
    },
};


export function FormatDate(date: string) {
    const fullDate = new Date(date)
    const day = fullDate.getDate().toString().padStart(2, '0');
    const month = (fullDate.getMonth() + 1).toString().padStart(2, '0');
    const year = fullDate.getFullYear();
    return `${day}/${month}/${year}`;
}


export async function AnswerComment(idComment: number, sp: SPRest, list: string, answer: string) {
    try {
        debugger
        let item = sp.web.lists.getByTitle(list).items.getById(idComment);
        await item.update({
            Resposta: answer,
            DataResposta: new Date()
        }).then((upItem) => { console.log(upItem) });
    } catch (error) {
        console.log(error);
    }
}

export async function AddComments(sp: SPRest, list: string, central: string | null, coop: string | null, normativoId: number, title: string, comment: string) {
    try {
        await sp.web.lists.getByTitle(list).items.add({
            Title: title,
            Colaboracao: comment,
            NormativoRelacionadoId: normativoId,
            Cooperativa: coop,
            Central: central
        }).then((newItem) => { console.log(newItem) });
    }
    catch (error) {
        console.log(error);
    }
}

export async function GetItems(sp: SPRest, listName: string, expand: string, fields: string, filter: string) {
    try {
        let result = await sp.web.lists.getByTitle(listName).items.expand(expand)
            .select(fields)
            .filter(filter).get();

        return result;
    } catch (error) {
        console.log(error);
    }


}


export function GetTermValue(id: String, normativo: any) {
    if (!normativo) return null;
    for (var i = 0, l = normativo.TaxCatchAll.results.length; i < l; i++)
        if (normativo.TaxCatchAll.results[i].ID === id)
            return normativo.TaxCatchAll.results[i].Term;
    return null;
}

export async function InsertTarefaCentrais(sp: SPRest, Centrais: string, NormativoRelacionadoId: any, PrazoCentrais: string) {
    try {
        await sp.web.lists.getByTitle('GerenciamentoColaboracoes').items.add({
            Centrais: Centrais,
            NormativoRelacionadoId: NormativoRelacionadoId,
            PrazoCentrais: PrazoCentrais
            // Revisor_x0020_Circunstancial: {results: RevisoresObrigatorios}   //[{ Key: RevisoresObrigatorios[0].id}] //   
        });
        window.location.replace("https://sicredihomologacao.sharepoint.com/sites/NormativosInternos/SitePages/Tarefas.aspx");
    }
    catch (error) {
        console.log(error);
    }
}

export function InsertTarefaCooperativas(sp: SPRest, Cooperativas: string, NormativoRelacionadoId: any, PrazoCooperativas: string) {
    (async () => {
        let item = sp.web.lists.getByTitle("GerenciamentoColaboracoes").items.getById(NormativoRelacionadoId);
        const i = await item.update({
            Cooperativas: Cooperativas,
            PrazoCooperativas: PrazoCooperativas
        });
        console.log(i);
        window.location.replace("https://sicredihomologacao.sharepoint.com/sites/NormativosInternos/SitePages/Tarefas.aspx");
    })().catch(console.log);


    //this.setState({ showmessageBar: true, message: "Item updated sucessfully" }); 
}

export function UpdateTarefaCentrais(idTarefa: number, sp: SPRest) {
    (async () => {
        let item = await sp.web.lists.getByTitle('Tarefas de Normativos').items.getById(idTarefa).expand('StatusDaTarefa').get();
        item.StatusDaTarefa = { Label: 'Aprovado', Value: 'Aprovado' };
        await item.update();
        console.log('Item atualizado com sucesso!');

    })().catch(console.log);
}

export function SelectAll() {

    const selectAllCheckBox = document.getElementById("selected-all") as HTMLInputElement;

    selectAllCheckBox.addEventListener('click', function () {
        const selectItemCheckBox = document.querySelectorAll(".selected-item") as NodeListOf<HTMLInputElement>;

        for (let i = 0; i < selectItemCheckBox.length; i++) {
            selectItemCheckBox[i].checked = this.checked;
        }
    });

    const selectItemCheckBox = document.querySelectorAll(".select-item");
    for (let i = 0; i < selectItemCheckBox.length; i++) {
        selectItemCheckBox[i].addEventListener("click", function () {
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

export function getChecked() {
    const listCheckBox = document.querySelectorAll(".selected-item") as NodeListOf<HTMLInputElement>;
    let checked: any = []
    for (let index = 0; index < listCheckBox.length; index++) {
        if (listCheckBox[index].checked)
            checked.push(listCheckBox[index]);
    }
    return checked;
}

export function getCheckBoxes() {
    const listCheckBox = document.getElementsByTagName("input") as HTMLCollectionOf<HTMLInputElement>;
    let checkBox: any = []
    for (let index = 0; index < listCheckBox.length; index++) {
        if (listCheckBox[index].getAttribute("type") == "checkbox" && listCheckBox[index].getAttribute("id") != "selectedAll")
            checkBox.push(listCheckBox[index]);
    }

    return checkBox;
}

export function setSelectAll() {
    const checkBoxes = getCheckBoxes();
    const selectAll = document.getElementById("selectedAll") as HTMLInputElement;
    debugger
    for (let index = 0; index < checkBoxes.length; index++)
        !selectAll.checked ? checkBoxes[index].checked = false : checkBoxes[index].checked = true;
}

