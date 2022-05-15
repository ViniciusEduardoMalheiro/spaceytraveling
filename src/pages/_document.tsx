import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
   render() {
     return (
       <Html lang="pt-BR">
          <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;800&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" /> 
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
       </Html>
     )
   }
}