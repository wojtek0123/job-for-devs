import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Job for devs</title>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='App to help devs find a job or for employers to find a employees'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='min-h-screen flex items-center justify-center'>
        <p>Initial State</p>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
