import Head from 'next/head';
import Link from 'next/link';

const currentYear = new Date().getFullYear();

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => {
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
            <button
              type='button'
              className='mr-1 bg-white text-slate-800 px-3 py-1 w-max rounded-lg text-base md:text-lg sm:mr-2 hover:bg-slate-200 transition-colors duration-200'
            >
              Post a job
            </button>
            <button
              type='button'
              className='ml-1 bg-green-500 text-white px-3 py-1 rounded-lg text-base md:text-lg sm:ml-2 hover:bg-green-600 transition-colors duration-200'
            >
              Login
            </button>
          </div>
        </div>
      </header>
      <main className='overflow-x-hidden selection:bg-green-500 selection:text-white'>
        {children}
      </main>
      <footer className='bg-slate-800 rounded-t-lg mt-10 py-2 text-center text-white'>
        <p>Created and designed by Wojciech Pietraszuk</p>
        <p>&copy; {currentYear}</p>
      </footer>
    </>
  );
};

export default Layout;
