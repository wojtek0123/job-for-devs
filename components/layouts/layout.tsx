import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { data: session } = useSession();

  const singOutHandler = async (): Promise<any> => {
    await signOut();
  };

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

      <header className='bg-slate-800 py-5 px-2 flex items-center justify-center w-full text-white selection:bg-green-500 selection:text-white'>
        <div className='max-w-7xl flex justify-between w-full'>
          <Link href='/'>
            <h1 className='text-2xl cursor-pointer'>Job for Devs</h1>
          </Link>
          <div className='ml-3 flex items-center justify-center'>
            <Link href='/new-post'>
              <a className='mr-1 bg-white text-slate-800 px-3 py-1 w-max rounded-lg text-base md:text-lg sm:mr-2 hover:bg-slate-200 transition-colors duration-200'>
                Opublikuj
              </a>
            </Link>
            {!session && (
              <Link href='/login'>
                <a className='ml-1 bg-green-500 text-white px-3 py-1 rounded-lg text-base md:text-lg sm:ml-2 hover:bg-green-600 transition-colors duration-200'>
                  Zaloguj się
                </a>
              </Link>
            )}
            {session && (
              <button
                type='button'
                className='ml-1 bg-green-500 text-white px-3 py-1 rounded-lg text-base md:text-lg sm:ml-2 hover:bg-green-600 transition-colors duration-200'
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={singOutHandler}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>
      <main className='overflow-x-hidden selection:bg-green-500 selection:text-white'>
        {children}
      </main>
      <div id='modal-root'></div>
    </>
  );
};

export default Layout;
