//@flow

import React, { Component, PropTypes } from 'react';
// import ReactDOM from 'react-dom/server';
// import serialize from 'serialize-javascript';
// import Helmet from 'react-helmet';

import CONFIG from '../universalConfig';

const {
  env: { NODE_ENV, CIRCUIT, RELEASE, HOST },
  api: { URBAN_AIRSHIP },
} = CONFIG;

const isDev = CIRCUIT !== 'production';
const port = CIRCUIT === 'production' ? 9081 : 4001;

const domain = NODE_ENV === 'development' ? `http://${HOST}:${port}` : '';

const DangerousHtml = ({ children }: { children?: any }) => (
  <div>
    {children &&
      children.map((__html, key) => {
        // eslint-disable-next-line
        return <div key={key} dangerouslySetInnerHTML={{ __html }} />;
      })}
  </div>
);

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */

const urbanAirshipScriptFct = ({
  appKey,
  token,
  vapidPublicKey,
}: {
  appKey: string,
  token: string,
  vapidPublicKey: string,
}) => {
  return `<script type="text/javascript">
// 86acbd31cd7c09cf30acb66d2fbedc91daa48b86:1498489569.49
!function(n,t,c,e,u){function r(n){try{f=n(u)}catch(n){return h=n,void i(p,n)}i(s,f)}function i(n,t){for(var c=0;c<n.length;c++)d(n[c],t);
}function o(n,t){return n&&(f?d(n,f):s.push(n)),t&&(h?d(t,h):p.push(t)),l}function a(n){return o(!1,n)}function d(t,c){
n.setTimeout(function(){t(c)},0)}var f,h,s=[],p=[],l={then:o,catch:a,_setup:r};n[e]=l;var v=t.createElement("script");
v.src=c,v.async=!0,v.id="_uasdk",v.rel=e,t.head.appendChild(v)}(window,document,'https://web-sdk.urbanairship.com/notify/v1/ua-sdk.min.js',
  'UA', {
    // This  has a default of \`/push-worker.js\`. It should live at the root of
    // your domain. It only needs to be specified if your worker lives at a
    // different path.
    // workerUrl: '/push-worker.js',
    appKey: '${appKey}',
    token: '${token}',
    vapidPublicKey: '${vapidPublicKey}'
  });

</script>`;
};

export default class Html extends Component<*, *> {
  static propTypes = {
    component: PropTypes.node,
    store: PropTypes.object,
  };

  render() {
    // const { component, store } = this.props;
    // const content = component ? ReactDOM.renderToString(component) : '';

    // const head = Helmet.rewind();

    const fbScript = `<script>
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, "script", "facebook-jssdk"));
    </script>`;

    const urbanAirship = urbanAirshipScriptFct(URBAN_AIRSHIP);

    const urbanAirshipRegister = `<script>
                UA.then(function(sdk) {
                   sdk.register()
  sdk.addEventListener('channel', function(ev) {
  console.log(sdk.channel.id)
  console.log(ev.channel === sdk.channel)
})
}).catch(function(err) {
  console.log(err)
})</script>`;

    const fbPixelScript = `<!-- Facebook Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '341239716253974');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=341239716253974&noscript=1"
/></noscript>
<!-- DO NOT MODIFY -->
<!-- End Facebook Pixel Code -->`;

    const GA_ID = CIRCUIT === 'production' ? 'UA-69676566-1' : 'UA-69676566-5';

    const gaScript = `
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', '${GA_ID}');
      ga('require', 'ec');
      ga('set', 'currencyCode', 'EUR');
      ga('send', 'pageview');
    </script>`;

    const zendeskScript = isDev
      ? ''
      : `
    <script>
      if (!(location.pathname === '/order/sofort/notify')) {
        /*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("https://assets.zendesk.com/embeddable_framework/main.js","chefone.zendesk.com");/*]]>*/
      }
    </script>`;

    const iubendaScript =
      '<script async src="//cdn.iubenda.com/iubenda.js"></script>';

    const googleMapsScript = `<script defer type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD29bwgrJl5m5-UThTM87y5IWM1UpD6Lsg&amp;libraries=places">
    </script>`;


    const cookieconsent = `<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
    <script>
    window.addEventListener("load", function(){
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#edeff5",
          "text": "#838391"
        },
        "button": {
          "background": "#ce5100"
        }
      },
      "content": {
        "message": "Mit der Nutzung dieser Website erklären Sie sich damit einverstanden, dass wir Cookies verwenden.",
        "dismiss": "Verstanden",
        "link": "Mehr Informationen",
        "href": "https://chef.one/privacy"
      }
    })});
    </script>`;

    // const rehydrateState = `<script>window.__data=${serialize(
    //   store.getState(),
    // )};</script>`;

    // {head.base.toComponent()}
    // {head.title.toComponent()}
    // {head.meta.toComponent()}
    // {head.link.toComponent()}
    // {head.script.toComponent()}

    return (
      <html lang="en-us">
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {!RELEASE && <meta name="robots" value="noindex,nofollow" />}
          <link rel="icon" href="/static/fav.jpg" sizes="32x32" />
          <link rel="icon" href="/static/fav.jpg" sizes="192x192" />
          <link rel="apple-touch-icon-precomposed" href="/static/fav.jpg" />
          <link rel="stylesheet" href={`${domain}/static/bundle.css`} />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat"
            rel="stylesheet"
            type="text/css"
          />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
          />
          <DangerousHtml>
            {[
              ...(CIRCUIT === 'production' ? [fbPixelScript] : []),
              gaScript,
              googleMapsScript,
            ]}
          </DangerousHtml>
        </head>
        <body>
          {/* <div id="root" dangerouslySetInnerHTML={{ __html: content }} />*/}
          <div id="root" />
          <script src={`/build/vendor.bundle.js`} charSet="UTF-8" />
          <script src={`${domain}/static/main.js`} charSet="UTF-8" />
          <DangerousHtml>
            {[
              fbScript,
              zendeskScript,
              cookieconsent,
              iubendaScript,
              // rehydrateState,
              urbanAirship,
              urbanAirshipRegister,
            ]}
          </DangerousHtml>
        </body>
      </html>
    );
  }
} /* <script src={`${domain}/static/vendor.js`} charSet="UTF-8" /> */
