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
import '../assets/style/index.css';  
import ColabHeader from './ColabHeader'; 
import ColabComments from './ColabComments';     
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
      <section>
        <div className="bg-white border rounded-5">
          <div className="container" style={{ paddingBottom: '50px' }}>
            <ColabHeader idNormativo='935' />  
            <ColabComments idNormativo='935' />
          </div>
        </div>
      </section>
    </>
  );
}
