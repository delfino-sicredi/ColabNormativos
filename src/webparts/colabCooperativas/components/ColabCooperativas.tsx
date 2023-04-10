import * as React from 'react';
import { useEffect } from 'react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/site-users/web";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/attachments";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import customStyle from '../../../style/colab.module.scss'
import ColabHeader from '../../../components/ColabHeader'; 
import ColabComments from '../../../components/ColabComments';  

export default function colabEmissor(): JSX.Element {
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
  }, []);
  return (
    <>
      <section className={customStyle.colabNormativos}>
        <div className={`${customStyle['bg-white']} ${customStyle['border']} ${customStyle['rounded-5']}`}>
          <div className={customStyle.container} style={{ paddingBottom: '50px' }}>
            <ColabHeader idNormativo='3543' />  
            <ColabComments idNormativo='3543' />
          </div>
        </div>
      </section>
    </>
  );
}
