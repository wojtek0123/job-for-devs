import { Html, Main, NextScript, Head } from 'next/document';
import { ReactElement } from 'react';

export default function Document(): ReactElement {
  return (
    <Html lang='pl'>
      <Head>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='App to help devs find a job or for employers to find a employees'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1'
        />
        <link rel='icon' href='/code.svg' />
      </Head>
      <body className='overflow-x-hidden scrollbar-thumb-green-500 scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-rounded-lg'>
        <Main />
        <NextScript />
        <div id='modal-root'></div>
      </body>
    </Html>
  );
}
