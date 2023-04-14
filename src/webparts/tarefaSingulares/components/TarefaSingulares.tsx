import * as React from 'react';
import customStyle from '../../../style/colab.module.scss';
import { ITarefaSingularesProps } from './ITarefaSingularesProps';
import { sp } from "@pnp/sp/presets/all";
import Header from '../../../components/ColabHeader';
import TarefaCooperativa from "../../tarefaSingulares/components/TarefaCooperativas";
import '../../../style/index.css';

export default class TarefaSingulares extends React.Component<ITarefaSingularesProps, {}> {
  public render(): React.ReactElement<ITarefaSingularesProps> {
    const {
    } = this.props;
    const webUrl = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2]
    sp.setup({ sp: { headers: { Accept: "application/json;odata=verbose", }, baseUrl: webUrl }, });

    return (
      <>
      <section className={customStyle.colabNormativos}>
        <div className={`${customStyle['bg-white']} ${customStyle['border']} ${customStyle['rounded-5']}`}>
          <div className={customStyle.container} style={{ paddingBottom: '50px' }}>
            <Header idNormativo='9195' isComments={false}  /> 
            <TarefaCooperativa idNormativo='9195'></TarefaCooperativa>
          </div>
        </div>
      </section>
    </>
    );
  }
}
