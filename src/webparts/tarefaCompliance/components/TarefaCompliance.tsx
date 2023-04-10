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
import { ITarefaCompliancerProps } from './ITarefaCompliance.Props';
import customStyle from '../../../style/colab.module.scss';

export interface ICooperativasProps {
  Title: string;
  CodigoCentral: string
}

export default class TarefaCompliance extends React.Component<ITarefaCompliancerProps, {}> {
  public render(): React.ReactElement<ITarefaCompliancerProps> {
    const [cooperativas, setCooperativas] = useState<ICooperativasProps[]>([]);
    
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

      // const queryParameters = new UrlQueryParameterCollection(window.location.href);
      // const idTarefa: number = parseInt(queryParameters.getValue("tarefa"));
      // console.log("Id Tarefa", idTarefa);

      sp.web.lists.getByTitle('Cooperativas').items.select('*,Title,CodigoCentral')()
          .then((data: ICooperativasProps[]) => {
            setCooperativas(data)
              console.log("Coomperativas:",data);
          }); 

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
                      {cooperativas.map((cooperativa, idx) => {
                          return (
                              <>
                                  <tr>
                                      <td><input type="checkbox" className="selected-item form-check-input" value={cooperativa.CodigoCentral}></input></td>
                                      <td>{cooperativa.CodigoCentral}</td>
                                      <td>{cooperativa.Title}</td>
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
                  <input type="date" className="form-control" id="datePariticipacao" />
              </div>
          </div>
          <div style={{ marginTop: 40 }}>
              <div className='col'>
                  <button className={`${customStyle['btn']} ${customStyle['btn-success']}`} style={{ marginRight: '0.8rem' }}>ENVIAR TAREFA</button>
              </div>
          </div>
      </>
  );
  }
}
