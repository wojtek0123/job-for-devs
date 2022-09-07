import { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';

const FourZeroFour: NextPage = () => {
  return (
    <>
      <Head>
        <title>Job for devs</title>
        <meta charSet='UTF-8' />
        <meta
          name='description'
          content='App to help devs find a job or for employers to find a employees'
        />
        <link rel='icon' href='/icons/looking-for-job.svg' />
      </Head>
      <div className='w-screen h-screen bg-white'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center selection:bg-green-500 selection:text-white w-full px-5'>
          <Link href='/'>
            <a className='bg-green-500 text-white rounded-lg py-3 px-6 hover:transition-colors hover:bg-green-600 duration-300'>
              Main page
            </a>
          </Link>
          <div className='flex flex-col mt-10 items-center'>
            <h1 className='text-3xl'>404 Error</h1>
            <h2 className='text-2xl'>This page could not be found</h2>
            <h1 className='text-3xl mt-5'>Błąd 404</h1>
            <h2 className='text-2xl'>Ta strona nie została znaleziona</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default FourZeroFour;
