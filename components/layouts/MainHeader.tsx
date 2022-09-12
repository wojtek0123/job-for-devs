import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_USER_ID } from '../../graphql/queries';
import { useState } from 'react';

const MainHeader: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const { data, loading, error } = useQuery(GET_USER_ID, {
    variables: {
      email: session?.user?.email,
    },
  });
  const router = useRouter();

  const singOutHandler = async (): Promise<void> => {
    if (showMenu) {
      setShowMenu(false);
    }
    const data = await signOut({
      redirect: false,
      callbackUrl: '/',
    });
    await router.push(data.url);
  };

  const toggleMenuHandler = (): void => {
    setShowMenu((prevState) => !prevState);
  };

  const closeMenuHandler = (): void => {
    setShowMenu(false);
  };
  return (
    <header className='bg-white p-5 flex items-center justify-center w-full text-black selection:bg-green-500 selection:text-white border-b-2 border-gray-200 z-30'>
      <div className='max-w-7xl w-full flex justify-between items-center'>
        <Link href='/'>
          <h1 className='text-2xl xs:text-3xl min-w-max cursor-pointer'>
            Job for Devs
          </h1>
        </Link>
        <button
          type='button'
          title='hamburger'
          className='flex flex-col md:hidden'
          onClick={toggleMenuHandler}
        >
          <div className='w-9 h-[3px] bg-black my-1 rounded-lg'></div>
          <div className='w-9 h-[3px] bg-black my-1 rounded-lg'></div>
          <div className='w-6 h-[3px] bg-black my-1 rounded-lg'></div>
        </button>

        <div
          className={`bg-white fixed inset-0 flex flex-col items-center justify-center text-4xl transition-transform duration-300 z-10 ${
            showMenu ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <button
            type='button'
            className='fixed top-5 right-5 text-black z-20'
            onClick={closeMenuHandler}
            title='close'
          >
            <svg
              className='fill-white bg-green-500 w-10 h-10 rounded-lg p-2 hover:fill-white transition-colors duration-300'
              viewBox='0 0 384 512'
            >
              <path d='M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z' />
            </svg>
          </button>
          <div className='flex flex-col justify-start'>
            <Link href='/'>
              <a className='my-4' onClick={closeMenuHandler}>
                Oferty
              </a>
            </Link>
            <Link href='/new-offer'>
              <a className='my-4' onClick={closeMenuHandler}>
                Opublikuj
              </a>
            </Link>
            {!session && (
              <Link href='/login'>
                <a className='my-4' onClick={closeMenuHandler}>
                  Zaloguj
                </a>
              </Link>
            )}
            {data && (
              <Link href={`/profile/${data.userId.id as string}`}>
                <a className='my-4' onClick={closeMenuHandler}>
                  Profil
                </a>
              </Link>
            )}
            {session && (
              <button
                type='button'
                className='my-4 text-left'
                onClick={() => {
                  void (async () => await singOutHandler())();
                }}
              >
                Wyloguj
              </button>
            )}
          </div>
        </div>

        <div className='ml-3 hidden items-center justify-center md:flex'>
          <Link href='/'>
            <a className='mr-1 bg-gray-200 text-black px-3 py-2 w-max rounded-lg text-base md:text-lg sm:mr-2 hover:bg-gray-300 transition-colors duration-200'>
              Oferty
            </a>
          </Link>
          <Link href='/new-offer'>
            <a className='mx-1 bg-gray-200 text-black px-3 py-2 w-max rounded-lg text-base md:text-lg sm:mr-2 hover:bg-gray-300 transition-colors duration-200'>
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
          {session && !loading && !error && (
            <Link href={`/profile/${data.userId.id as string}`}>
              <a className='mx-1 bg-gray-200 text-black px-3 py-2 w-max rounded-lg text-base md:text-lg sm:mr-2 hover:bg-gray-300 transition-colors duration-200 flex items-center'>
                Profil
              </a>
            </Link>
          )}
          {session && (
            <button
              type='button'
              className='ml-1 bg-green-500 text-white px-3 py-2 rounded-lg text-base md:text-lg sm:ml-2 hover:bg-green-600 transition-colors duration-200'
              onClick={() => {
                void (async () => await singOutHandler())();
              }}
            >
              Wyloguj
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
