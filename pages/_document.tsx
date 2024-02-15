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
          content="https://opengraph.b-cdn.net/production/documents/06f4a25d-d317-42bd-ac1e-697bbb875974.png?token=45K9MJBt_k6uWHeN9wKOzpVHP0RHXdL0-M9p_CAlHT8&height=630&width=1200&expires=33244022517"
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
          content="https://opengraph.b-cdn.net/production/documents/06f4a25d-d317-42bd-ac1e-697bbb875974.png?token=45K9MJBt_k6uWHeN9wKOzpVHP0RHXdL0-M9p_CAlHT8&height=630&width=1200&expires=33244022517"
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
