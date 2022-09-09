// eslint-disable-next-line no-unused-vars
import { Html, Main, NextScript, Head } from 'next/document';

export default function Document() {
  return (
    <Html lang='pl'>
      <Head>
        <title>Job for devs</title>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='App to help devs find a job or for employers to find a employees'
        />
        <link rel='icon' href='/code.svg' />
      </Head>
      <body className='overflow-x-hidden'>
        <Main />
        <NextScript />
        <div id='modal-root'></div>
      </body>
    </Html>
  );
}
