import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:url" content="https://www.promptgpt.tools/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PromptGPT" />
        <meta
          property="og:description"
          content="PromptGPT is a web application created with NextJS, allowing users to make their own customized ChatGPTs with a unique subdomain."
        />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/documents/37600ea8-b573-4cf9-a9d2-c678e32b3c2d.png?token=GJU6NH4vs1DRw-xKavINM_N2QSyy4hywPuVPAN1CVio&height=630&width=1200&expires=33244023848"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="promptgpt.tools" />
        <meta property="twitter:url" content="https://www.promptgpt.tools/" />
        <meta name="twitter:title" content="PromptGPT" />
        <meta
          name="twitter:description"
          content="PromptGPT is a web application created with NextJS, allowing users to make their own customized ChatGPTs with a unique subdomain."
        />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/documents/37600ea8-b573-4cf9-a9d2-c678e32b3c2d.png?token=GJU6NH4vs1DRw-xKavINM_N2QSyy4hywPuVPAN1CVio&height=630&width=1200&expires=33244023848"
        />
      </Head>
      <body>
        <div id="overlays" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
