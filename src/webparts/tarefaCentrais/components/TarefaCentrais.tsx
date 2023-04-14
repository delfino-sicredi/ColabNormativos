import * as React from 'react';
// import styles from './TarefaCentrais.module.scss';
import { ITarefaCentraisProps } from './ITarefaCentraisProps';
import Header from '../../../components/ColabHeader';
import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import '../../../style/index.css';
import customStyle from '../../../style/colab.module.scss';
import TarefaSistemicos from "../../tarefaCentrais/components/TarefaSistemicos";

export default class TarefaCentrais extends React.Component<ITarefaCentraisProps, {}> {
  public render(): React.ReactElement<ITarefaCentraisProps> {
    const {
    } = this.props;
    const webUrl = window.location.protocol + "//" + window.location.hostname + "/" + window.location.pathname.split('/')[1] + "/" + window.location.pathname.split('/')[2]
    sp.setup({ sp: { headers: { Accept: "application/json;odata=verbose", }, baseUrl: webUrl }, });

    return (
      <>
      <section className={customStyle.colabNormativos}>
        <div className={`${customStyle['bg-white']} ${customStyle['border']} ${customStyle['rounded-5']}`}>
          <div className={customStyle.container} style={{ paddingBottom: '50px' }}>
            <Header idNormativo='9195' isComments={false} />  
            <TarefaSistemicos idNormativo='9195' context={this.props.context1}></TarefaSistemicos>
          </div>
        </div>
      </section>
    </>
    );
  }
}
