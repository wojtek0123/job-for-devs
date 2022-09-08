import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const currentYear = new Date().getFullYear();

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const singOutHandler = async (): Promise<void> => {
    const data = await signOut({
      redirect: false,
      callbackUrl: '/',
    });
    await router.push(data.url);
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
        <link rel='icon' href='/code.svg' />
      </Head>

      <header className='bg-white p-5 flex items-center justify-center w-full text-black selection:bg-green-500 selection:text-white border-b-2 border-gray-200'>
        <div className='max-w-7xl w-full flex justify-between items-center'>
          <Link href='/'>
            <h1 className='text-xl sm:text-3xl min-w-max cursor-pointer'>
              Job for Devs
            </h1>
          </Link>
          <div className='ml-3 flex items-center justify-center'>
            <Link href='/new-offer'>
              <a className='mr-1 bg-gray-200 text-black px-3 py-2 w-max rounded-lg text-base md:text-lg sm:mr-2 hover:bg-gray-300 transition-colors duration-200'>
                Opublikuj
              </a>
            </Link>
            {!session && (
              <Link href='/login'>
                <a className='ml-1 bg-green-500 text-white px-3 py-2 rounded-lg text-base md:text-lg sm:ml-2 hover:bg-green-600 transition-colors duration-200'>
                  Zaloguj
                </a>
              </Link>
            )}
            {session && (
              <button
                type='button'
                className='ml-1 bg-green-500 text-white px-3 py-2 rounded-lg text-base md:text-lg sm:ml-2 hover:bg-green-600 transition-colors duration-200'
                onClick={singOutHandler}
              >
                Wyloguj
              </button>
            )}
          </div>
        </div>
      </header>
      <main className='overflow-x-hidden selection:bg-green-500 selection:text-white'>
        {children}
      </main>
      <footer className='w-full bg-white rounded-t-lg mt-10 py-5 border-t-2 border-gray-200 selection:bg-green-500 selection:text-white'>
        <p className='text-center'>
          Zaprojektowane i stworzone przez Wojciech Pietaszuk
        </p>
        <p className='text-center'>{currentYear}</p>
      </footer>
      <div id='modal-root'></div>
    </>
  );
};

export default Layout;
