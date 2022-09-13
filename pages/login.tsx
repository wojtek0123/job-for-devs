import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Notification from '../components/notification/Notification';
import { INotification } from '../helpers/types';
import Link from 'next/link';

const Login: NextPage = () => {
  const { data: session } = useSession();
  const [notification, setNotification] = useState<INotification>({
    message: '',
    isError: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const signInWithGithub = async (): Promise<void> => {
    const data = await signIn('github', {
      redirect: false,
      callbackUrl: '/',
    });
    await router.push(data?.url ?? '');
  };

  const signInWithEmail = async (event: React.FormEvent): Promise<any> => {
    event.preventDefault();
    if (!emailInputRef.current?.value) {
      return;
    }
    const enteredEmail = emailInputRef.current.value.trim();
    try {
      const data = await signIn('email', {
        callbackUrl: '/',
        email: enteredEmail,
        redirect: false,
      });
      if (data?.error) {
        setNotification({ message: 'Błąd logowania', isError: true });
        return;
      }
      setNotification({ message: 'Email wysłany', isError: false });
    } catch (error) {
      setNotification({ message: 'Błąd logowania', isError: true });
      console.error(error);
    } finally {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      emailInputRef.current.value = '';
    }
  };

  if (session) {
    void (async function (): Promise<void> {
      await router.push('/');
    })();
  }

  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <div className='flex flex-col w-full bg-gray-200 p-5 md:p-10 text-black border border-gray-200 sm:rounded-lg inset-0 items-center justify-evenly lg:justify-center md:max-w-xl shadow-xl min-h-screen md:min-h-max'>
        <div className='flex justify-start w-full mb-5 md:mb-10'>
          <Link href='/'>
            <a className='inline-flex items-center shadow px-5 py-4 md:px-3 md:py-2 rounded-lg ml-2 xl:ml-0 text-black text-lg transition-colors duration-300 bg-white hover:bg-gray-300'>
              <svg className='w-4 h-4 fill-black' viewBox='0 0 448 512'>
                <path d='M447.1 256c0 17.7-13.4 32-31.1 32H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25-6.3 6.25-14.5 9.35-22.7 9.35s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416c17.7 0 31.1 14.3 31.1 32z' />
              </svg>
              <span className='ml-2 capitalize'>Strona główna</span>
            </a>
          </Link>
        </div>
        <h1 className='text-center mb-6 mt-2 text-4xl'>
          Zaloguj się do Job for Devs
        </h1>
        <div className='flex flex-col justify-center w-full items-center'>
          <button
            className='bg-white text-lg md:text-base text-black w-full max-w-sm md:max-w-[15rem] p-5 md:p-3 my-2 rounded-lg hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center'
            type='button'
            onClick={() => {
              void (async () => await signInWithGithub())();
            }}
          >
            Zaloguj się przez GitHub
            <svg className='fill-black w-5 h-5 ml-2' viewBox='0 0 496 512'>
              <path d='M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z' />
            </svg>
          </button>
          <form
            onSubmit={(event) => {
              void (async () => await signInWithEmail(event))();
            }}
            className='flex flex-col w-full items-center'
          >
            <label htmlFor='email' className='mt-6 mb-2 text-lg'>
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='email@przyklad.com'
              ref={emailInputRef}
              className='rounded-lg text-lg md:text-base p-5 md:p-3 w-full max-w-sm md:max-w-[15rem] text-black outline-green-500'
              autoComplete='off'
            />
            <button
              type='submit'
              className='bg-white text-lg md:text-base text-black rounded-lg my-7 p-5 md:p-3 cursor-pointer w-full max-w-sm md:max-w-[15rem] hover:bg-gray-300 transition-colors duration-300'
            >
              Zaloguj się
            </button>
          </form>
        </div>
      </div>
      <Notification
        show={showPopup}
        message={notification.message}
        isError={notification.isError}
      />
    </div>
  );
};

export default Login;
