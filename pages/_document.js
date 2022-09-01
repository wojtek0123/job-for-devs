// eslint-disable-next-line no-unused-vars
import { Html, Main, NextScript, Head } from 'next/document';

export default function Document() {
  return (
    <Html lang='pl'>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id='modal-root'></div>
      </body>
    </Html>
  );
}
