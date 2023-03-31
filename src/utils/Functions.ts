import { SPRest } from "@pnp/sp";

export const answerStyles  = {
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


export function AnswerComment(idComment: number, sp: SPRest) {
    (async () => {
        let item = sp.web.lists.getByTitle("ColaboracaoCooperativas").items.getById(idComment);
        const i = await item.update({
            Resposta: 'Teste Apenas'
        });
        console.log(i);
    })().catch(console.log);

    //this.setState({ showmessageBar: true, message: "Item updated sucessfully" }); 
}


export function GetTermValue(id: String, normativo: any) {
    if (!normativo) return null;
    for (var i = 0, l = normativo.TaxCatchAll.results.length; i < l; i++)
        if (normativo.TaxCatchAll.results[i].ID === id)
            return normativo.TaxCatchAll.results[i].Term;
    return null;
}